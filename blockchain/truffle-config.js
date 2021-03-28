var WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');
var ropstenPrivateKey = new Buffer("ENTER YOUR METAMASK PRIVATE KEY HERE","hex");
var ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
var ropstenProvider = new WalletProvider(ropstenWallet, "https://ropsten.infura.io/v3/1f7f1bc4daad49c99ba077cdb2ac9b47");
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: ropstenProvider,
      gas: 9000000,
      network_id: 3
    }
  }
};