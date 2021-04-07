// Shipment controller
// handles all ship data base requests from client

// shipment table
const Ship = require('../models/ShipModel');

// create shipment
createShip = async (req, res) => {

    console.log("create shipment")

    // get info
    const body = req.body
    console.log(body);

    // validate info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a shipment',
        })
    }

    // make new shipment
    const ship = new Ship(body)
    console.log(ship);
    console.log(body)

    // shipment created
    if (!ship) {
        return res.status(400).json({ success: false, error: err })
    }

    // save ship in data base
    ship
        .save()
        .then(() => {
            console.log("Shipment created");
            return res.status(201).json({
                success: true,
                id: ship._id,
                message: 'Shipment created!',
            })
        })
        .catch(error => {
            console.log("Shipment not created!");
            return res.status(400).json({
                error,
                message: 'Shipment not created!',
            })
        })
}

// update shipment

updateShip = async (req, res) => {

    console.log("update shipment")

    // get updated shipment info
    const body = req.body

    // validate shipment info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    // find shipment in data base
    Ship.findOne({ _id: req.params.id }, (err, ship) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Shipment not found!',
            })
        }

        // update existing shipment
        ship.shipmentID = body.shipmentID
        ship.clientID = body.clientID
        ship.shipAddress = body.shipAddress
        ship.productPrice = body.productPrice
        ship.deliveryCost = body.deliveryCost


        // update shipment in data base
        ship
            .save()
            .then(() => {

                // return success
                return res.status(200).json({
                    success: true,
                    id: ship._id,
                    message: 'Shipment updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Shipment not updated!',
                })
            })
    })
}

// delete shipment

deleteShip = async (req, res) => {
    console.log("delete shipment")

    // find and delete shipment in data base
    await Ship.findOneAndDelete({ _id: req.params.id }, (err, ship) => {
        if (err) {
            console.log("400 error: " + err);
            return res.status(400).json({ success: false, error: err })
        }

        // shipment not found
         if (!ship) {
             console.log("404 error: " + 'Shipment not found');
             return res
               .status(404)
               .json({ success: false, error: `Shipment not found` })
        }

        // print deleted shipment details
        console.log(ship)

        // return success
        return res.status(200).json({ success: true, data: ship })
    }).catch(err => console.log(err))
}

// get shipment by id

getShipById = async (req, res) => {

    console.log("get shipment by id")

    // find shipment by id
    await Ship.findOne({ _id: req.params.id }, (err, ship) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // shipment not found
        if (!ship) {
            return res
                .status(404)
                .json({ success: false, error: `Shipment not found` })
        }

        // return success
        return res.status(200).json({ success: true, data: ship })
    }).catch(err => console.log(err))
}

// return all shipments

getShips = async (req, res) => {

    console.log("get shipments");

    // get all shipments in table {}
    await Ship.find({}, (err, ships) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // no shipments in database
        if (!ships.length) {
            return res
                .status(404)
                .json({ success: false, error: `no shipments available` })
        }

        // return sucess
        return res.status(200).json({ success: true, data: ships })
    }).catch(err => console.log(err))
}

// export all shipment controller functions
module.exports = {
    createShip,
    updateShip,
    deleteShip,
    getShips,
    getShipById,
}
