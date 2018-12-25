var SimpleStorage = artifacts.require("./Wallet.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
