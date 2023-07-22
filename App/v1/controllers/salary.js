const Salary = require('../../schemas/salary')
const { validateUserSalary } = require("../../validatingMethods/validate");
const { id_convertor } = require("../../misc/functions");
const CashLog = require("../../schemas/cashRevieveLog");
const constants = require("../../misc/constants");
const moment = require('moment')

exports.salaryReg = async (req, res) => {
    try {
        let data = {
            uid: {
                item: id_convertor(req.user._id),
                name: req.user.name
            },

        }
        let { error } = validateUserSalary(data);
        if (error) res.status(400).send(error.details[0].message);
        let salary = new Salary(data);
        salary = await salary.save();
        let response = {
            user: req.user,
            salary: salary
        }
        return res.send(response);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}
exports.salaryUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        let data = {
            remainingAmount: +req.transac.amount_payed
        }
        let response = await Salary.findOne({ 'uid.item': id_convertor(id) }).select('upto_current_month_remaining').lean();
        if (+response.upto_current_month_remaining < +req.transac.amount_payed) return res.status(400).send('Your requsted amount is greater than current amount!')
        data.upto_current_month_remaining = +response.upto_current_month_remaining - data.upto_current_month_remaining;
        response = await Salary.findOneAndUpdate({ 'uid.item': id_convertor(id) }, data, { new: true }).lean();
        data = {
            transaction: req.transac,
            salary: response
        }

        res.send(data);
    } catch (err) {
        return res.status(400).send(err.message)
    }
}
exports.transactionPost = async (req, res, next) => {
    try {
        let { recieveAmount, uid, courierId, reserveAmount } = req.locals;
        let data = {
            uid: uid,
            courierid: courierId,
            amount: recieveAmount
        }
        data = new CashLog(data);
        await data.save();
        if (reserveAmount === 0) return res.send(constants.UPDATED_SUCCESS)
        next()
    } catch (err) {
        return res.status(400).send(err.message);
    }
}
exports.Payment = async (req, res, next) => {
    try {
        req.body.uid.item = id_convertor(req.body.uid.item);
        req.body.courierid = null;
        let body = new CashLog(req.body);
        await body.save();
        req.locals = {
            uid: req.body.uid,
            reserveAmount: req.body.amount,
            check: true
        }
        next();
    } catch (err) {
        return res.status(400).send(err.message);
    }
}
exports.PaymentGet = async (req, res, next) => {
    try {
        let { name, page, limit, from } = req.query;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;
        let query = {};
        if (from) query["createdAt"] = { $gte: moment(from).startOf('day').toISOString(), $lte: moment(from).endOf('day').toISOString() }
        if (name) query["uid.name"] = new RegExp(name, "i");
        let data=await CashLog.find(query).lean();
        let count=await CashLog.find(query).count().lean();
        // let data = await CashLog.aggregate([
        //     { $match: query },
        //     {
        //         $facet: {
        //             metadata: [{ $count: "total_items" },
        //             {
        //                 $addFields: {
        //                     page: page,
        //                     limit: limit,
        //                     pages: { $ceil: { $divide: ["$total_items", limit] } }
        //                 }
        //             }],
        //             data: [{ $skip: (page * limit - limit) }, { $limit: limit }]
        //         }
        //     }
        // ]);
       
data={
    data:data,
    pages:Math.ceil(count / limit),
    limit:limit,
    page:page
}
        return res.send(data)
    } catch (err) {
        return res.status(400).send(err.message);
    }
}


