const express = require('express');
const router = express.Router();
const razorpay = require('../utils/razorpay');
const Crop = require('../models/Crop');
const User = require('../models/User');

// POST /api/payment/process
router.post('/process', async (req, res) => {
try {
const { cropId, quantity, amount } = req.body;

const crop = await Crop.findById(cropId);
if (!crop || crop.quantity < quantity) {
  return res.status(400).json({ error: 'Invalid or insufficient crop quantity' });
}

const farmer = await User.findById(crop.farmerId);
if (!farmer || !farmer.razorpayAccountId) {
  return res.status(400).json({ error: 'Farmer account not linked to Razorpay' });
}

// Step 1: Create Order
const order = await razorpay.orders.create({
  amount: amount * 100, // amount in paise
  currency: 'INR',
  receipt: `receipt_${Date.now()}`,
  transfers: [
    {
      account: farmer.razorpayAccountId,
      amount: amount * 100,
      currency: 'INR',
      notes: { crop: crop.name },
      on_hold: false,
    },
  ],
});

// Step 2: Reduce quantity after "simulated payment success"
crop.quantity -= quantity;
await crop.save();

res.json({ success: true, message: 'Payment routed to farmer (test)', orderId: order.id });
} catch (err) {
console.error('Payment error:', err);
res.status(500).json({ error: 'Payment processing failed' });
}
});

module.exports = router;