const { Book } = require('../models/bookModel');
const express = require('express');
const router = express.Router();


// Get List of Books
router.get(`/`, async (req, res) => {
    const bookList = await Book.find();

    if(!bookList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(bookList);
});




// Post a Book
router.post(`/`, (req, res) => {
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        publisher: req.body.publisher,
        rating: req.body.rating,
        image: req.body.image,
        publishedDate: req.body.publishedDate,
    })

    book.save().then((createdBook => {
        res.status(201).json(createdBook)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })   
    })
});



module.exports = router;