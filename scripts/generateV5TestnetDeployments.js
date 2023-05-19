#!/usr/bin/env node
const https = require('https');
const get = require("lodash/get");
const fs = require("fs");
const fsPromises = require("fs").promises;
const chalk = require("chalk");
const packageJson = require("../package.json");
const path = require("path");
const find = require("find");
const glob = require("glob");

function formatAddressUrl(chainId, address) {

  let url;
  if (chainId == 1) {
    url = `https://etherscan.io/address/${address}`;
  } else if (chainId == 5) {
    url = `https://goerli.etherscan.io/address/${address}`;
  } else if (chainId == 11155111) {
    url = `https://sepolia.etherscan.io/address/${address}`;
  } else if (chainId == 56) {
    url = `https://bscscan.com/address/${address}`;
  } else if (chainId == 77) {
    url = `https://blockscout.com/poa/sokol/address/${address}`;
  } else if (chainId == 97) {
    url = `https://testnet.bscscan.com/address/${address}`;
  } else if (chainId == 100) {
    url = `https://blockscout.com/xdai/mainnet/address/${address}`;
  } else if (chainId == 137) {
    url = `https://polygonscan.com/address/${address}`;
  } else if (chainId == 80001) {
    url = `https://mumbai.polygonscan.com/address/${address}`;
  } else if (chainId == 42220) {
    url = `https://explorer.celo.org/address/${address}`;
  } else if (chainId == 44787) {
    url = `https://alfajores-blockscout.celo-testnet.org/address/${address}`;
  } else {
    throw new Error(`Unknown chain id ${chainId}`)
  }
  return url;
}

function formatNetworkName(chainId) {
  let url;
  if (chainId == 1) {
    return "Ethereum"
  } else if (chainId == 5) {
    return "Ethereum Goerli"
  } else if (chainId == 11155111) {
    return "Ethereum Sepolia"
  } else if (chainId == 56) {
    return "Binance Smart Chain"
  } else if (chainId == 77) {
    return "POA Sokol"
  } else if (chainId == 97) {
    return "Binance Smart Chain Testnet"
  } else if (chainId == 100) {
    return "Gnosis Chain"
  } else if (chainId == 137) {
    return "Polygon"
  } else if (chainId == 80001) {
    return "Polygon Mumbai"
  } else if (chainId == 42220) {
    return "Celo"
  } else if (chainId == 44787) {
    return "Celo Alfajores"
  } else {
    throw new Error("unknown chain")
  }
}


const append = (out, str) => {
  fs.writeSync(out, str + "\n");
};

async function generate(name, outputFilePath, inputFilePaths) {
  const outputFile = fs.openSync(outputFilePath, "w");

  append(outputFile, `---`);
  append(outputFile, `title: ${name}`);
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

generate("Testnet", "./docs/deployments/testnet.md", ["./data/ethGoerli-contracts.json", "./data/ethSepolia-contracts.json", "./data/mumbai-contracts.json"]);
