import keymirror from 'keymirror';

export const ACTIONS = keymirror({
    AUTH_INPUT_CHANGED: null,
    AUTH_LOGIN_USER_SUCCESS: null,
    AUTH_LOGIN_USER_FAIL: null,
    AUTH_LOGIN_USER: null,
    AUTH_SIGNUP_USER_SUCCESS: null,
    AUTH_SIGNUP_USER_FAIL: null,
    AUTH_SIGNUP_USER: null,
    AUTH_IS_USER_AUTHENTICATED: null,
    AUTH_LOGOUT_USER: null,
    AUTH_EMAIL_FORMAT_ERROR: null,
    AUTH_EMPTY_PASSWORD_ERROR: null,
    AUTH_PASSWORD_UNMATCHED: null,
    AUTH_ERROR: null
});
