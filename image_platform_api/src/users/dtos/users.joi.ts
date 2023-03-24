import Joi = require('joi');
import { passwordRegExp } from 'src/utils/const';

export const updateUserSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': `"username" field should be of type "string"`,
    'string.min': 'Username should contain at least 4 symbols',
  }),
  username: Joi.string().min(4).messages({
    'string.base': `"username" field should be of type "string"`,
    'string.min': 'Username should contain at least 4 symbols',
  }),
  password: Joi.string().pattern(passwordRegExp).messages({
    'string.base': `"password" field should be of type "string"`,
    'string.pattern.base':
      'Passsword should contain at least 8 symbols, upper and lower case letters, numbers and special symbols',
  }),
});
