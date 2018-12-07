import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { LOGIN, SAVE_SESSION, LOGOUT } from '../actions/auth';

// Initial state
const initialState = {
    isLoggedIn: false,
    pubkey: null,
    userName: null,
    session_id: null,
    private_key: null,
};

// Reducer
const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN_SUCCESS");
            return {
                ...state,
                isLoggedIn: true,
                pubkey: action.formData.formData.pubkey,
                userName: action.formData.formData.username,
                private_key: action.formData.private_key,
                random_factor: action.formData.random_factor
            };
        case SAVE_SESSION:
            console.log('Saving session_id');
            return {
                ...state,
                session_id: action.session_id,
            }
        case LOGOUT:
        console.log('LOG_OUT');
            return {
                ...state,
                isLoggedIn: false,
                pubkey: null,
                userName: null,
                session_id: null,
            }
        default:
            return state;
    }
}

const persistConfig = {
    key: 'auth',
    storage,
};

export default persistReducer(persistConfig, auth);
