const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;
const transactionSchema = mongoose.Schema({
    uid: {
        item: {
            type: ObjectId,
            ref: 'User'
        }
    },
    amount_payed: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
module.exports = mongoose.model('Transaction', transactionSchema);
