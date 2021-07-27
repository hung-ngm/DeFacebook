// eslint-disable-next-line no-undef
const DeFacebook = artifacts.require("DeFacebook");

module.exports = function (deployer) {
  deployer.deploy(DeFacebook);
};
