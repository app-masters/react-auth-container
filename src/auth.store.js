import { combineReducers, applyMiddleware, createStore } from 'redux';
import AuthReducer from './auth.reducer.js';
import ReduxThunk from 'redux-thunk';

const reducers = combineReducers({
    auth: AuthReducer
});

export default createStore(
    reducers,
    {},
    applyMiddleware(
        ReduxThunk
    )
);
