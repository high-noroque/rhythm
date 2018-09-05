const isEmpty = require('./is-empty')

const Validator = require('validator')

module.exports = function validateEducationInput(data) {
  let errors = {}

  data.school = !isEmpty(data.school) ? data.school : ''
  data.degree = !isEmpty(data.degree) ? data.degree : ''
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : ''

  if(Validator.isEmpty(data.school)) {
    errors.school = 'School field is required'
  }

  if(Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required'
  }

  if(Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required'
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}