const express = require('express');

const userDb = require('./userDb.js')
const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    userDb.get()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'there was an error getting the users'
        })
    })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
    userDb.getUserPosts(req.params.id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        res.status(500).json({
            message: 'there was an error retrieving the posts'
        })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    userDb.remove(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json({
            message: 'there was an error deleting the user'
        })
    })
});

router.put('/:id', (req, res) => {

});

//custom middleware

// VALIDATES USER ID ON EACH REQUEST THAT REQUIRES A USER ID
function validateUserId(req, res, next) {
    const { id } = req.params
    userDb.getById(id)
    .then(user => {
        if (user) {
            req.user = user
            next()
        } else {
            res.status(400).json({message: 'invalid user id'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'there was an error processing the request'
        })
    })

};

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing user data' })
    } else if (!req.body.name) {
        res.status(400).json({ message: 'missing require name field' })
    } else {
        next()
    }
};

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing post data' })
    } else if (!req.body.text) {
        res.status(400).json({ message: 'missing required text field' })
    } else {
        next()
    }
};

module.exports = router;
