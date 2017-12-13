'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ACTIONS = undefined;

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTIONS = exports.ACTIONS = (0, _keymirror2.default)({
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