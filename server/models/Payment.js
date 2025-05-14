const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  razorpayPaymentId: { type: String },
  status: { type: String, default: 'success' }, // or failed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
