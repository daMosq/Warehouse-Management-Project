const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Order = new Schema(
    {
        orderDate: {type: String, required: true},
        itemOrdered: {type: String, required: true},
        amount: {type: String, required: true},
        orderStatus: {type: String, required: true},
        schedDelivery: {type: String, required: true},
        address: {type: String, required: true}
    },
    { timestamps: true},
    {collection: 'orders'}
)

module.exports = mongoose.model('orders', Order)