import { Wallet, Coins, TrendingUp, Image, Lock, Users, Link, Fuel, Code, Layers, Radio, Zap, CreditCard, Shield, CheckCircle, ArrowRightLeft, Percent, Search, Key, Send, Flame, FileText, Clock, Rocket, Phone, Eye, FileCode, Gauge, Sliders, Globe, RefreshCw, AlertTriangle } from 'lucide-react'

export const topicIcons = { Wallet, Token: Coins, DeFi: TrendingUp, NFT: Image, Staking: Lock, DAO: Users, Bridge: Link, Gas: Fuel, SmartContract: Code, Layer2: Layers, Oracles: Radio, MEV: Zap, X402: CreditCard, Paymaster: Shield, Consensus: CheckCircle }

export const blockIcons = { 'wallet-connect': Wallet, 'wallet-sign': FileCode, 'wallet-balance': TrendingUp, 'wallet-transfer': Send, 'wallet-disconnect': Key, 'token-approve': CheckCircle, 'token-allowance': Search, 'token-transfer': Send, 'token-burn': Flame, 'defi-liquidity': Layers, 'defi-swap': ArrowRightLeft, 'defi-yield': Percent, 'defi-oracle': Radio, 'nft-mint': Image, 'nft-transfer': Send, 'nft-metadata': FileText, 'nft-royalty': Coins, 'staking-stake': Lock, 'staking-unstake': Key, 'staking-reward': Coins, 'staking-lock': Clock, 'dao-proposal': FileText, 'dao-vote': CheckCircle, 'dao-quorum': Users, 'dao-execute': Zap, 'bridge-lock': Lock, 'bridge-send': Send, 'bridge-unlock': Key, 'gas-limit': Gauge, 'gas-price': TrendingUp, 'gas-eip1559': Sliders, 'sc-deploy': Rocket, 'sc-call': Phone, 'sc-event': Eye, 'sc-abi': FileCode, 'l2-rollup': Layers, 'l2-verify': CheckCircle, 'l2-withdraw': Key, 'oracle-price': TrendingUp, 'oracle-random': RefreshCw, 'oracle-verify': Shield, 'mev-flashloan': Zap, 'mev-arbitrage': TrendingUp, 'mev-sandwich': AlertTriangle, 'x402-init': Globe, 'x402-catch': Search, 'x402-micropay': Coins, 'x402-verify': Shield, 'paymaster-sponsor': Coins, 'paymaster-whitelist': Users, 'paymaster-sign': FileCode, 'consensus-select': Users, 'consensus-propose': Layers, 'consensus-finality': CheckCircle }

export function getTopicIcon(k) { return topicIcons[k] || Code }
export function getBlockIcon(k) { return blockIcons[k] || Code }

const tc = { border: 'border-slate-500', bg: 'bg-slate-700/20', text: 'text-slate-300', glow: '' }
export const topicColors = { Wallet: tc, Token: tc, DeFi: tc, NFT: tc, Staking: tc, DAO: tc, Bridge: tc, Gas: tc, SmartContract: tc, Layer2: tc, Oracles: tc, MEV: tc, X402: tc, Paymaster: tc, Consensus: tc }

export function getTopicColor(k) { return topicColors[k] || tc }
