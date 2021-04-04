const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Trailer = new Schema(
    {
        trailerName: {type: String, required: true},
        trailerInfo: {type: String, required: true},
        trailerStatus: {type: String, required: true},
        trailerCheckedOut: {type: String, required: true}
    },
    { timestamps: true},
    {collection: 'trailers'}
)

module.exports = mongoose.model('trailers', Trailer)