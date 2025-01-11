const express = require('express');
const { fetchCryptoData } = require('../services/coingeckoService');

const router = express.Router();

router.get('/', async (req, res) => {
    const {coin } = req.query; 

    if (!coin) {
        return res.status(400).json({ error: 'Missing required query parameter: query' });
    }

    try {
        const data = await fetchCryptoData(coin);
        const cryptoData = {
            "crypto_id": coin,
            "price" : data[coin].usd,
            "market_cap" : data[coin].usd_market_cap,
            "change_24h" : parseFloat(data[coin].usd_24h_change.toFixed(2))
        };
        res.json(cryptoData);
        }
     catch (error) {
        console.error('Error in /stats endpoint:', error.message);
        res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
    }
});

module.exports = router;
