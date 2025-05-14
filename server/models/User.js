const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'buyer'], required: true },
  phone: { type: String },
  location: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  razorpayAccountId: { type: String }
});

module.exports = mongoose.model('User', userSchema);
