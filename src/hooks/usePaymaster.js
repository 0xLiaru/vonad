import { useMemo } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { encodeFunctionData } from 'viem'
import {
  PREMIUM_SUBSCRIPTION_ABI,
  GAS_SPONSOR_PAYMASTER_ABI,
} from '../contracts/abis.js'
import {
  PREMIUM_SUBSCRIPTION_ADDRESS,
  GAS_SPONSOR_PAYMASTER_ADDRESS,
  ENTRY_POINT_ADDRESS,
  BUNDLER_RPC,
} from '../contracts/addresses.js'
import { buildPaymasterAndData } from '../utils/erc4337.js'

export function usePaymaster() {
  const { address, isConnected } = useAccount()

  const { data: isPremium } = useReadContract({
    address: PREMIUM_SUBSCRIPTION_ADDRESS,
    abi: PREMIUM_SUBSCRIPTION_ABI,
    functionName: 'isPremium',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  })

  const { data: paymasterDeposit } = useReadContract({
    address: GAS_SPONSOR_PAYMASTER_ADDRESS,
    abi: GAS_SPONSOR_PAYMASTER_ABI,
    functionName: 'getEntryPointDeposit',
    query: { enabled: isConnected && !!address && !!isPremium },
  })

  const paymasterReady = useMemo(() => {
    if (!isConnected || !isPremium) return false
    if (!paymasterDeposit || paymasterDeposit === 0n) return false
    return true
  }, [isConnected, isPremium, paymasterDeposit])

  const bundlerAvailable = Boolean(BUNDLER_RPC)

  /** Build paymasterAndData bytes for a UserOperation */
  const getPaymasterAndData = useMemo(() => {
    if (!paymasterReady) return null
    return buildPaymasterAndData(GAS_SPONSOR_PAYMASTER_ADDRESS)
  }, [paymasterReady])

  /** CallData encoding helper */
  const encodeCall = (abi, functionName, args = []) => {
    return encodeFunctionData({ abi, functionName, args })
  }

  return {
    isPremium: Boolean(isConnected && isPremium),
    paymasterReady,
    bundlerAvailable,
    paymasterAddress: GAS_SPONSOR_PAYMASTER_ADDRESS,
    entryPointAddress: ENTRY_POINT_ADDRESS,
    bundlerRpc: BUNDLER_RPC,
    getPaymasterAndData,
    paymasterDeposit,
    encodeCall,
  }
}
