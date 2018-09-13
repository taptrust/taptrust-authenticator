export const LOGIN = 'LOGIN';
export const SAVE_LOCATION = 'SAVE_LOCATION';

export const login = (formData) => ({
    type: LOGIN,
    formData
});
