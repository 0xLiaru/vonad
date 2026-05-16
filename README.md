# Vonad — Monad Uzerinde Web3 Ogrenme Platformu

![Monad](https://img.shields.io/badge/Network-Monad%20Testnet-8364e8?logo=ethereum)
![Solidity](https://img.shields.io/badge/Solidity-0.8.26-363636?logo=solidity)
![License](https://img.shields.io/badge/License-MIT-green)

> **Monad Hackathon Submission** — Interactive, on-chain Web3 education platform with drag-and-drop block simulations, NFT achievements, premium subscriptions, and ERC-4337 gas sponsorship.

## Demo

[https://vonad.vercel.app](https://vonad.vercel.app)

## What is Vonad?

Vonad is a learn-to-earn platform that teaches blockchain concepts through interactive block-based simulations. Users drag and drop code blocks to build correct sequences, run visual simulations, and earn on-chain NFT achievements on Monad testnet.

**14 blockchain topics** covering Wallet, Token, DeFi, NFT, Staking, DAO, Bridge, Gas, Smart Contract, Layer2, Oracles, MEV, X402, and Paymaster.

## Features

- **Drag & Drop Simulations** — Arrange blocks in correct order, validate, and simulate blockchain operations
- **NFT Achievements** — Mint ERC-721 NFTs with on-chain SVG metadata when completing modules
- **Premium Subscription** — 0.01 MON/month unlocks all advanced topics and blocks
- **Staking Discount** — Stake achievement NFTs for up to 40% premium discount
- **ERC-4337 Paymaster** — Gas sponsorship for premium users via account abstraction
- **On-chain Leaderboard** — Track top users by modules completed, NFTs earned, and topics mastered
- **Bilingual** — Full Turkish (TR) and English (EN) support
- **Mobile Responsive** — Bottom tab navigation on mobile, panel overlays
- **Demo Mode** — Start without a wallet, connect MetaMask/Rabby/OKX for on-chain features

## Monad Testnet Contracts

| Contract | Address |
|---|---|
| AchievementNFT | `0xe1bf6e2f7f66a2aaf36ea75b185725142e74de31` |
| PremiumSubscription | `0xe5f22bec7f09576f284f6cc059f478ce0885d392` |
| StakingDiscount | `0xd574a0d74203a367cd68833d51516549232aa438` |
| GasSponsorPaymaster | `0x954a6968f002f1b2c39fb1001cb32693adbd4e4c` |
| Leaderboard | `0x91a902097c71e0f07ee728dbbb972cb5312ba1b2` |
| EntryPoint (v0.7) | `0x0000000071727De22E5E9d8BAf0edAc6f37da032` |

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contracts | Solidity 0.8.26, OpenZeppelin v5.6, Hardhat v3 |
| ERC Standards | ERC-721 (NFT), ERC-4337 (Account Abstraction) |
| Frontend | React 19, Vite 8, Tailwind CSS v4 |
| Web3 | Wagmi v3, Viem v2 |
| Drag & Drop | @dnd-kit v6 |
| i18n | i18next, react-i18next |
| Deployment | Vercel, Hardhat |

## Architecture

```
contracts/
  AchievementNFT.sol          ERC-721 with on-chain SVG metadata
  PremiumSubscription.sol     30-day premium access (0.01 MON)
  StakingDiscount.sol         Stake NFTs for discount (10/25/40%)
  GasSponsorPaymaster.sol     ERC-4337 paymaster for premium gas sponsorship
  Leaderboard.sol             On-chain scoring and ranking

src/
  components/                  React components (Header, Panels, Modals)
  context/AppContext.jsx       Global state management
  hooks/usePaymaster.js        ERC-4337 paymaster integration
  utils/erc4337.js             UserOperation packing utilities
  config/wagmi.js              Chain configuration (Monad Testnet)
  data/topics.js               14 topics with blocks, solutions, simulations
  i18n/                        Turkish & English translations
```

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask or Rabby wallet
- Monad Testnet MON tokens ([faucet](https://testnet.monad.xyz))

### Local Development

```bash
# Clone and install
git clone https://github.com/your-username/vonad.git
cd vonad
npm install

# Configure environment
cp .env.example .env
# Edit .env: add your PRIVATE_KEY

# Deploy contracts (optional, for custom deployment)
npx hardhat compile
npx hardhat run scripts/deploy.js --network monadTestnet

# Start dev server
npm run dev
```

### Production Build

```bash
npm run build
# Output: dist/
```

### Vercel Deploy

```bash
npm install -g vercel
vercel --prod
```

Set these environment variables in Vercel dashboard:

```
VITE_ACHIEVEMENT_NFT_ADDRESS=0x96708e32b074e51e4cb94424a92b3976ca31a267
VITE_PREMIUM_SUBSCRIPTION_ADDRESS=0x094dd9d6b7d729f14e218728680f058b9949abe3
VITE_STAKING_DISCOUNT_ADDRESS=0x3a391eb72caab1675fd42ae900136e702d5a5354
VITE_GAS_SPONSOR_PAYMASTER_ADDRESS=0x82045ba5f6da6fbe20fe906ff744f7395758dbba
VITE_ENTRY_POINT_ADDRESS=0x0000000071727De22E5E9d8BAf0edAc6f37da032
VITE_LEADERBOARD_ADDRESS=0x18f20111c30e7dde16576b9a3a5eb8b8d142fc19
VITE_ESCROW_ADDRESS=0x68112c589b700d9da728b0d168a04e75f8a0c997
VITE_USER_PROGRESS_ADDRESS=0xfcaaa8c773ebbbf3e3d9d95c8677db011e029a20
VITE_MON_PRICE_ORACLE_ADDRESS=0x444d3810efd338c9833c53e8b4074f0f164f43a3
VITE_BUNDLER_RPC=
```

## How It Works

1. **Choose a topic** — Pick from 14 Web3/blockchain topics (Wallet, DeFi, NFT, etc.)
2. **Arrange blocks** — Drag blocks from the palette to the canvas in the correct sequence
3. **Validate & Simulate** — Check your sequence and run the visual simulation
4. **Mint NFT** — Complete the module and mint an on-chain achievement NFT
5. **Stake & Earn** — Stake NFTs for premium discounts, climb the leaderboard

## Hackathon

**Submission for Monad Hackathon**

- **Track**: DeFi / Education / Consumer
- **Chain**: Monad Testnet (chainId: 10143)
- **Team**: [Your Team Name]
- **Contact**: [Your Contact]

## License

MIT


