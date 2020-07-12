const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Payment = require('./routes/payment')

const app = express();
const port = process.env.PORT ||5000;

//Bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors
app.use(cors());

//Routes
app.use('/api', Payment);

app.listen(port, () => {
	console.log(`server Listening on ${port}`);
})
