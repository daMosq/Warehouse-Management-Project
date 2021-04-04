const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Shipment = new Schema(
    {
        orderNumber: {type: Number, required: true},
        orderDate: {type: Date, required: true},
        status: {type: String, required: true},
        date: {type: String, required: true}
    },
    { timestamps: true},
    {collection: 'shipments'}
)

module.exports = mongoose.model('shipments', Shipment)