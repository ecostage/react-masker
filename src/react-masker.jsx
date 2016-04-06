import { PropTypes } from 'react';
import memoize from 'lodash.memoize';
import { toMoney, toPattern, toNumber, toAlpaNumeric } from 'vanilla-masker';

const toVendorInteger = (n, props) => {
  const precision = props.hasOwnProperty('precision') ? props.precision : 2;
  const multiplier = Math.pow(10, precision);
  return parseInt(n * multiplier);
}

const fromMaskedString = (str, props) => {
  const separator = props.separator || ',';
  const delimiter = props.delimiter || '.';

  return parseFloat(
    str.replace(new RegExp(`\\${delimiter}`, 'g'), '')
    .replace(new RegExp(`\\${separator}`, 'g'), '.')
    .replace(new RegExp(`[^0-9\\.]`, 'g'), '')
  );
}

const Float = memoize((props) => {
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
});

Float.propTypes = {
  precision: PropTypes.number,
  separator: PropTypes.string,
  delimiter: PropTypes.string,
  unit: PropTypes.string,
  suffixUnit: PropTypes.string,
  zeroCents: PropTypes.bool,
  value: PropTypes.number.isRequired
}

export { Float, Float as Money };
