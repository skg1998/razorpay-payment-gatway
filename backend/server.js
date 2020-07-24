const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const Payment = require('./routes/payment')

const app = express();
const port = process.env.PORT ||5000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')))

//Bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors
app.use(cors());

//Routes
app.use('/api', Payment);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
  })

app.listen(port, () => {
	console.log(`server Listening on ${port}`);
})
