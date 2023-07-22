var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/users');
const SalaryController = require('../controllers/salary');
const Courier = require("../controllers/couriers")
const Item = require('../controllers/items')
//-----------------POST Requests------------------//
router.post('/login', UsersController.login);
router.post('/register', UsersController.Register, SalaryController.salaryReg);
router.post('/itemReg', Item.items_register);
router.post('/sendCourier', Courier.courierReg);
router.post('/transaction',SalaryController.Payment,UsersController.updateUserSalary );
//-----------------GET Requests------------------//
router.get('/get_all_users', UsersController.getAllUsers);
router.get('/get_all_items', Item.getAllItems);
router.get('/get_today_courier/:id', Courier.courierSendGet);
router.get('/get_courier', Courier.getCourier);
router.get('/get_payment', SalaryController.PaymentGet);
router.get('/get_remainingAmount', UsersController.getTotalRemainingAmount);

router.get('/get', (req, res) => {
    res.send('Welcome!!');
})

//-----------------PUT REQ ----------------------------//
router.put('/checkout/:id', Courier.courierCheckOut, SalaryController.transactionPost, UsersController.updateUserSalary)
module.exports = router;

