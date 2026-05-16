export const PREMIUM_SUBSCRIPTION_ABI = [
  { type: "constructor", inputs: [{ name: "_usdcToken", type: "address" }, { name: "_priceOracle", type: "address" }], stateMutability: "nonpayable" },
  { type: "function", name: "DURATION", outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "isPremium", inputs: [{ name: "", type: "address" }], outputs: [{ type: "bool" }], stateMutability: "view" },
  { type: "function", name: "premiumExpiry", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "totalActivePremiums", outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getCurrentPriceInMON", outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getCurrentPriceUSD", outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "purchaseWithUSDC", stateMutability: "nonpayable" },
  { type: "function", name: "activatePremiumExternal", inputs: [{ name: "_user", type: "address" }], stateMutability: "nonpayable" },
  { type: "function", name: "deactivateExpired", inputs: [{ name: "_user", type: "address" }], stateMutability: "nonpayable" },
  { type: "function", name: "owner", outputs: [{ type: "address" }], stateMutability: "view" },
  { type: "function", name: "paused", outputs: [{ type: "bool" }], stateMutability: "view" },
  { type: "event", name: "PremiumActivated", inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: false, name: "expiry", type: "uint256" }] },
  { type: "event", name: "PremiumRenewed", inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: false, name: "newExpiry", type: "uint256" }] },
  { type: "event", name: "PremiumExpired", inputs: [{ indexed: true, name: "user", type: "address" }] },
]

export const STAKING_DISCOUNT_ABI = [
  { type: "constructor", inputs: [{ name: "_achievementNFT", type: "address" }], stateMutability: "nonpayable" },
  { type: "function", name: "stakedCount", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getDiscount", inputs: [{ name: "_user", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getUserStakes", inputs: [{ name: "_user", type: "address" }], outputs: [{ type: "uint256[]" }], stateMutability: "view" },
  { type: "function", name: "stake", inputs: [{ name: "_tokenId", type: "uint256" }], stateMutability: "nonpayable" },
  { type: "function", name: "unstake", inputs: [{ name: "_tokenId", type: "uint256" }], stateMutability: "nonpayable" },
  { type: "function", name: "unstakeAll", stateMutability: "nonpayable" },
  { type: "function", name: "paused", outputs: [{ type: "bool" }], stateMutability: "view" },
  { type: "event", name: "NFTStaked", inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: true, name: "tokenId", type: "uint256" }] },
  { type: "event", name: "NFTUnstaked", inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: true, name: "tokenId", type: "uint256" }] },
]

