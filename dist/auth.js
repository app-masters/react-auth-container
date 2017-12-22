'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _authLogin = require('./auth.login.js');

var _authLogin2 = _interopRequireDefault(_authLogin);

var _authSignup = require('./auth.signup.js');

var _authSignup2 = _interopRequireDefault(_authSignup);

var _authChangeUser = require('./auth.changeUser.js');

var _authChangeUser2 = _interopRequireDefault(_authChangeUser);

var _auth = require('./auth.action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Auth = function (_Component) {
    _inherits(Auth, _Component);

    function Auth() {
        _classCallCheck(this, Auth);

        return _possibleConstructorReturn(this, (Auth.__proto__ || Object.getPrototypeOf(Auth)).apply(this, arguments));
    }

    _createClass(Auth, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.props.isUserAuthenticated(this.props.onLoginSuccess, this.props.onLoginFail);
        }
    }, {
        key: 'parsePath',
        value: function parsePath() {
            var path = this.props.path;
            if (path.indexOf('signup/') > -1) {
                path = path.replace('signup/', '');
                console.log('path', path);
            }
            if (path.indexOf('signup') > -1) {
                path = path.replace('signup', '');
                console.log('path', path);
            }
            if (path.indexOf('login/') > -1) {
                path = path.replace('login/', '');
                console.log('path', path);
            }
            if (path.indexOf('login') > -1) {
                path = path.replace('login', '');
                console.log('path', path);
            }
            return path;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            console.log(this.props);
            this.parsePath();
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_reactRouter.Route, { location: this.props.location, exact: true, path: this.parsePath() || '/', render: function render() {
                        return _this2.props.isAuthenticated ? _react2.default.createElement(_reactRouter.Redirect, { to: '/' }) : _react2.default.createElement(_authLogin2.default, _this2.props);
                    }
                }),
                _react2.default.createElement(_reactRouter.Route, { location: this.props.location, exact: true, path: '/signup', render: function render() {
                        return _this2.props.isAuthenticated ? _react2.default.createElement(_reactRouter.Redirect, { to: '/' }) : _react2.default.createElement(_authSignup2.default, _this2.props);
                    } }),
                _react2.default.createElement(_reactRouter.Route, { location: this.props.location, exact: true, path: '/changeuser', render: function render() {
                        return _this2.props.isAuthenticated ? _react2.default.createElement(_authChangeUser2.default, _this2.props) : _react2.default.createElement(_reactRouter.Redirect, { to: '/' });
                    } })
            );
        }
    }]);

    return Auth;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var auth = _ref.auth;

    return {
        isAuthenticated: auth.isAuthenticated
    };
};
var mapActions = function mapActions(dispatch) {
    return {
        isUserAuthenticated: function isUserAuthenticated(onLoginSuccess, onLoginFail) {
            return dispatch((0, _auth.isUserInLocalStorage)(onLoginSuccess, onLoginFail));
        }
    };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapActions)(Auth);