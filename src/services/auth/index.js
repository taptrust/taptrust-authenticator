
import { NavigationActions } from 'react-navigation';
import { store } from '../../config/store';

import {
login as loginAction,
saveRequest as saveRequestAction,
logout as logoutAction,
} from '../../redux/actions/auth';

const login = (payload) => {
    console.log('logging in...');
    store.dispatch(loginAction(payload));
    store.dispatch(NavigationActions.navigate({routeName: 'App'}));
};

<<<<<<< HEAD
const saveSession = (token) => {
    store.dispatch(saveSessionAction(token));
=======
const saveRequest = (request_id) => {
    store.dispatch(saveRequestAction(request_id));
>>>>>>> f4699a5... updates for transaction testing
};

const logout = () => {
    store.dispatch(logoutAction());
}

export {
    login,
    saveRequest,
    logout,
};
