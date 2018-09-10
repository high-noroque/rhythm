const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Post = require('../../models/Post')

// @route  GET api/posts/test
// @desc   Test post route
// @access Public
router.get('/test', (request, response) => response.json({msg: "Posts works!"}))

// @route  POST api/posts
// @desc   Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: flase}), (request, response) => {
  const newPost = new Post({
    text: request.body.text,
    name: request.body.name,
    avatar: request.body.name,
    user: request.user.id
  })

  newPost.save().then(post => response.json(post))
})

module.exports = router