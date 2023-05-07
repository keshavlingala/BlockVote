const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const CampaignFactory = artifacts.require("CampaignFactory");

module.exports = async function(deployer) {
  const provider =new HDWalletProvider("6f7a30d59b88c2320abcdcd8938e653e70074971e6b17cd02a10e5ccf0645f7d", "https://eth-sepolia.g.alchemy.com/v2/MYG3p213L_JsLjF7Tzn45XUmQKaGPWX9")
  const web3 = new Web3(provider);

  // Get the accounts from the HDWalletProvider
  const accounts = await web3.eth.getAccounts();

  // Set the account to use for deployment
  const deployAccount = accounts[0];

  // Deploy the CampaignFactory contract
  await deployer.deploy(CampaignFactory, { from: deployAccount });
};
