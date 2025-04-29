const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

<<<<<<< HEAD
// POST /api/crops/add
=======
// POST /api/crops/add - Add a new crop
>>>>>>> 80d1d74b (market data)
router.post('/add', async (req, res) => {
  try {
    const { name, quantity, price, location, farmer, farmerId } = req.body;

<<<<<<< HEAD
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
=======
    const newCrop = new Crop({ name, quantity, price, location, farmer, farmerId });
    await newCrop.save();

    res.status(201).json({ message: 'Crop added successfully', crop: newCrop });
  } catch (err) {
    console.error('Add Crop Error:', err);
>>>>>>> 80d1d74b (market data)
    res.status(500).json({ error: 'Failed to add crop' });
  }
});

<<<<<<< HEAD
// GET - Get all crops (recommended endpoint: /api/crops)
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ listedAt: -1 });
    res.json(crops);
  } catch (err) {
    console.error('Error fetching crops:', err);
=======
// GET /api/crops - Get all crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    console.error('Fetch Crops Error:', err);
>>>>>>> 80d1d74b (market data)
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

<<<<<<< HEAD
// POST /api/crops/express-interest
// Express Interest API
=======
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

// PATCH /api/crops/update/:cropId - Update quantity and price
router.patch('/update/:cropId', async (req, res) => {
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
    console.error('Update Crop Error:', err);
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

// POST /api/crops/express-interest - Buyer buys quantity
>>>>>>> 80d1d74b (market data)
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

<<<<<<< HEAD
    // Reduce quantity
    crop.quantity -= buyQuantity;

    await crop.save();

    res.json({ message: 'Interest submitted successfully', updatedCrop: crop });
  } catch (err) {
    console.error('Express Interest Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


=======
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

>>>>>>> 80d1d74b (market data)
module.exports = router;
