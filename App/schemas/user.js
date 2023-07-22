const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    vehicle_no: {
        type: String,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    salary_type: {
        catagory: {
            type: String,
            enum: ['base', 'percent']
        },
        amount: {
            type: Number,
            default: 0,
            required: true
        }
    },
    remainingAmount: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});
userSchema.methods.generateToken = function () {
    const token = (jwt.sign({ id: this._id, name: this.name, email: this.email, isAdmin: this.isAdmin }, process.env.JWT_PVT_KEY));
    return token;
}
module.exports = mongoose.model('User', userSchema);
