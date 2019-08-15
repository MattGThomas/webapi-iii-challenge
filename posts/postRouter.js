const express = require('express');

const postDB = require('./postDb.js')
const router = express.Router();

router.get('/', (req, res) => {
    postDB.get()
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(500).json({
            message: 'there was an error retrieving the posts'
        })
    })
});

router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
    const { id } = req.params
    postDB.remove(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json({
            message: 'there was an error deleting the post'
        })
    })
});

router.put('/:id', validatePostId, (req, res) => {
    const postChanges = req.body
    const { id } = req.params
    postDB.update(id, postChanges)
    .then(updatedPost => {
        res.status(200).json(updatedPost)
    })
    .catch(error => {
        res.status(500).json({
            message: 'there was an error updating the post'
        })
    })
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params
    postDB.getById(id)
    .then(post => {
        if(post) {
            req.post = post
            next()
        } else {
            res.status(400).json({
                message: 'invalid post id'
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'there was an error processing the request'
        })
    })
};

module.exports = router;