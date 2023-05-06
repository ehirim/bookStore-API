const { User } = require('../models/userModel');
const express = require('express');
const router = express.Router();


// Get List of Users
router.get(`/`, async (req, res) => {
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(userList);
});

// Create a User
router.post(`/`, (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        role: req.body.role,
    })

    user.save().then((createdUser => {
        res.status(201).json(createdUser)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })   
    })
});




module.exports = router;