const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const courierSchema = mongoose.Schema({
    uid: {
        item: {
            type: ObjectId,
            ref: 'User',
            require: true
        },
        name: {
            type: String,
        },
        vehical_no: {
            type: String,
            required: true
        },
    },
    sendItems: [{
        item_id: {
            type: ObjectId,
            ref: 'Item',
            required: true
        },
        item_name: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            require: true
        },
        sale_price: {
            type: Number,
            require: true
        },
        purchase_price: {
            type: Number,
            require: true
        },
        return_count: {
            type: Number,
            default:0
        },

    }],
    return: {
        type: Boolean,
        default: false
    },
    grandTotal: {
        type: Number,
        default: 0
    },
    commissionPer: {
        type: Number,
        default: 0
    },
    commissionedAmount: {
        type: Number,
        default: 0
    }


},
    { timestamps: true })
module.exports = mongoose.model('Courier', courierSchema);

