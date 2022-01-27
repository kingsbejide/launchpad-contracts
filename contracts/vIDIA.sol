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
    }

    struct StakeTokenStats {
        uint256 accumulatedPenalty;
        uint256 totalStakedAmount;
        uint256 totalUnstakedAmount;
        uint256 totalStakers;
    }

    bytes32 public constant PENALTY_SETTER_ROLE = keccak256("PENALTY_SETTER_ROLE");

    // stakeable tokens
    address[] stakeTokens;

    // token address => token config
    mapping(address => StakeTokenConfig) public tokenConfigurations;

    // token address => token stats
    mapping(address => StakeTokenStats) public tokenStats;

    // user info mapping (user addr => token addr => user info)
    mapping(address => mapping(address => UserInfo)) public userInfo;

    // todo: events

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

    function claimReward() public {}

    // owner only addStakeToken

    function setPenalty(uint256 newPenalty, address token) external {
        require(hasRole(PENALTY_SETTER_ROLE, _msgSender()), "Must have penalty setter role");
        tokenConfigurations[token].penalty = newPenalty;
    }

    // owner only setPenalty

    // owner only setUnvestingDelay
}
