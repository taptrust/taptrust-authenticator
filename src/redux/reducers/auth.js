import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { LOGIN } from '../actions/auth';
import { SAVE_SESSION } from '../actions/auth';

// Initial state
const initialState = {
    isLoggedIn: false,
    pubkey: null,
    userName: null,
    session_id: null,
};

// Reducer
const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN_SUCCESS");
            return {
                ...state,
                isLoggedIn: true,
                pubkey: action.formData.pubkey,
                userName: action.formData.userName,
            };
        case SAVE_SESSION: {
            console.log('Saving session_id');
            return {
                ...state,
                session_id: action.session_id,
            }
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