
import { NavigationActions } from 'react-navigation';
import { store } from '../../config/store';
import { Alert } from 'react-native'
// utilities from EthSigner
import { fetchApi } from '../../services/api/index';
global.Buffer = global.Buffer || require('buffer').Buffer;
const sign = require('ethjs-signer').sign;

const generateSignedTransactionRequest = (txParams, username, privateKey) => {

      // First attempt with crypto lib
      //const tx = decodeTransaction(txParams);
      //const signedTx = sign(privateKey, 'test').toString('hex');

      // Second attempt with EthereumTX
      //const tx = new EthereumTx(txParams)
      //tx.sign(privateKey)

      const signedTx = sign(txParams, privateKey.toString('hex'));

      fetchApi({
        url: 'relay',
        payload: {
          message: signedTx,
          username: username
        },
        method: 'post',
      })
        .then(response => {
          console.log('Response-->', response);
          if (response.error){
            Alert.alert(
              'Error',
              response.error,
              [
              {text: 'OK', onPress: () => console.log('Error relaying message')},
              ],
              { cancelable: false }
            );
            return;
          }else{
            Alert.alert(
              'Success',
              response.message,
              [
              {text: 'OK', onPress: () => console.log('Successfully relayed message')},
              ],
              { cancelable: false }
            );
          }
        })
        .catch(e => {
          console.log(e);
        });


}

export {
    generateSignedTransactionRequest
};
