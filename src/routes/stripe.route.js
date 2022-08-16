const{
    createPayment

} = require('../controllers/stripe.controller');
const router = require('express').Router();


router.post("pay", createPayment)


module.exports = router