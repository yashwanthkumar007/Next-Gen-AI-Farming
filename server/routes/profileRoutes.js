const express = require('express');
const router = express.Router();
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');

// GET /api/profile → get current user's profile
router.get('/', protect, async (req, res) => {
try {
const user = await User.findById(req.user.userId).select('-password');
res.status(200).json(user);
} catch (err) {
res.status(500).json({ message: 'Failed to fetch profile' });
}
});

// PUT /api/profile → update user profile (with Razorpay ID for farmers)
router.put('/', protect, async (req, res) => {
const userId = req.user.userId;
const updates = req.body;

try {
const user = await User.findById(userId);
if (!user) return res.status(404).json({ error: 'User not found' });

const allowedFields = ['name', 'phone', 'location', 'bio'];

allowedFields.forEach((field) => {
  if (updates[field] !== undefined) {
    user[field] = updates[field];
  }
});

if (user.role === 'farmer' && updates.razorpayAccountId !== undefined) {
  user.razorpayAccountId = updates.razorpayAccountId;
}

await user.save();

const updatedUser = {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  location: user.location,
  bio: user.bio,
  razorpayAccountId: user.razorpayAccountId || null
};

res.json(updatedUser);
} catch (err) {
console.error('Profile update error:', err);
res.status(500).json({ error: 'Failed to update profile' });
}
});

module.exports = router;