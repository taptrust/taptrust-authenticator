import {
  Alert
} from 'react-native'
import { fetchApi } from './index';

const pollServer = (username, navigation) => {
  console.log('pollServer');
  console.log(username);
  
  if (!username){
    console.log('no username. Not polling server.');
  }
  
  // TODO: if open request of some kind, do not poll server. 
  // TODO: if app is in background, do not poll server. (AppState)
  
  try {
      pollServerRequest(username, navigation);
    } catch(e) {
      Alert.alert(e);
    }
  
}


const pollServerRequest = (username, navigation) => {
  
  console.log('poll server request.', navigation);
  fetchApi({
      url: 'auth/get',
      payload: {
        username: username
      },
      method: 'post',
  })
  .then(response => {
    console.log('Timer Response-->', response);
    
    return;
    if(response.session) {
      // TODO: probably load different views depending on tx vs. session 
      let session_id = response.session.session_id;
      let request = response.session.request;
      saveSession(session_id);
      this.props.navigation.navigate('AuthApproval', { request: request });
    }
    this.setState({
      loading: false,
    });
  })
  .catch(e => {
    console.log('error polling', e);

  });
  
}




export {
    pollServer
};