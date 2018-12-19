
import { NavigationActions } from 'react-navigation';
import { store } from '../../config/store';
import { Alert } from 'react-native'

import { fetchApi } from '../../services/api/index';
import { sign, getWallet, getTxParams } from '../../libraries/web3util';
import { ToastActionsCreators } from 'react-native-redux-toast';



function updateTxCompleted(isCompletedValue) {
  return {
    type: 'TX_COMPLETED',
    isTxCompleted: isCompletedValue
  }
}

const relaySignedRequest = (action, params, username, privateKey, requestId, dispatch, navigation) => {


      params['action'] = action;
      let txParams = getTxParams(params);
      console.log('txParams');
      console.log(txParams);
      getWallet(privateKey);

      const signature = sign(txParams, privateKey.toString('hex'));

      console.log('signature: ' + signature);
try{
      // TODO: "request_id" 
      fetchApi({
        url: 'relay',
        body: {
          action: action,
          signature: signature,
          params: txParams,
          username: username,
          request_id: requestId
        },
        method: 'POST',
      })
        .then(response => {
          console.log('Response-->', response);
          if (response.error){
            if (dispatch){
              dispatch(ToastActionsCreators.displayError('Error completing transaction: ' + response.error));
            }
            
            return;
          }else{
            if (dispatch){
              dispatch(ToastActionsCreators.displayInfo('Transaction successfully completed'));
              //navigation.navigate('AccountHome', {forceRefresh: true});
              dispatch(updateTxCompleted(true));
            }
            
          }
        })
        .catch(e => {
          console.log(e);
        });
      }catch(e){
        dispatch(ToastActionsCreators.displayError('Error sending transaction.'));
      }

}

export {
    relaySignedRequest, updateTxCompleted
};
