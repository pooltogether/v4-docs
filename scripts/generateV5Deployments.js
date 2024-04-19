#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");

// Chain Ids
// Mainnet
const ETHEREUM_CHAIN_ID = 1;
const ARBITRUM_CHAIN_ID = 42161;
const BSC_CHAIN_ID = 56;
const CELO_CHAIN_ID = 42220;
const GNOSIS_CHAIN_ID = 100;
const OPTIMISM_CHAIN_ID = 10;
const POA_SOKOL_CHAIN_ID = 77;
const POLYGON_CHAIN_ID = 137;

// Testnet
const ARBITRUM_GOERLI_CHAIN_ID = 421613;
const ARBITRUM_SEPOLIA_CHAIN_ID = 421614;
const BSC_TESTNET_CHAIN_ID = 97;
const CELO_ALFAJORES_CHAIN_ID = 44787;
const GOERLI_CHAIN_ID = 5;
const MUMBAI_CHAIN_ID = 80001;
const OPTIMISM_GOERLI_CHAIN_ID = 420;
const OPTIMISM_SEPOLIA_CHAIN_ID = 11155420;
const SEPOLIA_CHAIN_ID = 11155111;

function formatAddressUrl(chainId, address) {
  let url;
  if (chainId == ETHEREUM_CHAIN_ID) {
    url = `https://etherscan.io/address/${address}`;
  } else if (chainId == GOERLI_CHAIN_ID) {
    url = `https://goerli.etherscan.io/address/${address}`;
  } else if (chainId == SEPOLIA_CHAIN_ID) {
    url = `https://sepolia.etherscan.io/address/${address}`;
  } else if (chainId == ARBITRUM_CHAIN_ID) {
    url = `https://arbiscan.io/address/${address}`;
  } else if (chainId == ARBITRUM_GOERLI_CHAIN_ID) {
    url = `https://goerli.arbiscan.io/address/${address}`;
  } else if (chainId == ARBITRUM_SEPOLIA_CHAIN_ID) {
    url = `https://sepolia.arbiscan.io/address/${address}`;
  } else if (chainId == BSC_CHAIN_ID) {
    url = `https://bscscan.com/address/${address}`;
  } else if (chainId == POA_SOKOL_CHAIN_ID) {
    url = `https://blockscout.com/poa/sokol/address/${address}`;
  } else if (chainId == BSC_TESTNET_CHAIN_ID) {
    url = `https://testnet.bscscan.com/address/${address}`;
  } else if (chainId == GNOSIS_CHAIN_ID) {
    url = `https://blockscout.com/xdai/mainnet/address/${address}`;
  } else if (chainId == POLYGON_CHAIN_ID) {
    url = `https://polygonscan.com/address/${address}`;
  } else if (chainId == OPTIMISM_CHAIN_ID) {
    url = `https://optimistic.etherscan.io/address/${address}`;
  } else if (chainId == OPTIMISM_GOERLI_CHAIN_ID) {
    url = `https://goerli-optimism.etherscan.io/address/${address}`;
  } else if (chainId == OPTIMISM_SEPOLIA_CHAIN_ID) {
    url = `https://sepolia-optimism.etherscan.io/address/${address}`;
  } else if (chainId == MUMBAI_CHAIN_ID) {
    url = `https://mumbai.polygonscan.com/address/${address}`;
  } else if (chainId == CELO_CHAIN_ID) {
    url = `https://explorer.celo.org/address/${address}`;
  } else if (chainId == CELO_ALFAJORES_CHAIN_ID) {
    url = `https://alfajores-blockscout.celo-testnet.org/address/${address}`;
  } else {
    throw new Error(`Unknown chain id ${chainId}`);
  }
  return url;
}

function formatNetworkName(chainId) {
  if (chainId == ETHEREUM_CHAIN_ID) {
    return "Ethereum";
  } else if (chainId == GOERLI_CHAIN_ID) {
    return "Ethereum Goerli";
  } else if (chainId == SEPOLIA_CHAIN_ID) {
    return "Ethereum Sepolia";
  } else if (chainId == ARBITRUM_CHAIN_ID) {
    return "Arbitrum";
  } else if (chainId == ARBITRUM_GOERLI_CHAIN_ID) {
    return "Arbitrum Goerli";
  } else if (chainId == ARBITRUM_SEPOLIA_CHAIN_ID) {
    return "Arbitrum Sepolia";
  } else if (chainId == BSC_CHAIN_ID) {
    return "Binance Smart Chain";
  } else if (chainId == POA_SOKOL_CHAIN_ID) {
    return "POA Sokol";
  } else if (chainId == BSC_TESTNET_CHAIN_ID) {
    return "Binance Smart Chain Testnet";
  } else if (chainId == GNOSIS_CHAIN_ID) {
    return "Gnosis Chain";
  } else if (chainId == POLYGON_CHAIN_ID) {
    return "Polygon";
  } else if (chainId == OPTIMISM_CHAIN_ID) {
    return "Optimism";
  } else if (chainId == OPTIMISM_GOERLI_CHAIN_ID) {
    return "Optimism Goerli";
  } else if (chainId == OPTIMISM_SEPOLIA_CHAIN_ID) {
    return "Optimism Sepolia";
  } else if (chainId == MUMBAI_CHAIN_ID) {
    return "Polygon Mumbai";
  } else if (chainId == CELO_CHAIN_ID) {
    return "Celo";
  } else if (chainId == CELO_ALFAJORES_CHAIN_ID) {
    return "Celo Alfajores";
  } else {
    throw new Error("unknown chain");
  }
}

const append = (out, str) => {
  fs.writeSync(out, str + "\n");
};

async function generate(name, sidebar_position, outputFilePath, inputFilePaths) {
  const outputFile = fs.openSync(outputFilePath, "w");

  append(outputFile, `---`);
  append(outputFile, `title: ${name}`);
  append(outputFile, `sidebar_position: ${sidebar_position}`);
  append(outputFile, `---`);
  append(outputFile, ``);
  append(outputFile, `# ${name}`);
  append(outputFile, ``);

  inputFilePaths.map((inputFilePath) => {
    const contracts = JSON.parse(fs.readFileSync(inputFilePath));
    const networks = {};

    contracts.contracts.map(({ chainId, address, type }) => {
      if (!networks[chainId]) {
        networks[chainId] = [];
      }
      networks[chainId].push({ address, type });
    });

    const chainIds = Object.keys(networks);

    for (let i = 0; i < chainIds.length; i++) {
      const chainId = chainIds[i];
      const networkName = formatNetworkName(chainId);
      const contracts = networks[chainId];

      append(outputFile, `## ${networkName}`);
      append(outputFile, "");
      append(outputFile, `| Contract | Address |`);
      append(outputFile, `| :--- | :--- |`);
      append(
        outputFile,
        contracts
          .map(
            ({ type, address }) =>
              `| ${type} | [${address}](${formatAddressUrl(chainId, address)}) |`,
          )
          .join("\n"),
      );
      append(outputFile, "");
    }
  });

  fs.closeSync(outputFile);
  console.log(chalk.green(`Done!`));
}

switch (process.argv[2]) {
  case "optimism":
    generate("Optimism", 0, "./docs/deployments/optimism.md", [
      "./data/optimism-core.json",
    ]);
    break;

  case "optimism-sepolia":
    generate("Optimism Sepolia", 1, "./docs/deployments/optimism-sepolia.md", [
      "./data/optimism-sepolia-core.json",
    ]);
    break;

  default:
    break;
}
