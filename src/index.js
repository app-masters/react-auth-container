import React, { Component } from 'react';
import Auth from './auth';
import store from './auth.store.js';
import { Provider } from 'react-redux';
class AuthContainer extends Component {
    render () {
        // console.log('hey yo', this.props);
        return (
            <Provider {...this} store={store}>
                <Auth {...this.props} />
            </Provider>
        );
    }
}

export default AuthContainer;
