'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _authActionTypes = require('./auth.actionTypes.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
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

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
    var action = arguments[1];

    switch (action.type) {
        case _authActionTypes.ACTIONS.AUTH_INPUT_CHANGED:
            {
                var obj = {};
                obj[action.payload.id] = action.payload.value;
                return (0, _immutabilityHelper2.default)(state, { input: { $merge: obj } });
            }
        case _authActionTypes.ACTIONS.AUTH_SIGNUP_USER_SUCCESS:
            return _extends({}, state, {
                user: action.payload.user,
                isAuthenticated: true,
                token: action.payload.token,
                loading: false
            });
        case _authActionTypes.ACTIONS.AUTH_SIGNUP_USER_FAIL:
            return _extends({}, state, {
                error: action.payload,
                isAuthenticated: false,
                password: '',
                loading: false
            });
        case _authActionTypes.ACTIONS.AUTH_SIGNUP_USER:
            return _extends({}, state, {
                loading: true,
                error: ''
            });
        case _authActionTypes.ACTIONS.AUTH_LOGIN_USER_SUCCESS:
            return _extends({}, INITIAL_STATE, state, {
                user: action.payload.user,
                isAuthenticated: true,
                token: action.payload.token,
                loading: false
            });
        case _authActionTypes.ACTIONS.AUTH_LOGIN_USER_FAIL:
            return _extends({}, state, {
                error: action.payload,
                isAuthenticated: false,
                password: '',
                loading: false
            });
        case _authActionTypes.ACTIONS.AUTH_LOGIN_USER:
            return _extends({}, state, {
                loading: true,
                error: ''
            });
        case _authActionTypes.ACTIONS.AUTH_IS_USER_AUTHENTICATED:
            return _extends({}, INITIAL_STATE);
        case _authActionTypes.ACTIONS.AUTH_LOGOUT_USER:
            return _extends({}, INITIAL_STATE);
        case _authActionTypes.ACTIONS.AUTH_EMPTY_PASSWORD_ERROR:
            return _extends({}, state, {
                passwordError: action.payload
            });
        case _authActionTypes.ACTIONS.AUTH_EMAIL_FORMAT_ERROR:
            return _extends({}, state, {
                emailError: action.payload
            });
        case _authActionTypes.ACTIONS.AUTH_PASSWORD_UNMATCHED:
            return _extends({}, state, {
                passwordMatchError: action.payload
            });
        case _authActionTypes.ACTIONS.AUTH_ERROR:
            return _extends({}, state, {
                error: action.payload,
                loading: false
            });
        default:
            return state;
    }
};