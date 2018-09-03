const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

// Load User model
const User = require('../../models/user')

// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get('/test', (request, response) => response.json({msg: "Users works!"}))

// @route  GET api/users/register
// @desc   Register user
// @access Public
router.post('/register', (request, response) => {
  User
    .findOne({ email: request.body.email })
    .then(user => {
      if(user) {
        return response.status(400).json({ email: 'Email already exists' })
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
  const email = request.body.email
  const password = request.body.password

  // Find user by email
  User.findOne({email: email})
    .then(user => {
      // Check for user
      if(!user) {
        return response.status(404).json({email: 'User not found'})
      }

      // Check password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            response.json({msg: 'Success'})
          } else {
            return response.status(400).json({password: 'Password is incorrect'})
          }
        })
    })
})

module.exports = router