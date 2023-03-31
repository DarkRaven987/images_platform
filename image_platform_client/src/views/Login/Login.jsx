import { useState } from 'react';

import { Logo } from '../../assets/icons';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import './Login.css';

const LoginView = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="login-container">
      <header className="login-header">
        <Logo className="login-logo" style={{ color: '#61dafb' }} />
        <span className="login-title">
          {isLoginForm ? 'Sign In' : 'Sign Up'}
        </span>
      </header>

      <div className="forms-container">
        {isLoginForm ? (
          <LoginForm handleIsLoginForm={setIsLoginForm} />
        ) : (
          <SignUpForm handleIsLoginForm={setIsLoginForm} />
        )}
      </div>
    </div>
  );
};

export default LoginView;
