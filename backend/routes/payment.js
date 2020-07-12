const express = require('express');
const router = express.Router();
const PaymentController = require('../controller/payment')

//get 
router.get('/logo.svg', PaymentController.GetPayment);

//verification
router.post('/verification', PaymentController.Verification);

//payment
router.post('/razorpay' , PaymentController.RazorPayPayment);

module.exports = router;