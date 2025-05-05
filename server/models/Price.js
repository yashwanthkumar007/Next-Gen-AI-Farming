const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  state: String,
  district: String,
  market: String,
  commodity: String,
  price_per_quintal: Number,
  price_per_kg: Number,
  arrival_tonnes: Number,
  price_per_quintal_variation: Number,
  price_per_kg_variation: Number,
  arrival_tonnes_variation: Number
});

module.exports = mongoose.model('Price', priceSchema);
