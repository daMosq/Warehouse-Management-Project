const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Truck = new Schema(
    {
        driverName: {type: String, required: true},
        route: {type: String, required: true},
        status: {type: String, required: true},
        eta: {type: String, required: true}
    },
    { timestamps: true},
    {collection: 'trucks'}
)

module.exports = mongoose.model('trucks', Truck)