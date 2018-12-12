export const LOGIN = 'LOGIN';
export const SAVE_REQUEST = 'SAVE_REQUEST';
export const LOGOUT = 'LOGOUT';

export const login = (formData) => ({
    type: LOGIN,
    formData
});

<<<<<<< HEAD
export const saveSession = (token) => ({
    type: SAVE_SESSION,
    token
=======
export const saveRequest = (request_id) => ({
    type: SAVE_REQUEST,
    request_id
>>>>>>> f4699a5... updates for transaction testing
});

export const logout = () => ({
    type: LOGOUT,
});
