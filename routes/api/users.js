const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')

// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get('/test', (request, response) => response.json({msg: "Users works!"}))

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post('/register', (request, response) => {
  const { errors, isValid } = validateRegisterInput(request.body)

  // Check validation
  if(!isValid) {
    return response.status(400).json(errors)
  }

  User
    .findOne({ email: request.body.email })
    .then(user => {
      if(user) {
        errors.email = 'Email already exists'
        return response.status(400).json(errors)
      } else {
        const avatar = gravatar.url(request.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          default: 'mm', // Default
        })

        const newUser = new User({
          name: request.body.name,
          email: request.body.email,
          avatar,
          password: request.body.password,
        })

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if(error) throw error
            newUser.password = hash
            newUser
              .save()
              .then(user => response.json(user))
              .catch(error => console.log(error))
          })
        })
      }
    })
})

// @route  GET api/users/login
// @desc   Login user / Returning the JWT Token
// @access Public

router.post('/login', (request, response) => {
  const { errors, isValid } = validateLoginInput(request.body)

  // Check validation
  if(!isValid) {
    return response.status(400).json(errors)
  }

  const email = request.body.email
  const password = request.body.password

  // Find user by email
  User.findOne({email: email})
    .then(user => {
      // Check for user
      if(!user) {
        errors.email = 'User not found'
        return response.status(404).json(errors)
      }

      // Check password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User Matched
            const payload = { id: user.id, name: user.name, avatar: user.avatar } // Create JWT Payload

            // Sign the token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (error, token) => {
                response.json({
                  success: true,
                  token: 'Bearer ' + token
                })
            })
          } else {
            errors.password = 'Password is incorrect'
            return response.status(400).json(errors)
          }
        })
    })
})

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (request, response) => {
  response.json({
    id: request.user.id,
    email: request.user.email,
    name: request.user.name
  })
})

module.exports = router