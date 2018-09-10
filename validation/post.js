const isEmpty = require('./is-empty')

const Validator = require('validator')

module.exports = function validatePostInput(data) {
  let errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''

  if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'A post can be at least 10 characters and no more than 300'
  }

  if(Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required'
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}