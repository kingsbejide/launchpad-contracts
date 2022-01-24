// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './library/ERC2771ContextUpdateable.sol';

contract SolAddressRegistry is ERC2771ContextUpdateable {
    //// structs

    struct UserAddressMap {
        address evmAddr;
        string solAddr;
    }

    //// vars

    // map of user evm address to sol address
    mapping(address => UserAddressMap) public registry;
    // array of all user evm addresses
    address[] public addresses;
    // count of addresses
    uint64 public addrCount;

    //// events

    event RegisterAddress(address evmAddr);

    //// functions

    function registerSolAddress(string memory solAddr) public returns (bool) {
        // require non 0 address
        require(msg.sender != address(0), 'Address cannot be 0x0');

        // check if address is being registered for the first time
        bool firstRegister = registry[msg.sender].evmAddr == address(0);
        if (firstRegister) {
            // store in array
            addresses.push(msg.sender);
            // count up
            addrCount++;
        }

        // update map
        registry[msg.sender] = UserAddressMap({
            evmAddr: msg.sender,
            solAddr: solAddr
        });

        emit RegisterAddress(msg.sender);

        return true;
    }
}
