import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputChanged, loginUser, isUserInLocalStorage } from './auth.action.js';

class Login extends Component {
    constructor (props) {
        super(props);
        this._handleEnterPress = this._handleEnterPress.bind(this);
        // console.log('props', props);
    }
    componentWillMount () {
        document.addEventListener("keydown", this._handleEnterPress);
    }

    componentWillUnmount () {
        document.removeEventListener("keydown", this._handleEnterPress);
    }

    _handleEnterPress (e) {
        // console.log(this.props);
        if (e.key === "Enter") {
            const { email, password } = this.props.input;
            this.props.loginUser({ email, password }, this.props.onLoginSuccess, this.props.onLoginFail, this.props.multipleLogin);
        }
    }
    render () {
        return React.cloneElement(this.props.login, this.props);
    }
}

const mapStateToProps = ({auth}) => {
    const {input, loading, error, emailError, passwordError} = auth;
    return {input, loading, error, emailError, passwordError};
};
export default connect(mapStateToProps, {inputChanged, loginUser, isUserInLocalStorage})(Login);
