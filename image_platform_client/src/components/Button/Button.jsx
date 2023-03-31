import './Button.css';

const Button = ({ children, className = '', type = 'button', ...props }) => {
  return (
    <button
      data-testid="button-test"
      className={`button-item ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
