const { Contract } = require("@ethersproject/contracts");

require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('@nomiclabs/hardhat-ethers');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// task("oracle", "Prints the result from oracle query", async () => {
//   const [owner, addr1, addr2] = await ethers.getSigners();
//   const Token = await ethers.getContractFactory("ExampleContract");
//   const hardhatToken = await Token.deploy();

//   await hardhatToken.connect(addr1).updatePrice();

// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.MAINNET_RPC_URL
      }
    },
    kovan: {
      url: process.env.KOVAN_RPC_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    }
  },
  solidity: "0.6.6",
    gasReporter: {
      currency: 'CHF',
      gasPrice: 21
    },
};