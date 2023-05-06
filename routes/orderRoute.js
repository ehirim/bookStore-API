const { Order } = require('../models/orderModel');
const express = require('express');
const router = express.Router();


// Get List of Orders
router.get(`/`, async (req, res) => {
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(orderList);
});


// Create an Order
router.post(`/`, (req, res) => {
    const order = new Order({
        purchaseInfo: req.body.purchaseInfo,
        orderItems: req.body.orderItems,
        user: req.body.user,
    })

    order.save().then((createdOrder => {
        res.status(201).json(createdOrder)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })   
    })
});





module.exports = router;