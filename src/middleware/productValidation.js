import Joi from 'joi';

const productSchema = Joi.object({
  productName: Joi.string().required().messages({
    'string.base': 'Product name must be a string',
    'string.empty': 'Product name is required',
    'any.required': 'Product name is required'
  }),
  price: Joi.number().integer().min(1).max(99999).required().messages({
    'number.base': 'Price must be a number',
    'number.integer': 'Price must be an integer',
    'number.min': 'Price must be at least 1',
    'number.max': "Price can't be more than 99999",
    'any.required': 'Price is required',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'any.required': 'Description is required'
  }),
  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
    'string.empty': 'Category is required',
    'any.required': 'Category is required'
  })
});

export default productSchema;