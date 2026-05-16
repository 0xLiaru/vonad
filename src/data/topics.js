export const topics = {
  Wallet: {
    name: { tr: 'Wallet', en: 'Wallet' },
    icon: '',
    shortDesc: { tr: 'Kripto cuzdan baglantisi ve islemleri.', en: 'Crypto wallet connection and operations.' },
    longDesc: { tr: 'Cuzdanlar, blockchain ile etkilesime gecmek icin kullanilan araclardir.', en: 'Wallets are tools used to interact with blockchain.' },
    difficulty: 'beginner',
    realWorldExample: { tr: 'MetaMask, 30M+ kullanicili en populer Web3 cuzdanidir.', en: 'MetaMask is the most popular Web3 wallet with 30M+ users.' },
    nextTopic: 'Token',
    modules: { tr: ['Cuzdan Baglama', 'Islem Imzalama', 'Bakiye Sorgulama', 'Ag Yonetimi'], en: ['Wallet Connection', 'Transaction Signing', 'Balance Query', 'Network Management'] },
    blocks: [
      { id: 'wallet-connect', name: { tr: 'Cuzdan Bagla', en: 'Connect Wallet' }, icon: '', locked: false, action: 'connect' },
      { id: 'wallet-sign', name: { tr: 'Imza At', en: 'Sign' }, icon: '', locked: false, action: 'sign' },
      { id: 'wallet-balance', name: { tr: 'Bakiye Oku', en: 'Read Balance' }, icon: '', locked: false, action: 'balance' },
      { id: 'wallet-transfer', name: { tr: 'MON Transfer Et', en: 'Transfer MON' }, icon: '', locked: true, action: 'transfer' },
      { id: 'wallet-disconnect', name: { tr: 'Disconnect Et', en: 'Disconnect' }, icon: '', locked: false, action: 'disconnect' },
    ],
    steps: [
      { id: 'wallet-connect', label: { tr: 'Cuzdan Bagla', en: 'Connect Wallet' }, desc: { tr: 'MetaMask ile Monad Testnete baglan', en: 'Connect to Monad Testnet with MetaMask' } },
      { id: 'wallet-balance', label: { tr: 'Bakiye Oku', en: 'Check Balance' }, desc: { tr: 'Cuzdanindaki MON bakiyesini gor', en: 'View your MON balance' } },
      { id: 'wallet-sign', label: { tr: 'Imza At', en: 'Sign Message' }, desc: { tr: 'BlockLearn dogrulamasi imzala', en: 'Sign BlockLearn verification' } },
      { id: 'wallet-transfer', label: { tr: 'MON Transfer Et', en: 'Transfer MON' }, desc: { tr: '0.001 MON gonder', en: 'Send 0.001 MON' }, premium: true },
      { id: 'wallet-disconnect', label: { tr: 'Disconnect Et', en: 'Disconnect' }, desc: { tr: 'Cuzdan baglantisini kes', en: 'Disconnect wallet' } },
    ],
  },
  Token: {
    name: { tr: 'Token', en: 'Token' },
    icon: '',
    shortDesc: { tr: 'ERC-20 token islemleri ve yonetimi.', en: 'ERC-20 token operations and management.' },
    longDesc: { tr: 'Tokenlar, blockchain uzerinde olusturulan dijital varliklardir.', en: 'Tokens are digital assets created on blockchain.' },
    difficulty: 'beginner',
    realWorldExample: { tr: 'USDC, 1 dolara sabitlenmis en yaygin ERC-20 stablecoindir.', en: 'USDC is the most common ERC-20 stablecoin, pegged to $1.' },
    nextTopic: 'DeFi',
    modules: { tr: ['ERC-20 Standardi', 'Transfer Islemleri', 'Approve/Allowance', 'Token Yakma'], en: ['ERC-20 Standard', 'Transfer Operations', 'Approve/Allowance', 'Token Burning'] },
    blocks: [
      { id: 'token-approve', name: { tr: 'Approve Et', en: 'Approve' }, icon: '', locked: false, action: 'approve' },
      { id: 'token-allowance', name: { tr: 'Allowance Kontrol', en: 'Check Allowance' }, icon: '', locked: false, action: 'allowance' },
      { id: 'token-transfer', name: { tr: 'Transfer Et', en: 'Transfer' }, icon: '', locked: false, action: 'transfer' },
      { id: 'token-burn', name: { tr: 'Burn Et', en: 'Burn' }, icon: '', locked: true, action: 'burn' },
    ],
    steps: [
      { id: 'token-approve', label: { tr: 'Approve Et', en: 'Approve' }, desc: { tr: 'Token harcama izni ver', en: 'Grant token spending approval' } },
      { id: 'token-allowance', label: { tr: 'Allowance Kontrol', en: 'Check Allowance' }, desc: { tr: 'Onaylanan miktari goruntule', en: 'Check approved amount' } },
      { id: 'token-transfer', label: { tr: 'Token Transfer Et', en: 'Transfer Tokens' }, desc: { tr: 'Token gonderimi yap', en: 'Send tokens' } },
      { id: 'token-burn', label: { tr: 'Token Yak', en: 'Burn Tokens' }, desc: { tr: 'Token yok et', en: 'Destroy tokens' }, premium: true },
    ],
  },
  DeFi: {
    name: { tr: 'DeFi', en: 'DeFi' },
    icon: '',
    shortDesc: { tr: 'Merkeziyetsiz finans uygulamalari.', en: 'Decentralized finance applications.' },
    longDesc: { tr: 'DeFi, blockchain uzerinde calisan merkeziyetsiz finans uygulamalaridir.', en: 'DeFi consists of decentralized financial applications running on blockchain.' },
    difficulty: 'advanced',
    realWorldExample: { tr: 'Uniswap, milyarlarca dolarlik islem hacmine sahiptir.', en: 'Uniswap has billions in trading volume.' },
    nextTopic: 'SmartContract',
    modules: { tr: ['Likidite Havuzu', 'AMM Fiyatlandirma', 'Getiri Optimizasyonu', 'Flash Loan'], en: ['Liquidity Pools', 'AMM Pricing', 'Yield Optimization', 'Flash Loans'] },
    blocks: [
      { id: 'defi-liquidity', name: { tr: 'Likidite Havuzu Ekle', en: 'Add Liquidity' }, icon: '', locked: true, action: 'addLiquidity' },
      { id: 'defi-swap', name: { tr: 'Swap Yap', en: 'Swap' }, icon: '', locked: true, action: 'swap' },
      { id: 'defi-yield', name: { tr: 'Yield Hesapla', en: 'Calculate Yield' }, icon: '', locked: true, action: 'yield' },
      { id: 'defi-oracle', name: { tr: 'Price Oracle Cagir', en: 'Call Price Oracle' }, icon: '', locked: true, action: 'oracle' },
    ],
    steps: [
      { id: 'defi-liquidity', label: { tr: 'Likidite Havuzu Ekle', en: 'Add Liquidity' }, desc: { tr: 'Likidite havuzuna ekleme yap', en: 'Add to liquidity pool' }, premium: true },
      { id: 'defi-oracle', label: { tr: 'Price Oracle Cagir', en: 'Call Price Oracle' }, desc: { tr: 'Guncel fiyat verisini al', en: 'Fetch current price data' }, premium: true },
      { id: 'defi-swap', label: { tr: 'Swap Yap', en: 'Swap' }, desc: { tr: 'Token degisimi yap', en: 'Perform token swap' }, premium: true },
      { id: 'defi-yield', label: { tr: 'Yield Hesapla', en: 'Calculate Yield' }, desc: { tr: 'Getiri oranini hesapla', en: 'Calculate yield rate' }, premium: true },
    ],
  },
  NFT: {
    name: { tr: 'NFT', en: 'NFT' },
    icon: '',
    shortDesc: { tr: 'Degistirilemez token olusturma.', en: 'Non-fungible token creation.' },
    longDesc: { tr: 'NFTler, benzersiz dijital varliklari temsil eden tokenlardir.', en: 'NFTs represent unique digital assets.' },
    difficulty: 'intermediate',
    realWorldExample: { tr: 'OpenSea, en buyuk NFT pazaryeridir.', en: 'OpenSea is the largest NFT marketplace.' },
    nextTopic: 'SmartContract',
    modules: { tr: ['ERC-721 Standardi', 'Metadata Depolama', 'Royalty Mekanizmasi', 'NFT Pazaryeri'], en: ['ERC-721 Standard', 'Metadata Storage', 'Royalty Mechanism', 'NFT Marketplace'] },
    blocks: [
      { id: 'nft-mint', name: { tr: 'Mint Et', en: 'Mint' }, icon: '', locked: true, action: 'mint' },
      { id: 'nft-transfer', name: { tr: 'Transfer Et', en: 'Transfer' }, icon: '', locked: true, action: 'transferNft' },
      { id: 'nft-metadata', name: { tr: 'Metadata Oku', en: 'Read Metadata' }, icon: '', locked: true, action: 'metadata' },
      { id: 'nft-royalty', name: { tr: 'Royalty Ayarla', en: 'Set Royalty' }, icon: '', locked: true, action: 'royalty' },
    ],
    steps: [
      { id: 'nft-mint', label: { tr: 'NFT Mint Et', en: 'Mint NFT' }, desc: { tr: 'Yeni NFT olustur', en: 'Create new NFT' }, premium: true },
      { id: 'nft-metadata', label: { tr: 'Metadata Oku', en: 'Read Metadata' }, desc: { tr: 'NFT bilgilerini goruntule', en: 'View NFT info' }, premium: true },
      { id: 'nft-royalty', label: { tr: 'Royalty Ayarla', en: 'Set Royalty' }, desc: { tr: 'Royalty orani belirle', en: 'Set royalty rate' }, premium: true },
      { id: 'nft-transfer', label: { tr: 'NFT Transfer Et', en: 'Transfer NFT' }, desc: { tr: 'NFTyi baskasina gonder', en: 'Send NFT to another' }, premium: true },
    ],
  },
  Gas: {
    name: { tr: 'Gas', en: 'Gas' },
    icon: '',
    shortDesc: { tr: 'Gas ucretleri ve optimizasyon.', en: 'Gas fees and optimization.' },
    longDesc: { tr: 'Gas, Ethereum aginda islem yapmak icin odenen ucrettir.', en: 'Gas is the fee paid for transactions on Ethereum.' },
    difficulty: 'intermediate',
    realWorldExample: { tr: 'EIP-1559 sonrasi base fee otomatik odenir.', en: 'After EIP-1559, base fee is paid automatically.' },
    nextTopic: 'Layer2',
    modules: { tr: ['Gas Hesaplama', 'EIP-1559', 'Gas Limit', 'Islem Onceliklendirme'], en: ['Gas Calculation', 'EIP-1559', 'Gas Limit', 'Transaction Priority'] },
    blocks: [
      { id: 'gas-limit', name: { tr: 'Gas Limit Ayarla', en: 'Set Gas Limit' }, icon: '', locked: true, action: 'gasLimit' },
      { id: 'gas-price', name: { tr: 'Gas Price Oku', en: 'Read Gas Price' }, icon: '', locked: true, action: 'gasPrice' },
      { id: 'gas-eip1559', name: { tr: 'EIP1559 Fee Hesapla', en: 'Calculate EIP1559 Fee' }, icon: '', locked: true, action: 'eip1559' },
    ],
    steps: [
      { id: 'gas-price', label: { tr: 'Gas Price Oku', en: 'Read Gas Price' }, desc: { tr: 'Guncel gas ucretini gor', en: 'Check current gas price' }, premium: true },
      { id: 'gas-limit', label: { tr: 'Gas Limit Ayarla', en: 'Set Gas Limit' }, desc: { tr: 'Gas limiti belirle', en: 'Set gas limit' }, premium: true },
      { id: 'gas-eip1559', label: { tr: 'EIP1559 Fee Hesapla', en: 'Calc EIP1559 Fee' }, desc: { tr: 'Toplam ucreti hesapla', en: 'Calculate total fee' }, premium: true },
    ],
  },
  SmartContract: { name: { tr: 'Smart Contract', en: 'Smart Contract' }, icon: '', shortDesc: { tr: 'Akilli sozlesme deploy.', en: 'Smart contract deployment.' }, longDesc: { tr: 'Akilli sozlesmeler kendi kendine yurutulen programlardir.', en: 'Smart contracts are self-executing programs.' }, difficulty: 'intermediate', realWorldExample: { tr: 'Chainlink en buyuk oracle agidir.', en: 'Chainlink is the largest oracle network.' }, nextTopic: 'Oracles', modules: { tr: ['Solidity Temelleri', 'Deploy Sureci', 'ABI Kullanimi', 'Event Dinleme'], en: ['Solidity Basics', 'Deploy Process', 'ABI Usage', 'Event Listening'] }, blocks: [
      { id: 'sc-deploy', name: { tr: 'Deploy Et', en: 'Deploy' }, icon: '', locked: true, action: 'deploy' },
      { id: 'sc-call', name: { tr: 'Fonksiyon Cagir', en: 'Call Function' }, icon: '', locked: true, action: 'callFunction' },
      { id: 'sc-event', name: { tr: 'Event Dinle', en: 'Listen Event' }, icon: '', locked: true, action: 'listenEvent' },
      { id: 'sc-abi', name: { tr: 'ABI Oku', en: 'Read ABI' }, icon: '', locked: true, action: 'readAbi' },
    ], steps: [
      { id: 'sc-deploy', label: { tr: 'Kontrat Deploy Et', en: 'Deploy Contract' }, desc: { tr: 'Akilli sozlesme yayinla', en: 'Deploy smart contract' }, premium: true },
      { id: 'sc-call', label: { tr: 'Fonksiyon Cagir', en: 'Call Function' }, desc: { tr: 'Kontrat fonksiyonu cagir', en: 'Call contract function' }, premium: true },
      { id: 'sc-abi', label: { tr: 'ABI Oku', en: 'Read ABI' }, desc: { tr: 'Kontrat arayuzunu gor', en: 'View contract interface' }, premium: true },
      { id: 'sc-event', label: { tr: 'Event Dinle', en: 'Listen Event' }, desc: { tr: 'Kontrat olaylarini izle', en: 'Monitor contract events' }, premium: true },
    ] },
  Staking: { name: { tr: 'Staking', en: 'Staking' }, icon: '', shortDesc: { tr: 'Token stake etme ve odul.', en: 'Token staking and rewards.' }, longDesc: { tr: 'Staking, kripto varliklarinizi kilitleyerek odul kazanmanizi saglar.', en: 'Staking allows earning rewards by locking assets.' }, difficulty: 'intermediate', realWorldExample: { tr: 'Ethereum 2.0, 32 ETH stake edenlere yillik ~%4 getiri saglar.', en: 'Ethereum 2.0 provides ~4% annual yield for 32 ETH stakers.' }, nextTopic: 'Consensus', modules: { tr: ['Stake Mekanizmasi', 'Odul Hesaplama', 'Lock Sureleri', 'Slashing'], en: ['Stake Mechanism', 'Reward Calculation', 'Lock Periods', 'Slashing'] }, blocks: [
      { id: 'staking-stake', name: { tr: 'Stake Et', en: 'Stake' }, icon: '', locked: true, action: 'stake' },
      { id: 'staking-unstake', name: { tr: 'Unstake Et', en: 'Unstake' }, icon: '', locked: true, action: 'unstake' },
      { id: 'staking-reward', name: { tr: 'Reward Hesapla', en: 'Calculate Reward' }, icon: '', locked: true, action: 'reward' },
      { id: 'staking-lock', name: { tr: 'Lock Suresi Ayarla', en: 'Set Lock Period' }, icon: '', locked: true, action: 'lockPeriod' },
    ], steps: [
      { id: 'staking-stake', label: { tr: 'NFT Stake Et', en: 'Stake NFT' }, desc: { tr: 'NFT stake ederek indirim kazan', en: 'Stake NFT for discount' }, premium: true },
      { id: 'staking-lock', label: { tr: 'Lock Suresi Ayarla', en: 'Set Lock Period' }, desc: { tr: 'Stake suresini belirle', en: 'Set staking duration' }, premium: true },
      { id: 'staking-reward', label: { tr: 'Odul Hesapla', en: 'Calculate Reward' }, desc: { tr: 'Kazanilan odulu gor', en: 'View earned rewards' }, premium: true },
      { id: 'staking-unstake', label: { tr: 'Unstake Et', en: 'Unstake' }, desc: { tr: 'NFTyi geri al', en: 'Withdraw NFT' }, premium: true },
    ] },
  DAO: { name: { tr: 'DAO', en: 'DAO' }, icon: '', shortDesc: { tr: 'Merkeziyetsiz organizasyon.', en: 'Decentralized organization.' }, longDesc: { tr: 'DAOlar akilli sozlesmelerle yonetilen topluluklardir.', en: 'DAOs are communities governed by smart contracts.' }, difficulty: 'advanced', realWorldExample: { tr: 'MakerDAO, DAI stablecoinini yonetir.', en: 'MakerDAO governs the DAI stablecoin.' }, nextTopic: 'SmartContract', modules: { tr: ['Teklif Olusturma', 'Oylama', 'Quorum', 'Execution'], en: ['Proposal Creation', 'Voting', 'Quorum', 'Execution'] }, blocks: [
      { id: 'dao-proposal', name: { tr: 'Proposal Olustur', en: 'Create Proposal' }, icon: '', locked: true, action: 'proposal' },
      { id: 'dao-vote', name: { tr: 'Oy Ver', en: 'Vote' }, icon: '', locked: true, action: 'vote' },
      { id: 'dao-quorum', name: { tr: 'Quorum Kontrol', en: 'Check Quorum' }, icon: '', locked: true, action: 'quorum' },
      { id: 'dao-execute', name: { tr: 'Execute Et', en: 'Execute' }, icon: '', locked: true, action: 'execute' },
    ], steps: [
      { id: 'dao-proposal', label: { tr: 'Proposal Olustur', en: 'Create Proposal' }, desc: { tr: 'Yeni oneri olustur', en: 'Create new proposal' }, premium: true },
      { id: 'dao-vote', label: { tr: 'Oy Ver', en: 'Vote' }, desc: { tr: 'Oneriye oy kullan', en: 'Vote on proposal' }, premium: true },
      { id: 'dao-quorum', label: { tr: 'Quorum Kontrol', en: 'Check Quorum' }, desc: { tr: 'Yeterli oy var mi', en: 'Check if quorum reached' }, premium: true },
      { id: 'dao-execute', label: { tr: 'Execute Et', en: 'Execute' }, desc: { tr: 'Oneriyi uygula', en: 'Execute proposal' }, premium: true },
    ] },
  Bridge: { name: { tr: 'Bridge', en: 'Bridge' }, icon: '', shortDesc: { tr: 'Zincirler arasi transfer.', en: 'Cross-chain transfer.' }, longDesc: { tr: 'Bridgeler farkli blok zincirleri arasinda varlik transferi saglar.', en: 'Bridges enable asset transfer between blockchains.' }, difficulty: 'advanced', realWorldExample: { tr: 'Polygon Bridge, Ethereum-Polygon arasi en buyuk koprudur.', en: 'Polygon Bridge is the largest Ethereum-Polygon bridge.' }, nextTopic: 'Layer2', modules: { tr: ['Token Kilitleme', 'Mesaj Protokolu', 'Validator Agi', 'Acil Durum'], en: ['Token Locking', 'Message Protocol', 'Validator Network', 'Emergency'] }, blocks: [
      { id: 'bridge-lock', name: { tr: 'Token Kilitle', en: 'Lock Token' }, icon: '', locked: true, action: 'lock' },
      { id: 'bridge-send', name: { tr: 'Karsi Zincire Gonder', en: 'Send to Other Chain' }, icon: '', locked: true, action: 'sendCrossChain' },
      { id: 'bridge-unlock', name: { tr: 'Unlock Et', en: 'Unlock' }, icon: '', locked: true, action: 'unlock' },
    ], steps: [
      { id: 'bridge-lock', label: { tr: 'Token Kilitle', en: 'Lock Token' }, desc: { tr: 'Kaynak zincirde token kilitle', en: 'Lock token on source chain' }, premium: true },
      { id: 'bridge-send', label: { tr: 'Karsi Zincire Gonder', en: 'Send to Other Chain' }, desc: { tr: 'Mesaji hedef zincire ilet', en: 'Send message to destination' }, premium: true },
      { id: 'bridge-unlock', label: { tr: 'Unlock Et', en: 'Unlock' }, desc: { tr: 'Hedef zincirde tokeni ac', en: 'Unlock token on destination' }, premium: true },
    ] },
  Layer2: { name: { tr: 'Layer2', en: 'Layer2' }, icon: '', shortDesc: { tr: 'Olceklendirme cozumleri.', en: 'Scaling solutions.' }, longDesc: { tr: 'Layer2 cozumleri ana zincirin guvenligini kullanarak islem hizini artirir.', en: 'Layer2 solutions increase speed using main chain security.' }, difficulty: 'advanced', realWorldExample: { tr: 'Arbitrum ve Optimism en populer rolluplardir.', en: 'Arbitrum and Optimism are the most popular rollups.' }, nextTopic: 'Bridge', modules: { tr: ['Rollup Mimarisi', 'State Root', 'Withdraw', 'Fraud Proof'], en: ['Rollup Architecture', 'State Root', 'Withdraw', 'Fraud Proof'] }, blocks: [
      { id: 'l2-rollup', name: { tr: 'Rollupa Gonder', en: 'Send to Rollup' }, icon: '', locked: true, action: 'rollupSend' },
      { id: 'l2-verify', name: { tr: 'State Root Dogrula', en: 'Verify State Root' }, icon: '', locked: true, action: 'verifyRoot' },
      { id: 'l2-withdraw', name: { tr: 'Withdraw Et', en: 'Withdraw' }, icon: '', locked: true, action: 'withdraw' },
    ], steps: [
      { id: 'l2-rollup', label: { tr: 'Rollupa Gonder', en: 'Send to Rollup' }, desc: { tr: 'Islemi rollupa yolla', en: 'Send tx to rollup' }, premium: true },
      { id: 'l2-verify', label: { tr: 'State Root Dogrula', en: 'Verify State Root' }, desc: { tr: 'State rootu kontrol et', en: 'Verify state root' }, premium: true },
      { id: 'l2-withdraw', label: { tr: 'Withdraw Et', en: 'Withdraw' }, desc: { tr: 'L1e geri cek', en: 'Withdraw to L1' }, premium: true },
    ] },
  Oracles: { name: { tr: 'Oracles', en: 'Oracles' }, icon: '', shortDesc: { tr: 'Zincir disi veriyi blok zincire tasima.', en: 'Bringing off-chain data to blockchain.' }, longDesc: { tr: 'Oraclelar blockchain disindaki verileri akilli sozlesmelere tasir.', en: 'Oracles bring off-chain data to smart contracts.' }, difficulty: 'intermediate', realWorldExample: { tr: 'Chainlink VRF, kanitlanabilir rastgele sayilar uretir.', en: 'Chainlink VRF generates provable random numbers.' }, nextTopic: 'DeFi', modules: { tr: ['Veri Besleme', 'Randomness', 'Off-chain Dogrulama', 'Oracle Aglari'], en: ['Data Feeds', 'Randomness', 'Off-chain Verification', 'Oracle Networks'] }, blocks: [
      { id: 'oracle-price', name: { tr: 'Fiyat Verisi Cek', en: 'Fetch Price Data' }, icon: '', locked: true, action: 'oracleFetch' },
      { id: 'oracle-random', name: { tr: 'Randomness Iste', en: 'Request Randomness' }, icon: '', locked: true, action: 'randomness' },
      { id: 'oracle-verify', name: { tr: 'Off-chain Veri Dogrula', en: 'Verify Off-chain Data' }, icon: '', locked: true, action: 'oracleVerify' },
    ], steps: [
      { id: 'oracle-price', label: { tr: 'Fiyat Verisi Cek', en: 'Fetch Price Data' }, desc: { tr: 'Guncel fiyati al', en: 'Fetch current price' }, premium: true },
      { id: 'oracle-verify', label: { tr: 'Veri Dogrula', en: 'Verify Data' }, desc: { tr: 'Veri kaynagini dogrula', en: 'Verify data source' }, premium: true },
      { id: 'oracle-random', label: { tr: 'Randomness Iste', en: 'Request Randomness' }, desc: { tr: 'Rastgele sayi uret', en: 'Generate random number' }, premium: true },
    ] },
  MEV: { name: { tr: 'MEV', en: 'MEV' }, icon: '', shortDesc: { tr: 'Maksimum Cikarilabilir Deger.', en: 'Maximal Extractable Value.' }, longDesc: { tr: 'MEV, blok ureticilerinin islem siralamasini degistirerek elde edebilecegi degerdir.', en: 'MEV is value extracted by reordering transactions.' }, difficulty: 'advanced', realWorldExample: { tr: 'Flashbots, MEVi demokratiklestiren bir protokoldur.', en: 'Flashbots democratizes MEV.' }, nextTopic: 'Gas', modules: { tr: ['Flashloan', 'Arbitraj', 'Sandwich Korumasi', 'MEV Boost'], en: ['Flashloan', 'Arbitrage', 'Sandwich Protection', 'MEV Boost'] }, blocks: [
      { id: 'mev-flashloan', name: { tr: 'Flashloan Al', en: 'Get Flashloan' }, icon: '', locked: true, action: 'flashloan' },
      { id: 'mev-arbitrage', name: { tr: 'Arbitraj Yap', en: 'Arbitrage' }, icon: '', locked: true, action: 'arbitrage' },
      { id: 'mev-sandwich', name: { tr: 'Sandwich Korumasi', en: 'Sandwich Protection' }, icon: '', locked: true, action: 'sandwich' },
    ], steps: [
      { id: 'mev-flashloan', label: { tr: 'Flashloan Al', en: 'Get Flashloan' }, desc: { tr: 'Flashloan talebi yap', en: 'Request flashloan' }, premium: true },
      { id: 'mev-arbitrage', label: { tr: 'Arbitraj Yap', en: 'Arbitrage' }, desc: { tr: 'Fiyat farkindan yararlan', en: 'Exploit price difference' }, premium: true },
      { id: 'mev-sandwich', label: { tr: 'Sandwich Korumasi', en: 'Sandwich Protection' }, desc: { tr: 'Koruma ekle', en: 'Add protection' }, premium: true },
    ] },
  X402: { name: { tr: 'X402', en: 'X402' }, icon: '', shortDesc: { tr: 'HTTP 402 tabanli odeme.', en: 'HTTP 402-based payment.' }, longDesc: { tr: 'X402, HTTP 402 ile blockchain tabanli mikro odemeleri mumkun kilar.', en: 'X402 enables blockchain micropayments via HTTP 402.' }, difficulty: 'advanced', realWorldExample: { tr: 'X402 ile API saglayicilari her istek basina odeme alabilir.', en: 'X402 enables per-request API payments.' }, nextTopic: 'Paymaster', modules: { tr: ['HTTP 402 Protokolu', 'Mikro Odeme', 'Yetkilendirme', 'Web3 Entegrasyonu'], en: ['HTTP 402 Protocol', 'Micropayment', 'Authorization', 'Web3 Integration'] }, blocks: [
      { id: 'x402-init', name: { tr: 'HTTP Odeme Baslat', en: 'Init HTTP Payment' }, icon: '', locked: true, action: 'x402Init' },
      { id: 'x402-catch', name: { tr: '402 Response Yakala', en: 'Catch 402 Response' }, icon: '', locked: true, action: 'x402Catch' },
      { id: 'x402-micropay', name: { tr: 'Mikro Odeme Gonder', en: 'Send Micropayment' }, icon: '', locked: true, action: 'x402Pay' },
      { id: 'x402-verify', name: { tr: 'Yetki Dogrula', en: 'Verify Auth' }, icon: '', locked: true, action: 'x402Verify' },
    ], steps: [
      { id: 'x402-init', label: { tr: 'HTTP Odeme Baslat', en: 'Init HTTP Payment' }, desc: { tr: '402 odemesi baslat', en: 'Start 402 payment' }, premium: true },
      { id: 'x402-catch', label: { tr: '402 Response Yakala', en: 'Catch 402 Response' }, desc: { tr: 'Odeme talebini yakala', en: 'Catch payment request' }, premium: true },
      { id: 'x402-micropay', label: { tr: 'Mikro Odeme Gonder', en: 'Send Micropayment' }, desc: { tr: 'Mikro odeme yap', en: 'Send micropayment' }, premium: true },
      { id: 'x402-verify', label: { tr: 'Yetki Dogrula', en: 'Verify Auth' }, desc: { tr: 'Erisim yetkisini kontrol et', en: 'Check access' }, premium: true },
    ] },
  Paymaster: { name: { tr: 'Paymaster', en: 'Paymaster' }, icon: '', shortDesc: { tr: 'Gas sponsorlugu ve islem ucreti yonetimi.', en: 'Gas sponsorship and fee management.' }, longDesc: { tr: 'Paymaster, ERC-4337 kapsaminda kullanicilarin gas ucretlerini sponsorlar.', en: 'Paymaster sponsors user gas fees under ERC-4337.' }, difficulty: 'advanced', realWorldExample: { tr: 'Pimlico, ERC-4337 altyapisi sunan populer bir paymaster servisidir.', en: 'Pimlico is a popular paymaster service for ERC-4337.' }, nextTopic: 'Wallet', modules: { tr: ['ERC-4337 Mimarisi', 'Gas Sponsorlugu', 'Whitelist', 'Islem Dogrulama'], en: ['ERC-4337 Architecture', 'Gas Sponsorship', 'Whitelist', 'Tx Verification'] }, blocks: [
      { id: 'paymaster-sponsor', name: { tr: 'Gas Sponsorla', en: 'Sponsor Gas' }, icon: '', locked: true, action: 'sponsorGas' },
      { id: 'paymaster-whitelist', name: { tr: 'Whitelist Et', en: 'Whitelist User' }, icon: '', locked: true, action: 'whitelist' },
      { id: 'paymaster-sign', name: { tr: 'Islem Imzala', en: 'Sign Transaction' }, icon: '', locked: true, action: 'signUserOp' },
    ], steps: [
      { id: 'paymaster-whitelist', label: { tr: 'Whiteliste Ekle', en: 'Add to Whitelist' }, desc: { tr: 'Kullaniciyi whiteliste ekle', en: 'Add user to whitelist' }, premium: true },
      { id: 'paymaster-sign', label: { tr: 'Islem Imzala', en: 'Sign Transaction' }, desc: { tr: 'UserOp imzala', en: 'Sign UserOp' }, premium: true },
      { id: 'paymaster-sponsor', label: { tr: 'Gas Sponsorla', en: 'Sponsor Gas' }, desc: { tr: 'Gas ucretini karsila', en: 'Cover gas fee' }, premium: true },
    ] },
  Consensus: { name: { tr: 'Consensus', en: 'Consensus' }, icon: '', shortDesc: { tr: 'Blok zincir mutabakat mekanizmalari.', en: 'Blockchain consensus mechanisms.' }, longDesc: { tr: 'Konsensus mekanizmalari dagitik aglarda tum dugumlerin ayni durum uzerinde anlasmasini saglar.', en: 'Consensus mechanisms ensure all nodes agree on the same state.' }, difficulty: 'advanced', realWorldExample: { tr: 'Tendermint, Cosmos ekosisteminde en populer BFT konsensus motorudur.', en: 'Tendermint is the most popular BFT consensus engine in Cosmos.' }, nextTopic: 'Staking', modules: { tr: ['Validator Secimi', 'Blok Onerme', 'Finality', 'Slashing'], en: ['Validator Selection', 'Block Proposal', 'Finality', 'Slashing'] }, blocks: [
      { id: 'consensus-select', name: { tr: 'Validator Sec', en: 'Select Validator' }, icon: '', locked: true, action: 'selectValidator' },
      { id: 'consensus-propose', name: { tr: 'Block Oner', en: 'Propose Block' }, icon: '', locked: true, action: 'proposeBlock' },
      { id: 'consensus-finality', name: { tr: 'Finality Kontrol', en: 'Check Finality' }, icon: '', locked: true, action: 'finality' },
    ], steps: [
      { id: 'consensus-select', label: { tr: 'Validator Sec', en: 'Select Validator' }, desc: { tr: 'Validator secimi yap', en: 'Select a validator' }, premium: true },
      { id: 'consensus-propose', label: { tr: 'Block Oner', en: 'Propose Block' }, desc: { tr: 'Yeni blok oner', en: 'Propose new block' }, premium: true },
      { id: 'consensus-finality', label: { tr: 'Finality Kontrol', en: 'Check Finality' }, desc: { tr: 'Kesinlesmeyi kontrol et', en: 'Check finality' }, premium: true },
    ] },
}

export const allTopicKeys = Object.keys(topics)

export const difficultyLabels = {
  beginner: { tr: 'Baslangic', en: 'Beginner' },
  intermediate: { tr: 'Orta', en: 'Intermediate' },
  advanced: { tr: 'Ileri', en: 'Advanced' },
}

export const difficultyColors = {
  beginner: 'text-green-400 bg-green-400/10',
  intermediate: 'text-yellow-400 bg-yellow-400/10',
  advanced: 'text-red-400 bg-red-400/10',
}
