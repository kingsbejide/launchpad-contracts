// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IIFBridgableStakeWeight {
    enum BridgeType {
        UserWeight,
        TotalWeight
    }

    struct MessageRequest {
        // bridge type
        BridgeType bridgeType;
        // user address
        address[] users;
        // amount of weight at timestamp
        uint192[] weights;
        // timestamp value
        uint80 timestamp;
        // track number
        uint24 trackId;
    }
}
