const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

module.exports = router;
