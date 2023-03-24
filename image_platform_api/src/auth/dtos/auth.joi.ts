import Joi = require('joi');
import { passwordRegExp } from 'src/utils/const';

export const authUserSchema = Joi.object({
  username: Joi.string().required().min(4).messages({
    'string.base': `"username" field should be of type "string"`,
    'string.required': '"username" field is required',
    'string.min': 'Username should contain at least 4 symbols',
  }),
  password: Joi.string().required().pattern(passwordRegExp).messages({
    'string.base': `"password" field should be of type "string"`,
    'string.required': '"password" field is required',
    'string.pattern.base':
      'Passsword should contain at least 8 symbols, upper and lower case letters, numbers and special symbols',
  }),
});
