const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Shipment = new Schema(
    {
        shipmentID: {type: Number, required: true},
        clientID: {type: Number, required: true},
        shipAddress: {type: String, required: true},
        productPrice: {type: String, required: true},
        deliveryCost: {type: String, required: true}
    },
    { timestamps: true},
    {collection: 'ships'}
)

module.exports = mongoose.model('ships', Shipment)