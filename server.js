const express = require('express');

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')
const server = express();

const bodyParser = express.json()

server.use(bodyParser)
server.use(logger)
server.use('/users', userRouter)
server.use('/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

// LOGGER FUNCTION
function logger(req, res, next) {
  console.log(`a ${req.method} request was made to ${req.url} @ ${new Date()}`)
  next()
};


module.exports = server;
