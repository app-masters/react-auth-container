import { ACTIONS } from './auth.actionTypes.js';
import {Http} from '@app-masters/js-lib';
const localStorage = window.localStorage;

export const inputChanged = (id, value) => {
    return {type: ACTIONS.AUTH_INPUT_CHANGED, payload: {id: id, value: value}};
};

export const loginUser = ({email, password}, onLoginSuccess, onLoginFail, multipleLogin) => {
    return (dispatch, getState) => {
        removeErrors(dispatch);
        if (!validateInput(dispatch, {email, password})) {
            // loginUserFail(dispatch, 'Invalid Credentials', onLoginFail);
        } else {
            dispatch({type: ACTIONS.AUTH_LOGIN_USER});
            Http.post('/login', {
                email,
                password
            }).then(response => {
                // console.log('resss', response);
                localStorage.setItem('auth', JSON.stringify(response));
                if (multipleLogin) {
                    let allLogins = JSON.parse(window.localStorage.getItem('savedLogins')) || [];
                    if (!allLogins.find(data => data.user._id === response.user._id)) {
                        allLogins.push(response);
                        window.localStorage.setItem('savedLogins', JSON.stringify(allLogins));
                    }
                }

                loginUserSuccess(dispatch, response, onLoginSuccess);
            }).catch((error) => {
                if (error.message === "NoUserFound") {
                    loginUserFail(dispatch, "Usuário não encontrado", onLoginFail);
                } else if (error.message === "WrongPassword") {
                    loginUserFail(dispatch, "Senha incorreta", onLoginFail);
                } else if (error.name === 'ExpiredError') {
                    loginUserFail(dispatch, "Sua sessão expirou, faça login novamente", onLoginFail);
                } else {
                    let message = (error.message ? error.message : "none");
                    loginUserFail(dispatch, "Houve um erro inesperado e os programadores responsáveis já foram avisados. \n\n Detalhes técnicos: " + message, onLoginFail);
                }
            });
        }
    };
};

export const onUserChange = (user, onLoginSuccess) => {
    return (dispatch) => {
        // console.log(user);
        localStorage.setItem('auth', JSON.stringify(user));
        loginUserSuccess(dispatch, user, onLoginSuccess, true);
    };
};

export const isUserInLocalStorage = (onLoginSuccess, onLoginFail) => {
    return (dispatch) => {
        dispatch({type: ACTIONS.AUTH_IS_USER_AUTHENTICATED});
        removeErrors(dispatch);
        let data = localStorage.getItem('auth');
        // console.log(data);
        if (data) {
            data = JSON.parse(data);
            loginUserSuccess(dispatch, data, onLoginSuccess);
        } else {
            loginUserFail(dispatch, null, onLoginFail);
        }
    };
};

export const signupUser = ({email, password, rePassword}, redirect, onSignupSuccess, onSignupFail) => {
    return (dispatch) => {
        removeErrors(dispatch);
        if (!validateInput(dispatch, {email, password}) || !checkPasswordMatch({password, rePassword})) {
            signupUserFail(dispatch, 'Dados inválidos', onSignupFail);

            if (!checkPasswordMatch({password, rePassword})) {
                signupUserFail(dispatch, 'Senhas não batem', onSignupFail);
            }
        } else {
            dispatch({type: ACTIONS.AUTH_SIGNUP_USER});
            Http.post('/signup', {
                email,
                password
            })
            .then(response => {
                localStorage.setItem('auth', JSON.stringify(response));
                signupUserSuccess(dispatch, response, onSignupSuccess);
            })
            .catch((error) => signupUserFail(dispatch, error, onSignupFail));
        }
    };
};

const signupUserFail = (dispatch, error, onSignupFail) => {
    dispatch({type: ACTIONS.AUTH_ERROR, payload: error});
    onSignupFail(error);
};

const signupUserSuccess = (dispatch, user, onSignupSuccess) => {
    dispatch({type: ACTIONS.AUTH_SIGNUP_USER_SUCCESS, payload: user});
    onSignupSuccess(user);
};

const loginUserFail = (dispatch, error, onLoginFail) => {
    dispatch({type: ACTIONS.AUTH_ERROR, payload: error});
    onLoginFail(error);
};

const loginUserSuccess = (dispatch, user, onLoginSuccess, push) => {
    // console.log('login success');
    dispatch({type: ACTIONS.AUTH_LOGIN_USER_SUCCESS, payload: user});
    onLoginSuccess(user, push);
};

const removeErrors = (dispatch) => {
    dispatch({type: ACTIONS.AUTH_ERROR, payload: null});
};

const validateInput = (dispatch, { email, password }) => {
    var validated = true;
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {
        dispatch({type: ACTIONS.AUTH_ERROR, payload: "Formato de email incorreto"});
        validated = false;
    }

    if (password === '') {
        dispatch({type: ACTIONS.AUTH_ERROR, payload: "Senha invalida"});
        validated = false;
    }
    return validated;
};

const checkPasswordMatch = ({ password, rePassword }) => {
    return password === rePassword;
};
