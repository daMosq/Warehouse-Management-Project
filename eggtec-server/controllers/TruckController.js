// Truck controller
// handles all truck data base requests from client

// Truck table
const Truck = require('../models/TruckModel');

// create truck
createTruck = async (req, res) => {

    console.log("create truck")

    // get info
    const body = req.body
    console.log(body);

    // validate info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a truck',
        })
    }

    // make new truck
    const truck = new Truck(body)
    console.log(truck);

    // truck created
    if (!truck) {
        return res.status(400).json({ success: false, error: err })
    }

    // save truck in data base
    truck
        .save()
        .then(() => {
            console.log("Truck created");
            return res.status(201).json({
                success: true,
                id: truck._id,
                message: 'Truck created!',
            })
        })
        .catch(error => {
            console.log("Truck not created!");
            return res.status(400).json({
                error,
                message: 'Truck not created!',
            })
        })
}

// update truck

updateTruck = async (req, res) => {

    console.log("update truck")

    // get updated truck info
    const body = req.body

    // validate truck info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    // find truck in data base
    Truck.findOne({ _id: req.params.id }, (err, truck) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Truck not found!',
            })
        }

        // update existing truck
        truck.driverName = body.driverName
        truck.vehicleModel = body.vehicleModel
        truck.licensePlate = body.licensePlate
        truck.status = body.status
        truck.estDelivery = body.estDelivery


        // update truck in data base
        truck
            .save()
            .then(() => {

                // return success
                return res.status(200).json({
                    success: true,
                    id: truck._id,
                    message: 'Truck updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message:'Truck not updated!',
                })
            })
    })
}

// delete truck

deleteTruck = async (req, res) => {
    console.log("delete truck")

    // find and delete truck in data base
    await Truck.findOneAndDelete({ _id: req.params.id }, (err, truck) => {
        if (err) {
            console.log("400 error: " + err);
            return res.status(400).json({ success: false, error: err })
        }

        // truck not found
         if (!truck) {
             console.log("404 error: " + 'Truck not found');
             return res
               .status(404)
               .json({ success: false, error: `Truck not found` })
        }

        // print deleted truck details
        console.log(truck)

        // return success
        return res.status(200).json({ success: true, data: truck })
    }).catch(err => console.log(err))
}

// get truck by id

getTruckById = async (req, res) => {

    console.log("get truck by id")

    // find truck by id
    await Truck.findOne({ _id: req.params.id }, (err, truck) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // truck not found
        if (!truck) {
            return res
                .status(404)
                .json({ success: false, error: `Truck not found` })
        }

        // return success
        return res.status(200).json({ success: true, data: truck })
    }).catch(err => console.log(err))
}

// return all trucks

getTrucks = async (req, res) => {

    console.log("get trucks");

    // get all trucks in table {}
    await Truck.find({}, (err, trucks) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // no trucks in database
        if (!trucks.length) {
            return res
                .status(404)
                .json({ success: false, error: `no trucks available` })
        }

        // return sucess
        return res.status(200).json({ success: true, data: trucks })
    }).catch(err => console.log(err))
}

// export all truck controller functions
module.exports = {
    createTruck,
    updateTruck,
    deleteTruck,
    getTrucks,
    getTruckById,
}
