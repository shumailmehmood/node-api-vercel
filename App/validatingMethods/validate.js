const Joi = require('joi');
exports.validateUserLogin = (user) => {
    const schema =
    {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(user, schema);
}
exports.validateUserRegister = (user) => {
    const schema =
    {
        name: Joi.string().required(),
        vehicle_no: Joi.string().required(),
        phoneNo: Joi.string().required(),
        // isAdmin: Joi.boolean()
    }
    return Joi.validate(user, schema);
}
exports.validateUserSalary = (details) => {
    const schema =
    {
        uid: Joi.object().keys({
            item: Joi.object().required(),
            name: Joi.string()
        }).required(),
        salary_type: Joi.object().keys({
            catagory: Joi.string().required(),
            amount: Joi.number().integer()
        }).required(),
        // salary_type:Joi.string().required(),
        upto_current_month_remaining: Joi.number().integer()
    }
    return Joi.validate(details, schema);
}

exports.validateTransaction = (details) => {
    const schema = {
        uid: Joi.object().keys({
            item: Joi.object().required()
        }),
        amount_payed: Joi.number().integer()
    }
    return Joi.validate(details, schema)
}
exports.validate_item_reg = (details) => {
    const schema = {
        name: Joi.string().required(),
        sale_price: Joi.number().integer(),
        purchase_price: Joi.number().integer(),
        stock_in: Joi.number().integer()
    }
    return Joi.validate(details, schema)
}
exports.validate_courier_reg = (details) => {
    let service = Joi.object().keys({
        item_id: Joi.required(),
        count: Joi.number().required(),
        sale_price: Joi.number().required(),
        purchase_price: Joi.number().required(),
        item_name: Joi.string()
    })
    const schema = {
        uid: Joi.object().keys({
            item: Joi.required(),
            name: Joi.string(),
            vehical_no: Joi.string(),
        }),
        sendItems: Joi.array().items(service).required(),
        returnItems: Joi.array().items(service)
    }
    return Joi.validate(details, schema)
}
