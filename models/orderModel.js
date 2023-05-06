const mongoose = require('mongoose');


// Schema for Order
const orderSchema = mongoose.Schema ({
    purchaseInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        }
    },
    orderItems: [
        {
            book: {
                type: mongoose.Schema.ObjectId,
                ref: 'Book',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'true'
    },
    
})


exports.Order = mongoose.model('Order', orderSchema);