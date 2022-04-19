const mongoose = require('mongoose');

const excuseSchema = mongoose.Schema({
    excuse: {
        type: String,
        required: [true, 'Please add an excuse.']
    },
    count: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Excuse', excuseSchema);