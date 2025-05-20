const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

router.get('/all', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('buyerId', 'name email')
      .populate('farmerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    console.error('Fetch Transactions Error:', err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});
router.get('/buyer/:buyerId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ buyerId: req.params.buyerId })
      .populate('farmerId', 'name email location');
    res.json(transactions);
  } catch (err) {
    console.error('Buyer transaction fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch buyer transactions' });
  }
});

router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ farmerId: req.params.farmerId })
      .populate('buyerId', 'name email location');
    res.json(transactions);
  } catch (err) {
    console.error('Farmer transaction fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch farmer transactions' });
  }
});

module.exports = router;
