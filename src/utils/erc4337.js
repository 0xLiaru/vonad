import { encodePacked, keccak256, toBytes, pad, concat, slice, getAddress } from "viem"

/**
 * Build paymasterAndData bytes according to ERC-4337 EntryPoint v0.7+
 *
 * Struct packing: paymaster (20) || validationGasLimit (16) || postOpGasLimit (16) || paymasterData (dynamic)
 *
 * For GasSponsorPaymaster, we just need the address + gas limits (no extra paymaster data).
 */
export function buildPaymasterAndData(paymasterAddress, validationGasLimit = 150000n, postOpGasLimit = 50000n) {
  const paymasterBytes = pad(toBytes(getAddress(paymasterAddress)), { size: 20 })
  const validationGasBytes = slice(pad(toBytes(validationGasLimit), { size: 32 }), 16, 32)
  const postOpGasBytes = slice(pad(toBytes(postOpGasLimit), { size: 32 }), 16, 32)

  return concat([paymasterBytes, validationGasBytes, postOpGasBytes])
}

/**
 * Build accountGasLimits (verificationGas || callGas) per ERC-4337
 */
export function buildAccountGasLimits(verificationGasLimit, callGasLimit) {
  const verif = slice(pad(toBytes(verificationGasLimit), { size: 32 }), 16, 32)
  const call = slice(pad(toBytes(callGasLimit), { size: 32 }), 16, 32)
  return concat([verif, call])
}

/**
 * Build gasFees (maxPriorityFeePerGas || maxFeePerGas) per ERC-4337
 */
export function buildGasFees(maxPriorityFeePerGas, maxFeePerGas) {
  const prio = slice(pad(toBytes(maxPriorityFeePerGas), { size: 32 }), 16, 32)
  const max = slice(pad(toBytes(maxFeePerGas), { size: 32 }), 16, 32)
  return concat([prio, max])
}

/**
 * Get UserOperation EIP-712 hash per ERC-4337
 */
export function getUserOperationHash(userOp, entryPointAddress, chainId) {
  const encoded = encodePacked(
    ["bytes32", "uint256", "bytes32", "bytes32", "bytes32", "uint256", "bytes32", "bytes32", "bytes32"],
    [
      keccak256(encodePacked(["bytes"], [encodePacked(["address", "uint256"], [userOp.sender, userOp.nonce])])),
      userOp.nonce,
      keccak256(userOp.initCode || "0x"),
      keccak256(userOp.callData),
      userOp.accountGasLimits,
      userOp.preVerificationGas,
      userOp.gasFees,
      keccak256(userOp.paymasterAndData || "0x"),
      keccak256(userOp.signature || "0x"),
    ]
  )

  return keccak256(
    encodePacked(
      ["bytes1", "bytes1", "bytes1", "bytes1", "bytes32", "bytes32", "bytes32"],
      [
        "0x19",
        "0x01",
        pad(toBytes(chainId), { size: 32 }),
        pad(toBytes(getAddress(entryPointAddress)), { size: 32 }),
        keccak256(encoded),
        keccak256(toBytes("")),
        keccak256(toBytes("")),
      ]
    )
  )
}
