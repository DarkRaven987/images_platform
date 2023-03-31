import { useState, useCallback } from 'react';
import './FormInput.css';

const FormInput = ({
  value = '',
  onChange = () => {},
  type = 'text',
  id,
  label,
  className = '',
  style,
  error,
  refer = {},
}) => {
  const { onChange: referOnChange, ...rest } = refer;

  const [val, setVal] = useState(value);

  const handleChange = useCallback(
    (e) => {
      setVal(e?.target?.value);
      onChange(e.target.value);
      refer?.onChange && refer?.onChange(e);
    },
    [onChange, refer],
  );

  return (
    <div
      className={`form-input ${className}`}
      style={style}
      data-testid="form-input-container"
    >
      <label htmlFor={id} data-testid="form-input-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={val}
        onChange={handleChange}
        data-testid="form-input"
        {...rest}
      />
      {!!error && (
        <p data-testid="form-input-error" className="error-message">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
