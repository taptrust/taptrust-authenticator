
import { NavigationActions } from 'react-navigation';
import { store } from '../../config/store';

import {
login as loginAction,
saveSession as saveSessionAction,
logout as logoutAction,
} from '../../redux/actions/auth';

const login = (payload) => {
    console.log('logging in...');
    store.dispatch(loginAction(payload));
    store.dispatch(NavigationActions.navigate({routeName: 'App'}));
};

const saveSession = (session_id) => {
    store.dispatch(saveSessionAction(session_id));
};

const logout = () => {
    store.dispatch(logoutAction());
}

export {
    login,
    saveSession,
    logout,
};
