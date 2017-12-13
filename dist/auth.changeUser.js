'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _authAction = require('./auth.action.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChangeUser = function (_Component) {
    _inherits(ChangeUser, _Component);

    function ChangeUser(props) {
        _classCallCheck(this, ChangeUser);

        var _this = _possibleConstructorReturn(this, (ChangeUser.__proto__ || Object.getPrototypeOf(ChangeUser)).call(this, props));

        _this.userList = window.localStorage.getItem('savedLogins') || JSON.stringify([]);
        return _this;
    }

    _createClass(ChangeUser, [{
        key: 'render',
        value: function render() {
            return _react2.default.cloneElement(this.props.changeUser, _extends({}, this.props, { options: JSON.parse(this.userList) }));
        }
    }]);

    return ChangeUser;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var auth = _ref.auth;
    var input = auth.input,
        loading = auth.loading,
        error = auth.error,
        emailError = auth.emailError,
        passwordError = auth.passwordError;

    return { input: input, loading: loading, error: error, emailError: emailError, passwordError: passwordError };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, { onUserChange: _authAction.onUserChange })(ChangeUser);