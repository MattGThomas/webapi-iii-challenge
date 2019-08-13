const express = require('express');

const server = express();

server.use(logger)

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
