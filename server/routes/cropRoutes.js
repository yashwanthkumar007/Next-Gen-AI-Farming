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

module.exports = router;
