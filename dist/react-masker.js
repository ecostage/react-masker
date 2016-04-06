'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _lodashMemoize = require('lodash.memoize');

var _lodashMemoize2 = _interopRequireDefault(_lodashMemoize);

var _vanillaMasker = require('vanilla-masker');

var toVendorInteger = function toVendorInteger(n, props) {
  var precision = props.hasOwnProperty('precision') ? props.precision : 2;
  var multiplier = Math.pow(10, precision);
  return parseInt(n * multiplier);
};

var fromMaskedString = function fromMaskedString(str, props) {
  var separator = props.separator || ',';
  var delimiter = props.delimiter || '.';

  return parseFloat(str.replace(new RegExp('\\' + delimiter, 'g'), '').replace(new RegExp('\\' + separator, 'g'), '.').replace(new RegExp('[^0-9\\.]', 'g'), ''));
};

var Float = (0, _lodashMemoize2['default'])(function (props) {
  var value = (0, _vanillaMasker.toMoney)(toVendorInteger(props.value, props), props);
  var handleChange = function handleChange(e) {
    if (props.onChange) {
      props.onChange(fromMaskedString(e.target.value, props));
    }
  };

  return React.createElement('input', _extends({}, props, {
    onChange: handleChange,
    type: 'text',
    value: value
  }));
});

Float.propTypes = {
  precision: _react.PropTypes.number,
  separator: _react.PropTypes.string,
  delimiter: _react.PropTypes.string,
  unit: _react.PropTypes.string,
  suffixUnit: _react.PropTypes.string,
  zeroCents: _react.PropTypes.bool,
  value: _react.PropTypes.number.isRequired
};

exports.Float = Float;
exports.Money = Float;