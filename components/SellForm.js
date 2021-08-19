// handle change é responsável por captar e armazenar o state
/* handle submit pega as informações do estado, e pode trabalhá-las, inclusive passando-as
para middlewares ou outras funções.
*/


import React from "react";
import styles from './buy.module.scss'
//import Usdt from '../ethereum/build/Usdt.json'
import EthSwap from '../ethereum/build/EthSwap.json'
import Scrdt from '../ethereum/build/Scrdt.json'
import web3 from '../ethereum/web3'
import ButSell from './ButtonSell.js'
import But2 from './Button2'
import But from './Button'
import addresses from './addresses.js';
//import {Spinner} from '../components/Spinner'
// não precisa usar useEffect se não for chamada assíncrona

//import {useWeb3React} from "@web3-react/core";
 
 
  export default  function BuyForm() {
  
 // let tokenData = Token.networks[3].address
// endereço e Abi usdt
//const addressUsdt = addresses.usdt
//const abiUsdt = Usdt.abi
// endereço e Abi scrdt
const addressScrdt = addresses.scrdt
  const abiScrdt = Scrdt.abi

  // armazenar o smartContract usdt
 // const [usdt, setUsdt] = React.useState(undefined);
  const [scrdt, setScrdt] = React.useState(undefined);
  // armazena informações da conta conectada no metamask
  const [account, setAccount] = React.useState('');
  
  // armazena saldo em usdt
  //const [usdtBalance, setUsdtBalance] = React.useState('');
 // const [scrdtBalance, setScrdtBalance] = React.useState('');
  // armazena saldo em ethereum
  //const [ethBalance, setEthBalance] = React.useState(undefined);
  
  // faz chamada assíncrona para a blockchain de modo a carregar dados
  // loadUsdt
  React.useEffect(() => { 
  
    // busca dados e armazena no state do Usdt e da conta conectada no metamask
    const loadUsdtData = async () => {  
    await ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0])
    const result2 = new web3.eth.Contract(abiScrdt,addressScrdt);
    setScrdt(result2)
    const result3 = await result2.methods.balanceOf(accounts[0]).call();
   // setUsdtBalance(web3.utils.fromWei(result3.toString(), 'Ether'))
   //setUsdtBalance(result3)
     }   
     // carrega a função finalizando 
 loadUsdtData()
},[]);



// loadScrdt
//React.useEffect(() => { 
  
//const loadScrdtData = async () => {  
//const result3 = new web3.eth.Contract(abiScrdt,addressScrdt);
//  setScrdt(result3) 
//  const result4 = await result3.methods.balanceOf(account).call();
   // setUsdtBalance(web3.utils.fromWei(result3.toString(), 'Ether'))
//   setScrdtBalance(result4)
//  }   
//loadScrdtData()
//},[]);


//console.log(scrdt)
//console.log(usdt)
//console.log(usdtBalance)
//console.log(scrdtBalance)
//console.log(account)
// endereço EthSwap
let ethSwapData = EthSwap.networks[3].address

const addressEthSwap = ethSwapData
// ABI EthSwap
const ETHABI = EthSwap.abi 

// cria um estado para salvar o contrato ethSwap com todas as suas funções
const [ethSwap, setEthSwapContract] = React.useState('')

// dá um console.log para ver se deu certo a conexão


/* busca as informações da blockchain relacionadas ao EthSwap usando o web3
Abi e o endereço com useEffet porque é chamada assíncrona.
*/
React.useEffect(() => {  
const loadEthSwapData = async () => {    
// passa o ABI e endereço para a função do web responsável por instanciar o contrato
const result2 = new web3.eth.Contract(ETHABI,addressEthSwap);
 // salva o contrato instanciado no state dentro da variável ethSwap com o setEthSwapContract
setEthSwapContract(result2)
 }   
// chama a função assíncrona para finalizar
loadEthSwapData()
},[]);

//console.log(ethSwap)

// etherAmount vai ser usdt
// nesta função o msg.sender vai enviar usdt e receber scrdt
 const sellTokens = (scrdtAmount) => {
 // this.setState({ loading: true })
  scrdt.methods.approve(addressEthSwap, scrdtAmount).send({ from: account }).on('transactionHash', (hash) => {
  
  // observar se a função abaixo possui argumentos
 // let eswap = ethSwap.methods.sellTokens(scrdtAmount).send({value: scrdtAmount, from: account}).on('transactionHash', (hash) =>{
  let eswap = ethSwap.methods.sellTokens(scrdtAmount).send({ from: account}).on('transactionHash', (hash) =>{
    //   this.setState({ loading: false })
  })
})
}
// handleSubmit passa o valor salvo no state e enviado pelo formulário para a função buyTokens
   const handleSubmit = (e) => {  
   e.preventDefault();  
   
   let r = web3.utils.toWei(scrdtA.toString(), 'ether')
   sellTokens(r)
  }

  // handleChange salva o valor digitado no state.

  const [scrdtA, setScrdtA] = React.useState('');
  
  const handleChange =  (e) => {  
  e.preventDefault();  
  const res2 = e.target.value * 1
  setScrdtA(res2)
 
 }
  // usdt is the user value input



  return (
  
   
    <form   onSubmit={handleSubmit} className={styles.back}>

    <span className={styles.swap}> 
     Swap
     </span>
     
    <div className={styles.inputContainer}> 
    <But2/>  
    <input 
    type="text"
    className="form-control form-control-lg" style={{borderRadius:"20px", height:"100px", 
    backgroundColor:"#1a2c3f", color:"white"}}
    placeholder="0.0"
    required
    onChange= {handleChange}
    />
     
        </div>
      
        
        <div className={styles.inputContainer}> 
        <But/>
        <input  readOnly 
        className="form-control form-control-lg" style={{borderRadius:"20px", height:"100px",backgroundColor:"#1a2c3f", color:"white"}}
          type="text"
          value={scrdtA}
          placeholder="0.0"
          
         />
         
            
          </div>

        <div className="mb-1">
          <span className="float-left text-muted"></span>
          <span className="float-right text-muted"></span>
        </div>

      
        <button type="submit"  className="btn btn-success btn-block btn-lg"
         style={{borderRadius:"50px", height:"50px", marginTop:"30px",width:"470px", marginBottom:"1px"}}
         
         >Enter an amount</button>
    </form>
    
    
  )}