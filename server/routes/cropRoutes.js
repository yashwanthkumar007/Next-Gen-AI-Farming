const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ listedAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching crops' });
  }
});

module.exports = router;
