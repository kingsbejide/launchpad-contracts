// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';
import '../library/IFTokenStandard.sol';
import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract vIDIA is AccessControlEnumerable, IFTokenStandard {
    using SafeERC20 for ERC20;
    // STRUCTS

    // Configuration info for a stakeable token
    struct StakeTokenConfig {
        // delay for unvesting token
        uint24 unstakingDelay;
        // constant penalty for early unvesting
        uint256 penalty;
        // if token is enabled for staking
        bool enabled;
    }

    struct UserInfo {
        uint256 stakedAmount;
        uint256 unstakeAt;
        uint256 unstakedAmount;
    }

    struct StakeTokenStats {
        uint256 accumulatedPenalty;
        uint256 totalStakedAmount;
        uint256 totalUnstakedAmount;
        uint256 totalStakers;
        uint256 rewardSum; // (1/T1 + 1/T2 + 1/T3)
    }

    bytes32 public constant PENALTY_SETTER_ROLE =
        keccak256('PENALTY_SETTER_ROLE');

    bytes32 public constant DELAY_SETTER_ROLE = keccak256('DELAY_SETTER_ROLE');

    bytes32 public constant WHITELIST_SETTER_ROLE =
        keccak256('WHITELIST_SETTER_ROLE');

    // optional whitelist setter (settable by owner)
    address public whitelistSetter;

    bytes32 public whitelistRootHash;

    // token address => token config
    mapping(address => StakeTokenConfig) public tokenConfigurations;

    // token address => token stats
    mapping(address => StakeTokenStats) public tokenStats;

    // user info mapping (user addr => token addr => user info)
    mapping(address => mapping(address => UserInfo)) public userInfo;


    // Events

    event Stake(address _from, uint256 amount, address token);

    event Unstake(address _from, uint256 amount, address token);

    event ImmediateUnstake(address _from, uint256 amount, address token);

    event SetWhitelistSetter(address whitelistSetter);

    event SetWhitelist(bytes32 whitelistRootHash);

    event Claim(address _from, address token);

    event ImmediateClaim(address _from, address token);

    event ClaimReward(address _from, address token);

    function stake(uint256 amount, address token) public {
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for staking'
        );

        tokenStats[token].totalStakedAmount += amount;
        userInfo[msg.sender][token].stakedAmount += amount;
        //mint vIDIA
        _mint(msg.sender,amount);
        claimReward(token);

        emit Stake(msg.sender, amount, token);
    }

    constructor(string memory _name, string memory _symbol, address admin) AccessControlEnumerable() IFTokenStandard(_name,_symbol,admin)  {
        _setupRole(PENALTY_SETTER_ROLE, msg.sender);
        _setupRole(DELAY_SETTER_ROLE, msg.sender);
        _setupRole(WHITELIST_SETTER_ROLE, msg.sender);
    }

    function calculateUserReward(address token) public returns (uint256) {
        //calculates how much user a reward is owed and returns this amount
        //PREV + 1/Total Staked
        //FEE_SIZE * userInfo[msg.sender][token].stakedAmount * totalStakeSum
        return
            userInfo[msg.sender][token].stakedAmount *
            tokenStats[token].rewardSum;
    }

    function unstake(uint256 amount, address token) public {
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for staking'
        );
        require(userInfo[msg.sender][token].unstakedAmount == 0,'User already has pending tokens unstaking');
        require(userInfo[msg.sender][token].unstakeAt == 0,'User has no tokens unstaking');

        tokenStats[token].totalStakedAmount -= amount;
        userInfo[msg.sender][token].stakedAmount -= amount;
        //start unvesting period
        uint256 unstakeAt = block.timestamp +
            tokenConfigurations[token].unstakingDelay;
        userInfo[msg.sender][token].unstakeAt = unstakeAt;
        userInfo[msg.sender][token].unstakedAmount = amount;
        claimReward(token);
        emit Unstake(msg.sender, amount, token);
    }

    function immediateUnstake(uint256 amount, address token) public {
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for staking'
        );
        require(userInfo[msg.sender][token].unstakeAt == 0,'User has currently pending unstake');
        require(userInfo[msg.sender][token].unstakedAmount == 0,'User has tokens currently pending unstake');

        tokenStats[token].totalStakedAmount -= amount;
        userInfo[msg.sender][token].stakedAmount -= amount;

        //based on how much time you have left to unvest
        //takes into account into penalty
        //update rewardSum
        tokenStats[token].rewardSum +=
            (1 / (tokenStats[token].totalStakedAmount)) *
            tokenConfigurations[token].penalty;

        uint256 penalty = amount  * tokenConfigurations[token].penalty;
        tokenStats[token].accumulatedPenalty += penalty;
         claimReward(token);

        ERC20 claimedTokens = ERC20(token);
        claimedTokens.safeTransfer(
            _msgSender(),
            amount - penalty
        );
        burn(amount);

        emit ImmediateUnstake(msg.sender, amount, token);
    }

    function claim(address token) public {
        require(
            block.timestamp < userInfo[msg.sender][token].unstakeAt,
            'User finished unvesting period'
        );
        require(userInfo[msg.sender][token].unstakedAmount != 0,'User has no tokens unstaking')
        //get underlying, cast to erc20
        ERC20 claimedTokens = ERC20(token);
        claimedTokens.safeTransfer(
            _msgSender(),
            userInfo[msg.sender][token].unstakedAmount
        );
        burn(userInfo[msg.sender][token].unstakedAmount);
        //tax not 

        userInfo[msg.sender][token].unstakeAt = 0;
        userInfo[msg.sender][token].unstakedAmount = 0;

        emit Claim(msg.sender,token);
    }

    function immediateClaim(address token) public {
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for staking'
        );
        // user needs to have tokens curently unstaking
        require(userInfo[msg.sender][token].unstakedAmount != 0,'User has no tokens unstaking');
        require(userInfo[msg.sender][token].unstakedAt != 0,'User has no tokens waiting to be unstaked');

        tokenStats[token].totalStakedAmount -= userInfo[token].unstakedAmount;
        userInfo[msg.sender][token].stakedAmount -= userInfo[token].unstakedAmount;

        //update rewardSum
        tokenStats[token].rewardSum +=
            (1 / (tokenStats[token].totalStakedAmount)) *
            tokenConfigurations[token].penalty;

        uint256 penalty = amount  * tokenConfigurations[token].penalty;
        tokenStats[token].accumulatedPenalty += penalty;
         claimReward(token);

        ERC20 claimedTokens = ERC20(token);
        claimedTokens.safeTransfer(
            _msgSender(),
            userInfo[token].unstakedAmount - penalty
        );
        burn(amount);

        emit ImmediateClaim(msg.sender,token);


    }

    function claimReward(address token) public {}
    // Function for owner to set an optional, separate whitelist setter
    function setWhitelistSetter(address _whitelistSetter) external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            'Must have admin role'
        );

        whitelistSetter = _whitelistSetter;

        // emit
        emit SetWhitelistSetter(_whitelistSetter);
        
        emit ClaimReward(msg.sender,token);
    }

    // Function for owner or whitelist setter to set a whitelist; if not set, then everyone allowed
    function setWhitelist(bytes32 _whitelistRootHash) external {
        require(
            hasRole(WHITELIST_SETTER_ROLE, _msgSender()),
            'Must have whitelist setter role'
        );
        whitelistRootHash = _whitelistRootHash;

        // emit
        emit SetWhitelist(_whitelistRootHash);
    }

    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool)
    {
        //disable transfers without merkleProof
        revert('No merkle proof');
    }

    //transfer
    function transfer(
        address _to,
        uint256 _value,
        bytes32[] calldata merkleProof
    ) public returns (bool) {
        //ensure only whitelisted addresses can transfer
        require(checkWhitelist(_msgSender(), merkleProof), 'Proof invalid');
        super.transfer(_to, _value);
    }

    // Returns true if user is on whitelist, otherwise false
    function checkWhitelist(address user, bytes32[] calldata merkleProof)
        public
        view
        returns (bool)
    {
        // compute merkle leaf from input
        bytes32 leaf = keccak256(abi.encodePacked(user));

        // verify merkle proof
        return MerkleProof.verify(merkleProof, whitelistRootHash, leaf);
    }

    // owner only addStakeToken

    // owner only setStakeTokenUnvestingDelay
    // owner only setStakeTokenPenalty
    // owner only setStakeTokenEnabled
    function setPenalty(uint256 newPenalty, address token) external {
        require(
            hasRole(PENALTY_SETTER_ROLE, _msgSender()),
            'Must have penalty setter role'
        );
        tokenConfigurations[token].penalty = newPenalty;
    }

    function setUnvestingDelay(uint24 newDelay, address token) external {
        require(
            hasRole(DELAY_SETTER_ROLE, _msgSender()),
            'Must have delay setter role'
        );
        tokenConfigurations[token].unvestingDelay = newDelay;
    }

    //// EIP2771 meta transactions

    function _msgSender()
        internal
        view
        override(IFTokenStandard, Context)
        returns (address)
    {
        return ERC2771ContextUpdateable._msgSender();
    }

    function _msgData()
        internal
        view
        override(IFTokenStandard, Context)
        returns (bytes calldata)
    {
        return ERC2771ContextUpdateable._msgData();
    }

    //// EIP1363 payable token

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControlEnumerable, IFTokenStandard)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

  //// EIP2771 meta transactions

    function _msgSender()
        internal
        view
        override(IFTokenStandard, Context)
        returns (address)
    {
        return ERC2771ContextUpdateable._msgSender();
    }

    function _msgData()
        internal
        view
        override(IFTokenStandard, Context)
        returns (bytes calldata)
    {
        return ERC2771ContextUpdateable._msgData();
    }

    //// EIP1363 payable token

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControlEnumerable, IFTokenStandard)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
