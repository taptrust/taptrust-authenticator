export const LOGIN = 'LOGIN';
export const SAVE_SESSION = 'SAVE_SESSION';
export const LOGOUT = 'LOGOUT';

export const login = (formData) => ({
    type: LOGIN,
    formData
});

export const saveSession = (token) => ({
    type: SAVE_SESSION,
    token
});

export const logout = () => ({
    type: LOGOUT,
});
