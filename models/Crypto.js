const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
  crypto_id: String,
  name: String,
  price_usd: {
    type: Number,
    set: value => parseFloat(value.toFixed(2)), // Round to 2 decimal places
  },
  market_cap_usd: {
    type: Number,
    set: value => parseFloat(value.toFixed(2)),
  },
  change_24h: {
    type: Number,
    set: value => parseFloat(value.toFixed(2)), // Round to 2 decimal places
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Crypto', CryptoSchema);
