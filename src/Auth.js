import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Login from './Auth.login.js';
import Signup from './Auth.signup.js';
import Http from './Library/Http';
import { isUserInLocalStorage } from './auth.action';
class Auth extends Component {
    componentWillMount () {
        Http.setBaseURL(this.props.baseUrl);
        Http.setHeaders({
            'content-type': 'application/json',
            'client': this.props.client,
            'admin-version': this.props.appVersion
        });
        // console.log(this.props.onLoginFail);
        // console.log(this.props.onLoginSuccess);
        this.props.isUserAuthenticated(this.props.onLoginSuccess, this.props.onLoginFail);
    }
    render () {
        return (
            <div>
                <Route location={this.props.location} exact path='/' render={() => (<Login {...this.props} />)} />
                <Route location={this.props.location} exact path='/signup' render={() => (
                        this.props.isAuthenticated
                        ? <Redirect to='/' />
                        : <Signup {...this.props} />
                    )} />
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        isAuthenticated: auth.isAuthenticated
    };
};
const mapActions = (dispatch) => ({
    isUserAuthenticated: (onLoginSuccess, onLoginFail) => dispatch(isUserInLocalStorage(onLoginSuccess, onLoginFail))
});

export default connect(mapStateToProps, mapActions)(Auth);
