// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

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
        //keep track of each user unstake amount
        // uint256[] unstakes; 
        //mapping of unstake timestamp to unstake amount to keep track of multiple unstakes by same user
    }

    struct StakeTokenStats {
        uint256 accumulatedPenalty;
        uint256 totalStakedAmount;
        uint256 totalUnstakedAmount;
        uint256 totalStakers;
    }

    struct UnstakeStats {
        uint256 unstakedAmount;
        uint256 unstakedAt;
    }

    // stakeable tokens
    address[] stakeTokens;

    // token address => token config
    mapping(address => StakeTokenConfig) public tokenConfigurations;

    // token address => token stats
    mapping(address => StakeTokenStats) public tokenStats;

    // user info mapping (user addr => token addr => user info)
    mapping(address => mapping(address => UserInfo)) public userInfo;

    // user address => token addr => unstake info
    mapping(address => mapping(address => UnstakeStats)) public unstakeTokenStats;

    // Events
    
    event Stake(address _from, uint256 amount, address token);

    event Unstake(address _from, uint256 amount, address token);


    function stake(uint256 amount, address token) public {
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for staking'
        );
        require(amount <= 0);

        tokenStats[token].totalStakedAmount += amount;
        userInfo[msg.sender][token].stakedAmount += amount;


        emit Stake(msg.sender, amount, token);
    }

    // function stakeOf(address staker, address token)  public view returns(uint256) {
    //     return
    // }

    // returns pending staking rewards to user
    // function pendingRewards(address staker) public view returns(uint256) {
    //     return
    // }

    function unstake(uint256 amount, address token) public {
        require(
            tokenConfigurations[token].enabled,
            'Invalid token for staking'
        );
        require(amount <= 0);

        tokenStats[token].totalStakedAmount -= amount;
        userInfo[msg.sender][token].stakedAmount -= amount;
        //start unvesting period
        uint256 unvestAt = block.timestamp +
            tokenConfigurations[token].unvestingDelay;
        //store earliest unvest here?
        userInfo[msg.sender][token].unvestAt = unvestAt;
            
        
        userInfo[msg.sender][token].unstakes[unvestAt] = amount;
        
        emit Unstake(msg.sender, amount, token); 
    }

    function immediateUnstake() public {}

    function claim(address token) public {
        require(block.timestamp < userInfo[msg.sender][token].unvestAt, 'User finished unvesting period');
        transfer(msg.sender,unstakeTokenStats[msg.sender][token].unstakedAmount);
    }

    function immediateClaim() public {}

    function claimReward() public {}

    //whitelist

    // Function for owner to set an optional, separate whitelist setter
    function setWhitelistSetter(address _whitelistSetter) external onlyOwner {  

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
        require(checkWhitelist(_msgSender(), merkleProof), 'Proof invalid');
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
