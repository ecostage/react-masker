'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _lodashMemoize = require('lodash.memoize');

var _lodashMemoize2 = _interopRequireDefault(_lodashMemoize);

var _lodashRange = require('lodash.range');

var _lodashRange2 = _interopRequireDefault(_lodashRange);

var _lodashReduce = require('lodash.reduce');

var _lodashReduce2 = _interopRequireDefault(_lodashReduce);

var _vanillaMasker = require('vanilla-masker');

var toVendorInteger = function toVendorInteger(n, props) {
  if (!n) return 0;
  var precision = props.hasOwnProperty('precision') ? props.precision : 2;
  var multiplier = Math.pow(10, precision);
  var value = parseInt(n * multiplier).toString();

  if (value.length < precision) {
    return (0, _lodashReduce2['default'])((0, _lodashRange2['default'])(precision - value.length), function (m, _) {
      return '0' + m;
    }, value);
  }
  return value;
};

var numberOfDecimalPlaces = function numberOfDecimalPlaces(num) {
  var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  return Math.max(0,
  // Number of digits right of decimal point.
  (match[1] ? match[1].length : 0) - (
  // Adjust for scientific notation.
  match[2] ? +match[2] : 0));
};

var fromMaskedString = function fromMaskedString(str, props) {
  var precision = props.hasOwnProperty('precision') ? props.precision : 2;
  var separator = props.separator || ',';
  var delimiter = props.delimiter || '.';
  var multiplier = Math.pow(10, precision);

  var number = str.replace(new RegExp('\\' + delimiter, 'g'), '').replace(new RegExp('\\' + separator, 'g'), '.').replace(new RegExp('[^0-9\\.]', 'g'), '');

  var shiftPlaces = numberOfDecimalPlaces(number) - precision;
  if (shiftPlaces > 0) {
    var shiftMultiplier = Math.pow(10, shiftPlaces);
    return parseFloat((number * shiftMultiplier).toFixed(precision));
  } else if (shiftPlaces < 0) {
    var unshiftDivider = Math.pow(10, -shiftPlaces);
    return parseFloat(number) / unshiftDivider;
  } else {
    return parseFloat(number);
  }
};

var Float = function Float(props) {
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
};

Float.propTypes = {
  precision: _react.PropTypes.number,
  separator: _react.PropTypes.string,
  delimiter: _react.PropTypes.string,
  unit: _react.PropTypes.string,
  suffixUnit: _react.PropTypes.string,
  zeroCents: _react.PropTypes.bool,
  value: _react.PropTypes.number
};

exports.Float = Float;
exports.Money = Float;