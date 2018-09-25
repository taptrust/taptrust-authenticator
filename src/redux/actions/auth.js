export const LOGIN = 'LOGIN';
export const SAVE_SESSION = 'SAVE_SESSION';
export const LOGOUT = 'LOGOUT';

export const login = (formData) => ({
    type: LOGIN,
    formData
});

export const saveSession = (session_id) => ({
    type: SAVE_SESSION,
    session_id
});

export const logout = () => ({
    type: LOGOUT,
});