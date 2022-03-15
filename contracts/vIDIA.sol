// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';

contract vIDIA is AccessControlEnumerable, IFTokenStandard {
    using SafeERC20 for ERC20;

    // delay for unvesting token
    uint24 unstakingDelay;
    // constant penalty for early unvesting
    uint256 penalty;
    // if token is enabled for staking
    bool enabled;
    uint256 accumulatedPenalty;
    uint256 totalStakedAmount;
    uint256 totalUnstakedAmount;
    uint256 totalStakers;
    uint256 rewardSum; // (1/T1 + 1/T2 + 1/T3)

    struct UserInfo {
        uint256 stakedAmount;
        uint256 unstakeAt;
        uint256 unstakedAmount;
    }

    bytes32 public constant PENALTY_SETTER_ROLE =
        keccak256('PENALTY_SETTER_ROLE');

    bytes32 public constant DELAY_SETTER_ROLE = keccak256('DELAY_SETTER_ROLE');

    bytes32 public constant WHITELIST_SETTER_ROLE =
        keccak256('WHITELIST_SETTER_ROLE');

    // optional whitelist setter (settable by owner)
    address public whitelistSetter;

    bytes32 public whitelistRootHash;


    // user info mapping (user addr => token addr => user info)
    mapping(address => mapping(address => UserInfo)) public userInfo;

    // Events

    event Stake(address _from, uint256 amount);

    event Unstake(address _from, uint256 amount);

    event ImmediateUnstake(address _from, uint256 amount);

    event SetWhitelistSetter(address whitelistSetter);

    event SetWhitelist(bytes32 whitelistRootHash);

    event Claim(address _from);

    event ImmediateClaim(address _from);

    event ClaimReward(address _from, uint256 amount);

    constructor(
        string memory _name,
        string memory _symbol,
        address admin,
        address tokenAddress
    ) AccessControlEnumerable() IFTokenStandard(_name, _symbol, admin, tokenAddress) {
        _setupRole(PENALTY_SETTER_ROLE, _msgSender();
        _setupRole(DELAY_SETTER_ROLE, _msgSender());
        _setupRole(WHITELIST_SETTER_ROLE, _msgSender());
    }

    function stake(uint256 amount) public {
        emit Stake(_msgSender(), amount);
    }

    function unstake(uint256 amount) public {
        emit Unstake(_msgSender(), amount);
    }

    function immediateUnstake(uint256 amount) public {
        emit ImmediateUnstake(_msgSender(), amount);
    }

    function claim() public {
        emit Claim(_msgSender());
    }

    function immediateClaim() public {
        emit ImmediateClaim(_msgSender());
    }

    // claim reward and reset user's reward sum
    function claimReward(address token) public {
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for claiming reward'
        );
        uint256 reward = calculateUserReward(token);
        require(reward <= 0, 'No reward to claim');
        // reset user's rewards sum
        userInfo[msg.sender][token].lastRewardSum = tokenStats[token].rewardSum;
        // transfer reward to user
        ERC20 claimedTokens = ERC20(token);
        claimedTokens.safeTransfer(_msgSender(), reward);

        emit ClaimReward(_msgSender(), reward, token);
    }

    function setPenalty(uint256 newPenalty) external {
        require(
            hasRole(PENALTY_SETTER_ROLE, _msgSender()),
            'Must have penalty setter role'
        );
        penalty = newPenalty;
    }

    function setUnvestingDelay(uint24 newDelay) external {
        require(
            hasRole(DELAY_SETTER_ROLE, _msgSender()),
            'Must have delay setter role'
        );
        unvestingDelay = newDelay;
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