export const ACHIEVEMENT_NFT_ABI = [
  { type: "function", name: "balanceOf", inputs: [{ name: "owner", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "ownerOf", inputs: [{ name: "tokenId", type: "uint256" }], outputs: [{ type: "address" }], stateMutability: "view" },
  { type: "function", name: "getUserTokens", inputs: [{ name: "_user", type: "address" }], outputs: [{ type: "uint256[]" }], stateMutability: "view" },
  { type: "function", name: "getAchievement", inputs: [{ name: "_tokenId", type: "uint256" }], outputs: [{ components: [{ name: "moduleName", type: "string" }, { name: "topicName", type: "string" }, { name: "completedAt", type: "uint256" }], type: "tuple" }], stateMutability: "view" },
  { type: "function", name: "tokenURI", inputs: [{ name: "tokenId", type: "uint256" }], outputs: [{ type: "string" }], stateMutability: "view" },
  { type: "function", name: "setApprovalForAll", inputs: [{ name: "operator", type: "address" }, { name: "approved", type: "bool" }], stateMutability: "nonpayable" },
  { type: "function", name: "isApprovedForAll", inputs: [{ name: "owner", type: "address" }, { name: "operator", type: "address" }], outputs: [{ type: "bool" }], stateMutability: "view" },
  { type: "function", name: "mintFee", outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "mintAchievement", inputs: [{ name: "_to", type: "address" }, { name: "_moduleName", type: "string" }, { name: "_topicName", type: "string" }], outputs: [{ type: "uint256" }], stateMutability: "payable" },
  { type: "function", name: "owner", outputs: [{ type: "address" }], stateMutability: "view" },
  { type: "function", name: "paused", outputs: [{ type: "bool" }], stateMutability: "view" },
  { type: "event", name: "AchievementMinted", inputs: [{ indexed: true, name: "tokenId", type: "uint256" }, { indexed: true, name: "to", type: "address" }, { indexed: false, name: "moduleName", type: "string" }, { indexed: false, name: "topicName", type: "string" }, { indexed: false, name: "completedAt", type: "uint256" }] },
]

export const GAS_SPONSOR_PAYMASTER_ABI = [
  { type: "constructor", inputs: [{ name: "_entryPoint", type: "address" }, { name: "_premiumSubscription", type: "address" }], stateMutability: "nonpayable" },
  { type: "function", name: "entryPoint", outputs: [{ type: "address" }], stateMutability: "view" },
  { type: "function", name: "premiumSubscription", outputs: [{ type: "address" }], stateMutability: "view" },
  { type: "function", name: "validatePaymasterUserOp", inputs: [{ name: "userOp", type: "tuple", components: [{ name: "sender", type: "address" }, { name: "nonce", type: "uint256" }, { name: "initCode", type: "bytes" }, { name: "callData", type: "bytes" }, { name: "accountGasLimits", type: "bytes32" }, { name: "preVerificationGas", type: "uint256" }, { name: "gasFees", type: "bytes32" }, { name: "paymasterAndData", type: "bytes" }, { name: "signature", type: "bytes" }] }, { name: "userOpHash", type: "bytes32" }, { name: "maxCost", type: "uint256" }], outputs: [{ name: "context", type: "bytes" }, { name: "validationData", type: "uint256" }], stateMutability: "nonpayable" },
  { type: "function", name: "postOp", inputs: [{ name: "mode", type: "uint8" }, { name: "context", type: "bytes" }, { name: "actualGasCost", type: "uint256" }, { name: "actualUserOpFeePerGas", type: "uint256" }], stateMutability: "nonpayable" },
  { type: "function", name: "setPremiumSubscription", inputs: [{ name: "_ps", type: "address" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "deposit", inputs: [], outputs: [], stateMutability: "payable" },
  { type: "function", name: "withdraw", inputs: [{ name: "amount", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "getEntryPointDeposit", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "paused", outputs: [{ type: "bool" }], stateMutability: "view" },
  { type: "event", name: "PremiumGasSponsored", inputs: [{ indexed: true, name: "sender", type: "address" }, { indexed: true, name: "nonce", type: "uint256" }, { indexed: false, name: "gasCost", type: "uint256" }] },
]

export const ENTRY_POINT_ABI = [
  { type: "function", name: "getNonce", inputs: [{ name: "sender", type: "address" }, { name: "key", type: "uint192" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "balanceOf", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "depositTo", inputs: [{ name: "account", type: "address" }], outputs: [], stateMutability: "payable" },
  { type: "function", name: "handleOps", inputs: [{ name: "ops", type: "tuple[]", components: [{ name: "sender", type: "address" }, { name: "nonce", type: "uint256" }, { name: "initCode", type: "bytes" }, { name: "callData", type: "bytes" }, { name: "accountGasLimits", type: "bytes32" }, { name: "preVerificationGas", type: "uint256" }, { name: "gasFees", type: "bytes32" }, { name: "paymasterAndData", type: "bytes" }, { name: "signature", type: "bytes" }] }, { name: "beneficiary", type: "address" }], outputs: [], stateMutability: "nonpayable" },
]

export const LEADERBOARD_ABI = [
  { type: "function", name: "modulesCompleted", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "nftsEarned", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "topicsCompleted", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getScore", inputs: [{ name: "_user", type: "address" }], outputs: [{ components: [{ name: "user", type: "address" }, { name: "modules", type: "uint256" }, { name: "nfts", type: "uint256" }, { name: "topics", type: "uint256" }], type: "tuple" }], stateMutability: "view" },
  { type: "function", name: "getAllUsers", inputs: [], outputs: [{ type: "address[]" }], stateMutability: "view" },
  { type: "function", name: "getUserCount", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getTopUsers", inputs: [{ name: "_limit", type: "uint256" }, { name: "_category", type: "uint8" }], outputs: [{ type: "address[]" }, { type: "uint256[]" }], stateMutability: "view" },
  { type: "function", name: "getUserRank", inputs: [{ name: "_user", type: "address" }, { name: "_category", type: "uint8" }], outputs: [{ type: "uint256" }, { type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "updateScore", inputs: [{ name: "_user", type: "address" }, { name: "_topicName", type: "string" }, { name: "_moduleName", type: "string" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "paused", outputs: [{ type: "bool" }], stateMutability: "view" },
  { type: "event", name: "ScoreUpdated", inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: false, name: "topicName", type: "string" }, { indexed: false, name: "moduleName", type: "string" }, { indexed: false, name: "modules", type: "uint256" }, { indexed: false, name: "nfts", type: "uint256" }, { indexed: false, name: "topics", type: "uint256" }] },
]

export const ESCROW_ABI = [
  { type: "constructor", inputs: [{ name: "_premiumSubscription", type: "address" }], stateMutability: "nonpayable" },
  { type: "function", name: "LOCK_DURATION", outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "PREMIUM_PRICE", outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "premiumSubscription", outputs: [{ type: "address" }], stateMutability: "view" },
  { type: "function", name: "depositForPremium", inputs: [], outputs: [], stateMutability: "payable" },
  { type: "function", name: "release", inputs: [{ name: "_user", type: "address" }, { name: "_depositId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "refund", inputs: [{ name: "_depositId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "getUserDeposits", inputs: [{ name: "_user", type: "address" }], outputs: [{ type: "uint256[]" }], stateMutability: "view" },
  { type: "function", name: "getDeposit", inputs: [{ name: "_depositId", type: "uint256" }], outputs: [{ components: [{ name: "user", type: "address" }, { name: "amount", type: "uint256" }, { name: "lockedUntil", type: "uint256" }, { name: "released", type: "bool" }, { name: "refunded", type: "bool" }], type: "tuple" }], stateMutability: "view" },
  { type: "function", name: "getTotalLocked", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getDepositCount", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "owner", outputs: [{ type: "address" }], stateMutability: "view" },
  { type: "function", name: "paused", outputs: [{ type: "bool" }], stateMutability: "view" },
  { type: "event", name: "PremiumDeposited", inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: true, name: "depositId", type: "uint256" }, { indexed: false, name: "amount", type: "uint256" }, { indexed: false, name: "lockedUntil", type: "uint256" }] },
  { type: "event", name: "DepositReleased", inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: true, name: "depositId", type: "uint256" }, { indexed: false, name: "amount", type: "uint256" }] },
  { type: "event", name: "DepositRefunded", inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: true, name: "depositId", type: "uint256" }, { indexed: false, name: "amount", type: "uint256" }] },
]

export const USER_PROGRESS_ABI = [
  { type: "function", name: "modulesCompleted", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "topicsCompleted", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "completeModule", inputs: [{ name: "_topicName", type: "string" }, { name: "_moduleName", type: "string" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "getUserProgress", inputs: [{ name: "_user", type: "address" }], outputs: [{ components: [{ name: "topicName", type: "string" }, { name: "moduleName", type: "string" }, { name: "completedAt", type: "uint256" }], type: "tuple[]" }], stateMutability: "view" },
  { type: "function", name: "getProgressCount", inputs: [{ name: "_user", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getUserCount", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "paused", outputs: [{ type: "bool" }], stateMutability: "view" },
  { type: "event", name: "ModuleCompleted", inputs: [{ indexed: true, name: "user", type: "address" }, { indexed: false, name: "topicName", type: "string" }, { indexed: false, name: "moduleName", type: "string" }, { indexed: false, name: "timestamp", type: "uint256" }, { indexed: false, name: "totalModules", type: "uint256" }, { indexed: false, name: "totalTopics", type: "uint256" }] },
]

export const MON_PRICE_ORACLE_ABI = [
  { type: "function", name: "getLatestPrice", inputs: [], outputs: [{ type: "int256" }], stateMutability: "view" },
  { type: "function", name: "decimals", inputs: [], outputs: [{ type: "uint8" }], stateMutability: "view" },
  { type: "function", name: "updatePrice", inputs: [{ name: "newPrice", type: "int256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "owner", outputs: [{ type: "address" }], stateMutability: "view" },
  { type: "event", name: "PriceUpdated", inputs: [{ indexed: false, name: "newPrice", type: "int256" }, { indexed: false, name: "timestamp", type: "uint256" }] },
]

