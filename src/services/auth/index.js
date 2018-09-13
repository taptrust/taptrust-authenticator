
import { Platform, PushNotificationIOS, AsyncStorage } from "react-native";

import {
login as loginAction,
} from '../../redux/actions/auth';

const login = (formData) => {
    console.log('logging in...');
    AsyncStorage.multiSet([
        ['username', formData.username],
        ['pubkey', formData.pubkey],
    ]);
    dispatch(loginAction(formData));
};

export {
    login,
};
