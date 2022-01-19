// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './library/ERC2771ContextUpdateable.sol';

contract SolAddressRegistry is ERC2771ContextUpdateable {
    //// structs

    struct UserAddressMap {
        address evmAddr;
        bytes solAddr;
    }

    //// vars

    // map of user evm address to sol address
    mapping(address => UserAddressMap) public registry;
    // array of all user evm addresses
    address[] public addresses;

    //// events

    event RegisterAddress(address evmAddr);

    //// functions

    function registerSolAddress(bytes memory solAddr) public {
        // store in map
        registry[msg.sender] = UserAddressMap({
            evmAddr: msg.sender,
            solAddr: solAddr
        });

        // store in array
        addresses.push(msg.sender);

        emit RegisterAddress(msg.sender);
    }
}
