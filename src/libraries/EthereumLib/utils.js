const abi=require('./ethereumjs-abi');
const TX=require('./ethereumjs-tx');

const wallet=require('./ethereumjs-wallet')
// import RNSecureKeyStore from 'react-native-secure-key-store';
// import {AsyncStorage} from 'react-native'


 async function CreateTX(nonce,gasPrice,gasLimit,value,to,data,privateKey,contract){
  var tx = new TX(null, 1);
  tx.nonce = nonce
  tx.gasPrice = gasPrice
  tx.gasLimit = gasLimit
  tx.value = value
  console.log(tx.gasPrice.toString('hex') + 'gasprice')
  if(contract==false){
    tx.to=to
    console.log('notcontract')
  }
   if(contract==true){
    //tx.to= '0x0000000000000000000000000000000000000000'
    //console.log("contract creation")
  }

  tx.data = data
  //tx.chainID=3

  tx.sign(privateKey)
  var ret="0x"+tx.serialize().toString('hex')
  return ret
}
export  async  function createWallet(password,token){

   try{
     //var string= await getRandString(token);
     //alert(string + "this is a string")

     const w=wallet.generate(false,token);
     var priv=w.getPrivateKeyString();
	   priv=priv.slice(2)

     const pub=w.getPublicKeyString();
     const address=w.getAddressString();
    //  await StoreKey(password,priv)


     //await RegisterWallet(token,address,1)
     //var hash=await SeedAddress(token,address,9000000000000000)
     //var hash=await SeedEndpoint(address,token)
     //var hash2=await SendToEndPoint(address,token)
     //
     ///let Balehu='0x9ced01b92e5b79ee654c3f0a8866dcc62773ae99';
     //let amount1=2000*1000000
     //var hash2=await SendCoinTo(address,amount1,token,Balehu);
    //   console.log(hash+ "seeded")
    //  console.log(hash2+ "coinsSent")
    //  console.log(address+ "new address")
     return address;
   }catch (error) {
       alert(error+ "error");
       return 'error'

   }
}
export async function deploychannel(address,BalehuAddress, token,nonce ){
try{
	var formatted_array=[];

	var buffer=abi.rawEncode(["address"],[address])
	var buffer2=abi.rawEncode(["address"],[BalehuAddress])
	formatted_array.push(buffer.toString('hex'))
	formatted_array.push(buffer2.toString('hex'))
	var encoded=formatted_array.join("")
	var result=await DeployMerchantCashWallet(token,encoded)
	return result;
}catch (error) {
    alert(error +" error");
}

}


export async function SendCoin(from,to,amount,token,password,BalehuAddress){
try{
  console.log(password + "password")
console.log(amount+ "Sending amount sendcoin")
var encoded=abi.simpleEncode("transfer(address,uint256):(bool)",to,amount);
encoded="0x"+encoded.toString('hex');
var pk=await GetPrivateKey(password);
console.log(pk + " privatekey sendcoin")
var nonce=await getNonce(from,token);
console.log(nonce + " nonce")
console.log(token +"sending coing token")
var TX1=await CreateTX(nonce,'0x4a817c800' ,100000 ,0,BalehuAddress,encoded,pk,false)
console.log(TX1 + " sendcoin")
var hash=await SendRawTransaction(TX1,token)
var coin=amount/1000000;
console.log(hash+ " sendcoin")
alert(hash +" "+ coin+" coins have been sent to "+to)
return hash;
}catch (error) {
    console.log(error);
  }
}
export async function SendCoinTo(to,amount,token,BalehuAddress){
    try{

        var encoded=abi.simpleEncode("transfer(address,uint256):(bool)",to,amount)
        encoded="0x"+encoded.toString('hex')
        let from='0xC3F78F85565A47b1acC4ea5D7638A100f7687CF5'

        var nonce=await getNonce(from,token)

        let pk="dbb087b79857e1850e936807a72bfec92d366007c5fd190498cb0c6a21f9a77b"
        var TX1=await CreateTX(nonce,'0x4a817c800' ,100000 ,0,BalehuAddress,encoded,pk,false)

        var hash=await SendRawTransaction(TX1,token)
        return hash;
        alert(hash +" 2000 coins have been sent to you")
    }catch (error) {
        alert(error);
    }
}

