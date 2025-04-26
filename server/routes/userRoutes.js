const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users/:id - Get user by ID (for public profile)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email phone location bio');
    if (!user) return res.status(404).json({ error: 'Farmer not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch farmer profile' });
  }
});

module.exports = router;
