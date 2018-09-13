import { LOGIN } from '../actions/auth';

// Initial state
const initialState = {
    isLoggedIn: false,
};

// Reducer
const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN_SUCCESS");
            return {
                ...state,
                isLoggedIn: true,
            };
        default:
            return state;
    }
}
export default auth;