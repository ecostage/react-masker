import { PropTypes } from 'react';
import memoize from 'lodash.memoize';
import range from 'lodash.range';
import reduce from 'lodash.reduce';
import { toMoney, toPattern, toNumber } from 'vanilla-masker';

const toVendorInteger = (n, props) => {
  if(!n) return 0;
  const precision = props.hasOwnProperty('precision') ? props.precision : 2;
  const multiplier = Math.pow(10, precision);
  const value = parseInt(n * multiplier).toString();

  if(value.length < precision) {
    return reduce(
      range(precision - value.length),
      (m, _) => `0${m}`,
      value,
    );
  }
  return value;
}

const numberOfDecimalPlaces = (num) => {
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}

const fromMaskedString = (str, props) => {
  const precision = props.hasOwnProperty('precision') ? props.precision : 2;
  const separator = props.separator || ',';
  const delimiter = props.delimiter || '.';
  const multiplier = Math.pow(10, precision);

  const number = str.replace(new RegExp(`\\${delimiter}`, 'g'), '')
    .replace(new RegExp(`\\${separator}`, 'g'), '.')
    .replace(new RegExp(`[^0-9\\.]`, 'g'), '');

  const shiftPlaces = numberOfDecimalPlaces(number) - precision;
  if(shiftPlaces > 0) {
    const shiftMultiplier = Math.pow(10, shiftPlaces);
    return parseFloat((number * shiftMultiplier).toFixed(precision));
  } else if(shiftPlaces < 0) {
    const unshiftDivider = Math.pow(10, -shiftPlaces);
    return parseFloat(number) / unshiftDivider;
  } else {
    return parseFloat(number);
  }
}

const Float = (props) => {
  const value = toMoney(toVendorInteger(props.value, props), props);

  const handleChange = (e) => {
    if(props.onChange) {
      props.onChange(fromMaskedString(e.target.value, props));
    }
  }

  return (
    <input
      {...props}
      onChange={handleChange}
      type="text"
      value={value}
    />
  );
};

Float.propTypes = {
  precision: PropTypes.number,
  separator: PropTypes.string,
  delimiter: PropTypes.string,
  unit: PropTypes.string,
  suffixUnit: PropTypes.string,
  zeroCents: PropTypes.bool,
  value: PropTypes.number
}

export { Float, Float as Money };
