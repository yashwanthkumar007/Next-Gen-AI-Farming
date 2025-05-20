const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Crop =require('../models/Crop');
// GET /api/users/:id - Get any user profile (farmer or buyer)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email phone location bio role');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Fetch User Profile Error:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

router.delete('/:id', async (req, res) => {
try {
const farmer = await User.findById(req.params.id);
if (!farmer) return res.status(404).json({ message: 'User not found' });

if (farmer.role === 'farmer') {
  await Crop.deleteMany({ farmerId: farmer._id });
}

await farmer.deleteOne();
res.json({ message: 'User and their crops deleted' });
} catch (err) {
console.error('Delete error:', err);
res.status(500).json({ message: 'Server error' });
}
});

module.exports = router;
