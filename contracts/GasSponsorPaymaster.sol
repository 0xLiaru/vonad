// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/draft-IERC4337.sol";

interface IPremiumSubscription {
    function isPremium(address _user) external view returns (bool);
}

contract GasSponsorPaymaster is Ownable, IPaymaster {
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
        entryPoint = IEntryPoint(_entryPoint);
        premiumSubscription = IPremiumSubscription(_premiumSubscription);
    }

    function setPremiumSubscription(address _ps) external onlyOwner {
        premiumSubscription = IPremiumSubscription(_ps);
    }

    function validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32 /* userOpHash */,
        uint256 /* maxCost */
    ) external returns (bytes memory context, uint256 validationData) {
        require(msg.sender == address(entryPoint), "only entryPoint");
        require(
            premiumSubscription.isPremium(userOp.sender),
            "sender is not premium"
        );

        return (abi.encode(userOp.sender), 0);
    }

    function postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost,
        uint256 /* actualUserOpFeePerGas */
    ) external {
        require(msg.sender == address(entryPoint), "only entryPoint");

        if (mode == PostOpMode.opSucceeded) {
            address sender = abi.decode(context, (address));
            emit PremiumGasSponsored(
                sender,
                0,
                actualGasCost
            );
        }
    }

    function deposit() external payable onlyOwner {
        entryPoint.depositTo{value: msg.value}(address(this));
    }

    function withdraw(uint256 amount) external onlyOwner {
        entryPoint.withdrawTo(payable(owner()), amount);
    }

    function getEntryPointDeposit() external view returns (uint256) {
        return entryPoint.balanceOf(address(this));
    }

    receive() external payable {}
}
