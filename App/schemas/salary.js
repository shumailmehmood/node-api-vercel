const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const salarySchema = mongoose.Schema({
    uid: {
        item: {
            type: ObjectId,
            ref: 'User',
        },
        name: {
            type: String
        }
    },
    amount: {
        type: Number,
        default: 0
    },
    addToRemaining: {
        type: Boolean,
        default: false
    },
    recieved: {
        type: Boolean,
        default: false
    },
    salaryMonth: {
        type: String
    },
    remaining: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Salary', salarySchema);
