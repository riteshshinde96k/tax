const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
    numEmployees: {
        type: Number,
        required: true,
        min: 1
    },
    totalPay: {
        type: Number,
        required: true,
        min: 0
    },
    result: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Calculation', calculationSchema);
