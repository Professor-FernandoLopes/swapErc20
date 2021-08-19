import web3 from './web3';
import Token from './build/Token.json';

// dados do contrato. Precisa apenas do endereço e do ABI
const instance = new web3.eth.Contract(
  JSON.parse(Token.abi),
  '0xBDe0964457cdC33B6cf77E8767B9cCc963d942fD'
);

export default instance;
