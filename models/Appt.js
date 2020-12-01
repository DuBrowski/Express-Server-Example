const mongoose = require('mongoose');

const ApptSchema = new mongoose.Schema({
    spot: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    },
    arrvTime: {
        type: String,
        default: ''
    },
    tech: {
        type: String,
        default: 'NEED'
    },
    room: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

});

module.exports = Appt = mongoose.model('appt', ApptSchema);