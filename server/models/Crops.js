const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  price: String,
  location: String,
  farmer: String,
  listedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Crop', cropSchema);
