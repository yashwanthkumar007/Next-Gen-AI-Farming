const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  cropName: String,
  quantity: Number,
  pricePerKg: Number,
  totalAmount: Number,
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
