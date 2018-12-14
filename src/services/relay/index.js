
import { NavigationActions } from 'react-navigation';
import { store } from '../../config/store';
import { Alert } from 'react-native'

import { fetchApi } from '../../services/api/index';
import { sign, getWallet, getTxParams } from '../../libraries/web3util';


const relaySignedRequest = (action, params, username, privateKey) => {


      params['action'] = action;
      let txParams = getTxParams(params);
      console.log('txParams');
      console.log(txParams);
      getWallet(privateKey);

      const signature = sign(txParams, privateKey.toString('hex'));

      console.log('signature: ' + signature);

      fetchApi({
        url: 'relay',
        body: {
          action: action,
          signature: signature,
          params: txParams,
          username: username
        },
        method: 'POST',
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
    relaySignedRequest
};
