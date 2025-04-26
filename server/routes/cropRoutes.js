const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// POST /api/crops/add
router.post('/add', async (req, res) => {
  try {
    const { name, quantity, price, location, farmer, farmerId } = req.body;

    const newCrop = new Crop({
      name,
      quantity,
      price,
      location,
      farmer,     // farmer name
      farmerId,   // ObjectId of user
    });

    await newCrop.save();
    res.status(201).json({ message: 'Crop added successfully', crop: newCrop });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add crop' });
  }
});

// GET - Get all crops (recommended endpoint: /api/crops)
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ listedAt: -1 });
    res.json(crops);
  } catch (err) {
    console.error('Error fetching crops:', err);
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

// POST /api/crops/express-interest
// Express Interest API
router.post('/express-interest', async (req, res) => {
  try {
    const { cropId, buyQuantity } = req.body;

    if (!cropId || !buyQuantity) {
      return res.status(400).json({ error: 'Missing cropId or buyQuantity' });
    }

    const crop = await Crop.findById(cropId);
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    if (crop.quantity < buyQuantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    // Reduce quantity
    crop.quantity -= buyQuantity;

    await crop.save();

    res.json({ message: 'Interest submitted successfully', updatedCrop: crop });
  } catch (err) {
    console.error('Express Interest Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
