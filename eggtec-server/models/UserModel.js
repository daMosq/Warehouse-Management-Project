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