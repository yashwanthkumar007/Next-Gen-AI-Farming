const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const protect = require('../middleware/authMiddleware');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@farming.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const jwtSecret = process.env.JWT_SECRET || 'mydefaultsecret';

// ✅ Protected route to get logged-in user profile
router.get('/profile', protect, (req, res) => {
  res.status(200).json(req.user);
});

// ✅ Register a new user (farmer or buyer)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Please provide email, password, and role' });
  }

  // 1️⃣ Admin login (hardcoded)
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD && role === 'admin') {
    const token = jwt.sign({ userId: 'admin', role: 'admin' }, jwtSecret, { expiresIn: '1d' });
    return res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        id: 'admin',
        name: 'Admin',
        email,
        role: 'admin'
      }
    });
  }

  // 2️⃣ Regular user login
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account has been deactivated by admin' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: `You are registered as a ${user.role}, not a ${role}` });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      jwtSecret,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
