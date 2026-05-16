export const topics = {
  DeFi: {
    name: { tr: 'DeFi', en: 'DeFi' },
    icon: '💰',
    shortDesc: {
      tr: 'Merkeziyetsiz finans uygulamaları ve protokolleri.',
      en: 'Decentralized finance applications and protocols.',
    },
    longDesc: {
      tr: 'DeFi, blockchain üzerinde çalışan merkeziyetsiz finans uygulamalarıdır. Likidite havuzları, swap işlemleri ve getiri optimizasyonu gibi kavramları içerir. Geleneksel finans sistemlerine alternatif olarak geliştirilmiştir.',
      en: 'DeFi consists of decentralized financial applications running on blockchain. It includes concepts like liquidity pools, swap operations, and yield optimization. Developed as an alternative to traditional finance systems.',
    },
    difficulty: 'advanced',
    realWorldExample: {
      tr: 'Uniswap, milyarlarca dolarlık işlem hacmine sahip en büyük DeFi protokolüdür.',
      en: 'Uniswap is the largest DeFi protocol with billions of dollars in trading volume.',
    },
    nextTopic: 'SmartContract',
    modules: {
      tr: ['Likidite Havuzu Oluşturma', 'AMM Fiyatlandırma Modeli', 'Getiri Optimizasyonu', 'Flash Loan Mekanizması'],
      en: ['Creating Liquidity Pools', 'AMM Pricing Model', 'Yield Optimization', 'Flash Loan Mechanism'],
    },
    blocks: [
      { id: 'defi-liquidity', name: { tr: 'Likidite Havuzu Ekle', en: 'Add Liquidity Pool' }, icon: '💧', locked: true },
      { id: 'defi-swap', name: { tr: 'Swap Yap', en: 'Swap' }, icon: '🔄', locked: true },
      { id: 'defi-yield', name: { tr: 'Yield Hesapla', en: 'Calculate Yield' }, icon: '📈', locked: true },
      { id: 'defi-oracle', name: { tr: 'Price Oracle Çağır', en: 'Call Price Oracle' }, icon: '📡', locked: true },
    ],
    solution: ['defi-liquidity', 'defi-oracle', 'defi-swap', 'defi-yield'],
    rules: {
      tr: 'Önce likidite havuzuna ekleme yapılmalı, ardından fiyat oracle\'dan alınmalı, sonra swap yapılmalı ve son olarak getiri hesaplanmalı.',
      en: 'First add to liquidity pool, then fetch price from oracle, then perform swap, and finally calculate yield.',
    },
    simulation: {
      tr: [
        'Likidite havuzu oluşturuldu: 100 MON + 100 USDC',
        'Price Oracle çağrıldı: 1 MON = 0.997 USDC',
        'Swap simüle edildi: 10 MON → 9.97 USDC',
        'Yield hesaplandı: APR %12.4',
      ],
      en: [
        'Liquidity pool created: 100 MON + 100 USDC',
        'Price Oracle called: 1 MON = 0.997 USDC',
        'Swap simulated: 10 MON → 9.97 USDC',
        'Yield calculated: APR 12.4%',
      ],
    },
  },
  NFT: {
    name: { tr: 'NFT', en: 'NFT' },
    icon: '🖼️',
    shortDesc: {
      tr: 'Değiştirilemez token (NFT) oluşturma ve yönetimi.',
      en: 'Non-fungible token creation and management.',
    },
    longDesc: {
      tr: 'NFT\'ler, benzersiz dijital varlıkları temsil eden tokenlardır. Sanat eserleri, koleksiyon parçaları ve oyun içi öğeler gibi varlıkları tokenize eder. ERC-721 ve ERC-1155 standartlarını kullanır.',
      en: 'NFTs are tokens representing unique digital assets. They tokenize items like artworks, collectibles, and in-game items using ERC-721 and ERC-1155 standards.',
    },
    difficulty: 'intermediate',
    realWorldExample: {
      tr: 'OpenSea, milyonlarca NFT\'nin alınıp satıldığı en büyük NFT pazaryeridir.',
      en: 'OpenSea is the largest NFT marketplace where millions of NFTs are bought and sold.',
    },
    nextTopic: 'SmartContract',
    modules: {
      tr: ['ERC-721 Standardı', 'Metadata Depolama', 'Royalty Mekanizması', 'NFT Pazaryeri Entegrasyonu'],
      en: ['ERC-721 Standard', 'Metadata Storage', 'Royalty Mechanism', 'NFT Marketplace Integration'],
    },
    blocks: [
      { id: 'nft-mint', name: { tr: 'Mint Et', en: 'Mint' }, icon: '✨', locked: true },
      { id: 'nft-transfer', name: { tr: 'Transfer Et', en: 'Transfer' }, icon: '📤', locked: true },
      { id: 'nft-metadata', name: { tr: 'Metadata Oku', en: 'Read Metadata' }, icon: '📋', locked: true },
      { id: 'nft-royalty', name: { tr: 'Royalty Ayarla', en: 'Set Royalty' }, icon: '💎', locked: true },
    ],
    solution: ['nft-mint', 'nft-metadata', 'nft-royalty', 'nft-transfer'],
    rules: {
      tr: 'NFT mint edilmeli, metadata okunmalı, royalty oranı ayarlanmalı ve sonra transfer edilmeli.',
      en: 'NFT must be minted, metadata read, royalty set, then transferred.',
    },
    simulation: {
      tr: [
        'NFT mint simüle edildi: Token ID #42',
        'Metadata okundu: ipfs://QmXpYzAbCdEfGhIjKlMnOpQrStUvWxYz...A9zF',
        'Royalty ayarlandı: %5',
        'NFT transfer edildi: 0x1234...5678 → 0xabcd...ef01',
      ],
      en: [
        'NFT mint simulated: Token ID #42',
        'Metadata read: ipfs://QmXpYzAbCdEfGhIjKlMnOpQrStUvWxYz...A9zF',
        'Royalty set: 5%',
        'NFT transferred: 0x1234...5678 → 0xabcd...ef01',
      ],
    },
  },
  Staking: {
    name: { tr: 'Staking', en: 'Staking' },
    icon: '🏦',
    shortDesc: {
      tr: 'Token stake etme ve ödül kazanma mekanizmaları.',
      en: 'Token staking and reward earning mechanisms.',
    },
    longDesc: {
      tr: 'Staking, kripto varlıklarınızı bir ağa kilitleyerek ödül kazanmanızı sağlar. Proof of Stake konsensüs mekanizmasının temelini oluşturur. Stake süresi ve miktarına göre ödül hesaplanır.',
      en: 'Staking allows you to earn rewards by locking your crypto assets in a network. It forms the basis of Proof of Stake consensus. Rewards are calculated based on stake duration and amount.',
    },
    difficulty: 'intermediate',
    realWorldExample: {
      tr: 'Ethereum 2.0, 32 ETH stake eden doğrulayıcılara yıllık ~%4 getiri sağlar.',
      en: 'Ethereum 2.0 provides validators staking 32 ETH with ~4% annual yield.',
    },
    nextTopic: 'Consensus',
    modules: {
      tr: ['Stake Mekanizması', 'Ödül Hesaplama', 'Lock Süreleri', 'Slashing Koşulları'],
      en: ['Stake Mechanism', 'Reward Calculation', 'Lock Periods', 'Slashing Conditions'],
    },
    blocks: [
      { id: 'staking-stake', name: { tr: 'Stake Et', en: 'Stake' }, icon: '🔒', locked: true },
      { id: 'staking-unstake', name: { tr: 'Unstake Et', en: 'Unstake' }, icon: '🔓', locked: true },
      { id: 'staking-reward', name: { tr: 'Reward Hesapla', en: 'Calculate Reward' }, icon: '🏆', locked: true },
      { id: 'staking-lock', name: { tr: 'Lock Süresi Ayarla', en: 'Set Lock Period' }, icon: '⏱️', locked: true },
    ],
    solution: ['staking-stake', 'staking-lock', 'staking-reward', 'staking-unstake'],
    rules: {
      tr: 'Önce stake edilmeli, lock süresi belirlenmeli, ödül hesaplanmalı ve sonra unstake yapılmalı.',
      en: 'First stake, set lock period, calculate reward, then unstake.',
    },
    simulation: {
      tr: [
        'Stake edildi: 1.000 MON',
        'Lock süresi ayarlandı: 30 gün',
        'Reward hesaplandı: 25 MON (%7.5 APR)',
        'Unstake edildi: 1.025 MON ana cüzdana aktarıldı',
      ],
      en: [
        'Staked: 1,000 MON',
        'Lock period set: 30 days',
        'Reward calculated: 25 MON (7.5% APR)',
        'Unstaked: 1,025 MON transferred to wallet',
      ],
    },
  },
  DAO: {
    name: { tr: 'DAO', en: 'DAO' },
    icon: '🏛️',
    shortDesc: {
      tr: 'Merkeziyetsiz otonom organizasyon yönetimi.',
      en: 'Decentralized autonomous organization governance.',
    },
    longDesc: {
      tr: 'DAO\'lar, akıllı sözleşmelerle yönetilen topluluk organizasyonlarıdır. Üyeler teklif oluşturabilir, oy kullanabilir ve kararları zincir üstünde uygulayabilir. Şeffaf ve demokratik yönetişim sağlar.',
      en: 'DAOs are community organizations governed by smart contracts. Members can create proposals, vote, and execute decisions on-chain. Provides transparent and democratic governance.',
    },
    difficulty: 'advanced',
    realWorldExample: {
      tr: 'MakerDAO, DAI stablecoin\'ini yöneten en büyük DAO\'lardan biridir.',
      en: 'MakerDAO is one of the largest DAOs governing the DAI stablecoin.',
    },
    nextTopic: 'SmartContract',
    modules: {
      tr: ['Teklif Oluşturma', 'Oylama Mekanizmaları', 'Quorum Hesaplama', 'Execution Süreci'],
      en: ['Proposal Creation', 'Voting Mechanisms', 'Quorum Calculation', 'Execution Process'],
    },
    blocks: [
      { id: 'dao-proposal', name: { tr: 'Proposal Oluştur', en: 'Create Proposal' }, icon: '📝', locked: true },
      { id: 'dao-vote', name: { tr: 'Oy Ver', en: 'Vote' }, icon: '🗳️', locked: true },
      { id: 'dao-quorum', name: { tr: 'Quorum Kontrol Et', en: 'Check Quorum' }, icon: '✅', locked: true },
      { id: 'dao-execute', name: { tr: 'Execute Et', en: 'Execute' }, icon: '⚡', locked: true },
    ],
    solution: ['dao-proposal', 'dao-vote', 'dao-quorum', 'dao-execute'],
    rules: {
      tr: 'Proposal oluşturulmalı, oylama yapılmalı, quorum kontrol edilmeli ve execute edilmeli.',
      en: 'Create proposal, vote, check quorum, then execute.',
    },
    simulation: {
      tr: [
        'Proposal oluşturuldu: #17 - "Hazine Yönetim Stratejisi"',
        'Oy verildi: 150 EVET / 20 HAYIR',
        'Quorum kontrol edildi: %88 (eşik: %66) - Geçti',
        'Proposal execute edildi: TX 0xabcd1234...ef567890',
      ],
      en: [
        'Proposal created: #17 - "Treasury Management Strategy"',
        'Voted: 150 YES / 20 NO',
        'Quorum checked: 88% (threshold: 66%) - Passed',
        'Proposal executed: TX 0xabcd1234...ef567890',
      ],
    },
  },
  Bridge: {
    name: { tr: 'Bridge', en: 'Bridge' },
    icon: '🌉',
    shortDesc: {
      tr: 'Blok zincirleri arası varlık transferi.',
      en: 'Cross-chain asset transfer between blockchains.',
    },
    longDesc: {
      tr: 'Bridge\'ler, farklı blok zincirleri arasında token ve veri transferini sağlar. Token\'ı kaynak zincirde kilitler ve hedef zincirde eşdeğer token oluşturur. Zincirler arası birlikte çalışabilirliğin temelidir.',
      en: 'Bridges enable token and data transfer between different blockchains. They lock tokens on the source chain and mint equivalent tokens on the destination chain. Foundation of cross-chain interoperability.',
    },
    difficulty: 'advanced',
    realWorldExample: {
      tr: 'Polygon Bridge, Ethereum ve Polygon arasında milyarlarca dolarlık varlık transferi yapar.',
      en: 'Polygon Bridge transfers billions of dollars in assets between Ethereum and Polygon.',
    },
    nextTopic: 'Layer2',
    modules: {
      tr: ['Token Kilitleme', 'Mesaj Protokolü', 'Doğrulayıcı Ağı', 'Aciliyet Mekanizması'],
      en: ['Token Locking', 'Message Protocol', 'Validator Network', 'Emergency Mechanism'],
    },
    blocks: [
      { id: 'bridge-lock', name: { tr: 'Token Kilitle', en: 'Lock Token' }, icon: '🔐', locked: true },
      { id: 'bridge-send', name: { tr: 'Karşı Zincire Mesaj Gönder', en: 'Send Message to Other Chain' }, icon: '📨', locked: true },
      { id: 'bridge-unlock', name: { tr: 'Unlock Et', en: 'Unlock' }, icon: '🔑', locked: true },
    ],
    solution: ['bridge-lock', 'bridge-send', 'bridge-unlock'],
    rules: {
      tr: 'Token önce kaynak zincirde kilitlenmeli, karşı zincire mesaj gönderilmeli, ardından unlock yapılmalı.',
      en: 'First lock token on source chain, send message to other chain, then unlock.',
    },
    simulation: {
      tr: [
        'Token kilitlendi: 500 USDC (Ethereum) → Bridge sözleşmesi',
        'Karşı zincire mesaj gönderildi: Polygon #88241 - onay bekleniyor',
        'Unlock edildi: Polygon ağında 500 USDC basıldı ✅',
      ],
      en: [
        'Token locked: 500 USDC (Ethereum) → Bridge contract',
        'Message sent to other chain: Polygon #88241 - awaiting confirmation',
        'Unlocked: 500 USDC minted on Polygon ✅',
      ],
    },
  },
  Token: {
    name: { tr: 'Token', en: 'Token' },
    icon: '🪙',
    shortDesc: {
      tr: 'ERC-20 token işlemleri ve yönetimi.',
      en: 'ERC-20 token operations and management.',
    },
    longDesc: {
      tr: 'Token\'lar, blockchain üzerinde oluşturulan dijital varlıklardır. ERC-20 standardı ile transfer, onay ve bakiye kontrolü gibi temel işlemleri yapabilirsiniz. DeFi ekosisteminin yapı taşıdır.',
      en: 'Tokens are digital assets created on blockchain. With ERC-20 standard, you can perform basic operations like transfer, approval, and balance checks. Building block of DeFi ecosystem.',
    },
    difficulty: 'beginner',
    realWorldExample: {
      tr: 'USDC, her biri 1 dolara sabitlenmiş en yaygın ERC-20 stablecoindir.',
      en: 'USDC is the most common ERC-20 stablecoin, each pegged to $1.',
    },
    nextTopic: 'DeFi',
    modules: {
      tr: ['ERC-20 Standardı', 'Transfer İşlemleri', 'Approve/Allowance', 'Token Yakma'],
      en: ['ERC-20 Standard', 'Transfer Operations', 'Approve/Allowance', 'Token Burning'],
    },
    blocks: [
      { id: 'token-transfer', name: { tr: 'Transfer Et', en: 'Transfer' }, icon: '💸', locked: false },
      { id: 'token-approve', name: { tr: 'Approve Et', en: 'Approve' }, icon: '👍', locked: false },
      { id: 'token-allowance', name: { tr: 'Allowance Kontrol Et', en: 'Check Allowance' }, icon: '🔍', locked: false },
      { id: 'token-burn', name: { tr: 'Burn Et', en: 'Burn' }, icon: '🔥', locked: false },
    ],
    solution: ['token-approve', 'token-allowance', 'token-transfer'],
    rules: {
      tr: 'Önce approve yapılmalı, allowance kontrol edilmeli, sonra transfer gerçekleştirilmeli.',
      en: 'First approve, check allowance, then execute transfer.',
    },
    simulation: {
      tr: [
        'Approve edildi: 100 USDC harcama izni verildi',
        'Allowance kontrol edildi: 100 USDC kullanılabilir',
        'Transfer simüle edildi: 50 USDC → 0xabcd...ef01 başarılı',
      ],
      en: [
        'Approved: 100 USDC spending allowance granted',
        'Allowance checked: 100 USDC available',
        'Transfer simulated: 50 USDC → 0xabcd...ef01 successful',
      ],
    },
  },
  Wallet: {
    name: { tr: 'Wallet', en: 'Wallet' },
    icon: '👛',
    shortDesc: {
      tr: 'Kripto cüzdan bağlantısı ve işlemleri.',
      en: 'Crypto wallet connection and operations.',
    },
    longDesc: {
      tr: 'Cüzdanlar, blockchain ile etkileşime geçmek için kullanılan araçlardır. MetaMask gibi cüzdanlar sayesinde işlem imzalayabilir, bakiye sorgulayabilir ve dApp\'lerle etkileşime geçebilirsiniz.',
      en: 'Wallets are tools used to interact with blockchain. Through wallets like MetaMask, you can sign transactions, query balances, and interact with dApps.',
    },
    difficulty: 'beginner',
    realWorldExample: {
      tr: 'MetaMask, 30 milyondan fazla kullanıcısıyla en popüler Web3 cüzdanıdır.',
      en: 'MetaMask is the most popular Web3 wallet with over 30 million users.',
    },
    nextTopic: 'Token',
    modules: {
      tr: ['Cüzdan Bağlama', 'İşlem İmzalama', 'Bakiye Sorgulama', 'Ağ Yönetimi'],
      en: ['Wallet Connection', 'Transaction Signing', 'Balance Query', 'Network Management'],
    },
    blocks: [
      { id: 'wallet-connect', name: { tr: 'Cüzdan Bağla', en: 'Connect Wallet' }, icon: '🔌', locked: false },
      { id: 'wallet-sign', name: { tr: 'İmza At', en: 'Sign' }, icon: '✍️', locked: false },
      { id: 'wallet-balance', name: { tr: 'Bakiye Oku', en: 'Read Balance' }, icon: '📊', locked: false },
      { id: 'wallet-disconnect', name: { tr: 'Disconnect Et', en: 'Disconnect' }, icon: '🔌', locked: false },
    ],
    solution: ['wallet-connect', 'wallet-balance', 'wallet-sign', 'wallet-disconnect'],
    rules: {
      tr: 'Önce cüzdan bağlanmalı, bakiye okunmalı, imza atılmalı ve disconnect edilmeli.',
      en: 'First connect wallet, read balance, sign, then disconnect.',
    },
    simulation: {
      tr: [
        'Cüzdan bağlandı: 0x1234...5678 (MetaMask)',
        'Bakiye okundu: 2.5 MON',
        'İmza simüle edildi: ECDSA secp256k1',
        'Disconnect edildi: oturum sonlandırıldı',
      ],
      en: [
        'Wallet connected: 0x1234...5678 (MetaMask)',
        'Balance read: 2.5 MON',
        'Signature simulated: ECDSA secp256k1',
        'Disconnected: session terminated',
      ],
    },
  },
  Gas: {
    name: { tr: 'Gas', en: 'Gas' },
    icon: '⛽',
    shortDesc: {
      tr: 'Gas ücretleri ve işlem maliyet optimizasyonu.',
      en: 'Gas fees and transaction cost optimization.',
    },
    longDesc: {
      tr: 'Gas, Ethereum ağında işlem yapmak için ödenen ücrettir. EIP-1559 ile birlikte base fee ve priority fee olarak ikiye ayrılmıştır. Gas limit ve gas price optimizasyonu maliyetleri düşürür.',
      en: 'Gas is the fee paid for transactions on the Ethereum network. With EIP-1559, it splits into base fee and priority fee. Gas limit and gas price optimization reduces costs.',
    },
    difficulty: 'intermediate',
    realWorldExample: {
      tr: 'EIP-1559 sonrası kullanıcılar base fee\'yi otomatik öder, priority fee ile işlem hızını ayarlar.',
      en: 'After EIP-1559, users pay base fee automatically and adjust transaction speed with priority fee.',
    },
    nextTopic: 'Layer2',
    modules: {
      tr: ['Gas Hesaplama', 'EIP-1559 Mekanizması', 'Gas Limit Optimizasyonu', 'İşlem Önceliklendirme'],
      en: ['Gas Calculation', 'EIP-1559 Mechanism', 'Gas Limit Optimization', 'Transaction Prioritization'],
    },
    blocks: [
      { id: 'gas-limit', name: { tr: 'Gas Limit Ayarla', en: 'Set Gas Limit' }, icon: '🎚️', locked: true },
      { id: 'gas-price', name: { tr: 'Gas Price Oku', en: 'Read Gas Price' }, icon: '📖', locked: true },
      { id: 'gas-eip1559', name: { tr: 'EIP1559 Fee Hesapla', en: 'Calculate EIP1559 Fee' }, icon: '🧮', locked: true },
    ],
    solution: ['gas-price', 'gas-limit', 'gas-eip1559'],
    rules: {
      tr: 'Önce güncel gas price okunmalı, gas limit belirlenmeli, sonra EIP1559 fee hesaplanmalı.',
      en: 'First read current gas price, set gas limit, then calculate EIP1559 fee.',
    },
    simulation: {
      tr: [
        'Gas price okundu: 25 gwei (güncel)',
        'Gas limit ayarlandı: 21.000 birim',
        'EIP1559 fee hesaplandı: Base 0.000525 MON + Priority 0.000021 MON = 0.000546 MON',
      ],
      en: [
        'Gas price read: 25 gwei (current)',
        'Gas limit set: 21,000 units',
        'EIP1559 fee calculated: Base 0.000525 MON + Priority 0.000021 MON = 0.000546 MON',
      ],
    },
  },
  SmartContract: {
    name: { tr: 'Smart Contract', en: 'Smart Contract' },
    icon: '📜',
    shortDesc: {
      tr: 'Akıllı sözleşme dağıtımı ve etkileşimi.',
      en: 'Smart contract deployment and interaction.',
    },
    longDesc: {
      tr: 'Akıllı sözleşmeler, blockchain üzerinde çalışan kendi kendine yürütülen programlardır. Deploy edildikten sonra fonksiyonları çağrılabilir ve event\'leri dinlenebilir. DeFi, NFT ve DAO\'ların temelidir.',
      en: 'Smart contracts are self-executing programs running on blockchain. After deployment, functions can be called and events can be listened to. Foundation of DeFi, NFTs, and DAOs.',
    },
    difficulty: 'intermediate',
    realWorldExample: {
      tr: 'Chainlink, DeFi protokollerine gerçek dünya verisi sağlayan en büyük oracle ağıdır.',
      en: 'Chainlink provides real-world data to DeFi protocols as the largest oracle network.',
    },
    nextTopic: 'Oracles',
    modules: {
      tr: ['Solidity Temelleri', 'Deploy Süreci', 'ABI Kullanımı', 'Event Dinleme'],
      en: ['Solidity Basics', 'Deploy Process', 'ABI Usage', 'Event Listening'],
    },
    blocks: [
      { id: 'sc-deploy', name: { tr: 'Deploy Et', en: 'Deploy' }, icon: '🚀', locked: true },
      { id: 'sc-call', name: { tr: 'Fonksiyon Çağır', en: 'Call Function' }, icon: '📞', locked: true },
      { id: 'sc-event', name: { tr: 'Event Dinle', en: 'Listen Event' }, icon: '👂', locked: true },
      { id: 'sc-abi', name: { tr: 'ABI Oku', en: 'Read ABI' }, icon: '📄', locked: true },
    ],
    solution: ['sc-deploy', 'sc-abi', 'sc-call', 'sc-event'],
    rules: {
      tr: 'Önce deploy edilmeli, ABI okunmalı, fonksiyon çağrılmalı ve event dinlenmeli.',
      en: 'First deploy, read ABI, call function, then listen to events.',
    },
    simulation: {
      tr: [
        'Deploy edildi: 0xB7f8...3a2D (SimpleStorage.sol)',
        'ABI okundu: transfer(address,uint256) → bytes4: 0xa9059cbb',
        'Fonksiyon çağrıldı: transfer(0xdef..., 100) → tx onaylandı',
        'Event dinlendi: Transfer(from=0xB7f8, to=0xdef, value=100)',
      ],
      en: [
        'Deployed: 0xB7f8...3a2D (SimpleStorage.sol)',
        'ABI read: transfer(address,uint256) → bytes4: 0xa9059cbb',
        'Function called: transfer(0xdef..., 100) → tx confirmed',
        'Event listened: Transfer(from=0xB7f8, to=0xdef, value=100)',
      ],
    },
  },
  Layer2: {
    name: { tr: 'Layer2', en: 'Layer2' },
    icon: '⚡',
    shortDesc: {
      tr: 'Ölçeklendirme çözümleri ve rollup teknolojileri.',
      en: 'Scaling solutions and rollup technologies.',
    },
    longDesc: {
      tr: 'Layer2 çözümleri, ana zincirin güvenliğini kullanarak işlem hızını artırır ve maliyetleri düşürür. Rollup\'lar işlemleri zincir dışında toplar ve ana zincire tek bir kanıt gönderir.',
      en: 'Layer2 solutions increase transaction speed and reduce costs using main chain security. Rollups batch transactions off-chain and submit a single proof to the main chain.',
    },
    difficulty: 'advanced',
    realWorldExample: {
      tr: 'Arbitrum ve Optimism, Ethereum\'un en popüler Layer2 rollup çözümleridir.',
      en: 'Arbitrum and Optimism are the most popular Layer2 rollup solutions for Ethereum.',
    },
    nextTopic: 'Bridge',
    modules: {
      tr: ['Rollup Mimarisi', 'State Root Doğrulama', 'Withdraw Süreci', 'Fraud Proof'],
      en: ['Rollup Architecture', 'State Root Verification', 'Withdraw Process', 'Fraud Proof'],
    },
    blocks: [
      { id: 'l2-rollup', name: { tr: 'Rollup\'a Gönder', en: 'Send to Rollup' }, icon: '📦', locked: true },
      { id: 'l2-verify', name: { tr: 'State Root Doğrula', en: 'Verify State Root' }, icon: '🔬', locked: true },
      { id: 'l2-withdraw', name: { tr: 'Withdraw Et', en: 'Withdraw' }, icon: '🏧', locked: true },
    ],
    solution: ['l2-rollup', 'l2-verify', 'l2-withdraw'],
    rules: {
      tr: 'İşlem rollup\'a gönderilmeli, state root doğrulanmalı, sonra withdraw yapılmalı.',
      en: 'Send transaction to rollup, verify state root, then withdraw.',
    },
    simulation: {
      tr: [
        'Rollup\'a gönderildi: Batch #4521 (320 işlem)',
        'State root doğrulandı: 0xdead...beef → L1\'de onaylandı',
        'Withdraw edildi: L1\'de 100 MON basıldı (7 gün sonra)',
      ],
      en: [
        'Sent to rollup: Batch #4521 (320 transactions)',
        'State root verified: 0xdead...beef → confirmed on L1',
        'Withdrawn: 100 MON minted on L1 (after 7 days)',
      ],
    },
  },
  Oracles: {
    name: { tr: 'Oracles', en: 'Oracles' },
    icon: '🔮',
    shortDesc: {
      tr: 'Zincir dışı veriyi blok zincire taşıma.',
      en: 'Bringing off-chain data to the blockchain.',
    },
    longDesc: {
      tr: 'Oracle\'lar, blockchain dışındaki verileri akıllı sözleşmelere taşıyan köprülerdir. Fiyat verileri, rastgele sayılar ve hava durumu gibi gerçek dünya verilerini güvenilir şekilde sağlar.',
      en: 'Oracles are bridges that bring off-chain data to smart contracts. They reliably provide real-world data like prices, random numbers, and weather.',
    },
    difficulty: 'intermediate',
    realWorldExample: {
      tr: 'Chainlink Verifiable Random Function (VRF), oyunlar için kanıtlanabilir rastgele sayılar üretir.',
      en: 'Chainlink Verifiable Random Function (VRF) generates provable random numbers for gaming.',
    },
    nextTopic: 'DeFi',
    modules: {
      tr: ['Veri Besleme', 'Randomness Üretimi', 'Off-chain Doğrulama', 'Oracle Ağları'],
      en: ['Data Feeds', 'Randomness Generation', 'Off-chain Verification', 'Oracle Networks'],
    },
    blocks: [
      { id: 'oracle-price', name: { tr: 'Fiyat Verisi Çek', en: 'Fetch Price Data' }, icon: '💹', locked: true },
      { id: 'oracle-random', name: { tr: 'Randomness İste', en: 'Request Randomness' }, icon: '🎲', locked: true },
      { id: 'oracle-verify', name: { tr: 'Off-chain Veri Doğrula', en: 'Verify Off-chain Data' }, icon: '🛡️', locked: true },
    ],
    solution: ['oracle-price', 'oracle-verify'],
    rules: {
      tr: 'Önce fiyat verisi çekilmeli, ardından off-chain veri doğrulanmalı.',
      en: 'First fetch price data, then verify off-chain data.',
    },
    simulation: {
      tr: [
        'Fiyat verisi çekildi: BTC/USD = $67,234.50 (Chainlink)',
        'Off-chain veri doğrulandı: Chainlink node #42 onayı alındı',
      ],
      en: [
        'Price data fetched: BTC/USD = $67,234.50 (Chainlink)',
        'Off-chain data verified: Chainlink node #42 confirmation received',
      ],
    },
  },
  MEV: {
    name: { tr: 'MEV', en: 'MEV' },
    icon: '🤖',
    shortDesc: {
      tr: 'Maksimum Çıkarılabilir Değer stratejileri.',
      en: 'Maximal Extractable Value strategies.',
    },
    longDesc: {
      tr: 'MEV, blok üreticilerinin işlem sıralamasını değiştirerek elde edebileceği maksimum değerdir. Arbitraj, likidasyon ve sandwich atakları gibi stratejileri içerir. Koruması önemlidir.',
      en: 'MEV is the maximum value block producers can extract by reordering transactions. Includes strategies like arbitrage, liquidation, and sandwich attacks. Protection is important.',
    },
    difficulty: 'advanced',
    realWorldExample: {
      tr: 'Flashbots, MEV\'i demokratikleştiren ve sandwich ataklarını azaltan bir protokoldür.',
      en: 'Flashbots is a protocol that democratizes MEV and reduces sandwich attacks.',
    },
    nextTopic: 'Gas',
    modules: {
      tr: ['Flashloan Mekanizması', 'Arbitraj Stratejileri', 'Sandwich Koruması', 'MEV Boost'],
      en: ['Flashloan Mechanism', 'Arbitrage Strategies', 'Sandwich Protection', 'MEV Boost'],
    },
    blocks: [
      { id: 'mev-flashloan', name: { tr: 'Flashloan Al', en: 'Get Flashloan' }, icon: '⚡', locked: true },
      { id: 'mev-arbitrage', name: { tr: 'Arbitraj Yap', en: 'Arbitrage' }, icon: '📊', locked: true },
      { id: 'mev-sandwich', name: { tr: 'Sandwich Koruması Ekle', en: 'Add Sandwich Protection' }, icon: '🛡️', locked: true },
    ],
    solution: ['mev-flashloan', 'mev-arbitrage', 'mev-sandwich'],
    rules: {
      tr: 'Flashloan alınmalı, arbitraj yapılmalı, sonra sandwich koruması eklenmeli.',
      en: 'Get flashloan, perform arbitrage, then add sandwich protection.',
    },
    simulation: {
      tr: [
        'Flashloan alındı: 10.000 USDC (Aave V3)',
        'Arbitraj yapıldı: Uniswap $1.00 → SushiSwap $1.0034 → Kar: 34.50 USDC',
        'Sandwich koruması eklendi: Flashbots RPC üzerinden gönderildi',
      ],
      en: [
        'Flashloan obtained: 10,000 USDC (Aave V3)',
        'Arbitrage executed: Uniswap $1.00 → SushiSwap $1.0034 → Profit: 34.50 USDC',
        'Sandwich protection added: Sent via Flashbots RPC',
      ],
    },
  },
  X402: {
    name: { tr: 'X402', en: 'X402' },
    icon: '💳',
    shortDesc: {
      tr: 'HTTP 402 tabanlı blok zincir ödeme protokolü.',
      en: 'HTTP 402-based blockchain payment protocol.',
    },
    longDesc: {
      tr: 'X402, HTTP 402 Payment Required durum kodunu kullanarak blok zincir tabanlı mikro ödemeleri mümkün kılar. Web API\'lerine erişim için anlık ödeme yapılmasını sağlar.',
      en: 'X402 enables blockchain-based micropayments using HTTP 402 Payment Required status code. Allows instant payment for Web API access.',
    },
    difficulty: 'advanced',
    realWorldExample: {
      tr: 'X402 ile API sağlayıcıları her istek başına mikro ödeme alabilir, abonelik modellerine alternatif sunar.',
      en: 'With X402, API providers can receive micropayments per request, offering an alternative to subscription models.',
    },
    nextTopic: 'Paymaster',
    modules: {
      tr: ['HTTP 402 Protokolü', 'Mikro Ödeme Kanalı', 'Yetkilendirme Mekanizması', 'Web3 Entegrasyonu'],
      en: ['HTTP 402 Protocol', 'Micropayment Channel', 'Authorization Mechanism', 'Web3 Integration'],
    },
    blocks: [
      { id: 'x402-init', name: { tr: 'HTTP Ödeme Başlat', en: 'Init HTTP Payment' }, icon: '🌐', locked: true },
      { id: 'x402-catch', name: { tr: '402 Response Yakala', en: 'Catch 402 Response' }, icon: '🎣', locked: true },
      { id: 'x402-micropay', name: { tr: 'Mikro Ödeme Gönder', en: 'Send Micropayment' }, icon: '💵', locked: true },
      { id: 'x402-verify', name: { tr: 'Yetki Doğrula', en: 'Verify Auth' }, icon: '🔏', locked: true },
    ],
    solution: ['x402-init', 'x402-catch', 'x402-micropay', 'x402-verify'],
    rules: {
      tr: 'HTTP ödeme başlatılmalı, 402 response yakalanmalı, mikro ödeme gönderilmeli ve yetki doğrulanmalı.',
      en: 'Init HTTP payment, catch 402 response, send micropayment, then verify auth.',
    },
    simulation: {
      tr: [
        'HTTP ödeme başlatıldı: GET /api/data → 402 Payment Required',
        '402 response yakalandı: Ödeme adresi 0xpay... ve tutar 0.01 MON',
        'Mikro ödeme gönderildi: 0.01 MON → TX onaylandı',
        'Yetki doğrulandı: API key onaylandı, veri akışı başladı',
      ],
      en: [
        'HTTP payment initiated: GET /api/data → 402 Payment Required',
        '402 response caught: Payment address 0xpay... and amount 0.01 MON',
        'Micropayment sent: 0.01 MON → TX confirmed',
        'Authorization verified: API key confirmed, data stream started',
      ],
    },
  },
  Paymaster: {
    name: { tr: 'Paymaster', en: 'Paymaster' },
    icon: '⛽',
    shortDesc: {
      tr: 'Gas sponsorluğu ve işlem ücreti yönetimi.',
      en: 'Gas sponsorship and transaction fee management.',
    },
    longDesc: {
      tr: 'Paymaster, ERC-4337 hesap soyutlaması kapsamında kullanıcıların gas ücretlerini sponsorlayan bir mekanizmadır. Kullanıcılar token ile ödeme yapabilir veya tamamen ücretsiz işlem yapabilir.',
      en: 'Paymaster is a mechanism within ERC-4337 account abstraction that sponsors users\' gas fees. Users can pay with tokens or make completely free transactions.',
    },
    difficulty: 'advanced',
    realWorldExample: {
      tr: 'Pimlico, ERC-4337 altyapısı sunan ve gas sponsorluğu yapan popüler bir paymaster servisidir.',
      en: 'Pimlico is a popular paymaster service offering ERC-4337 infrastructure and gas sponsorship.',
    },
    nextTopic: 'Wallet',
    modules: {
      tr: ['ERC-4337 Mimarisi', 'Gas Sponsorluğu', 'Whitelist Yönetimi', 'İşlem Doğrulama'],
      en: ['ERC-4337 Architecture', 'Gas Sponsorship', 'Whitelist Management', 'Transaction Verification'],
    },
    blocks: [
      { id: 'paymaster-sponsor', name: { tr: 'Gas Sponsorla', en: 'Sponsor Gas' }, icon: '🎁', locked: true },
      { id: 'paymaster-whitelist', name: { tr: 'Kullanıcı Whitelist Et', en: 'Whitelist User' }, icon: '📋', locked: true },
      { id: 'paymaster-sign', name: { tr: 'İşlem İmzala', en: 'Sign Transaction' }, icon: '✍️', locked: true },
    ],
    solution: ['paymaster-whitelist', 'paymaster-sign', 'paymaster-sponsor'],
    rules: {
      tr: 'Kullanıcı whitelist\'e eklenmeli, işlem imzalanmalı, sonra gas sponsorlanmalı.',
      en: 'User must be whitelisted, transaction signed, then gas sponsored.',
    },
    simulation: {
      tr: [
        'Kullanıcı whitelist edildi: 0xabcd... (Pimlico Paymaster)',
        'İşlem imzalandı: UserOp hash 0x7fe3...a12b',
        'Gas sponsorlandı: 0.002 MON Pimlico tarafından karşılandı',
      ],
      en: [
        'User whitelisted: 0xabcd... (Pimlico Paymaster)',
        'Transaction signed: UserOp hash 0x7fe3...a12b',
        'Gas sponsored: 0.002 MON covered by Pimlico',
      ],
    },
  },
  Consensus: {
    name: { tr: 'Consensus', en: 'Consensus' },
    icon: '🤝',
    shortDesc: {
      tr: 'Blok zincir mutabakat mekanizmaları.',
      en: 'Blockchain consensus mechanisms.',
    },
    longDesc: {
      tr: 'Konsensüs mekanizmaları, dağıtık ağlarda tüm düğümlerin aynı durum üzerinde anlaşmasını sağlar. Proof of Work, Proof of Stake ve diğer modeller ağ güvenliğini ve finality\'yi belirler.',
      en: 'Consensus mechanisms ensure all nodes in a distributed network agree on the same state. PoW, PoS, and other models determine network security and finality.',
    },
    difficulty: 'advanced',
    realWorldExample: {
      tr: 'Tendermint, Cosmos ekosisteminde kullanılan en popüler BFT konsensüs motorudur.',
      en: 'Tendermint is the most popular BFT consensus engine used in the Cosmos ecosystem.',
    },
    nextTopic: 'Staking',
    modules: {
      tr: ['Validator Seçimi', 'Blok Önerme', 'Finality Mekanizması', 'Slashing'],
      en: ['Validator Selection', 'Block Proposal', 'Finality Mechanism', 'Slashing'],
    },
    blocks: [
      { id: 'consensus-select', name: { tr: 'Validator Seç', en: 'Select Validator' }, icon: '🎯', locked: true },
      { id: 'consensus-propose', name: { tr: 'Block Öner', en: 'Propose Block' }, icon: '📦', locked: true },
      { id: 'consensus-finality', name: { tr: 'Finality Kontrol Et', en: 'Check Finality' }, icon: '✅', locked: true },
    ],
    solution: ['consensus-select', 'consensus-propose', 'consensus-finality'],
    rules: {
      tr: 'Validator seçilmeli, block önerilmeli ve finality kontrol edilmeli.',
      en: 'Select validator, propose block, then check finality.',
    },
    simulation: {
      tr: [
        'Validator seçildi: Node #7 (stake: 32 MON)',
        'Block önerildi: #18442 (320 tx, boyut: 1.2 MB)',
        'Finality kontrol edildi: 2/3 imza toplandı → Kesinleşti',
      ],
      en: [
        'Validator selected: Node #7 (stake: 32 MON)',
        'Block proposed: #18442 (320 tx, size: 1.2 MB)',
        'Finality checked: 2/3 signatures collected → Finalized',
      ],
    },
  },
}

export const allTopicKeys = Object.keys(topics)

export const difficultyLabels = {
  beginner: { tr: 'Başlangıç', en: 'Beginner' },
  intermediate: { tr: 'Orta', en: 'Intermediate' },
  advanced: { tr: 'İleri', en: 'Advanced' },
}

export const difficultyColors = {
  beginner: 'text-green-400 bg-green-400/10',
  intermediate: 'text-yellow-400 bg-yellow-400/10',
  advanced: 'text-red-400 bg-red-400/10',
}
