const express = require('express');
const bodyParser = require('body-parser')

const connectDB = require('./config/db');

const app = express();

// connect to mongoDB
connectDB();

// parse application/json
app.use(bodyParser.json());

// Route
app.use('/api/cards', require('./routes/cards'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));