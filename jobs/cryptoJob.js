const cron = require('node-cron');
const Crypto = require('../models/Crypto.js');
const { fetchCryptoData } = require('../services/coingeckoService.js');

console.log(process.env.CRON_SCHEDULE);

const startCryptoJob = async () => {
    const jobLogic = async () => {
        console.log(`Starting cryptocurrency data fetch job at ${new Date().toISOString()}...`);
        try {
            const cryptoIds = [
                { id: 'bitcoin', name: 'Bitcoin' },
                { id: 'matic-network', name: 'Matic' },
                { id: 'ethereum', name: 'Ethereum' },
            ];

            const data = await fetchCryptoData();

            const cryptoData = cryptoIds.map(({ id, name }) => ({
                crypto_id: id,
                name,
                price_usd: data[id]?.usd,
                market_cap_usd: data[id]?.usd_market_cap,
                change_24h: data[id]?.usd_24h_change,
                timestamp: new Date(),
            }));

            await Crypto.insertMany(cryptoData);

            console.log('Cryptocurrency data saved successfully!');
        } catch (error) {
            console.error('Error during the job:', error.message);
        }
    };
    await jobLogic();
   cron.schedule(process.env.CRON_SCHEDULE || "0 */2 * * *", jobLogic);

};

module.exports = startCryptoJob;
