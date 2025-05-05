const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users/:id - Get user by ID (for public profile)
// GET /api/users/:id - Get farmer profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email phone location bio role');
    if (!user || user.role !== 'farmer') {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Fetch Farmer Profile Error:', err);
    res.status(500).json({ error: 'Failed to fetch farmer profile' });
  }
});


module.exports = router;
