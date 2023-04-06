import Joi = require('joi');

export const UploadImageSchema = Joi.object({
  image: Joi.object().messages({
    'string.base': `"image" field should be of type "object"`,
  }),
});
