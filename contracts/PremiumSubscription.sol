// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IMonPriceOracle {
    function getLatestPrice() external view returns (int256);
    function decimals() external view returns (uint8);
}

contract PremiumSubscription is Ownable, Pausable, ReentrancyGuard {
    mapping(address => bool) public isPremium;
    mapping(address => uint256) public premiumExpiry;

    uint256 public constant DURATION = 30 days;
    uint256 public constant PRICE_USDC = 1 * 10 ** 6; // 1 USDC
    uint256 public constant TARGET_USD_PRICE = 5 * 10 ** 8; // $5.00 in 8 decimals

    IERC20 public usdcToken;
    IMonPriceOracle public priceOracle;
    address public escrowAddress;

    uint256 public totalActivePremiums;

    event PremiumActivated(address indexed user, uint256 expiry);
    event PremiumRenewed(address indexed user, uint256 newExpiry);
    event PremiumExpired(address indexed user);
    event USDCUpdated(address indexed newUSDC);
    event OracleUpdated(address indexed newOracle);
    event EscrowUpdated(address indexed newEscrow);

    constructor(
        address _usdcToken,
        address _priceOracle
    ) Ownable(msg.sender) {
        require(_priceOracle != address(0), "Zero oracle address");
        usdcToken = IERC20(_usdcToken);
        priceOracle = IMonPriceOracle(_priceOracle);
    }

    modifier onlyEscrow() {
        require(msg.sender == escrowAddress, "Only escrow");
        _;
    }

    function setUSDC(address _usdcToken) external onlyOwner {
        usdcToken = IERC20(_usdcToken);
        emit USDCUpdated(_usdcToken);
    }

    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "Zero oracle address");
        priceOracle = IMonPriceOracle(_oracle);
        emit OracleUpdated(_oracle);
    }

    function setEscrow(address _escrow) external onlyOwner {
        require(_escrow != address(0), "Zero escrow address");
        escrowAddress = _escrow;
        emit EscrowUpdated(_escrow);
    }

    function getCurrentPriceInMON() public view returns (uint256) {
        int256 monPrice = priceOracle.getLatestPrice();
        require(monPrice > 0, "Invalid oracle price");

        uint8 oracleDecimals = priceOracle.decimals();
        // MON/USD price has `oracleDecimals` decimals (e.g. 8)
        // TARGET_USD_PRICE * 10^(18 + oracleDecimals) / monPrice = MON amount with 18 decimals
        return (TARGET_USD_PRICE * 10 ** (18 + oracleDecimals - 8)) / uint256(monPrice);
    }

    function getCurrentPriceUSD() public pure returns (uint256) {
        return TARGET_USD_PRICE;
    }

    function activatePremiumExternal(
        address _user
    ) external onlyEscrow whenNotPaused {
        require(_user != address(0), "Zero address");
        _activatePremium(_user);
    }

    function purchaseWithUSDC() external nonReentrant whenNotPaused {
        require(address(usdcToken) != address(0), "USDC not configured");
        require(
            usdcToken.transferFrom(msg.sender, owner(), PRICE_USDC),
            "USDC transfer failed"
        );
        _activatePremium(msg.sender);
    }

    function _activatePremium(address _user) internal {
        bool wasActive = isPremium[_user] && premiumExpiry[_user] > block.timestamp;

        if (wasActive) {
            premiumExpiry[_user] += DURATION;
            emit PremiumRenewed(_user, premiumExpiry[_user]);
        } else {
            premiumExpiry[_user] = block.timestamp + DURATION;
            totalActivePremiums++;
            emit PremiumActivated(_user, premiumExpiry[_user]);
        }
        isPremium[_user] = true;
    }

    function deactivateExpired(address _user) external {
        if (isPremium[_user] && premiumExpiry[_user] < block.timestamp) {
            isPremium[_user] = false;
            if (totalActivePremiums > 0) totalActivePremiums--;
            emit PremiumExpired(_user);
        }
    }

    function withdrawUSDC() external onlyOwner {
        uint256 balance = usdcToken.balanceOf(address(this));
        if (balance > 0) {
            usdcToken.transfer(owner(), balance);
        }
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
