const express = require('express');
const {
  validateUserId,
  validateUser,
  validatePost
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const users = require("./users-model");
const posts = require("../posts/posts-model");
const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  //console.log("I am in get Users");
  users.get()
  .then(data=>{
    res.json(data);
  })
  .catch(next)
  })


router.get('/:id',validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  res.json(req.user);
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  users.insert(req.body)//body has user(name)
  .then(user=>{
    res.status(201).json(user);
  })
  .catch(next);
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser,  (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  users.update(req.params.id, req.body)
  .then(user=>{
    res.status(201).json(user);
  })
  .catch(next);
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId , (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  users.remove(req.params.id)
  .then(()=>{
    res.status(200).json(req.user);
  })
  .catch(next);
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  posts.getByUserId(req.params.id)
  .then(post=>{
    res.status(200).json(post);
  })
  .catch(next)
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  req.body.user_id = req.params.id;
  posts.insert(req.body)
  .then(post=>{
    res.status(201).json(post);
  })
  .catch(next)
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid//validatePost()
});

// do not forget to export the router
module.exports = router;