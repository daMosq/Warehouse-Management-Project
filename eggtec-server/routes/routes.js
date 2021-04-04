const express = require('express');
const bcrypt = require('bcrypt');
const { json } = require('express');
const userModel = require('../models/UserModel');
const app = express();
var jwt = require('jsonwebtoken');
const itemController = require('../controllers/itemController');
const UserController = require('../controllers/UserController');
const TruckController = require('../controllers/TruckController');
const TrailerController = require('../controllers/TrailerController');


// CRUD operations + routes
// GET for register

app.get('/register', async (req, res) => {
    console.log('Get registers')
    await userModel.find({}, (err, data) => {
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        if(!data.length){
            return res
            .status(404)
            .json({success: false, error: "No records"})
        }
        return res.status(200).json({success: true, data: data})
    })
    .catch(err => console.log(err)) 
})

app.get('/profile', async (req, res) => {
    console.log('Get Received')
    console.log(req.body)
    console.log(req.headers)
    console.log(req.headers.authentication)
    const userData = jwt.verify(req.headers.authentication, 'pass');
    console.log(userData.email)
    userModel.findOne({email: userData.email}, (err, result) => {
        console.log(err)
        console.log(result)
        res.json(result)
    })

})

// POST FUNCTIONS 

// POST for register

app.post('/register', async (req, res) => {
    console.log('Post Received')
    console.log(req.body)
    // generating salt password to hash and encrypt
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const registeredUser = new userModel({
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        company: req.body.company,
        password: securePassword
    })
    registeredUser.save()
    .then(data => {
        console.log(data)
        const token = jwt.sign({ email: req.body.email }, 'pass');
        res.json({...data, token})
    })
    .catch(error => {
        res.json(error)
    })
})
// POST for update profile
app.post('/update-profile', async (req, res) => {
    console.log('Post Received')
    console.log(req.body)
    console.log(req.headers)
    const userData = jwt.verify(req.headers.authentication, 'pass');
    userModel.findOneAndUpdate({email: userData.email}, {
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        company: req.body.company
    }, (err, result) => {
        console.log(err)
        console.log(result)
        res.json(result)
    })

})

// routes for items 

app.post('/item', itemController.createItem)
app.put('/item/:id', itemController.updateItem)
app.delete('/item/:id', itemController.deleteItem)
app.get('/item/:id', itemController.getItemById)
app.get('/items', itemController.getItems)

// routes for users
app.get('/users', UserController.getUsers)
app.put('/user/:id', UserController.updateUser)

// routes for trucks
app.post('/truck', TruckController.createTruck)
app.put('/truck/:id', TruckController.updateTruck)
app.delete('/truck/:id', TruckController.deleteTruck)
app.get('/truck/:id', TruckController.getTruckById)
app.get('/trucks', TruckController.getTrucks)

// routes for trailers
app.post('/trailer', TrailerController.createTrailer)
app.put('/trailer/:id', TrailerController.updateTrailer)
app.delete('/trailer/:id', TrailerController.deleteTrailer)
app.get('/trailer/:id', TrailerController.getTrailerById)
app.get('/trailers', TrailerController.getTrailers)

module.exports = app;