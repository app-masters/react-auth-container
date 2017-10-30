# Auth Container
Every action now serves as a callback, the Auth Component will be responsible to handle the whole authentication process and return callback values so that the outter setup know how to handle the data it resolves.
## Installation

````
npm install --save @app-masters/react-auth-container
````

# Props

| Prop           |   Type   |
|----------------|:--------:|
| baseUrl        |  String  |
| client         |  String  |
| appVersion     |  Number  |
| onLoginSuccess | Function |
| onLoginFail    | Function |
| onSignupSuccess| Function |
| onSignupFail   | Function |
| login          | Component|
| signup         | Component|


# Usage 

### Component (PublicRoutes)
```javascript
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Login from '../views/Login';
import Auth from '@app-masters/react-auth-container';
import { onLoginSuccess, onLoginFail, onSignupFail, onSignupSucess } from '../actions/authActions';

class PublicRoutes extends Component {
    render () {
        return (
            <div>
                <Auth
                    login={<Login />}
                    signup={null}
                    onLoginSuccess={(response) => {
                        this.props.onLoginSuccess(response);
                    }}
                    onLoginFail={(response) => {
                        this.props.onLoginFail(response); //
                    }}
                    onSignupSucess={(response) => {
                        this.props.onSignupSucess(response);
                    }}
                    onSignupFail={(response) => {
                        this.props.onSignupFail(response);
                    }}
                    client={'admin'}
                    appVersion={process.env.APP_VERSION}
                    baseUrl={'http://localhost:3000/api'} />
            </div>
        );
    }
}
const mapState = (state) => ({});
const mapActions = (dispatch) => ({
    onLoginSuccess: (res) => dispatch(onLoginSuccess(res)),
    onSignupFail: (res) => dispatch(onSignupFail(res)),
    onSignupSucess: (res) => dispatch(onSignupSucess(res)),
    onLoginFail: (res) => dispatch(onLoginFail(res))
});
export default connect(mapState, mapActions)(PublicRoutes);


```

### Actions
```javascript

import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from './types';
import { Http } from '@app-masters/js-lib';
export const onLoginSuccess = (userData) => dispatch => {
    console.log('LOGIN SUCCESS:', userData);
    Http.setHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'client': 'admin',
        'Authorization': userData.token
    });
    Http.setEndpointParam('{_id}', userData.user._id);
    dispatch({type: AUTH_LOGIN_SUCCESS, payload: userData});
};


```
