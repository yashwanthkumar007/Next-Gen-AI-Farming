// server/routes/lccRoute.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Fertilizer recommendation logic (can be replaced with ML)
const recommendationMap = {
  1: { dosage: '50kg Urea/acre', note: 'Very low nitrogen. Apply immediately.' },
  2: { dosage: '40kg Urea/acre', note: 'Low nitrogen. Apply soon.' },
  3: { dosage: '25kg Urea/acre', note: 'Moderate. Monitor and split dose.' },
  4: { dosage: '10kg Urea/acre', note: 'Sufficient. Apply minimal dose if needed.' },
  5: { dosage: '0kg', note: 'No Urea needed. Nitrogen is optimal.' },
};

// POST /api/lcc
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { crop, shade } = req.body;
    const file = req.file; // Optional image
    const numericShade = parseInt(shade);

    if (!crop || !shade || !recommendationMap[numericShade]) {
      return res.status(400).json({ error: 'Invalid input.' });
    }

    const rec = recommendationMap[numericShade];

    const result = {
      crop,
      shade: numericShade,
      fertilizer: 'Urea',
      dosage: rec.dosage,
      note: rec.note,
      source: 'https://www.irri.org/resources/publications/leaf-color-chart',
      image: file ? `/uploads/${file.filename}` : null,
    };

    // TODO: Optional - save result to DB (with timestamp)

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during LCC processing.' });
  }
});

module.exports = router;
