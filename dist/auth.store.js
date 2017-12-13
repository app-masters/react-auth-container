'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _authReducer = require('./auth.reducer.js');

var _authReducer2 = _interopRequireDefault(_authReducer);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = (0, _redux.combineReducers)({
    auth: _authReducer2.default
});

exports.default = (0, _redux.createStore)(reducers, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default));