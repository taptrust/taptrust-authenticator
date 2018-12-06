const Web3 = require('web3');
const Wallet = require('./auth/eth-wallet');

const web3 = new Web3(Web3.givenProvider);


const sign = function(txParams, privateKey) {
	const hash = web3.utils.soliditySha3(
		{t:'uint256', v: txParams.nonce},
		{t:'uint256', v: txParams.gasPrice},
		{t:'uint256', v: txParams.gasLimit},
		{t:'address', v: txParams.to},
		{t:'uint256', v: txParams.value},
		{t:'bytes', v: txParams.data},
		txParams.action);

	console.log('sha3 hash: ' + hash);
	const account = web3.eth.accounts.privateKeyToAccount(privateKey);
	const signature = account.sign(hash);
	return signature.signature;
}

exports.sign = sign;

const getWallet = function(privateKey){
  let account = web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log('account address: ' + account.address);
  return account;
}

export {
    sign, getWallet
};
