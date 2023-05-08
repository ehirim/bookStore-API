const { Book } = require('../models/bookModel');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const multer = require('multer');


const  FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid image type');

        if(isValid) {
            uploadError = null
        }
        cb(uploadError, 'bookCover/uploads')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })


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


// Get Single Book
router.get(`/:id`, async (req, res) => {
    const bookList = await Book.findById(req.params.id);

    if(!bookList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(bookList);
});



// Post a Book
router.post(`/`, uploadOptions.single('image'), auth, (req, res) => {

    const file = req.file;
    if(!file) return res.status(400).send('No Image in the request')
    
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/bookCover/uploads/`;
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        publisher: req.body.publisher,
        rating: req.body.rating,
        image: `${basePath}${fileName}`,  
        publishedDate: req.body.publishedDate,
        postedBy: req.body.postedBy,
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

// Update a Book
router.put(`/:id`, async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Book Id')
    }
    const bookList = await Book.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            publisher: req.body.publisher,
            rating: req.body.rating,
            image: req.body.image,
            publishedDate: req.body.publishedDate,
            postedBy: req.body.postedBy
        },
        { new: true }
        )

    if(!bookList) {
        return res.status(500).send('cannot update book!')
        }

    res.send(bookList);
});

// Delete A Book
router.delete('/:id', async (req, res) => {
    try {
        const bookList = await Book.find();
        const deletedResponse = await Book.findByIdAndDelete(req.params.id).exec();

        if (!deletedResponse) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'deleted', data: deletedResponse });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'There was an error' });
    }
});


module.exports = router;