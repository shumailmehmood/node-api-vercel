const mongoose = require('mongoose');
const moment = require('moment')

exports.id_convertor = (id) => {
    return mongoose.Types.ObjectId(id)
}
