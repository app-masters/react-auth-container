'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signupUser = exports.isUserInLocalStorage = exports.onUserChange = exports.loginUser = exports.inputChanged = undefined;

var _authActionTypes = require('./auth.actionTypes.js');

var _jsLib = require('@app-masters/js-lib');

var localStorage = window.localStorage;

var inputChanged = exports.inputChanged = function inputChanged(id, value) {
    return { type: _authActionTypes.ACTIONS.AUTH_INPUT_CHANGED, payload: { id: id, value: value } };
};

var loginUser = exports.loginUser = function loginUser(_ref, onLoginSuccess, onLoginFail, multipleLogin) {
    var email = _ref.email,
        password = _ref.password;

    return function (dispatch, getState) {
        removeErrors(dispatch);
        if (!validateInput(dispatch, { email: email, password: password })) {
            // loginUserFail(dispatch, 'Invalid Credentials', onLoginFail);
        } else {
            dispatch({ type: _authActionTypes.ACTIONS.AUTH_LOGIN_USER });
            _jsLib.Http.post('/login', {
                email: email,
                password: password
            }).then(function (response) {
                // console.log('resss', response);
                localStorage.setItem('auth', JSON.stringify(response));
                if (multipleLogin) {
                    var allLogins = JSON.parse(window.localStorage.getItem('savedLogins')) || [];
                    if (!allLogins.find(function (data) {
                        return data.user._id === response.user._id;
                    })) {
                        allLogins.push(response);
                        window.localStorage.setItem('savedLogins', JSON.stringify(allLogins));
                    }
                }

                loginUserSuccess(dispatch, response, onLoginSuccess);
            }).catch(function (error) {
                if (error.message === "NoUserFound") {
                    loginUserFail(dispatch, "Usuário não encontrado", onLoginFail);
                } else if (error.message === "WrongPassword") {
                    loginUserFail(dispatch, "Senha incorreta", onLoginFail);
                } else if (error.name === 'ExpiredError') {
                    loginUserFail(dispatch, "Sua sessão expirou, faça login novamente", onLoginFail);
                } else {
                    var message = error.message ? error.message : "none";
                    loginUserFail(dispatch, "Houve um erro inesperado e os programadores responsáveis já foram avisados. \n\n Detalhes técnicos: " + message, onLoginFail);
                }
            });
        }
    };
};

var onUserChange = exports.onUserChange = function onUserChange(user, onLoginSuccess) {
    return function (dispatch) {
        // console.log(user);
        localStorage.setItem('auth', JSON.stringify(user));
        loginUserSuccess(dispatch, user, onLoginSuccess, true);
    };
};

var isUserInLocalStorage = exports.isUserInLocalStorage = function isUserInLocalStorage(onLoginSuccess, onLoginFail) {
    return function (dispatch) {
        dispatch({ type: _authActionTypes.ACTIONS.AUTH_IS_USER_AUTHENTICATED });
        removeErrors(dispatch);
        var data = localStorage.getItem('auth');
        // console.log(data);
        if (data) {
            data = JSON.parse(data);
            loginUserSuccess(dispatch, data, onLoginSuccess);
        } else {
            loginUserFail(dispatch, null, onLoginFail);
        }
    };
};

var signupUser = exports.signupUser = function signupUser(_ref2, redirect, onSignupSuccess, onSignupFail) {
    var email = _ref2.email,
        password = _ref2.password,
        rePassword = _ref2.rePassword;

    return function (dispatch) {
        removeErrors(dispatch);
        if (!validateInput(dispatch, { email: email, password: password }) || !checkPasswordMatch({ password: password, rePassword: rePassword })) {
            signupUserFail(dispatch, 'Dados inválidos', onSignupFail);

            if (!checkPasswordMatch({ password: password, rePassword: rePassword })) {
                signupUserFail(dispatch, 'Senhas não batem', onSignupFail);
            }
        } else {
            dispatch({ type: _authActionTypes.ACTIONS.AUTH_SIGNUP_USER });
            _jsLib.Http.post('/signup', {
                email: email,
                password: password
            }).then(function (response) {
                localStorage.setItem('auth', JSON.stringify(response));
                signupUserSuccess(dispatch, response, onSignupSuccess);
            }).catch(function (error) {
                return signupUserFail(dispatch, error, onSignupFail);
            });
        }
    };
};

var signupUserFail = function signupUserFail(dispatch, error, onSignupFail) {
    dispatch({ type: _authActionTypes.ACTIONS.AUTH_ERROR, payload: error });
    onSignupFail(error);
};

var signupUserSuccess = function signupUserSuccess(dispatch, user, onSignupSuccess) {
    dispatch({ type: _authActionTypes.ACTIONS.AUTH_SIGNUP_USER_SUCCESS, payload: user });
    onSignupSuccess(user);
};

var loginUserFail = function loginUserFail(dispatch, error, onLoginFail) {
    dispatch({ type: _authActionTypes.ACTIONS.AUTH_ERROR, payload: error });
    onLoginFail(error);
};

var loginUserSuccess = function loginUserSuccess(dispatch, user, onLoginSuccess, push) {
    // console.log('login success');
    dispatch({ type: _authActionTypes.ACTIONS.AUTH_LOGIN_USER_SUCCESS, payload: user });
    onLoginSuccess(user, push);
};

var removeErrors = function removeErrors(dispatch) {
    dispatch({ type: _authActionTypes.ACTIONS.AUTH_ERROR, payload: null });
};

var validateInput = function validateInput(dispatch, _ref3) {
    var email = _ref3.email,
        password = _ref3.password;

    var validated = true;
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {
        dispatch({ type: _authActionTypes.ACTIONS.AUTH_ERROR, payload: "Formato de email incorreto" });
        validated = false;
    }

    if (password === '') {
        dispatch({ type: _authActionTypes.ACTIONS.AUTH_ERROR, payload: "Senha invalida" });
        validated = false;
    }
    return validated;
};

var checkPasswordMatch = function checkPasswordMatch(_ref4) {
    var password = _ref4.password,
        rePassword = _ref4.rePassword;

    return password === rePassword;
};