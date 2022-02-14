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
        uint24 unvestingDelay;
        // constant penalty for early unvesting
        uint256 penalty;
        // if token is enabled for staking
        bool enabled;
    }

    struct UserInfo {
        uint256 owedReward;
        uint256 stakedAmount;
        uint256 unvestAt;
        //keep track of each user unstake amount
        // uint256[] unstakes;
        //mapping of unstake timestamp to unstake amount to keep track of multiple unstakes by same user
    }

    struct StakeTokenStats {
        uint256 accumulatedPenalty;
        uint256 totalStakedAmount;
        uint256 totalUnstakedAmount;
        uint256 totalStakers;
        uint256 rewardSum; // (1/T1 + 1/T2 + 1/T3)
    }

    struct UnstakeStats {
        uint256 unstakedAmount;
        uint256 unstakedAt;
    }

    bytes32 public constant PENALTY_SETTER_ROLE =
        keccak256('PENALTY_SETTER_ROLE');

    bytes32 public constant DELAY_SETTER_ROLE = keccak256('DELAY_SETTER_ROLE');

    bytes32 public constant WHITELIST_SETTER_ROLE =
        keccak256('WHITELIST_SETTER_ROLE');

    // optional whitelist setter (settable by owner)
    address public whitelistSetter;

    bytes32 public whitelistRootHash;

    // uint256 public constant FEE_SIZE = 10;

    // stakeable tokens
    address[] stakeTokens;

    // token address => token config
    mapping(address => StakeTokenConfig) public tokenConfigurations;

    // token address => token stats
    mapping(address => StakeTokenStats) public tokenStats;

    // user info mapping (user addr => token addr => user info)
    mapping(address => mapping(address => UserInfo)) public userInfo;

    // user address => token addr => unstake info
    mapping(address => mapping(address => UnstakeStats))
        public unstakeTokenStats;

    // Events

    event Stake(address _from, uint256 amount, address token);

    event Unstake(address _from, uint256 amount, address token);

    event ImmediateUnstake(address _from, uint256 amount, address token);

    event SetWhitelistSetter(address whitelistSetter);

    event SetWhitelist(bytes32 whitelistRootHash);

    function stake(uint256 amount, address token) public {
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for staking'
        );

        tokenStats[token].totalStakedAmount += amount;
        userInfo[msg.sender][token].stakedAmount += amount;
        //mint vIDIA
        _mint(msg.sender,amount);

        emit Stake(msg.sender, amount, token);
    }

    constructor(string memory _name, string memory _symbol, address admin) AccessControlEnumerable() IFTokenStandard(_name,_symbol,admin)  {
        _setupRole(PENALTY_SETTER_ROLE, msg.sender);
        _setupRole(DELAY_SETTER_ROLE, msg.sender);
        _setupRole(WHITELIST_SETTER_ROLE, msg.sender);
    }

    // function stakeOf(address staker, address token)  public view returns(uint256) {
    //     return
    // }

    // returns pending staking rewards to user
    // function pendingRewards(address staker) public view returns(uint256) {
    //     return
    // }

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

        tokenStats[token].totalStakedAmount -= amount;
        userInfo[msg.sender][token].stakedAmount -= amount;
        //start unvesting period
        uint256 unvestAt = block.timestamp +
            tokenConfigurations[token].unvestingDelay;
        //store earliest unvest here?
        userInfo[msg.sender][token].unvestAt = unvestAt;

        // userInfo[msg.sender][token].unstakes[unvestAt] = amount;

        emit Unstake(msg.sender, amount, token);
    }

    function immediateUnstake(uint256 amount, address token) public {
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for staking'
        );
        tokenStats[token].totalStakedAmount -= amount;
        userInfo[msg.sender][token].stakedAmount -= amount;

        //based on how much time you have left to unvest
        //takes into account into penalty

        //update rewardSum
        uint256 penalty = amount / 10;
        tokenStats[token].rewardSum +=
            (1 / (tokenStats[token].totalStakedAmount)) *
            penalty;

        //transfer IDIA back

        emit ImmediateUnstake(msg.sender, amount, token);
    }

    function claim(address token) public {
        require(
            block.timestamp < userInfo[msg.sender][token].unvestAt,
            'User finished unvesting period'
        );
        //get underlying, cast to erc20
        ERC20 claimedTokens = ERC20(token);
        claimedTokens.safeTransfer(
            _msgSender(),
            unstakeTokenStats[msg.sender][token].unstakedAmount
        );
        //TODO: burn vIDIA
        burn(unstakeTokenStats[msg.sender][token].unstakedAmount);
    }

    // function immediateClaim() public {

    // }

    function claimReward() public {}

    //whitelist

    // Function for owner to set an optional, separate whitelist setter
    function setWhitelistSetter(address _whitelistSetter) external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            'Must have admin role'
        );

        whitelistSetter = _whitelistSetter;

        // emit
        emit SetWhitelistSetter(_whitelistSetter);
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
