'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Auth test', function () {
    it('should render component', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_auth2.default, null));
        expect(wrapper.find('.Auth').length).toBe(1);
    });
});