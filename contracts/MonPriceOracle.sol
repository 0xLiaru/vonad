// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IAggregatorV3 {
    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );

    function decimals() external view returns (uint8);
}

contract MonPriceOracle is Ownable, IAggregatorV3 {
    int256 private _price; // MON/USD * 10^8
    uint80 private _roundId;
    uint256 private _updatedAt;
    uint8 public constant override decimals = 8;

    event PriceUpdated(int256 newPrice, uint256 timestamp);

    constructor() Ownable(msg.sender) {
        _price = 10_000_000_000; // 100 USD/MON default (heavily overvalued to prevent low defaults)
        _updatedAt = block.timestamp;
    }

    function updatePrice(int256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be positive");
        _price = newPrice;
        _roundId++;
        _updatedAt = block.timestamp;
        emit PriceUpdated(newPrice, block.timestamp);
    }

    function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (_roundId, _price, _updatedAt, _updatedAt, _roundId);
    }

    function getLatestPrice() external view returns (int256) {
        return _price;
    }
}
