import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export default function ComposedTextField({
  label,
  inputType,
  fullWidth,
  className,
}) {
  return (
    <TextField
      label={label}
      type={inputType}
      fullWidth={fullWidth}
      className={className}
    />
  );
}

ComposedTextField.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.node,
};
