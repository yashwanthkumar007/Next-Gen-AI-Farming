const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const User=require('../models/User');

<<<<<<< HEAD
<<<<<<< HEAD
// POST /api/crops/add
=======
// POST /api/crops/add - Add a new crop
>>>>>>> 80d1d74b (market data)
=======

// POST /api/crops/add - Add a new crop
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
router.post('/add', async (req, res) => {
  try {
    const { name, quantity, price, location, farmer, farmerId } = req.body;

<<<<<<< HEAD
<<<<<<< HEAD
    const newCrop = new Crop({
      name,
      quantity,
      price,
      location,
      farmer,     // farmer name
      farmerId,   // ObjectId of user
    });

=======
    const newCrop = new Crop({ name, quantity, price, location, farmer, farmerId });
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
    await newCrop.save();

    res.status(201).json({ message: 'Crop added successfully', crop: newCrop });
  } catch (err) {
<<<<<<< HEAD
    console.error(err);
=======
    const newCrop = new Crop({ name, quantity, price, location, farmer, farmerId });
    await newCrop.save();

    res.status(201).json({ message: 'Crop added successfully', crop: newCrop });
  } catch (err) {
    console.error('Add Crop Error:', err);
>>>>>>> 80d1d74b (market data)
=======
    console.error('Add Crop Error:', err);
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
    res.status(500).json({ error: 'Failed to add crop' });
  }
});

<<<<<<< HEAD
<<<<<<< HEAD
// GET - Get all crops (recommended endpoint: /api/crops)
=======
// GET /api/crops - Get all crops
// GET /api/crops - Get all crops (only from active farmers)
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate('farmerId', 'isActive name') // fetch isActive from User
      .sort({ createdAt: -1 })
      .lean();

    const visibleCrops = crops.filter(crop => crop.farmerId?.isActive !== false);

    res.json(visibleCrops);
  } catch (err) {
<<<<<<< HEAD
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
=======
    console.error('Fetch Crops Error:', err);
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

<<<<<<< HEAD
<<<<<<< HEAD
// POST /api/crops/express-interest
// Express Interest API
=======
// GET /api/crops/my-crops/:farmerId - Get crops for a farmer
router.get('/my-crops/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const crops = await Crop.find({ farmerId }).sort({ createdAt: -1 });

=======

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
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
    res.json(crops);
  } catch (err) {
    console.error('Fetch My Crops Error:', err);
    res.status(500).json({ error: 'Failed to fetch farmer crops' });
  }
});

<<<<<<< HEAD
// PATCH /api/crops/update/:cropId - Update quantity and price
router.patch('/update/:cropId', async (req, res) => {
=======

// PUT /api/crops/:cropId - Update crop (price & quantity)
router.put('/:cropId', async (req, res) => {
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
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
<<<<<<< HEAD
    console.error('Update Crop Error:', err);
=======
    console.error('PUT Update Crop Error:', err);
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
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
<<<<<<< HEAD
>>>>>>> 80d1d74b (market data)
=======
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
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
<<<<<<< HEAD
    // Reduce quantity
=======
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
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

<<<<<<< HEAD

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
=======
>>>>>>> 3bd3713577296d03f4017f1b0d6d3a85ec0aaa6d
module.exports = router;
