const mongoose = require('mongoose')

const userTemplate = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type:String, 
        required: true,
        index: {
            unique: true, 
        }
        //match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    company: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // triggered when user is created
    date: {
        type: Date,
        default: Date.now
    }
    
}, {collection: 'users'})

module.exports = mongoose.model('users', userTemplate)