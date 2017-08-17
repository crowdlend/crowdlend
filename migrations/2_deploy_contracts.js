var CrowdLend = artifacts.require("./CrowdLend.sol");

module.exports = function(deployer) {
  deployer.deploy(CrowdLend)
};
