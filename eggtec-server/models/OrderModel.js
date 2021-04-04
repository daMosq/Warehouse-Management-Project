const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Order = new Schema(
    {
        itemName: {type: String, required: true},
        itemID: {type: String, required: true},
        availability: {type: String, required: true},
        amount: {type: String, required: true}
    },
    { timestamps: true},
    {collection: 'orders'}
)

module.exports = mongoose.model('orders', Order)