async function SeedAddress(token,address,amount){
  try{
	var SeedContract='0xe388bd24732a284a71ba1bbaf1cec6ccfcfbcee9';
	var encoded=abi.simpleEncode("SendEther(address,uint256)",address,amount)
	encoded="0x"+encoded.toString('hex')
	var sender='0xC3F78F85565A47b1acC4ea5D7638A100f7687CF5'
	var pk="dbb087b79857e1850e936807a72bfec92d366007c5fd190498cb0c6a21f9a77b"
	var nonce=await getNonce(sender,token)

	var TX1=await CreateTX(nonce,'0x4a817c800' ,100000 ,0,SeedContract,encoded,pk,false)
	var hash=await SendRawTransaction(TX1,token)
	return hash;
    }catch (error) {
     console.log(error);
    }

}


async function getCustomerCouponID(token,customerid,promotionAddress,localaddress){
  try{
var data="0x"+abi.simpleEncode("getUserID(address):(uint)",customerid).toString('hex')
var result=await Call(token,data,address,promotionAddress)
return result;
}catch (error) {
    console.log(error);
  }

}










export async function getBalance(myAddress,token,BalehuAddress){
  try{

var encoded=abi.simpleEncode("balanceOf(address):(uint256)",myAddress)
encoded="0x"+encoded.toString('hex')
console.log(encoded + "get encoded")

var result=await ETHCall(token,encoded,BalehuAddress,myAddress)
console.log(result +'this is a balance');
return result
}catch (error) {
    console.log(error);
  }
}
export  async function localDeposit(from,amount,token,nonce,password,BalehuAddress){
  try{
	var encoded="0x"+abi.simpleEncode("localDeposit(uint)",amount);
	var pk=await GetPrivateKey(password)
	var nonce=getNonce(from,token)
	var TX=CreateTX(nonce,'0x4a817c800' ,100000 ,0,BalehuAddress,encoded,pk,false)
	var result= await SendRawTransaction(TX,token)
	return result;
}catch(error){
    console.log(error)
  }
}
export async function localwithDraw(from,amount,token,nonce,password,BalehuAddress){
  try{
	var encoded="0x"+abi.simpleEncode("localWithDraw(uint)",amount);
	var pk=await GetPrivateKey(password)
	var nonce=await getNonce(from,token)
	var TX=CreateTX(nonce,'0x4a817c800' ,100000 ,0,BalehuAddress,encoded,pk,false)
	var result=await SendRawTransaction(TX,token)
	return result;
   }catch(error){
    console.log(error)
  }


}
export async function CreateTokenCoupon(from,amount,token,value,totalvalue,BalehuAddress,PromotionAddress){
  try{
	var encoded="0x"+abi.simpleEncode("CreateOffChainToken(uint,uint):(bytes32,uint,uint,uint)",quantity,amount);
	var encoded2="0x"+abi.simpleEncode("approve(address, uint256 ):(bool)",PromotionAddress,totalvalue)
	var encoded3="0x"+abi.simpleEncode("RegisterPromotion(uint256,uint256)",value,totalvalue)
	var nonce=await getNonce(from,token)
	var nonce2=nonce+1;
	var pk=await GetPrivateKey(password)
	var TX=CreateTX(nonce,'0x4a817c800' ,100000 ,0,BalehuAddress,encoded2,pk,false)
	var result=await SendRawTransaction(TX,token)
	var TX1=CreateTX(nonce2,'0x4a817c800' ,200000 ,0,PromotionAddresss,encoded3,pk,false)
	var result=await SendRawCoinTransaction(TX1,token)
}catch(error){
 console.log(error)
}
}
export async function MerchantCouponSign(token,password,customeraddress,promotion,Merchant){
    try{
  var value= await getPromotionValue(token,Merchant,promotion)
	var MerchantHash=await getMerchantHash(token,Merchant,promotion)
	var id= await getCustomerCouponID(token,customeraddress)
	var HashToSign= Sha3(MerchantHash,customeraddress,value,id)
	var TXinstance= new TX(null,1)
	var pk=await GetPrivateKey(password)
	var sig=TXinstance.Simplesign(HashtoSign,pk)
	var r="0x"+sig.r.toString('hex')
  var s="0x"+sig.s.toString('hex')
  var v=sig.v
	var out=[]
  //RPromotion(bytes32 h,uint8 v,bytes32 r,bytes32 s,address to,address M,uint id)

  id=("000"+id).slice(-4)
  v=("000"+v).slice(-4)
  out.push(HashToSign)
  out.push(v)
	out.push(r)
	out.push(s)
	out.push(customeraddress)
  out.push(Merchant)
  out.push(id)
	return out;
}catch(error){
 console.log(error)
}
}

