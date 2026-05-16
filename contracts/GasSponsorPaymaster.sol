// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/draft-IERC4337.sol";

interface IPremiumSubscription {
    function isPremium(address _user) external view returns (bool);
}

contract GasSponsorPaymaster is Ownable, IPaymaster, Pausable, ReentrancyGuard {
    IEntryPoint public immutable entryPoint;
    IPremiumSubscription public premiumSubscription;

    event PremiumGasSponsored(
        address indexed sender,
        uint256 indexed nonce,
        uint256 gasCost
    );

    constructor(
        address _entryPoint,
        address _premiumSubscription
    ) Ownable(msg.sender) {
        require(_entryPoint != address(0), "Zero entry point");
        require(_premiumSubscription != address(0), "Zero premium address");
        entryPoint = IEntryPoint(_entryPoint);
        premiumSubscription = IPremiumSubscription(_premiumSubscription);
    }

    function setPremiumSubscription(address _ps) external onlyOwner {
        require(_ps != address(0), "Zero address");
        premiumSubscription = IPremiumSubscription(_ps);
    }

    function validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32 /* userOpHash */,
        uint256 /* maxCost */
    ) external returns (bytes memory context, uint256 validationData) {
        require(msg.sender == address(entryPoint), "Only entryPoint");
        require(!paused(), "Paymaster paused");
        require(
            premiumSubscription.isPremium(userOp.sender),
            "Sender is not premium"
        );

        return (abi.encode(userOp.sender), 0);
    }

    function postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost,
        uint256 /* actualUserOpFeePerGas */
    ) external {
        require(msg.sender == address(entryPoint), "Only entryPoint");

        if (mode == PostOpMode.opSucceeded) {
            address sender = abi.decode(context, (address));
            emit PremiumGasSponsored(sender, 0, actualGasCost);
        }
    }

    function deposit() external payable onlyOwner nonReentrant {
        require(msg.value > 0, "Zero deposit");
        entryPoint.depositTo{value: msg.value}(address(this));
    }

    function withdraw(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Zero amount");
        entryPoint.withdrawTo(payable(owner()), amount);
    }

    function getEntryPointDeposit() external view returns (uint256) {
        return entryPoint.balanceOf(address(this));
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    receive() external payable {}
}
