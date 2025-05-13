const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Crop=require('../models/Crop');

// GET /api/admin/users - Get all farmers and buyers
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['farmer', 'buyer'] } }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
// PATCH /api/admin/users/:id/deactivate
router.patch('/users/:id/deactivate', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'User deactivated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to deactivate user' });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
// PATCH /api/admin/users/:id/status
router.patch('/users/:id/status', async (req, res) => {
  const { isActive } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive });
    res.json({ message: `User ${isActive ? 'activated' : 'deactivated'}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user status' });
  }
});


// GET /api/admin/crops — all crops with farmer details (only active farmers)
router.get('/crops', async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate('farmerId', 'name email location isActive') // get only needed fields
      .sort({ createdAt: -1 })
      .lean(); // lean() allows us to use .filter

    // Filter out crops where the farmer is deactivated
    const visibleCrops = crops.filter(crop => crop.farmerId?.isActive !== false);

    res.json(visibleCrops);
  } catch (err) {
    console.error('Error fetching admin crops:', err);
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

module.exports = router;
