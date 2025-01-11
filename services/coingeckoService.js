const axios = require('axios');

const fetchCryptoData = async (cryptoKey) => {
    const cryptoIds = cryptoKey || process.env.CRYPTO_IDS;

    const apiUrl = `${process.env.CRYPTO_API}?x_cg_demo_api_key=${process.env.API_KEY}&ids=${cryptoIds}&vs_currencies=${process.env.CRYPTO_VS_CURRENCY}&include_market_cap=true&include_24hr_change=true`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from CoinGecko:', error.message);
        throw new Error('Failed to fetch cryptocurrency data');
    }
};

module.exports = { fetchCryptoData };
