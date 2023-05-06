const mongoose = require('mongoose');


// Schema for Book
const bookSchema = mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    description: String,
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: ' '
    },
    publishedDate: {
        type: Date,
        default: Date.now,
    },
})


exports.Book = mongoose.model('Book', bookSchema);

