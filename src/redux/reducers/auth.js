import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { LOGIN } from '../actions/auth';

// Initial state
const initialState = {
    isLoggedIn: false,
    privateKey: null,
};

// Reducer
const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN_SUCCESS");
            return {
                ...state,
                isLoggedIn: true,
                privateKey: action.formData.pubkey,
                userName: action.formData.userName,
            };
        default:
            return state;
    }
}

const persistConfig = {
    key: 'auth',
    storage,
};

export default persistReducer(persistConfig, auth);