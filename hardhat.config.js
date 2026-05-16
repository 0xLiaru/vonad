import "dotenv/config";

const envKey = (process.env.PRIVATE_KEY || "").trim();
const isHexKey = /^0x[a-fA-F0-9]{64}$/.test(envKey);
const PRIVATE_KEY = isHexKey ? envKey : undefined;
const MONAD_RPC = process.env.MONAD_RPC || "https://testnet-rpc.monad.xyz";

const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

/** @type {import('hardhat/config').HardhatUserConfig} */
const config = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      type: "edr-simulated",
    },
    monadTestnet: {
      type: "http",
      url: MONAD_RPC,
      chainId: 10143,
      ...(accounts.length > 0 && { accounts }),
    },
  },
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
