// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';

contract vIDIA is AccessControlEnumerable {
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
        uint256 unvestAt;
    }

    struct StakeTokenStats {
        uint256 accumulatedPenalty;
        uint256 totalStakedAmount;
        uint256 totalUnstakedAmount;
        uint256 totalStakers;
    }

    bytes32 public constant PENALTY_SETTER_ROLE =
        keccak256('PENALTY_SETTER_ROLE');

    // stakeable tokens
    address[] stakeTokens;

    // token address => token config
    mapping(address => StakeTokenConfig) public tokenConfigurations;

    // token address => token stats
    mapping(address => StakeTokenStats) public tokenStats;

    // user info mapping (user addr => token addr => user info)
    mapping(address => mapping(address => UserInfo)) public userInfo;

    // todo: events
    event ClaimReward(address _from, uint256 amount, address token);

    constructor() {
        _setupRole(PENALTY_SETTER_ROLE, msg.sender);
    }

    function stake(uint256 amount) public returns (uint256) {
        // todo: sure to prevent staking non stakeable
        console.log(amount);
        return amount;
    }

    function unstake() public {}

    function claim() public {}

    function immediateClaim() public {}

    // claim reward and reset the user's ratio with current globalRatio
    function claimReward(address token) public {
        uint256 reward = userInfo[msg.sender][token].owedReward;
        require(
            block.timestamp < userInfo[msg.sender][token].unvestAt,
            'User finished unvesting period'
        );
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for claiming reward'
        );
        require(reward <= 0, 'No reward to claim');

        // return the reward to user
        // console.log(globalRatio);
        userInfo[msg.sender][token].owedReward = 0;
        // transfer(msg.sender, reward);

        emit ClaimReward(msg.sender, reward, token);
    }

    // owner only addStakeToken

    function setPenalty(uint256 newPenalty, address token) external {
        require(
            hasRole(PENALTY_SETTER_ROLE, _msgSender()),
            'Must have penalty setter role'
        );
        tokenConfigurations[token].penalty = newPenalty;
    }

    // owner only setPenalty

    // owner only setUnvestingDelay
}
