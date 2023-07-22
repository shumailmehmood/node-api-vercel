const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const itemSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    sale_price: {
        type: Number,
        default: 0
    },
    purchase_price: {
        type: Number,
        default: 0
    },
    stock_in: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
