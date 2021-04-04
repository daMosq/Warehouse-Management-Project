// Trailer controller
// handles all trailer data base requests from client

// Trailer table
const Trailer = require('../models/TrailerModel');

// create trailer

createTrailer = async (req, res) => {

    console.log("create trailer")

    // get info
    const body = req.body
    console.log(body);

    // validate info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a trailer',
        })
    }

    // make new trailer
    const trailer = new Trailer(body)
    console.log(trailer);

    // trailer created
    if (!trailer) {
        return res.status(400).json({ success: false, error: err })
    }

    // save trailer in data base
    trailer
        .save()
        .then(() => {
            console.log("Trailer created");
            return res.status(201).json({
                success: true,
                id: trailer._id,
                message: 'Trailer created!',
            })
        })
        .catch(error => {
            console.log("Trailer not created!");
            return res.status(400).json({
                error,
                message: 'Trailer not created!',
            })
        })
}

// update trailer

updateTrailer = async (req, res) => {

    console.log("update trailer")

    // get updated trailer info
    const body = req.body

    // validate trailer info
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    // find trailer in data base
    Trailer.findOne({ _id: req.params.id }, (err, trailer) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Trailer not found!',
            })
        }

        // update existing trailer
        trailer.trailerName = body.trailerName
        trailer.trailerInfo = body.trailerInfo
        trailer.trailerStatus = body.trailerStatus
        trailer.trailerCheckedOut = body.trailerCheckedOut


        // update trailer in data base
        trailer
            .save()
            .then(() => {

                // return success
                return res.status(200).json({
                    success: true,
                    id: trailer._id,
                    message: 'Trailer updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Trailer not updated!',
                })
            })
    })
}

// delete trailer

deleteTrailer = async (req, res) => {
    console.log("delete trailer")

    // find and delete trailer in data base
    await Trailer.findOneAndDelete({ _id: req.params.id }, (err, trailer) => {
        if (err) {
            console.log("400 error: " + err);
            return res.status(400).json({ success: false, error: err })
        }

        // trailer not found
         if (!trailer) {
             console.log("404 error: " + 'Trailer not found');
             return res
               .status(404)
               .json({ success: false, error: `Trailer not found` })
        }

        // print deleted trailer details
        console.log(trailer)

        // return success
        return res.status(200).json({ success: true, data: trailer })
    }).catch(err => console.log(err))
}

// get trailer by id

getTrailerById = async (req, res) => {

    console.log("get trailer by id")

    // find trailer by id
    await Trailer.findOne({ _id: req.params.id }, (err, trailer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // trailer not found
        if (!trailer) {
            return res
                .status(404)
                .json({ success: false, error: `Trailer not found` })
        }

        // return success
        return res.status(200).json({ success: true, data: trailer })
    }).catch(err => console.log(err))
}

// return all trailers

getTrailers = async (req, res) => {

    console.log("get trailers");

    // get all trailers in table {}
    await Trailer.find({}, (err, trailers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        // no trailers in database
        if (!trailers.length) {
            return res
                .status(404)
                .json({ success: false, error: `no trailers available` })
        }

        // return sucess
        return res.status(200).json({ success: true, data: trailers })
    }).catch(err => console.log(err))
}

// export all trailer controller functions
module.exports = {
    createTrailer,
    updateTrailer,
    deleteTrailer,
    getTrailers,
    getTrailerById,
}
