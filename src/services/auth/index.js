
import { NavigationActions } from 'react-navigation';
import { store } from '../../config/store';

import {
login as loginAction,
saveRequest as saveRequestAction,
saveProfile as saveProfileAction,
logout as logoutAction,
} from '../../redux/actions/auth';

const login = (payload) => {
    console.log('logging in...');
    store.dispatch(loginAction(payload));
    store.dispatch(NavigationActions.navigate({routeName: 'App'}));
};

const saveRequest = (request_id) => {
    store.dispatch(saveRequestAction(request_id));
};

const saveProfile = (profile) => {
  store.dispatch(saveProfileAction(profile));
};


const logout = () => {
    store.dispatch(logoutAction());
}

export {
    login,
    saveRequest,
    saveProfile,
    logout,
};
