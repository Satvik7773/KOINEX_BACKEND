const express = require('express');
const Crypto = require('../models/Crypto');

const router = express.Router();

router.get('/', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Missing required query parameter: coin' });
    }
    try {
        const records = await Crypto.find({ crypto_id: coin })
            .sort({ timestamp: -1 }) 
            .limit(100) 
            .select('price_usd'); 

        if (records.length === 0) {
            return res.status(404).json({ error: `No records found for coin: ${coin}` });
        }

        const prices = records.map(record => record.price_usd);

        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;

        const variance =
            prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;

        const standardDeviation = Math.sqrt(variance);

        return res.status(200).json({ standardDeviation: parseFloat(standardDeviation.toFixed(2)) });
    } catch (error) {
        console.error('Error in /deviation endpoint:', error.message);
        return res.status(500).json({ error: 'Failed to calculate standard deviation' });
    }
});

module.exports = router;
