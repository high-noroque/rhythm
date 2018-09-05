<<<<<<< HEAD
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 4 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
=======
const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {}

  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.status = !isEmpty(data.status) ? data.status : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 4 characters'
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required'
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required'
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required'
>>>>>>> d809faefbaef6547f6e5ed70bf0fce7a827bf694
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
<<<<<<< HEAD
      errors.website = 'Not a valid URL';
=======
      errors.website = 'Not a valid URL'
>>>>>>> d809faefbaef6547f6e5ed70bf0fce7a827bf694
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
<<<<<<< HEAD
      errors.youtube = 'Not a valid URL';
=======
      errors.youtube = 'Not a valid URL'
>>>>>>> d809faefbaef6547f6e5ed70bf0fce7a827bf694
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
<<<<<<< HEAD
      errors.twitter = 'Not a valid URL';
=======
      errors.twitter = 'Not a valid URL'
>>>>>>> d809faefbaef6547f6e5ed70bf0fce7a827bf694
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
<<<<<<< HEAD
      errors.facebook = 'Not a valid URL';
=======
      errors.facebook = 'Not a valid URL'
>>>>>>> d809faefbaef6547f6e5ed70bf0fce7a827bf694
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
<<<<<<< HEAD
      errors.linkedin = 'Not a valid URL';
=======
      errors.linkedin = 'Not a valid URL'
>>>>>>> d809faefbaef6547f6e5ed70bf0fce7a827bf694
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
<<<<<<< HEAD
      errors.instagram = 'Not a valid URL';
=======
      errors.instagram = 'Not a valid URL'
>>>>>>> d809faefbaef6547f6e5ed70bf0fce7a827bf694
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
<<<<<<< HEAD
  };
};
=======
  }
}
>>>>>>> d809faefbaef6547f6e5ed70bf0fce7a827bf694
