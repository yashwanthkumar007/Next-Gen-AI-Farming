const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
  crop: String,
  price: String,
  state: String,
  district: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
