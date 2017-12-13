'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _authAction = require('./auth.action.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
    _inherits(Login, _Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this._handleEnterPress = _this._handleEnterPress.bind(_this);
        return _this;
    }

    _createClass(Login, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            document.addEventListener("keydown", this._handleEnterPress);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener("keydown", this._handleEnterPress);
        }
    }, {
        key: '_handleEnterPress',
        value: function _handleEnterPress(e) {
            if (e.key === "Enter") {
                var _props$input = this.props.input,
                    email = _props$input.email,
                    password = _props$input.password,
                    rePassword = _props$input.rePassword;

                this.props.signupUser({ email: email, password: password, rePassword: rePassword }, this.props.onSignupSuccess, this.props.onSignupFail);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.cloneElement(this.props.signup, this.props);
        }
    }]);

    return Login;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var auth = _ref.auth;
    var input = auth.input,
        loading = auth.loading,
        error = auth.error,
        emailError = auth.emailError,
        passwordError = auth.passwordError,
        passwordMatchError = auth.passwordMatchError;

    return { input: input, loading: loading, error: error, emailError: emailError, passwordError: passwordError, passwordMatchError: passwordMatchError };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, { inputChanged: _authAction.inputChanged, signupUser: _authAction.signupUser, isUserInLocalStorage: _authAction.isUserInLocalStorage })(Login);