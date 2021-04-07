const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Trailer = new Schema(
    {
        trailerMake: {type: String, required: true},
        trailerModel: {type: String, required: true},
        bodyType: {type: String, required: true},
        trailerType: {type: String, required: true},
        mechStatus: {type: String, required: true},
        maintenance: {type: String, required: true}
    },
    { timestamps: true},
    {collection: 'trailers'}
)

module.exports = mongoose.model('trailers', Trailer)