const express = require('express');
const router = express.Router();

router.post('/api/soil-health', (req, res) => {
  const { crop, location, nitrogen, phosphorus, potassium, ph, organicCarbon } = req.body;

  const recommendations = {
    rice: {
      fertilizer: 'Urea + DAP + MOP',
      dosage: '100-50-50 kg/ha',
      note: 'Ensure water management during basal and top dressing.',
    },
    wheat: {
      fertilizer: 'Urea + SSP + MOP',
      dosage: '120-60-40 kg/ha',
      note: 'Apply half nitrogen at sowing and rest at tillering.',
    },
    maize: {
      fertilizer: 'Urea + DAP + Zinc Sulphate',
      dosage: '150-75-40 kg/ha + 25 kg ZnSO4/ha',
      note: 'Zinc deficiency often occurs in maize.',
    },
    soybean: {
      fertilizer: 'SSP + Rhizobium inoculation',
      dosage: '20-60-40 kg/ha',
      note: 'Use biofertilizers for better nitrogen fixation.',
    },
    sunflower: {
      fertilizer: 'Urea + DAP',
      dosage: '60-60-30 kg/ha',
      note: 'Apply in split doses for optimal growth.',
    },
    potato: {
      fertilizer: 'Urea + DAP + MOP',
      dosage: '150-100-100 kg/ha',
      note: 'Ensure potassium availability for tuber development.',
    },
    tomato: {
      fertilizer: 'Urea + DAP + MOP + Micronutrients',
      dosage: '100-80-80 kg/ha',
      note: 'Micronutrients like Mg and Ca benefit fruit setting.',
    },
    onion: {
      fertilizer: 'Urea + SSP + MOP',
      dosage: '120-60-80 kg/ha',
      note: 'Balanced nutrition improves bulb size.',
    },
    brinjal: {
      fertilizer: 'Urea + DAP + MOP',
      dosage: '100-60-50 kg/ha',
      note: 'Split application of nitrogen is preferred.',
    },
    cauliflower: {
      fertilizer: 'Urea + DAP + Boron',
      dosage: '120-60-60 kg/ha + 10 kg Borax/ha',
      note: 'Boron helps prevent whiptail disorder.',
    },
    cabbage: {
      fertilizer: 'Urea + SSP + MOP',
      dosage: '100-60-60 kg/ha',
      note: 'Micronutrients like Ca and B are beneficial.',
    },
    mango: {
      fertilizer: 'FYM + Urea + SSP + MOP',
      dosage: '20-10-10 kg/tree/year',
      note: 'Apply in two splits before flowering and after harvest.',
    },
    banana: {
      fertilizer: 'Urea + DAP + MOP',
      dosage: '200-60-200 g/plant',
      note: 'High potassium boosts yield and quality.',
    },
    guava: {
      fertilizer: 'FYM + Urea + SSP',
      dosage: '500-300-250 g/tree',
      note: 'Zinc and boron help in fruit quality.',
    },
    papaya: {
      fertilizer: 'Urea + SSP + MOP',
      dosage: '250-500 g/tree',
      note: 'Monthly split doses recommended.',
    },
    apple: {
      fertilizer: 'FYM + CAN + SSP',
      dosage: '1-1.5 kg N/tree/year',
      note: 'Apply in dormant season for best results.',
    },
    pomegranate: {
      fertilizer: 'Urea + SSP + MOP',
      dosage: '500-600 g/tree/year',
      note: 'Fertigation helps in better absorption.',
    },
    orange: {
      fertilizer: 'FYM + CAN + MOP',
      dosage: '600-400-400 g/tree/year',
      note: 'Micronutrients are essential during flowering.',
    },
    sweetLime: {
      fertilizer: 'Urea + SSP + MOP',
      dosage: '600-300-300 g/tree',
      note: 'Proper irrigation is key for nutrient uptake.',
    },
    sapota: {
      fertilizer: 'FYM + Urea + MOP',
      dosage: '500-500-500 g/tree',
      note: 'Apply during pre-monsoon and post-monsoon.',
    },
    jackfruit: {
      fertilizer: 'FYM + Urea + SSP',
      dosage: '700-500-300 g/tree',
      note: 'Apply in pits before planting season.',
    },
    pineapple: {
      fertilizer: 'Urea + DAP + KCl',
      dosage: '6-8g N/plant/month',
      note: 'Split monthly application boosts yield.',
    },
    watermelon: {
      fertilizer: 'Urea + DAP + MOP',
      dosage: '100-60-60 kg/ha',
      note: 'Fertigation helps in sandy soils.',
    },
    muskmelon: {
      fertilizer: 'Urea + DAP',
      dosage: '80-50-50 kg/ha',
      note: 'Apply in 2–3 split doses.',
    },
    grapes: {
      fertilizer: 'CAN + SSP + MOP',
      dosage: '800-500-400 g/vine/year',
      note: 'Apply after pruning and during fruit set.',
    },
    litchi: {
      fertilizer: 'FYM + Urea + MOP',
      dosage: '40-50 kg FYM + 500 g NPK/tree',
      note: 'Micronutrients like Zn and B improve quality.',
    }
  };

  const cropKey = crop.toLowerCase().replace(/\s+/g, '');
  const rec = recommendations[cropKey];

  if (!rec) {
    return res.status(404).json({ error: `No recommendation found for crop: ${crop}` });
  }

  res.json({
    data: {
      crop,
      location,
      fertilizer: rec.fertilizer,
      dosage: rec.dosage,
      note: rec.note,
      source: 'https://www.agricoop.gov.in/en/fertilizer-guidelines'
    }
  });
});

module.exports = router;
