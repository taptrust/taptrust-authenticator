
import { Platform, PushNotificationIOS, AsyncStorage } from "react-native";
import { store } from "../../config/store";

import {
login as loginAction,
saveSession as saveSessionAction,
logout as logoutAction,
} from '../../redux/actions/auth';

const login = (formData) => {
    console.log('logging in...');
    store.dispatch(loginAction(formData));
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
