const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { crop, location, nitrogen, phosphorus, potassium, pH, organicCarbon } = req.body;

  let ferts = [];

  if (nitrogen < 150) ferts.push('Urea (46-0-0)');
  if (phosphorus < 15) ferts.push('DAP (18-46-0)');
  if (potassium < 150) ferts.push('MOP (0-0-60)');

  const recommendation = {
    crop,
    location,
    fertilizer: ferts.length > 0 ? ferts.join(', ') : 'No major fertilizer needed',
    dosage: `${ferts.length * 25}kg/acre (estimated)`,
    note: 'Based on NPK soil health levels',
    source: 'https://soilhealth.dac.gov.in/'
  };

  return res.status(200).json({ status: 'success', data: recommendation });
});

module.exports = router;
