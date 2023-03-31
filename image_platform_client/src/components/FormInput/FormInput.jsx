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
  refer,
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
    <div className={`form-input ${className}`} style={style}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={val}
        onChange={handleChange}
        {...rest}
      />
      {!!error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

export default FormInput;
