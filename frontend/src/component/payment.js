import React, { useState} from 'react';
import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {environment} from '../enivornment/environment';
import { Button } from 'react-bootstrap';


//load script
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}
const __DEV__ = document.domain === 'localhost' ;


const Payment =() =>{
	const [name, setName] = useState('Mehul');
	
    // rezor payment  function
	async function displayRazorpay() {
		const res = await loadScript(environment.CHECK_OUT_API);
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		let amount = document.getElementById('targetValue').value;

		const data = await fetch(environment.RAZORPAY_API, { 
			method: 'POST', 
			body: JSON.stringify({amount: amount}),
			headers: {"Content-Type": "application/json"}
		 }).then((t) =>
			t.json()
		)
		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_dRuY8XVbtZQAns' : 'PRODUCTION_KEY',
			currency: data.currency,
			order_id: data.id,
			name: 'Spark Foundation',
			description: 'Thank you for donating. Please give us some money',
			image: environment.IMAGE_API,
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				email: 'test@gmail.com',
				phone_number: '9999999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
    return (
        <section>
			<img src={logo} className="App-logo" alt="logo" />
			<p>Come forward to help someone by donating.</p>
			<form >
				<input type="number" placeholder="Donate Some" className="form-control mb-2" id="targetValue" name="amount" />
				<Button type="button" className="App-link" onClick={displayRazorpay} target="_blank" rel="noopener noreferrer">Donate Some</Button>
			</form>
        </section>
    )
}

export default Payment;