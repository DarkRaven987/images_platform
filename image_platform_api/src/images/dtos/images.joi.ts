import Joi = require('joi');

export const UploadImageSchema = Joi.object({
  original_url: Joi.string().required().messages({
    'string.base': `"original_url" field should be of type "string"`,
    'string.required': '"original_url" field is required',
  }),
  original_key: Joi.string().required().messages({
    'string.base': `"original_key" field should be of type "string"`,
    'string.required': '"original_key" field is required',
  }),
  resized_50_url: Joi.string().required().messages({
    'string.base': `"resized_50_url" field should be of type "string"`,
    'string.required': '"resized_50_url" field is required',
  }),
  resized_50_key: Joi.string().required().messages({
    'string.base': `"resized_50_key" field should be of type "string"`,
    'string.required': '"resized_50_key" field is required',
  }),
  resized_25_url: Joi.string().required().messages({
    'string.base': `"resized_25_url" field should be of type "string"`,
    'string.required': '"resized_25_url" field is required',
  }),
  resized_25_key: Joi.string().required().messages({
    'string.base': `"resized_25_key" field should be of type "string"`,
    'string.required': '"resized_25_key" field is required',
  }),
});
