const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    issuer: {
        type: String,
        required: true
    },
    dateIssued: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    credential: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Certificate', CertificateSchema);