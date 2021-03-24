import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export default function ComposedTextField({
  label, fullWidth, className, inputtype,
  input,
  input: {
    onChange, onFocus, onBlur, value,
  },
  meta,
  meta: {
    touched, invalid, error,
  },
}) {
  const handleChange = (evt) => {
    const vals = evt.target.value;
    onChange(vals);
  };
  return (
    <TextField
      label={label}
      type={inputtype}
      fullWidth={fullWidth}
      className={className}
      error={
        (meta && invalid && touched)
          || (meta && touched && error)
      }
      value={input && value}
      onChange={handleChange}
      onBlur={input && onBlur}
      onFocus={input && onFocus}
    />
  );
}

ComposedTextField.propTypes = {
  label: PropTypes.string.isRequired,
  inputtype: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.node,
  error: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
};

ComposedTextField.defaultProps = {
  error: false,
  fullWidth: false,
};
