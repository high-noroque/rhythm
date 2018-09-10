const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Post model
const Post = require('../../models/Post')

// Validation
const validatePostInput = require('../../validation/post')

// @route  GET api/posts/test
// @desc   Test post route
// @access Public
router.get('/test', (request, response) => response.json({msg: "Posts works!"}))

// @route  GET api/posts
// @desc   Get posts
// @access Public
router.get('/', (request, response) => {
  Post
    .find()
    .sort({ date: -1})
    .then(posts => response.json(posts))
    .catch(error => response.status(404).json({nopostsfound: 'No posts found'}))
})

// @route  GET api/posts/:id
// @desc   Get post by id
// @access Public
router.get('/:id', (request, response) => {
  Post
    .findById(request.params.id)
    .then(post => response.json(post))
    .catch(error => response.status(404).json({nopostfound: 'No post found with that ID'}))
})

// @route  POST api/posts
// @desc   Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false}), (request, response) => {
  const { errors, isValid } = validatePostInput(request.body)

  //Check Validation
  if(!isValid) {
    //If any errors, send 400 with errors object
    return response.status(400).json(errors)
  }

  const newPost = new Post({
    text: request.body.text,
    name: request.body.name,
    avatar: request.body.avatar,
    user: request.user.id
  })

  newPost.save().then(post => response.json(post))
})

module.exports = router