const express = require('express');
const router = express.Router();
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');

// ✅ GET /api/profile → get logged-in user’s profile
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// ✅ PUT /api/profile → update logged-in user’s profile
router.put('/', protect, async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      bio: req.body.bio
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;
