var Betting = artifacts.require("./betting.sol");
module.exports = function(deployer) {
  deployer.deploy(Betting);
};

