import {
  Wallet, Coins, TrendingUp, Image, Lock, Users, Link, Fuel,
  Code, Layers, Radio, Zap, CreditCard, Shield, CheckCircle,
  ArrowRightLeft, Percent, Pickaxe, Search, Database, Globe,
  BarChart3, Key, Send, Flame, FileCode, Rocket, Phone, Eye,
  FileText, Gauge, Clock, Wrench, Sliders, RefreshCw, AlertTriangle
} from 'lucide-react'

export const topicColors = {
  Wallet: { border: 'border-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'shadow-blue-500/10' },
  Token: { border: 'border-green-500', bg: 'bg-green-500/10', text: 'text-green-400', glow: 'shadow-green-500/10' },
  DeFi: { border: 'border-purple-500', bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'shadow-purple-500/10' },
  NFT: { border: 'border-pink-500', bg: 'bg-pink-500/10', text: 'text-pink-400', glow: 'shadow-pink-500/10' },
  Staking: { border: 'border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
  DAO: { border: 'border-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'shadow-amber-500/10' },
  Bridge: { border: 'border-cyan-500', bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'shadow-cyan-500/10' },
  Gas: { border: 'border-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-400', glow: 'shadow-orange-500/10' },
  SmartContract: { border: 'border-indigo-500', bg: 'bg-indigo-500/10', text: 'text-indigo-400', glow: 'shadow-indigo-500/10' },
  Layer2: { border: 'border-violet-500', bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'shadow-violet-500/10' },
  Oracles: { border: 'border-rose-500', bg: 'bg-rose-500/10', text: 'text-rose-400', glow: 'shadow-rose-500/10' },
  MEV: { border: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-400', glow: 'shadow-red-500/10' },
  X402: { border: 'border-teal-500', bg: 'bg-teal-500/10', text: 'text-teal-400', glow: 'shadow-teal-500/10' },
  Paymaster: { border: 'border-sky-500', bg: 'bg-sky-500/10', text: 'text-sky-400', glow: 'shadow-sky-500/10' },
  Consensus: { border: 'border-slate-500', bg: 'bg-slate-500/10', text: 'text-slate-400', glow: 'shadow-slate-500/10' },
}

export function getTopicColor(topicKey) {
  return topicColors[topicKey] || topicColors.Consensus
}

export const topicIcons = {
  Wallet: Wallet,
  Token: Coins,
  DeFi: TrendingUp,
  NFT: Image,
  Staking: Lock,
  DAO: Users,
  Bridge: Link,
  Gas: Fuel,
  SmartContract: Code,
  Layer2: Layers,
  Oracles: Radio,
  MEV: Zap,
  X402: CreditCard,
  Paymaster: Shield,
  Consensus: CheckCircle,
}

export function getTopicIcon(topicKey) {
  return topicIcons[topicKey] || Code
}

export const blockIcons = {
  // Wallet
  'wallet-connect': Wallet, 'wallet-sign': FileCode, 'wallet-balance': BarChart3, 'wallet-disconnect': Key,
  // Token
  'token-transfer': Send, 'token-approve': CheckCircle, 'token-allowance': Search, 'token-burn': Flame,
  // DeFi
  'defi-liquidity': Layers, 'defi-swap': ArrowRightLeft, 'defi-yield': Percent, 'defi-oracle': Radio,
  // NFT
  'nft-mint': Image, 'nft-transfer': Send, 'nft-metadata': FileText, 'nft-royalty': Coins,
  // Staking
  'staking-stake': Lock, 'staking-unstake': Key,   'staking-reward': Coins, 'staking-lock': Clock,
  // DAO
  'dao-proposal': FileText, 'dao-vote': CheckCircle, 'dao-quorum': Users, 'dao-execute': Zap,
  // Bridge
  'bridge-lock': Lock, 'bridge-send': Send, 'bridge-unlock': Key,
  // Gas
  'gas-limit': Gauge, 'gas-price': TrendingUp, 'gas-eip1559': Sliders,
  // SmartContract
  'sc-deploy': Rocket, 'sc-call': Phone, 'sc-event': Eye, 'sc-abi': FileCode,
  // Layer2
  'l2-rollup': Layers, 'l2-verify': CheckCircle, 'l2-withdraw': Key,
  // Oracles
  'oracle-price': TrendingUp, 'oracle-random': RefreshCw, 'oracle-verify': Shield,
  // MEV
  'mev-flashloan': Zap, 'mev-arbitrage': TrendingUp, 'mev-sandwich': AlertTriangle,
  // X402
  'x402-init': Globe, 'x402-catch': Search, 'x402-micropay': Coins, 'x402-verify': Shield,
  // Paymaster
  'paymaster-sponsor': Coins, 'paymaster-whitelist': Users, 'paymaster-sign': FileCode,
  // Consensus
  'consensus-select': Users, 'consensus-propose': Layers, 'consensus-finality': CheckCircle,
}

export function getBlockIcon(blockId) {
  return blockIcons[blockId] || Code
}
