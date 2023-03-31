import { useState, useCallback } from 'react';

import FormInput from '../../../../components/FormInput/FormInput';
import './SignUpForm.css';
import FormPasswordInput from '../../../../components/FormPasswordInput/FormPasswordInput';
import Button from '../../../../components/Button/Button';
import {
  confirmPasswordField,
  confirmPasswordIvalidMessage,
  getValidation,
  passwordField,
  usernameField,
} from './utils';
import { useForm } from 'react-hook-form';
import { signUpAction } from '../../../../store/reducers/user';

const usernameValidation = getValidation(usernameField);
const passwordValidation = getValidation(passwordField);
const confirmPasswordValidation = getValidation(confirmPasswordField);

const SignUpForm = ({ handleIsLoginForm = () => {} }) => {
  const [apiError, setApiError] = useState(null);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitCallback = handleSubmit(async (data) => {
    const hasRegistered = await signUpAction({
      username: data[usernameField],
      password: data[passwordField],
    });

    if (hasRegistered) {
      goToLoginHandler();
      return;
    }
    setApiError({
      message: 'User with such username is registered',
    });
  });

  const goToLoginHandler = useCallback(() => {
    handleIsLoginForm(true);
  }, [handleIsLoginForm]);

  return (
    <form className="sign-up-form" onSubmit={handleSubmitCallback}>
      <FormInput
        id="username"
        onChange={() => setApiError(null)}
        error={apiError || errors[usernameField]}
        label="Username"
        type="text"
        refer={register(usernameField, usernameValidation)}
      />
      <FormPasswordInput
        id="password"
        onChange={() => setApiError(null)}
        label="Password"
        style={{ marginTop: '2em' }}
        error={errors[passwordField]}
        refer={register(passwordField, passwordValidation)}
      />
      <FormPasswordInput
        id="confirm-password"
        onChange={() => setApiError(null)}
        label="Confirm Password"
        style={{ marginTop: '2em' }}
        error={
          errors[confirmPasswordField]?.type === 'validate'
            ? confirmPasswordIvalidMessage
            : errors[confirmPasswordField]
        }
        refer={register(confirmPasswordField, {
          ...confirmPasswordValidation,
          validate: (val) => val === getValues('password'),
        })}
      />
      <div className="actions-container">
        <Button type="submit">Sign Up</Button>

        <Button onClick={goToLoginHandler}>Go to Sign In</Button>
      </div>
    </form>
  );
};

export default SignUpForm;
