export const LOGIN = 'LOGIN';
export const SAVE_REQUEST = 'SAVE_REQUEST';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const LOGOUT = 'LOGOUT';

export const login = (formData) => ({
    type: LOGIN,
    formData
});

export const saveRequest = (request_id) => ({
    type: SAVE_REQUEST,
    request_id
});

export const saveProfile = (profile) => ({
    type: SAVE_PROFILE,
    profile
});

export const logout = () => ({
    type: LOGOUT,
});
