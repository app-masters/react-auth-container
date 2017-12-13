import update from 'immutability-helper';
import { ACTIONS } from './auth.actionTypes.js';

const INITIAL_STATE = {
    user: null,
    error: null,
    isAuthenticated: false,
    token: '',
    loading: false,
    input: {
        email: '',
        password: '',
        rePassword: ''
    },
    passwordError: null,
    emailError: null,
    passwordMatchError: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case ACTIONS.AUTH_INPUT_CHANGED: {
        let obj = {};
        obj[action.payload.id] = action.payload.value;
        return update(state,
              {input: {$merge: obj}}
          );
    }
    case ACTIONS.AUTH_SIGNUP_USER_SUCCESS:
        return {
            ...state,
            user: action.payload.user,
            isAuthenticated: true,
            token: action.payload.token,
            loading: false
        };
    case ACTIONS.AUTH_SIGNUP_USER_FAIL:
        return {
            ...state,
            error: action.payload,
            isAuthenticated: false,
            password: '',
            loading: false
        };
    case ACTIONS.AUTH_SIGNUP_USER:
        return {
            ...state,
            loading: true,
            error: ''
        };
    case ACTIONS.AUTH_LOGIN_USER_SUCCESS:
        return {
            ...INITIAL_STATE,
            ...state,
            user: action.payload.user,
            isAuthenticated: true,
            token: action.payload.token,
            loading: false
        };
    case ACTIONS.AUTH_LOGIN_USER_FAIL:
        return {
            ...state,
            error: action.payload,
            isAuthenticated: false,
            password: '',
            loading: false
        };
    case ACTIONS.AUTH_LOGIN_USER:
        return {
            ...state,
            loading: true,
            error: ''
        };
    case ACTIONS.AUTH_IS_USER_AUTHENTICATED:
        return {
            ...INITIAL_STATE
        };
    case ACTIONS.AUTH_LOGOUT_USER:
        return {
            ...INITIAL_STATE
        };
    case ACTIONS.AUTH_EMPTY_PASSWORD_ERROR:
        return {
            ...state,
            passwordError: action.payload
        };
    case ACTIONS.AUTH_EMAIL_FORMAT_ERROR:
        return {
            ...state,
            emailError: action.payload
        };
    case ACTIONS.AUTH_PASSWORD_UNMATCHED:
        return {
            ...state,
            passwordMatchError: action.payload
        };
    case ACTIONS.AUTH_ERROR:
        return {
            ...state,
            error: action.payload,
            loading: false
        };
    default:
        return state;
    }
};
