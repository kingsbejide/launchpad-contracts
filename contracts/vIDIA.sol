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
        uint256 unvestAt;
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
        require(
            tokenConfigurations[_token].enabled,
            'Invalid token for staking.'
        );
        require(_amount != 0);

        tokenStats[_token].totalStakedAmount = tokenStats[_token]
        .totalStakedAmount += _amount;
        userInfo[msg.sender][_token].stakedAmount = userInfo[msg.sender][_token]
        .stakedAmount += _amount;
    }

    // function stakeOf(address staker, address token)  public view returns(uint256) {
    //     return
    // }

    // returns pending staking rewards to user
    // function pendingRewards(address staker) public view returns(uint256) {
    //     return
    // }

    function unstake(uint256 _amount, address _token) public {
        require(
            tokenConfigurations[_token].enabled,
            'Invalid token for staking.'
        );
        require(_amount != 0);

        tokenStats[_token].totalStakedAmount = tokenStats[_token]
        .totalStakedAmount -= _amount;
        userInfo[msg.sender][_token].stakedAmount = userInfo[msg.sender][_token]
        .stakedAmount -= _amount;
        //start unvesting period
        userInfo[msg.sender][_token].unvestAt =block.timestamp + tokenConfigurations[_token].unvestingDelay;
    }

    function immediateUnstake() public {}

    function claim() public {}

    function immediateClaim() public {}

    function claimReward() public {}

    //whitelist

    // Function for owner to set an optional, separate whitelist setter
    function setWhitelistSetter(address _whitelistSetter) external onlyOwner {
        // sale must not have started
        require(block.timestamp < startTime, 'sale already started');

        whitelistSetter = _whitelistSetter;

        // emit
        emit SetWhitelistSetter(_whitelistSetter);
    }

    // Function for owner or whitelist setter to set a whitelist; if not set, then everyone allowed
    function setWhitelist(bytes32 _whitelistRootHash)
        external
        onlyWhitelistSetterOrOwner
    {
        whitelistRootHash = _whitelistRootHash;

        // emit
        emit SetWhitelist(_whitelistRootHash);
    }

    //transfer
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        require(_value <= balances[msg.sender]);
        //ensure only whitelisted addresses can transfer
        require(checkWhitelist(_msgSender(), merkleProof), 'proof invalid');
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
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
}
