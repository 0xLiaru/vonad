// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IPremiumSubscriptionExternal {
    function activatePremiumExternal(address _user) external;
}

contract Escrow is Ownable, Pausable, ReentrancyGuard {
    IPremiumSubscriptionExternal public premiumSubscription;

    uint256 public constant LOCK_DURATION = 30 days;
    uint256 public constant PREMIUM_PRICE = 0.01 ether;

    struct Deposit {
        address user;
        uint256 amount;
        uint256 lockedUntil;
        bool released;
        bool refunded;
    }

    Deposit[] public deposits;
    mapping(address => uint256[]) public userDeposits;
    uint256 private _totalLocked;

    event PremiumDeposited(
        address indexed user,
        uint256 indexed depositId,
        uint256 amount,
        uint256 lockedUntil
    );
    event DepositReleased(
        address indexed user,
        uint256 indexed depositId,
        uint256 amount
    );
    event DepositRefunded(
        address indexed user,
        uint256 indexed depositId,
        uint256 amount
    );

    constructor(
        address _premiumSubscription
    ) Ownable(msg.sender) {
        require(_premiumSubscription != address(0), "Zero premium address");
        premiumSubscription = IPremiumSubscriptionExternal(_premiumSubscription);
    }

    function setPremiumSubscription(address _ps) external onlyOwner {
        require(_ps != address(0), "Zero address");
        premiumSubscription = IPremiumSubscriptionExternal(_ps);
    }

    function depositForPremium() external payable nonReentrant whenNotPaused {
        require(msg.value == PREMIUM_PRICE, "Exact 0.01 MON required");

        uint256 depositId = deposits.length;
        deposits.push(
            Deposit({
                user: msg.sender,
                amount: msg.value,
                lockedUntil: block.timestamp + LOCK_DURATION,
                released: false,
                refunded: false
            })
        );
        userDeposits[msg.sender].push(depositId);
        _totalLocked += msg.value;

        premiumSubscription.activatePremiumExternal(msg.sender);

        emit PremiumDeposited(
            msg.sender,
            depositId,
            msg.value,
            block.timestamp + LOCK_DURATION
        );
    }

    function release(address _user, uint256 _depositId) external onlyOwner nonReentrant {
        require(_depositId < deposits.length, "Invalid deposit ID");
        Deposit storage d = deposits[_depositId];
        require(d.user == _user, "Not user's deposit");
        require(!d.released, "Already released");
        require(!d.refunded, "Already refunded");
        require(block.timestamp >= d.lockedUntil, "Still locked");

        d.released = true;
        _totalLocked -= d.amount;

        (bool sent, ) = owner().call{value: d.amount}("");
        require(sent, "Transfer failed");

        emit DepositReleased(_user, _depositId, d.amount);
    }

    function refund(uint256 _depositId) external nonReentrant {
        require(_depositId < deposits.length, "Invalid deposit ID");
        Deposit storage d = deposits[_depositId];
        require(d.user == msg.sender, "Not your deposit");
        require(!d.released, "Already released");
        require(!d.refunded, "Already refunded");

        d.refunded = true;
        _totalLocked -= d.amount;

        (bool sent, ) = msg.sender.call{value: d.amount}("");
        require(sent, "Transfer failed");

        emit DepositRefunded(msg.sender, _depositId, d.amount);
    }

    function getUserDeposits(
        address _user
    ) external view returns (uint256[] memory) {
        return userDeposits[_user];
    }

    function getDeposit(
        uint256 _depositId
    ) external view returns (Deposit memory) {
        require(_depositId < deposits.length, "Invalid deposit ID");
        return deposits[_depositId];
    }

    function getTotalLocked() external view returns (uint256) {
        return _totalLocked;
    }

    function getDepositCount() external view returns (uint256) {
        return deposits.length;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
