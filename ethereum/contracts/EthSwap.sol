pragma solidity ^0.5.0;

import "./ownable.sol";
import "./ISCRDT.sol";
import "./IUSDT.sol";
import "./SafeMath.sol";

contract EthSwap is Ownable {
   using SafeMath for uint;

  string public name = "EthSwap Instant Exchange";
  // instancia o token que será transferido para a exchange
  IUSDT public iusdt;
   // se for interação troca o token pela interface do contrato com o qual se quer interagir
  ISCRDT public iscrdt;
  // especifica a taxa de transferência
 // uint public rate = 10**18;
 // uint public rateUsdt = 10**6;
  // especifica a conta do proprietário
  address payable ownerAccount;
  // usdt fake = 0xAEED60704704c7A0492Fd922790B1F6e84ea0B84
  // scrdt fake = 0x88926334839333E7504db0522Fa775ad9a1D27A7


  event TokensPurchased(
    address account,
    address token,
    uint amount
  );

  event TokensSold(
    address account,
    address token,
    uint amount);

  event DepositScrdt(
  address user,
  uint256 amount);

  event WithdrawScrdt
  ( address user,
  uint256 amount);

 // construtor que recebe o endereço do token
 constructor(address usdtAddress,address scrdtAddress) public {
    iusdt = IUSDT(usdtAddress);
    iscrdt = ISCRDT(scrdtAddress);

    // conta de quem está chamando as funções
    ownerAccount = msg.sender;
  }


   function depositTokenScrdt( uint _amount) public {
  // primeiro tem que chamar a função approve
  // transfere o token do msg.sender para este contrato.
  iscrdt.transferFrom(msg.sender, address(this), _amount);

   emit DepositScrdt(msg.sender,_amount);
    }

   function withdrawTokenScrdt( uint256 _amount) public {

   iscrdt.transfer(msg.sender, _amount);
   emit WithdrawScrdt(msg.sender,_amount);
    }
 // aqui ele deposita usdt e recebe scrdt
  function buyTokens(uint _scrdtAmount) public  {
    // verifica se o msg.sender tem usdt suficiente para comprar.
  uint scrdtAmount = _scrdtAmount * 10**12;
   require(iusdt.balanceOf(msg.sender) >= _scrdtAmount, "Even value required.");
   iusdt.transferFrom(msg.sender, address(this), _scrdtAmount);
  
   iscrdt.transfer(msg.sender, scrdtAmount);
  
  emit TokensPurchased(msg.sender, address(iscrdt), _scrdtAmount);
  }
 

 // aqui ele deposita scrdt e recebe usdt
  function sellTokens(uint _amount) public {
    // tem que ver se o msg.sender tem scrdt
  uint usdtAmount = _amount / 10**12;
  require(iscrdt.balanceOf(msg.sender) >= _amount, "Even value required.");

  iscrdt.transferFrom(msg.sender, address(this), _amount);

   iusdt.transfer(msg.sender,usdtAmount);
  emit TokensSold(msg.sender, address(iscrdt), _amount);
  }
   // function changeRate(uint _rate) public onlyOwner {
   //   rate = _rate;
  //  }


}