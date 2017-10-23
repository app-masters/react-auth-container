import React, { Component } from 'react';
import Auth from './Auth';
import store from './auth.store.js';
import { Provider } from 'react-redux';

class AuthContainer extends Component {
    render () {
        console.log(window.fetch);
        return (
            <Provider store={store}>
                <Auth {...this.props} />
            </Provider>
        );
    }
}

export default AuthContainer;
