import {
  Alert
} from 'react-native'
import { fetchApi } from './index';
import { saveRequest } from '../auth';

const pollServer = (username, navigation, pollParams) => {
  console.log('pollServer');
  
  if (!username){
    console.log('no username. Not polling server.');
  }
  
  
  // TODO: do not poll if app is not in foreground 
  
  try {
      pollServerRequest(username, navigation, pollParams);
    } catch(e) {
      Alert.alert(e);
    }
  
}


const pollServerRequest = (username, navigation, pollParams) => {
  
  if (navigation.state.routeName == 'AuthApproval'){
    console.log('not checking for auth requests, AuthApproval already open');
    return;
  }
  
  let pollPayload = {
    username: username
  };
  if (pollParams){
    pollPayload = Object.assign(pollPayload, pollParams);
  }
  fetchApi({
      url: 'auth/get',
      payload: pollPayload,
      method: 'POST',
  })
  .then(response => {
    console.log('Timer Response-->', response);

    // TODO place anything new into a stack 
    // TODO: if already open request of some kind, do not redirect yet (check after leaving approval page)
    
      
    if(response.authRequest) {
      // TODO: probably load different views depending on tx vs. authRequest 
      let request_id = response.authRequest.request_id;
      let request = response.authRequest.params;
      request.id = request_id;
      
      saveRequest(request_id);
      navigation.navigate('AuthApproval', { request: request, request_id: request_id });
      return;
    }
    
    if(response.pairRequest) {
      let token = response.pairRequest.token;
      // let request = response.session.request;
      saveRequest(token); // not a request ID 
      navigation.navigate('PairApproval', { token: token });
      return;
    }

  })
  .catch(e => {
    console.log('error polling', e);

  });
  
}




export {
    pollServer, pollServerRequest
};