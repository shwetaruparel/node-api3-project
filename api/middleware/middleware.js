const userDb = require("../users/users-model");
const postDb = require("../posts/posts-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log("I am logger!!");
  next();
}

async function validateUserId (req, res, next) {
  // DO YOUR MAGIC
  try{
      const user = await userDb.getById(req.params.id);
      if(user){
        req.user = user;
        next();
      }
      else{
        next({
          status:404,
          message:"user not found"
        })
      }
  }
  catch(err){
      next(err);
  }
}

 function validateUser(req, res, next) {
  // DO YOUR MAGIC
    //if wanted get all users and check for the unique name 
    if(!req.body.name){
      next({
        status:400,
        message: "missing required name field" 
      })
    }
    else{
      next();
    }
}

 function validatePost(req, res, next) {

  // DO YOUR MAGIC
  if(!req.body.text){
    next({
      status:400,
      message: "missing required text field" 
    })
  }
  else{
    next();
  }
  
}
const errorHandling = (err, req, res, next) => { // eslint-disable-line
  const status = err.status || 500
  res.status(status).json({
    message: err.message,
  })
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  errorHandling
}
