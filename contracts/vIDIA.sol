// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';

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

    constructor(string memory _name, string memory _symbol, address admin) AccessControlEnumerable() IFTokenStandard(_name,_symbol,admin)  {
        _setupRole(PENALTY_SETTER_ROLE, msg.sender);
        _setupRole(DELAY_SETTER_ROLE, msg.sender);
        _setupRole(WHITELIST_SETTER_ROLE, msg.sender);
    }


    function stake(uint256 amount, address token) public {
        emit Stake(msg.sender, amount, token);
    }

       function unstake(uint256 amount, address token) public {
        emit Unstake(msg.sender, amount, token);
    }

     function immediateUnstake(uint256 amount, address token) public {
        emit ImmediateUnstake(msg.sender, amount, token);
    }

        function claim(address token) public {
        emit Claim(msg.sender,token);
    }

     function immediateClaim(address token) public {
        emit ImmediateClaim(msg.sender,token);
    }

    function claimReward() public {}


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
