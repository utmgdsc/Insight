const mongoose = require('mongoose');

const Employer = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String, // Could be a string or a nested schema for detailed location (even remote?) or loc object
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    phone: {
        type: Number,
    },
    reviews: [{
        review: {
            type: String,
        },
        rating: Number,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
});

const employer = mongoose.model('Employer', EmployerSchema);

module.exports = employer;