import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onUserChange } from './auth.action.js';

class ChangeUser extends Component {
    constructor (props) {
        super(props);
        this.userList = window.localStorage.getItem('savedLogins') || JSON.stringify([]);
    }
    render () {
        return React.cloneElement(this.props.changeUser, { ...this.props, options: JSON.parse(this.userList) });
    }
}

const mapStateToProps = ({auth}) => {
    const {input, loading, error, emailError, passwordError} = auth;
    return {input, loading, error, emailError, passwordError};
};
export default connect(mapStateToProps, {onUserChange})(ChangeUser);
