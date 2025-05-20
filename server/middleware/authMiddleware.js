const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET || 'mydefaultsecret';

const protect = async (req, res, next) => {
try {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
return res.status(401).json({ error: 'No token provided' });
}

const token = authHeader.split(' ')[1];
const decoded = jwt.verify(token, jwtSecret);
const user = await User.findById(decoded.userId).select('-password');
if (!user) return res.status(401).json({ error: 'User not found' });

req.user = {
  userId: user._id,
  role: user.role,
  email: user.email,
};
next();
} catch (err) {
console.error('Auth error:', err.message);
res.status(401).json({ error: 'Invalid token' });
}
};

module.exports = protect;