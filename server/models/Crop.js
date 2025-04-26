const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: String,
  location: String,
  farmer: String,
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true }); // 👈 this adds createdAt and updatedAt fields

module.exports = mongoose.model('Crop', cropSchema);
