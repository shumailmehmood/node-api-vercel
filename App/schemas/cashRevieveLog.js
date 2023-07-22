const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const cashSchema = mongoose.Schema({
    uid: {
        item: {
            type: ObjectId,
            ref: 'User',
        },
        name: {
            type: String
        }
    },
    courierid: {
        type: ObjectId,
        ref: 'Courier'
    },
    amount: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

module.exports = mongoose.model('Cash', cashSchema);
