
const express = require('express'); 
const router = express.Router(); 
const { getFlaskPrediction, getCropRecommendation } = require('../controllers/recommendcontroller');

router.post('/api/ai/fertilizer', getFlaskPrediction);
router.post('/api/fertilizer', getCropRecommendation);

module.exports = router;