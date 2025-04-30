const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

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
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    console.error('Fetch Crops Error:', err);
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

// GET /api/crops/my-crops/:farmerId - Get crops for a farmer
router.get('/my-crops/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
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
router.delete('/:cropId', async (req, res) => {
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

// POST /api/crops/express-interest - Buyer buys quantity
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

    crop.quantity -= buyQuantity;

    if (crop.quantity <= 0) {
      await Crop.findByIdAndDelete(cropId);
      return res.json({ message: 'Crop sold out and removed from market!' });
    } else {
      await crop.save();
      return res.json({ message: 'Interest submitted successfully', updatedCrop: crop });
    }
  } catch (err) {
    console.error('Express Interest Error:', err);
    res.status(500).json({ error: 'Failed to process interest' });
  }
});

module.exports = router;
