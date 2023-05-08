const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');


// Schema for User
const userSchema = mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, 'Please enter a firstName'],
        minLength: [2, 'firstName should be more than 2 characters'],
        maxLength: [15, 'firstName cannot exceed 15 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a lastName'],
        minLength: [2, 'lastName should be more than 2 characters'],
        maxLength: [15, 'lastName cannot exceed 15 characters']
    },
    email: {
        type: String,
        unique: true,
        validator: [validator.isEmail, 'Please enter a valid email'],
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please enter your number'],
        maxLength: [11, 'Please enter you 11 digit phone number'],
    },
    hashedPassword: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Password should be greater than 8 characters'],
    },
    role: {
        type: String,
        default: 'Guest',
    },
});



exports.User = mongoose.model('User', userSchema);
