This library contains functions that generate an ethereum wallet and handle  transactions with the Balehu coin smart contracts. Function can be imported through the
default react import syntax such as  import {createWallet,GetKey} from "./utils.js"

An overview of each function is given below

1.function createWallet(password,token,BalehuAddress): This function takes a users password , authentication token,and the address of the Balehu smart contract. It created a private/public key and address for a user then stores the private key then deploys the users Merchant cash wallet and finally returns the user address.
inputs:{name:password,type:string;name:token,type:string;name:BalehuAddress,type:string}
Outputs:{name:address,type:string}

2.function GetPrivateKey(password): Takes a user password and returns their private key
inputs:{name:password,type:string}
outputs:{name:privatekey,type:string}

3.function SendCoin(from,to,amount,token,password,BalehuAddress,nonce): Sends Balehu tokens from one account to another.
from is the sending address,to is the receiving address, amount is the number of tokens being sent,token is the api authentication token,password is the users password that was created when they signed up, BalehuAddress is the ethereum address of the Balehu smart contract, nonce is a integer obtained by calling the endpoint /v1/app-auth/ethereum-get-transaction-count
inputs:{name:from,type:string;name:to,type:string;name:amount,type:int;name:token,type:string;name:password,type:string;name:BalehuAddress,type:string;name:nonce,type:int)
outputs:
