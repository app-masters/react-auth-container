import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputChanged, signupUser, isUserInLocalStorage } from './auth.action.js';

class Login extends Component {
    constructor (props) {
        super(props);
        this._handleEnterPress = this._handleEnterPress.bind(this);
    }
    componentWillMount () {
        document.addEventListener("keydown", this._handleEnterPress);
    }

    componentWillUnmount () {
        document.removeEventListener("keydown", this._handleEnterPress);
    }

    _handleEnterPress (e) {
        if (e.key === "Enter") {
            const { email, password, rePassword } = this.props.input;
            this.props.signupUser({ email, password, rePassword }, this.props.onSignupSuccess, this.props.onSignupFail);
        }
    }
    render () {
        return React.cloneElement(this.props.signup, this.props);
    }
}

const mapStateToProps = ({auth}) => {
    const {input, loading, error, emailError, passwordError, passwordMatchError} = auth;
    return {input, loading, error, emailError, passwordError, passwordMatchError};
};
export default connect(mapStateToProps, {inputChanged, signupUser, isUserInLocalStorage})(Login);
