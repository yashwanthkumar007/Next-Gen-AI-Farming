const express = require('express');
const router = express.Router();
const { addPrice, filterPrices } = require('../controllers/priceController');

// POST route to add a new price entry
router.post('/add', addPrice);

// GET route to filter prices based on state, district, commodity, and date range
router.get('/filter', filterPrices);

module.exports = router;
