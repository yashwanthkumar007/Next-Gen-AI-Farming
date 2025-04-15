const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// POST - Add new crop
router.post('/add', async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.status(201).json({ message: 'Crop added successfully', crop });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add crop' });
  }
});

// GET - Get all crops
router.get('/all', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ listedAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

module.exports = router;
