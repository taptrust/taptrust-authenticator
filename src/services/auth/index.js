
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

const saveRequest = (request_id) => {
    store.dispatch(saveRequestAction(request_id));
};

const logout = () => {
    store.dispatch(logoutAction());
}

export {
    login,
    saveRequest,
    logout,
};
