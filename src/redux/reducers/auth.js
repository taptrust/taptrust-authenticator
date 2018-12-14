import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { LOGIN, SAVE_SESSION, LOGOUT } from '../actions/auth';

// Initial state
const initialState = {
    isLoggedIn: false,
    pubkey: null,
    userName: null,
    session_id: null,
    privateKey: null,
    token: null
};

// Reducer
const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            let randomFactors;
            console.log("LOGIN_SUCCESS");
            randomFactors = state.randomFactors;
            console.log('previous random factors', randomFactors);
            if (!randomFactors){
              randomFactors = {};
            }
            randomFactors[action.formData.formData.username] = action.formData.randomFactor;
            console.log('new random factors', randomFactors);
            return {
                ...state,
                isLoggedIn: true,
                pubkey: action.formData.formData.pubkey,
                userName: action.formData.formData.username,
                privateKey: action.formData.privateKey,
                randomFactors: randomFactors
            };
        case SAVE_SESSION:
            console.log('Saving session_id');
            return {
                ...state,
                token: action.token,
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
