const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const User=require('../models/User');
const Payment = require('../models/Payment');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});


// POST /api/crops/add - Add a new crop
router.post('/add', async (req, res) => {
  try {
    const { name, quantity, price, location, farmer, farmerId } = req.body;

    const newCrop = new Crop({ name, quantity, price, location, farmer, farmerId });
    await newCrop.save();

    res.status(201).json({ message: 'Crop added successfully', crop: newCrop });
  } catch (err) {
    console.error('Add Crop Error:', err);
    res.status(500).json({ error: 'Failed to add crop' });
  }
});

// GET /api/crops - Get all crops
// GET /api/crops - Get all crops (only from active farmers)
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate('farmerId', 'isActive name') // fetch isActive from User
      .sort({ createdAt: -1 })
      .lean();

    const visibleCrops = crops.filter(crop => crop.farmerId?.isActive !== false);

    res.json(visibleCrops);
  } catch (err) {
    console.error('Fetch Crops Error:', err);
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});


// GET /api/crops/my-crops/:farmerId - Get crops for a farmer (only if active)
router.get('/my-crops/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;

    // Check if farmer is active
    const farmer = await User.findById(farmerId);
    if (!farmer || !farmer.isActive) {
      return res.status(403).json({ error: 'This farmer account is deactivated' });
    }

    const crops = await Crop.find({ farmerId }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    console.error('Fetch My Crops Error:', err);
    res.status(500).json({ error: 'Failed to fetch farmer crops' });
  }
});


// PUT /api/crops/:cropId - Update crop (price & quantity)
router.put('/:cropId', async (req, res) => {
  try {
    const { quantity, price } = req.body;

    const updatedCrop = await Crop.findByIdAndUpdate(
      req.params.cropId,
      { quantity, price },
      { new: true }
    );

    if (!updatedCrop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    res.json({ message: 'Crop updated successfully', crop: updatedCrop });
  } catch (err) {
    console.error('PUT Update Crop Error:', err);
    res.status(500).json({ error: 'Failed to update crop' });
  }
});

// DELETE /api/crops/delete/:cropId - Delete crop
router.delete('/delete/:cropId', async (req, res) => {
  try {
    const deletedCrop = await Crop.findByIdAndDelete(req.params.cropId);

    if (!deletedCrop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    res.json({ message: 'Crop deleted successfully' });
  } catch (err) {
    console.error('Delete Crop Error:', err);
    res.status(500).json({ error: 'Failed to delete crop' });
  }
});

// POST /api/crops/express-interest
router.post('/express-interest', async (req, res) => {
  try {
    const { cropId, buyQuantity, buyerId } = req.body;

    if (!cropId || !buyQuantity || !buyerId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const crop = await Crop.findById(cropId).populate('farmerId');
    if (!crop) return res.status(404).json({ error: 'Crop not found' });
    if (!crop.farmerId?.razorpayAccountId) return res.status(400).json({ error: 'Farmer has no Razorpay account' });
    if (crop.quantity < buyQuantity) return res.status(400).json({ error: 'Insufficient stock' });

    const amount = crop.price * buyQuantity * 100; // in paise

    // Simulate order creation
    const payment = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `rcpt_crop_${cropId}_${Date.now()}`,
      notes: {
        crop: crop.name,
        buyerId
      },
      transfers: [
        {
          account: crop.farmerId.razorpayAccountId,
          amount,
          currency: 'INR',
          notes: { cropId, buyerId }
        }
      ]
    });

    // Log to DB
    await Payment.create({
      buyerId,
      farmerId: crop.farmerId._id,
      cropId,
      amount: amount / 100,
      quantity: buyQuantity,
      razorpayPaymentId: payment.id,
      status: 'success'
    });

    // Update crop quantity
    crop.quantity -= buyQuantity;
    if (crop.quantity <= 0) {
      await crop.deleteOne();
      return res.json({ message: 'Crop sold out and removed from market!' });
    } else {
      await crop.save();
    }

    res.json({ message: 'Interest and payment successful', paymentId: payment.id });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ error: 'Failed to process interest/payment' });
  }
});


module.exports = router;
