import { useState, useCallback } from 'react';
import { Visible, NonVisible } from '../../assets/icons';
import './FormPasswordInput.css';

const FormPasswordInput = ({
  value = '',
  onChange = () => {},
  id,
  label,
  className = '',
  style,
  error,
  refer = {},
}) => {
  const { onChange: referOnChange, ...rest } = refer;

  const [val, setVal] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback(
    (e) => {
      e.preventDefault();
      setVal(e?.target?.value);
      onChange(e?.target?.value);
      referOnChange && referOnChange(e);
    },
    [onChange, referOnChange],
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`form-password-input ${className}`}
      style={style}
      data-testid="password-input-container"
    >
      <label htmlFor={id} data-testid="password-input-label">
        {label}
      </label>

      <div className="input-with-icon-container">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={val}
          onChange={handleChange}
          data-testid="password-input"
          {...rest}
        />
        <div
          className="show-password-icon-container"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          data-testid="password-input-icon-container"
        >
          {showPassword ? (
            <NonVisible data-testid="password-input-icon-non-visible" />
          ) : (
            <Visible data-testid="password-input-icon-visible" />
          )}
        </div>
      </div>
      {!!error && (
        <p className="error-message" data-testid="password-input-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormPasswordInput;
