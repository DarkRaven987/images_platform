export const usernameField = 'username';
export const passwordField = 'password';

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
};

export const getValidation = (field) => validations[field];