async function getPromotionValue(token,address,PromotionAddress,promotion){
  var encoded=abi.rawEncode("getMerchantHashPromotionValue(address ,uint256):(uint256)",address,promotion)
  var result= await Call(token,encoded,address,PromotionAddress)
  return result
}

async function getMerchantHash(token,address,PromotionAddress,promotion){
  var encoded=abi.rawEncode("getMerchantHash(address ,uint):(bytes32)",address,promotion)
  var result= await Call(token,encoded,address,PromotionAddress)
  return result
}


export async function ProcessPromotionQRString(data,token,password,address,PromotionAddress){
try{
var Hash=data.slice(0,66)
var v=data.slice(66,70)
var r=data.slice(70,136)
var s=data.slice(136,202)
var to=data.slice(202,244)
var Merchant=data.slice(244,286)
var id=data.slice(286,290)
var encoded="0x"+abi.simpleEncode("RPromotion(bytes32,uint8,bytes32 ,bytes32 ,address ,address,uint)",Hash,v,r,s,to,Merchant,id);
var pk=await GetPrivateKey(password)
var nonce=await getNonce(address,token)
var TX=CreateTX(nonce,'0x4a817c800' ,200000 ,0,PromotionAddress,encoded,pk,false)
var result= await SendRawTransaction(TX,token);
await LogPromotion(token,promotionid)
return result;
}catch(error){
 console.log(error)
}
}
export async function BuyMerchantCashFor(amount,BusinessAddress,token,BalehuAddress,emailaddress){
 try{
	var walletarray=GetWalletByEmail(token,email)
	var s=walletarray.length
	if(s==1){
	var receipt= await deploychannel(walletarray[0].wallet-address,BalehuAddress, token)
	var object=await GetTransactionReceipt(token,receipt)
	var channelAddress=object.contractAddress
	await RegisterWallet(channelAddress)
	}
	if(s==2){

	var channelAddress=walletarray[1].wallet-address;
	}
	var encoded=abi.simpleEncode("SendOffChain(uint,address,address)",amount,channelAddress,BusinessAddress)
	var pk=await GetPrivateKey(password)
	var nonce=await getNonce(from,token)
	var TX=CreateTX(nonce,'0x4a817c800' ,200000 ,0,BalehuAddress,encoded,pk,false)
	var result= await SendRawTransaction(TX,token);
	return result;
 }catch(error){
 console.log(error)
}
}
export async function BuyMerchantCash(amount,BusinessAddress,token,BalehuAddress){
  try{
	var walletarray=await getMyWallet(token)
	var s=walletarray.length

	if(s==1){
	var receipt= await deploychannel(walletarray[0].wallet-address,BalehuAddress, token)
	var object=await GetTransactionReceipt(token,receipt)
	var channelAddress=object.contractAddress
	await RegisterWallet(channelAddress)
	}
	if(s==2){

	var channelAddress=walletarray[1].wallet-address;
	}
	var encoded=abi.simpleEncode("SendOffChain(uint,address,address)",amount,channelAddress,BusinessAddress)
	var pk=await GetPrivateKey(password)
	var nonce=await getNonce(from,token)
	var TX=CreateTX(nonce,'0x4a817c800' ,200000 ,0,BalehuAddress,encoded,pk,false)
	var result= await SendRawTransaction(TX,token);
	return result;
 }catch(error){
 console.log(error)
}
}
export async function BuyGiftCardFor(token,amount,MerchantID,RecipientAddress,MerchantCashAddress,address,password){
  try{
  var MerchantAddress=await GetBusinessWalletByID(token,MerchantID)
	var encoded2="0x"+abi.simpleEncode("approve(address, uint256 ):(bool)",MerchantCashAddress,amount)
  var encoded= "0x"+abi.simpleEncode("Deposit(uint256, address,address)",amount,RecipientAddress,MerchantAddress[0]['wallet-address'])
  var nonce=await getNonce(address,token)
  nonce2=nonce+1;
  var pk=await GetPrivateKey(password)
  var TX=CreateTX(nonce,'0x4a817c800' ,200000 ,0,BalehuAddress,encoded,pk,false)
	var result= await SendRawTransaction(TX,token);
  var success=VerifyTransaction(token,result);
  if(success==true){
  var TX2=CreateTX(nonce2,'0x4a817c800' ,200000 ,0,MerchantCashAddress,encoded2,pk,false)
  var result2= await SendRawTransaction(TX2,token);
  success=VerifyTransaction(token,result2);
   }
   return success;
   }
    catch(error){
      console.log(error)
    }

}
export async function UserRedeemGiftCard(token,MerchantCashAddress,MerchantID,amount,address,password){
  try{
      var MerchantAddress=await GetBusinessWalletByID(token,MerchantID)
   var encoded= "0x"+abi.simpleEncode("Spend(uint256,address)",amount,MerchantAddress[0]['wallet-address'])
   var nonce=await getNonce(address,token)
   var pk=await GetPrivateKey(password)
   var TX=CreateTX(nonce,'0x4a817c800' ,200000 ,0,MerchantCashAddress,encoded,pk,false)
  var result= await SendRawTransaction(TX,token);
  var success=VerifyTransaction(token,result);
  return success
  }catch(error){
    console.log(error)
  }
}
export async function GetGiftCardBalance(token,MerchantCashAddress,Merchant,User,address){
  try{
    var encoded= "0x"+abi.simpleEncode("getUserBalance(address,address):(uint256)",amount,MerchantAddress)
    var result=await Call(token,encoded,MerchantCashAddress,address)
    return result;
  }catch(error){
    console.log(error)
  }

}
export async function UserRedeemMerchantCash(address,amount,Merchant,token,BusinessID){
  try{

	var lastUse=await getLastCashValue(token,BusinessID)
	var lastUse=lastUse[1]
	var sigID=lastUse[2]
	amount=amount+lastUse;
	await MarkAsProcessed(token,sigID)
	var encoded=abi.simpleEncode("getbalancehash(address):(bytes32)",Merchant);
	var encoded2=abi.simpleEncode("getTransaction(address):(uint256)",Merchant);
	var MerchantNumber=await Call(token,encoded2,walletAddress,from)
	var MerchantHash=await Call(token,encoded,walletAddress,from)
	var HashToSign= await SoliditySha3(token,Merchant,MerchantHash,amount)
    var TXinstance= new TX(null,1)
	var pk=await GetPrivateKey(password)
	var signature=TXinstance.Simplesign(HashtoSign,pk)
	var r="0x"+signature.r.toString('hex');
	var s="0x"+signature.s.toString('hex');
	var v=signature.v;
	await UpLoadSig(token,r,s,v,value,MerchantNumber,BusinessID)
}catch(error){
 console.log(error)
}
}



