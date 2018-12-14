export const LOGIN = 'LOGIN';
export const SAVE_REQUEST = 'SAVE_REQUEST';
export const LOGOUT = 'LOGOUT';

export const login = (formData) => ({
    type: LOGIN,
    formData
});

export const saveRequest = (request_id) => ({
    type: SAVE_REQUEST,
    request_id
});

export const logout = () => ({
    type: LOGOUT,
});
