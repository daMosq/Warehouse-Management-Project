const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Item = new Schema(
    {
        name: {type: String, required: true},
        availability: {type: String, required: true},
        amount: {type: Number, required: true},
        itemID: {type: Number, required: true}
    },
    { timestamps: true},
    {collection: 'items'}
)

module.exports = mongoose.model('items', Item)