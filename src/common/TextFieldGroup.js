import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ field, value, label, error, type, onChange, checkUserExists }) => {
  return (
    <div className={classnames('field', {error: !!error})}>
      <label htmlFor={field}>{label}</label>
      <input
        name={field}
        onBlur={checkUserExists}
        value={value}
        onChange={onChange}
        id={field}
      />
      {error && <span>{error}</span>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