export async function CloseChannel(from,token,v,r,s,amount,Merchant,channelAddress,password,MerchantNumber,signatureID){
  try{
	var encoded=abi.simpleEncode("getbalancehash(address):(bytes32)",Merchant);

	var MerchantHash=await Call(token,encoded,walletAddress,from)
	var HashToSign=await SoliditySha31(token,Merchant,MerchantHash,amount)

	var encoded3=abi.simpleEncode("CloseChannel(bytes32,uint8,bytes32,bytes32,uint256,uint256)",HashToSign,v,r,s,amount,MerchantNumber);
	var pk=await GetPrivateKey(password)
	var nonce=await getNonce(from,token)
	var nonce2=nonce+1
	var TXX= new TX(null,1)
	var signature=TX.Simplesign(MerchantHash,pk)
	var r1=signature.r;
	var s1=signature.s;
	var v1=signature.v;
	var encoded4=abi.simpleEncode("CloseChannel(bytes32,uint8,bytes32,bytes32,uint256,uint256)",HashToSign,v1,r1,s1,amount,MerchantNumber);
	var TX1=CreateTX(nonce,'0x4a817c800' ,100000 ,0,channelAddress,encoded3,pk,false)
	var TX2=CreateTX(nonce2,'0x4a817c800' ,100000 ,0,channelAddress,encoded4,pk,false)
	await SendRawTransaction(TX1,token)
	await SendRawTransaction(TX2,token)
  await UpdateAsProcessed(token,signatureID)
  }catch(error){
  console.log(error)
 }
}
export async function ReedemAllMerchantCash(token,businessID,MerchantAddress,password){
  try {
       let response= await fetch('https://api.balehu.com/v1/user-auth/merchant-cash-business-list', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
      'Authorization':"Bearer "+ token
    },
           body: JSON.stringify({
               'business-id':businessID,
               'processed':false

           }),
       });
      let CashList= await response.json();
      for(var i=0;i<CashList.length;i++){
          var current=CashList[i]
          var amount=current.micro-coin-value
          var v=current.sig-int;

          var r=current.sig-one;
          var s=current.sig-two;
          var signatureID=current.signature-id;
          var wallets=await GetWalletByID(token,current);
          var channelAddress=wallets[1].wallet-address;
          var MerchantNumber= await getMerchantNumber(token,address,channelAddress)
          await CloseChannel(from,token,v,r,s,amount,MerchantAddress,channelAddress,password,MerchantNumber,signatureID)

   }



 }catch (error) {
   alert(error);
  }
 }


 /*function StoreData(password,item){
    SInfo.setItem(password, item, {
        sharedPreferencesName: 'mySharedPrefs',
        kIeychainService: 'myKeychain'
    }).then((value) =>
        //alert(value + "storedKey") //value 1
    );


}
*/
// function StoreKey(password,item){
//     RNSecureKeyStore.set(password, item)
//         .then((res) => {
//             console.log(res);
//             return res
//         }, (err) => {
//             console.log(err);
//         });
// }

