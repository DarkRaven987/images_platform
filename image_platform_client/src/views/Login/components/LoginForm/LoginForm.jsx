import { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { signInAction } from '../../../../store/reducers/user';

import FormInput from '../../../../components/FormInput/FormInput';
import './LoginForm.css';
import FormPasswordInput from '../../../../components/FormPasswordInput/FormPasswordInput';
import Button from '../../../../components/Button/Button';
import { getValidation, usernameField, passwordField } from './utils';

const usernameValidation = getValidation(usernameField);
const passwordValidation = getValidation(passwordField);

const LoginForm = ({ handleIsLoginForm = () => {}, handleLogin }) => {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitCallback = handleSubmit(async (data) => {
    const isLoginSuccessful = await handleLogin({
      username: data[usernameField],
      password: data[passwordField],
    });

    if (isLoginSuccessful) {
      navigate('/dashboard');
      return;
    }
    setApiError({
      message: 'Username or password is invalid',
    });
  });

  const handleSignUp = useCallback(() => {
    handleIsLoginForm(false);
  }, [handleIsLoginForm]);

  return (
    <form className="login-form" onSubmit={handleSubmitCallback}>
      <FormInput
        id="username"
        label="Username"
        type="text"
        error={apiError || errors[usernameField]}
        onChange={() => setApiError(null)}
        refer={register(usernameField, usernameValidation)}
      />
      <FormPasswordInput
        style={{ marginTop: '2em' }}
        id="password"
        label="Password"
        type="password"
        error={apiError || errors[passwordField]}
        onChange={() => setApiError(null)}
        refer={register(passwordField, passwordValidation)}
      />
      <div className="actions-container">
        <Button type="submit">Sign In</Button>

        <Button onClick={handleSignUp}>Go to Sign Up</Button>
      </div>
    </form>
  );
};

export default connect(
  (state) => state,
  (dispatch) => ({
    handleLogin: (data) => signInAction({ dispatch, ...data }),
  }),
)(LoginForm);
