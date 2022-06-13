// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/IFAllocationMaster.sol";

contract ContractTest is Test {
    IFAllocationMaster internal ifAllocationMaster;
    address internal messageBus = 0xf5C6825015280CdfD0b56903F9F8B5A2233476F5;

    function setUp() public {
        ifAllocationMaster = new IFAllocationMaster(messageBus);
    }

    function testExample() public {
        // ifAllocationMaster.syncUserWeight(receiver, users, trackId, timestamp, dstChainId);
        assertTrue(true);
    }
}
