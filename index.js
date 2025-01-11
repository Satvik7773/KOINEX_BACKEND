const dotenv = require('dotenv');
dotenv.config({ path: './api_key.env' });
const express = require('express');
const connectDB = require('./config/db');
const startCryptoJob = require('./jobs/cryptoJob');

const app = express();

connectDB();

startCryptoJob();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
