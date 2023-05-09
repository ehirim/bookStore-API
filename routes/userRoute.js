const { User } = require('../models/userModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');



// Get List of Users
router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-hashedPassword ');

    if(!userList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(userList);
});

// User SignUp
router.post(`/signup`, async (req, res) => {
    const person = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        hashedPassword: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
    })

    await person.save();

    if(!person) {
        return res.status(400).send('The user cannot be created!');
    }
    res.status(201).send('A new user was created');
});


// Get Single User
router.get(`/:id`, async (req, res) => {
    const userList = await User.findById(req.params.id).select('-hashedPassword');

    if(!userList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(userList);
});

// Update a User
router.put(`/:id`, async (req, res) => {
    try {
        const userList = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json({
            success: true,
            userList
        })

        
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        });

    }
})


// Delete a User
router.delete(`/:id`, async (req, res) => {
    try {
        const userList = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "User Successfully Deleted"
        })

        
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        });

    }
})


// Login A User
router.post('/login', async (req, res) => {
    const person = await User.findOne({email: req.body.email})
    const secret = process.env.secret;

    if(!person) {
        return res.status(400).send('The user not found');
    }

    if(person && bcrypt.compareSync(req.body.password, person.hashedPassword)) {
        const token = jwt.sign(
            {
                personId: person.id
            },
            secret,
            {expiresIn: '3d'}
        )
        res.status(200).send({person: person.email, token: token})
    } else {
        res.status(400).send('username or password is incorrect');
    }
});




module.exports = router;