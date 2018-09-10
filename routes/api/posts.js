const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Post model
const Post = require('../../models/Post')

// Post model
const Profile = require('../../models/Profile')

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

// @route  DELETE api/posts/:id
// @desc   Delete post
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false}), (request, response) => {
  Profile
    .findOne({ user: request.user.id })
    .then(profile => {
      Post
        .findById(request.params.id)
        .then(post => {
          // Check for post owner
          if(post.user.toString() !== request.user.id) {
            return response.status(401).json({ notauthorized: 'Why in the fuck would you want to delete a post that\'s not even yours! Get fucked!' })
          }

          // Delete
          post
            .remove()
            .then(() => response.json({ success: true }))
            .catch(error => response.status(404).json({ postnotfound: 'No post found'}))
        })
    })
})

// @route  POST api/posts/like/:id
// @desc   Like post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false}), (request, response) => {
  Profile
    .findOne({ user: request.user.id })
    .then(profile => {
      Post
        .findById(request.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === request.user.id).length > 0) {
            return response.status(400).json({ alreadyliked: 'You already like this post'})
          }

          // Add user id to the likes array
          post.likes.unshift({ user: request.user.id })

          post.save().then(post => response.json(post))
        })
        .catch(error => response.status(404).json({ postnotfound: 'No post found'}))
        })
  }
)

// @route  POST api/posts/unlike/:id
// @desc   Unlike post
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false}), (request, response) => {
    Profile
      .findOne({ user: request.user.id })
      .then(profile => {
        Post
          .findById(request.params.id)
          .then(post => {
            if(post.likes.filter(like => like.user.toString() === request.user.id).length === 0) {
              return response.status(400).json({ notliked: 'How in the fuck do you expect to unlike a post that you didn\'t like in the first place?!?!' })
            }

            // Get remove index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(request.user.id)

            // Splice it out of the array
            post.likes.splice(removeIndex, 1)

            // Sava
            post.save().then(post => response.json(post))
          })
          .catch(error => response.status(404).json({ postnotfound: 'No post found'}))
      })
  }
)

module.exports = router