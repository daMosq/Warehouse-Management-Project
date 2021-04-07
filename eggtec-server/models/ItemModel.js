const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Item = new Schema(
    {
        itemName: {type: String, required: true},
        itemID: {type: Number, required: true},
        availability: {type: String, required: true},
        quantity: {type: Number, required: true},
        unitPrice : {type: String, required: true}
        
    },
    { timestamps: true},
    {collection: 'items'}
)

module.exports = mongoose.model('items', Item)