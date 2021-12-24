// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'hardhat/console.sol';

contract vIDIA {
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
    }

    struct StakeTokenStats {
        uint256 accumulatedPenalty;
        uint256 totalStakedAmount;
        uint256 totalUnstakedAmount;
        uint256 totalStakers;
    }

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
        console.log('asdf');
    }

    function stake(uint256 _amount, address _token) public {
        require(tokenConfigurations[_token].enabled , "Invalid token for staking.");
        require(_amount != 0);


        tokenStats[_token].totalStakedAmount =  tokenStats[_token].totalStakedAmount += _amount;
        userInfo[msg.sender][_token].stakedAmount = userInfo[msg.sender][_token].stakedAmount += _amount;
    }

    // function stakeOf(address staker, address token)  public view returns(uint256) {
    //     return 
    // }

    // returns pending staking rewards to user 
    // function pendingRewards(address staker) public view returns(uint256) {
    //     return 
    // }



    function unstake(uint256 _amount, address _token) public {
        require(tokenConfigurations[_token].enabled , "Invalid token for staking.");
        require(_amount != 0);


        tokenStats[_token].totalStakedAmount =  tokenStats[_token].totalStakedAmount -= _amount;
        userInfo[msg.sender][_token].stakedAmount = userInfo[msg.sender][_token].stakedAmount -= _amount;
        //todo: start unvesting period
    }

    function immediateUnstake() public {}

    function claim() public {}

    function immediateClaim() public {}

    function claimReward() public {}

    // owner only addStakeToken

    // owner only setStakeTokenUnvestingDelay
    // owner only setStakeTokenPenalty
    // owner only setStakeTokenEnabled

}