// export function GetPrivateKey(password){

//     return RNSecureKeyStore.get(password)
//         .then((res) => {
//             console.log('stored: ', res);
//             return res
//         }, (err) => {
//             console.log('error', err);
//         });
// }



/* export function GetData(password){
    SInfo.getItem(password, {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain'}).then(value => {
        //alert(value + "retrieved")
        return value.slice(2,42);
    });

}
*/
async function VerifyTransaction(token,tx){ //returns false if transaction did not occur
var r=await GetTransactionReceipt(token,tx)
var out=true;
if (r.BlockHash === "") {
    out=false
}
return out
}



async function RegisterWallet(token,address,id){
	 try {
        let response= await fetch('https://api.balehu.com/v1/user-auth/ethereum-add-wallet', {
  		method: 'POST',
  		headers: {
    		Accept: 'application/json',
    		'Content-Type': 'application/json',
			 'Authorization':"Bearer "+ token
 		 },
  		body: JSON.stringify({
			"type-id": id,
    	    "wallet":address

 		 }),
		});
 		let responseJson = await response.json();
	  var text=responseJson.success
		return text;


  }catch (error) {
    alert(error);
  }
}

async function LogPromotion(token,promotionid) {
  try{
   let response= await fetch('https://api.balehu.com/v1/user-auth/user-promotion-redemption-lo',{
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
      'Authorization':"Bearer "+ token
    },
     body: JSON.stringify({
       "promotion-id": promotionid


    }),
   });


  }catch(error){
    console.log(error)
  }



}
async function SendRawTransaction(data,token){

	 try {
        let response= await fetch('https://api.balehu.com/v1/app-auth/ethereum-send-raw-transaction', {
  		method: 'POST',
  		headers: {
    		Accept: 'application/json',
    		'Content-Type': 'application/json',
			 'Authorization':"Bearer "+ token
 		 },
  		body: JSON.stringify({
    		"data":data
 		 }),
		});
 		let responseJson = await response.json()
	    var transactionid=responseJson.result;
		return transactionid;


  }catch (error) {
    alert(error);
  }
}
async function  SendRawCoinTransaction(data,token){

	 try {
        let response= await fetch('https://api.balehu.com/v1/app-auth/ethereum-send-raw-coin-transaction', {
  		method: 'POST',
  		headers: {
    		Accept: 'application/json',
    		'Content-Type': 'application/json',
			 'Authorization':"Bearer "+ token
 		 },
  		body: JSON.stringify({
    		"data":data
 		 }),
		});
 		let responseJson = await response.json();
	    var transactionid=responseJson.result;
		return transactionid;


  }catch (error) {
    alert(error);
  }
}



