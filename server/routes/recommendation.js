

const express = require('express'); 
const router = express.Router(); 
const { getFlaskPrediction } = require('../controllers/recommendController');

router.post('/', getFlaskPrediction);

module.exports = router;