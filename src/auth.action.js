import { ACTIONS } from './auth.actionTypes.js';
import Http from './Library/Http';

export const inputChanged = (id, value) => {
    return {type: ACTIONS.AUTH_INPUT_CHANGED, payload: {id: id, value: value}};
};

export const loginUser = ({email, password}, onLoginSuccess, onLoginFail) => {
    return (dispatch, getState) => {
        dispatch({type: ACTIONS.AUTH_EMAIL_FORMAT_ERROR, payload: null});
        dispatch({type: ACTIONS.AUTH_EMPTY_PASSWORD_ERROR, payload: null});
        if (!validateInput(dispatch, {email, password})) {
            loginUserFail(dispatch, 'Invalid Credentials');
        } else {
            dispatch({type: ACTIONS.AUTH_LOGIN_USER});
            Http.post('/login', {
                email,
                password
            })
            .then(response => {
                console.log(response);
                localStorage.setItem('auth', JSON.stringify(response));
                Http.setHeaders({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'client': 'web',
                    'Authorization': response.token
                });
                Http.setEndpointParam('{_id}', response.user._id);
                loginUserSuccess(dispatch, response, onLoginSuccess);
            })
            .catch((error) => {
                loginUserFail(dispatch, error);
                if (error.message === "NoUserFound") {
                    loginError(dispatch, "Usuário não encontrado", onLoginFail);
                } else if (error.message === "WrongPassword") {
                    loginError(dispatch, "Senha incorreta");
                } else if (error.name === 'ExpiredError') {
                    loginError(dispatch, "Sua sessão expirou, faça login novamente");
                } else {
                    let message;
                    message = (error.message ? error.message : "none");
                    Rollbar.error(new Error(message));
                    loginError(dispatch, "Houve um erro inesperado e os programadores responsáveis já foram avisados. \n\n Detalhes técnicos: " + message);
                }
            });
        }
    };
};

export const isUserInLocalStorage = () => {
    return (dispatch) => {
        dispatch({type: ACTIONS.AUTH_IS_USER_AUTHENTICATED});
        var data = localStorage.getItem('auth');
        if (data !== null) {
            data = JSON.parse(data);
            Http.setHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'client': 'web',
                'Authorization': data.token
            });
            Http.setEndpointParam('{_id}', data.user._id);
            loginUserSuccess(dispatch, data);
        } else {
            loginUserFail(dispatch, null);
        }
    };
};

export const signupUser = ({email, password, rePassword}, redirect, onSignupSuccess) => {
    return (dispatch) => {
        dispatch({type: ACTIONS.AUTH_EMAIL_FORMAT_ERROR, payload: null});
        dispatch({type: ACTIONS.AUTH_EMPTY_PASSWORD_ERROR, payload: null});
        if (!validateInput(dispatch, {email, password}) || !checkPasswordMatch({password, rePassword})) {
            signupUserFail(dispatch, 'Invalid Credentials');

            if (!checkPasswordMatch({password, rePassword})) {
                dispatch({type: ACTIONS.AUTH_PASSWORD_UNMATCHED, payload: "Senhas não batem"});
            }
        } else {
            dispatch({type: ACTIONS.AUTH_SIGNUP_USER});
            Http.post('/signup', {
                email,
                password
            })
            .then(response => {
                localStorage.setItem('auth', JSON.stringify(response));
                Http.setHeaders({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'client': 'web',
                    'Authorization': response.token
                });
                Http.setEndpointParam('{_id}', response.user._id);
                signupUserSuccess(dispatch, response, onSignupSuccess);
            })
            .catch((error) => signupUserFail(dispatch, error));
        }
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        localStorage.clear();
        Http.setHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'client': 'web'
        });
        dispatch({type: ACTIONS.AUTH_LOGOUT_USER});
    };
};
const signupUserFail = (dispatch, error, onSignupFail) => {
    dispatch({type: ACTIONS.AUTH_SIGNUP_USER_FAIL, payload: error});
    onSignupFail(error);
};

const signupUserSuccess = (dispatch, user, onSignupSuccess) => {
    dispatch({type: ACTIONS.AUTH_SIGNUP_USER_SUCCESS, payload: user});
    onSignupSuccess(user);
};

const loginUserFail = (dispatch, error) => {
    dispatch({type: ACTIONS.AUTH_LOGIN_USER_FAIL, payload: error});
};

const loginError = (dispatch, error, onLoginFail) => {
    dispatch({type: ACTIONS.AUTH_ERROR, payload: error});
    onLoginFail(error);
};

const loginUserSuccess = (dispatch, user, onLoginSuccess) => {
    dispatch({type: ACTIONS.AUTH_LOGIN_USER_SUCCESS, payload: user});
    onLoginSuccess(user);
};

const validateInput = (dispatch, { email, password }) => {
    var validated = true;
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {
        dispatch({type: ACTIONS.AUTH_EMAIL_FORMAT_ERROR, payload: "Formato de email incorreto"});
        dispatch({type: ACTIONS.AUTH_ERROR, payload: "Formato de email incorreto"});
        validated = false;
    }

    if (password === '') {
        dispatch({type: ACTIONS.AUTH_EMPTY_PASSWORD_ERROR, payload: "Senha invalida"});
        dispatch({type: ACTIONS.AUTH_ERROR, payload: "Senha invalida"});
        validated = false;
    }
    return validated;
};

const checkPasswordMatch = ({ password, rePassword }) => {
    return password === rePassword;
};