async function ETHCall(token,data,to,sender){
	 try {
        let response= await fetch('https://api.balehu.com/v1/app-auth/ethereum-call', {
  		method: 'POST',
  		headers: {
    		Accept: 'application/json',
    		'Content-Type': 'application/json',
			 'Authorization':"Bearer "+ token
 		 },
  		body: JSON.stringify({
    		        "to":to,
                "data":data,
               	"from":sender
 		 }),
		});
 		let responseJson = await response.json();
	  var text=responseJson.text
    console.log(text);
    let ret=parseInt(text);
    console.log(ret +"return of ETHCALL")
		return ret;


  }catch (error) {
    alert(error);
  }
}


async function getNonce(address,token){

    try {
        let response= await fetch('https://api.balehu.com/v1/app-auth/ethereum-get-transaction-count', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
                "address":address,
                "quantity-tag":"pending"
            }),
        });
        let responseJson = await response.json();
        var text=responseJson.result;
        //alert(text)
        return text;

    }catch (error) {
        alert(error);
    }
}

async function  UpdateAsProcessed(token,signatureID){
  try {
      let response= await fetch('https://api.balehu.com/v1/user-auth/merchant-cash-business-update-processed', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':"Bearer "+ token
          },
          body: JSON.stringify({
            "signiture-id": signatureID

          }),
      });
      let responseJson = await response.json();
      var text=responseJson.success;

      return text;

  }catch (error) {
      alert(error);
  }



}


async function DeployMerchantCashWallet(token,data){

    try {
        let response= await fetch('https://api.balehu.com/v1/user-auth/ethereum-deploy-merchant-cash-wallet', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
                "data":data,

            }),
        });
        let responseJson = await response.json();
        var text=responseJson.text;
        alert(text)
        return text;

    }catch (error) {
        alert(error);
    }




}




async function UpLoadSig(token,r,s,v,value,Merchant,businessid){
	    try {
        let response= await fetch('https://api.balehu.com/v1/user-auth/merchant-cash-user-sig', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
                "business-id": 7,
 			          "customer-wallet-transaction-id": Merchant,
  			        "micro-coin-value": value,
			          "sig-int":v,
 			          "sig-one":r,
  			        "sig-two":s
            }),
        });
        let responseJson = await response.json();
        var text=responseJson.success;
        alert(text)
        return text;

    }catch (error) {
        alert(error);
    }


}

async function getLastCashValue(token,MerchantID){
	    try {
        let response= await fetch('https://api.balehu.com/v1/user-auth/user-merchant-cash-last-micro-coin-value', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
                "business-id": MerchantID
			})

		});

        let responseJson = await response.json();
        var bool=responseJson.has-records;
	    var amount=responseJson.micro-coin-value;
		var ret={}
		ret[0]=bool;
		ret[1]=amount;
	    return

    }catch (error) {
        alert(error);
    }


}
async function MarkAsProcessed(token,sigID){
	    try {
        let response= await fetch('https://api.balehu.com/v1/user-auth/merchant-cash-business-update-processed', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
                "signature-id": MerchantID

            }),
		});
        let responseJson = await response.json();
        var bool=responseJson.success;
	    return bool;

    }catch (error) {
        alert(error);
    }


}


async function getMyWallet(token){

	 try {
        let response= await fetch('https://api.balehu.com/v1/user-auth/ethereum-get-user-wallets', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
		})
        let responseJson = await response.json();
        var object=responseJson.wallets;
	    return object;

    }catch (error) {
        alert(error);
    }




}

