// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../contracts/IFAllocationMaster.sol";
import "../contracts/IFAllocationMasterAdapter.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ContractTest is Test {
    IFAllocationMaster internal ifAllocationMaster;
    IFAllocationMasterAdapter internal ifAllocationMasterAdapter;
    address internal messageBus = address(0); //TODO replace messageBus addr
    address internal idiaAddr = 0x0b15Ddf19D47E6a86A56148fb4aFFFc6929BcB89;

    function setUp() public {
        ifAllocationMaster = new IFAllocationMaster(messageBus);
        ifAllocationMasterAdapter = new IFAllocationMasterAdapter(messageBus, address(ifAllocationMaster), 1);

    }

    function testExample() public {
        address[] memory users = new address[](1);
        users[0] = 0x1f1BDFE288a8C9ac31F1f7C70dfEE6c82EDF77f6;
        ifAllocationMaster.addTrack(
            "Test Track",ERC20(idiaAddr),1, 1, 1, 1000
        );
        console.log("track count:", ifAllocationMaster.trackCount());
        ifAllocationMaster.syncUserWeight(
            address(ifAllocationMasterAdapter),
            users,
            0,
            uint80(block.timestamp),
            1
        );
        assertTrue(true);
    }
}
