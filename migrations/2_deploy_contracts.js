//const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  // Deploy Token
 // await deployer.deploy(Token);
 // const token = await Token.deployed()

  // Deploy EthSwap
  // o segundo parâmetro é o construtor
  await deployer.deploy(EthSwap, '0xAEED60704704c7A0492Fd922790B1F6e84ea0B84', '0x88926334839333E7504db0522Fa775ad9a1D27A7');
  const ethSwap = await EthSwap.deployed()
// Transfer all tokens to EthSwap (1 million)
 // os tokens se transferiram
// await token.transfer(ethSwap.address, '500000000000000000000000')
  
};
