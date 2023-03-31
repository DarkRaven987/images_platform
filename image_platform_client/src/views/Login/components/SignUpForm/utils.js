export const usernameField = 'username';
export const passwordField = 'password';
export const confirmPasswordField = 'confirmPassword';

const validations = {
  [usernameField]: {
    required: {
      value: true,
      message: 'Username is required',
    },
    minLength: {
      value: 4,
      message: 'Username should contain at least 4 symbols',
    },
  },
  [passwordField]: {
    required: {
      value: true,
      message: 'Password is required',
    },
    pattern: {
      value: /^(?=.*\d)(?=.*[!@#$%^&*_\-+=])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message:
        'Password should contain at least 8 symbols with upper and lower case letters, numbers and special symbols',
    },
  },
  [confirmPasswordField]: {
    required: {
      value: true,
      message: 'Password confirmation is required',
    },
  },
};

export const getValidation = (field) => validations[field];

export const confirmPasswordIvalidMessage = {
  message: 'Passwords are not equal',
};
