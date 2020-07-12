const express = require('express');
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')

//razorpay key 
const razorpay = new Razorpay({
	key_id: 'rzp_test_dRuY8XVbtZQAns',
	key_secret: 'TlsEHjJJtqhIf7F1pLuAci4Z'
})


//getpayment
const GetPayment = (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'logo.svg'))
}


//verification
const Verification = async (req,res,next)=>{
    const secret = '12345678'
	const crypto = require('crypto')
	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
}


//RazorPayPayment
const RazorPayPayment = async (req,res,next)=>{
	const {amount} = req.body;
	
    const payment_capture = 1
	const Amount = amount
	const currency = 'INR'

	const options = {
		amount: Amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
}


exports.GetPayment = GetPayment;
exports.RazorPayPayment = RazorPayPayment;
exports.Verification = Verification;


