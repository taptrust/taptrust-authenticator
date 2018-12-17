const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider);

const weiToEth = function(wei) {
	return parseFloat(web3.utils.fromWei(wei.toString(), 'ether')).toFixed(4);
}

const ethToWei = function(eth) {
	return web3.utils.toWei(eth.toString(), 'ether');
}

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

const DEFAULT_GAS_PRICE = '0x3B9ACA00';
const DEFAULT_GAS_LIMIT = '0x2710';
let currentGasPrice = DEFAULT_GAS_PRICE;

const getGasInfo = function(){
	return {
		gasPrice: web3.utils.numberToHex(currentGasPrice),
		gasLimit: DEFAULT_GAS_LIMIT
	}
}

const getTxParams = function(params) {
	params['value'] = web3.utils.numberToHex(params['value']);
	// TODO: EIP 155 Chain ID (mainnet 1, ropsten 3, rinkeby 4)
	return Object.assign(getGasInfo(), params);
	
}

const getGasPrice = function(){
	// lookup as price in storage or retrieve it 
	if (currentGasPrice != DEFAULT_GAS_PRICE){
		return;
	}
	web3.eth.getGasPrice().then(function(val){
		 currentGasPrice = val;
	});
}

//getGasPrice();

/* 
// Estimate gas for a function call 

web3.eth.estimateGas({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})

*/

export {
    sign, getWallet, getTxParams, weiToEth, ethToWei
};
