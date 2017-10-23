import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Login from './Auth.login.js';
import Signup from './Auth.signup.js';
import { Http } from 'jslib';
class Auth extends Component {
    componentWillMount () {
        Http.setBaseURL(this.props.baseUrl);
        Http.setHeaders(this.props.httpHeaders);
    }
    render () {
        console.log('render', this.props);

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
export default connect(mapStateToProps)(Auth);
