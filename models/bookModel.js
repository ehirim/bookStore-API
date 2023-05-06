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
        type: String,
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
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    publishedDate: {
        type: Date,
        default: Date.now,
    },
})


exports.Book = mongoose.model('Book', bookSchema);

