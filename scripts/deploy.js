import hre from "hardhat";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { defineChain } from "viem";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
import "dotenv/config";

import { getAddress } from "viem";

const USDC_RAW = "0xf817257fed379853cDe0fa4F97AB987181B1e5Ea";
let USDC_MONAD_TESTNET;
try {
  USDC_MONAD_TESTNET = getAddress(USDC_RAW);
} catch {
  USDC_MONAD_TESTNET = USDC_RAW;
}

const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpcUrls: { default: { http: ["https://testnet-rpc.monad.xyz"] } },
});

async function main() {
  let privateKey = (process.env.PRIVATE_KEY || "").trim();
  if (!privateKey || privateKey === "your_private_key_here") {
    console.error("Hata: .env dosyasina gecerli bir PRIVATE_KEY ekleyin.");
    process.exit(1);
  }
  if (!privateKey.startsWith("0x")) {
    privateKey = "0x" + privateKey;
  }

  const account = privateKeyToAccount(privateKey);
  const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http(),
  });
  const walletClient = createWalletClient({
    account,
    chain: monadTestnet,
    transport: http(),
  });

  const balance = await publicClient.getBalance({ address: account.address });
  console.log("Deploying to Monad Testnet...\n");
  console.log("Deployer:", account.address);
  console.log("Balance:", Number(balance) / 1e18, "MON\n");

  if (balance === 0n) {
    console.error("Hata: Bakiye 0. Once faucet'ten MON al.");
    process.exit(1);
  }

  async function deploy(name, args = []) {
    const artifact = await hre.artifacts.readArtifact(name);
    console.log(`  Deploying ${name}...`);
    const hash = await walletClient.deployContract({
      abi: artifact.abi,
      bytecode: artifact.bytecode,
      args,
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(`  ${name}: ${receipt.contractAddress}`);
    return receipt.contractAddress;
  }

  const ENTRY_POINT =
    process.env.ENTRY_POINT_ADDRESS ||
    "0x0000000071727De22E5E9d8BAf0edAc6f37da032";

  // 1. Oracle (fiyat verisi)
  const oracleAddr = await deploy("MonPriceOracle");

  // 2. Core contracts
  const achievementAddr = await deploy("AchievementNFT");
  const premiumAddr = await deploy("PremiumSubscription", [
    USDC_MONAD_TESTNET,
    oracleAddr,
  ]);
  const stakingAddr = await deploy("StakingDiscount", [achievementAddr]);

  // 3. Escrow (premium odeme akisi)
  const escrowAddr = await deploy("Escrow", [premiumAddr]);

  // 4. Paymaster (ERC-4337 gas sponsorlugu)
  const paymasterAddr = await deploy("GasSponsorPaymaster", [
    ENTRY_POINT,
    premiumAddr,
  ]);

  // 5. Progress & Leaderboard
  const userProgressAddr = await deploy("UserProgress");
  const leaderboardAddr = await deploy("Leaderboard");

  // 6. PremiumSubscription'a escrow adresini set et
  const premiumArtifact = await hre.artifacts.readArtifact("PremiumSubscription");
  console.log("  Setting escrow on PremiumSubscription...");
  const setEscrowHash = await walletClient.writeContract({
    address: premiumAddr,
    abi: premiumArtifact.abi,
    functionName: "setEscrow",
    args: [escrowAddr],
  });
  await publicClient.waitForTransactionReceipt({ hash: setEscrowHash });
  console.log("  Escrow set on PremiumSubscription.");

  // 7. .env dosyasini guncelle
  const envPath = join(__dirname, "..", ".env");
  let envContent = "";
  if (existsSync(envPath)) {
    envContent = readFileSync(envPath, "utf8");
  }

  const updates = {
    VITE_MON_PRICE_ORACLE_ADDRESS: oracleAddr,
    VITE_ACHIEVEMENT_NFT_ADDRESS: achievementAddr,
    VITE_PREMIUM_SUBSCRIPTION_ADDRESS: premiumAddr,
    VITE_STAKING_DISCOUNT_ADDRESS: stakingAddr,
    VITE_ESCROW_ADDRESS: escrowAddr,
    VITE_GAS_SPONSOR_PAYMASTER_ADDRESS: paymasterAddr,
    VITE_USER_PROGRESS_ADDRESS: userProgressAddr,
    VITE_LEADERBOARD_ADDRESS: leaderboardAddr,
    VITE_ENTRY_POINT_ADDRESS: ENTRY_POINT,
  };

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, "m");
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  }

  writeFileSync(envPath, envContent.trim());
  console.log("\nAdresler .env dosyasina yazildi.");
  console.log("\n--- Deploy Tamamlandi ---");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
