// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PremiumSubscription is Ownable {
    mapping(address => bool) public isPremium;
    mapping(address => uint256) public premiumExpiry;

    uint256 public constant DURATION = 30 days;
    uint256 public constant PRICE_MON = 0.01 ether;
    uint256 public constant PRICE_USDC = 1 * 10 ** 6;

    IERC20 public usdcToken;
    bool public useUSDC;

    event PremiumPurchased(address indexed user, uint256 expiry);
    event PremiumRenewed(address indexed user, uint256 newExpiry);
    event USDCUpdated(address indexed newUSDC);

    constructor(address _usdcToken) Ownable(msg.sender) {
        usdcToken = IERC20(_usdcToken);
    }

    function setUSDC(address _usdcToken) external onlyOwner {
        usdcToken = IERC20(_usdcToken);
        emit USDCUpdated(_usdcToken);
    }

    function purchaseWithMON() external payable {
        require(msg.value >= PRICE_MON, "Insufficient MON payment");
        _activatePremium(msg.sender);
        if (msg.value > PRICE_MON) {
            payable(msg.sender).transfer(msg.value - PRICE_MON);
        }
    }

    function purchaseWithUSDC() external {
        require(address(usdcToken) != address(0), "USDC not configured");
        require(
            usdcToken.transferFrom(msg.sender, owner(), PRICE_USDC),
            "USDC transfer failed"
        );
        _activatePremium(msg.sender);
    }

    function _activatePremium(address _user) internal {
        if (premiumExpiry[_user] > block.timestamp) {
            premiumExpiry[_user] += DURATION;
            emit PremiumRenewed(_user, premiumExpiry[_user]);
        } else {
            premiumExpiry[_user] = block.timestamp + DURATION;
            emit PremiumPurchased(_user, premiumExpiry[_user]);
        }
        isPremium[_user] = true;
    }

    function checkAndUpdatePremium(address _user) external {
        if (premiumExpiry[_user] < block.timestamp) {
            isPremium[_user] = false;
        }
    }

    function withdrawMON() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawUSDC() external onlyOwner {
        uint256 balance = usdcToken.balanceOf(address(this));
        if (balance > 0) {
            usdcToken.transfer(owner(), balance);
        }
    }
}