async function SoliditySha3(token,address,hash,value,value2){
	    try {
        let response= await fetch('https://api.balehu.com/v1/app-auth/solidity-sha3', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
                "bytes32hash": hash,
  				      "ethereumAddress": address,
  				      "uint256s": [{"uint256": value},{"uint256": value2}]
            }),
        });
        let responseJson = await response.json();
        var text=responseJson.result;
        //alert(text)
        return text;

    }catch (error) {
        alert(error);
    }




}
async function GetWalletByEmail(token,email){
	    try {
        let response= await fetch('https://api.balehu.com/v1/user-auth/ethereum-get-user-wallets-by-email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
               "email":email
            }),
        });
        let responseJson = await response.json();
        var object=responseJson.wallets;
	    return object;
    }catch (error) {
        alert(error);
    }
}
async function GetWalletByID(token,id){
	    try {
        let response= await fetch('https://api.balehu.com/v1/user-auth/ethereum-get-user-wallets-by-email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
               "user-id":id
            }),
        });
        let responseJson = await response.json();
        var object=responseJson.wallets;
	    return object;
    }catch (error) {
        alert(error);
    }
}
async function GetBusinessWalletByID(token,id){
	    try {
        let response= await fetch('https://api.balehu.com/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
               "business-id":id
            }),
        });
        let responseJson = await response.json();
        var object=responseJson.wallets;
	    return object;
    }catch (error) {
        alert(error);
    }
}
async function GetTransactionReceipt(token,tx){
	    try {
        let response= await fetch('https://api.balehu.com/v1/app-auth/ethereum-get-transaction-receipt', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
            body: JSON.stringify({
               "transaction-id":tx
            }),
        });
        let responseJson = await response.json();

	    return responseJson;
    }catch (error) {
        alert(error);
    }
}




 async function getToken(){
        try {
            let response= await fetch('https://api.balehu.com/v1/app-login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "password": "VCltIpiaLCwcWf5qcbIF599nWmQ27W10XwQKApoGsvIl4lx5ER6iPTvOcr0szxDd",
                    "username": "balehu-app"
                }),
            });
            let responseJson = await response.json();
            var token=responseJson.token
            this.setState({Token:token})

            alert(this.state.Token)
        }catch (error) {
            alert(error);
        }

    }

async function getMerchantCashTransaction(token,bool,business,user){
    try {
        let response=await fetch('https://api.balehu.com/v1/user-auth/merchant-cash-business-list', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },
			body: JSON.stringify({
                "business-id": hash,
  				"processed": bool,
  				"user-id":value
            }),
        });
        let responseJson = await response.json();
        var object=responseJson.merchant-cash-signatures[0];
        //alert(string +"this should be a random string")
        return object;
    }catch (error) {
        console.log(error+ "error");
    }

}

async function getMerchantNumber(token,address,channelAddress){
  try{
  var encoded="0x"+abi.rawEncode( "getTransaction(address):(uint)",address) ;
  var  number=await Call(token,encoded,address,channelAddress)

  return number
  }catch(error){
    console.log(error+ "error")
  }



}

async function getRandString(token){
    try {
        let response=await fetch('https://api.balehu.com/v1/app-auth/crypto-random-32-byte-string', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':"Bearer "+ token
            },

        });
        let responseJson = await response.json();
        var string=responseJson.text;
        //alert(string +"this should be a random string")
        return string;
    }catch (error) {
        console.log(error+ "error");
    }

}

async function SeedEndPoint(address,token){
  try {
      let response=await fetch('https://api.balehu.com/v1/user-auth/ethereum-seed-address', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization':"Bearer "+ token
          },
    body: JSON.stringify({
              address: address

             }),
      });
      let responseJson = await response.json();
      var object=responseJson.success
      //alert(string +"this should be a random string")
      return object;
  }catch (error) {
      console.log(error+ "error");
  }

}
async function SendToEndPoint(address,token){
  try {
      let response=await fetch('https://api.balehu.com/v1/user-auth/ethereum-send-2000-coin', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization':"Bearer "+ token
          },
    body: JSON.stringify({
              address: address
             }),
      });
      let responseJson = await response.json();
      var object=responseJson.success
      //alert(string +"this should be a random string")
      return object;
  }catch (error) {
      console.log(error+ "error");
  }

}
