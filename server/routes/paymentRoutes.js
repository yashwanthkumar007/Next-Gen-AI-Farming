const express = require('express');
const Razorpay = require('razorpay');
const Crop = require('../models/Crop');
const User = require('../models/User');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_xxxx',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_xxxx_secret',
});

// ✅ Create Order
router.post('/process', async (req, res) => {
  try {
    const { cropId, quantity, buyerId } = req.body;

    const parsedQty = parseInt(quantity);
    if (!cropId || !buyerId || isNaN(parsedQty) || parsedQty <= 0) {
      return res.status(400).json({ error: 'Missing or invalid cropId, quantity, or buyerId' });
    }

    const crop = await Crop.findById(cropId);
    if (!crop) return res.status(404).json({ error: 'Crop not found' });

    if (crop.quantity < parsedQty) {
      return res.status(400).json({ error: 'Insufficient crop quantity available' });
    }

    const amountInPaise = crop.price * parsedQty * 100;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      payment_capture: 1,
      notes: {
        crop: crop.name,
        quantity: parsedQty.toString(),
      },
    });

    res.json({
      message: 'Order created successfully',
      orderId: order.id,
      cropName: crop.name,
      amount: amountInPaise,
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// ✅ Simulate Payment (Mock Razorpay Transfer)
router.post('/simulate', async (req, res) => {
  try {
    const { orderId, cropId, quantity, buyerId } = req.body;
    const parsedQty = parseInt(quantity);

    if (!orderId || !cropId || !buyerId || isNaN(parsedQty) || parsedQty <= 0) {
      return res.status(400).json({ error: 'Missing or invalid data' });
    }

    const crop = await Crop.findById(cropId);
    if (!crop) return res.status(404).json({ error: 'Crop not found' });

    const farmer = await User.findById(crop.farmerId);
    if (!farmer || !farmer.razorpayAccountId) {
      return res.status(400).json({ error: 'Farmer Razorpay account missing' });
    }

    const amountInPaise = crop.price * parsedQty * 100;

    console.log(`✅ Mock Transfer to: ${farmer.razorpayAccountId}, ₹${amountInPaise / 100}`);

    const transfer = {
      id: 'mock_transfer_' + Date.now(),
      amount: amountInPaise,
      account: farmer.razorpayAccountId,
      status: 'mock_success',
    };

    crop.quantity -= parsedQty;
    if (crop.quantity <= 0) {
      await Crop.findByIdAndDelete(cropId);
    } else {
      await crop.save();
    }

    res.json({
      message: 'Simulated payment successful & crop updated',
      transfer,
    });
  } catch (err) {
    console.error('Simulated payment error:', err);
    res.status(500).json({ error: 'Simulated payment failed' });
  }
});

module.exports = router;
