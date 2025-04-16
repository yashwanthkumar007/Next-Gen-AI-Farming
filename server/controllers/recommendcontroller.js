const axios = require('axios');

exports.getFlaskPrediction = async (req, res) => {
    try {
        const flaskURL = process.env.FLASK_URL || 'http://127.0.0.1:5001/predict';

        const response = await axios.post(flaskURL, req.body);

        res.status(200).json({
            status: 'success',
            data: response.data.data,
        });
    } catch (error) {
        console.error('Error connecting to Flask:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Could not get prediction from AI model.',
        });
    }const express = require('express');
    const bodyParser = require('body-parser');
    const axios = require('axios');
    
    const app = express();
    const port = 5000;
    
    // Middleware to parse JSON request bodies
    app.use(bodyParser.json());
    
    // Sample data for crops and their fertilizer recommendations
    const cropRecommendations = {
      'Rice': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '100kg/acre',
        'note': 'Apply during early tillering stage.',
        'source': 'http://example.com/rice-fertilizer-details'
      },
      'Wheat': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '120kg/acre',
        'note': 'Apply in 2 equal splits.',
        'source': 'http://example.com/wheat-fertilizer-details'
      },
      'Maize': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '150kg/acre',
        'note': 'Apply at 3-leaf stage.',
        'source': 'http://example.com/maize-fertilizer-details'
      },
      'Barley': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '130kg/acre',
        'note': 'Apply during early tillering.',
        'source': 'http://example.com/barley-fertilizer-details'
    },
    'Sorghum (Jowar)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '110kg/acre',
        'note': 'Apply at flowering stage.',
        'source': 'http://example.com/sorghum-fertilizer-details'
    },
    'Pearl Millet (Bajra)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '90kg/acre',
        'note': 'Apply during initial growth.',
        'source': 'http://example.com/pearl-millet-fertilizer-details'
    },
    'Finger Millet (Ragi)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '120kg/acre',
        'note': 'Apply during early tillering.',
        'source': 'http://example.com/finger-millet-fertilizer-details'
    },
    'Oats': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '100kg/acre',
        'note': 'Apply before sowing.',
        'source': 'http://example.com/oats-fertilizer-details'
    },
    'Foxtail Millet': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '95kg/acre',
        'note': 'Apply at sowing.',
        'source': 'http://example.com/foxtail-millet-fertilizer-details'
    },
    'Kodo Millet': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '80kg/acre',
        'note': 'Apply during flowering.',
        'source': 'http://example.com/kodo-millet-fertilizer-details'
    },
    'Bengal Gram (Chana)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '60kg/acre',
        'note': 'Apply at sowing and flowering.',
        'source': 'http://example.com/bengal-gram-fertilizer-details'
    },
    'Pigeon Pea (Arhar/Tur)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '100kg/acre',
        'note': 'Apply at early flowering.',
        'source': 'http://example.com/pigeon-pea-fertilizer-details'
    },
    'Green Gram (Moong)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '80kg/acre',
        'note': 'Apply at sowing and early flowering.',
        'source': 'http://example.com/green-gram-fertilizer-details'
    },
    'Black Gram (Urad)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '70kg/acre',
        'note': 'Apply before sowing.',
        'source': 'http://example.com/black-gram-fertilizer-details'
    },
    'Lentil (Masoor)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '90kg/acre',
        'note': 'Apply at early flowering.',
        'source': 'http://example.com/lentil-fertilizer-details'
    },
    'Horse Gram': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '80kg/acre',
        'note': 'Apply at sowing.',
        'source': 'http://example.com/horse-gram-fertilizer-details'
    },
    'Cowpea': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '100kg/acre',
        'note': 'Apply at flowering.',
        'source': 'http://example.com/cowpea-fertilizer-details'
    },
    'Rajma (Kidney Beans)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '70kg/acre',
        'note': 'Apply at sowing.',
        'source': 'http://example.com/rajma-fertilizer-details'
    },
    'Moth Bean': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '50kg/acre',
        'note': 'Apply at sowing and flowering.',
        'source': 'http://example.com/moth-bean-fertilizer-details'
    },
    'Field Pea': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '80kg/acre',
        'note': 'Apply at early flowering.',
        'source': 'http://example.com/field-pea-fertilizer-details'
    },
    'Groundnut (Peanut)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '100kg/acre',
        'note': 'Apply at sowing.',
        'source': 'http://example.com/groundnut-fertilizer-details'
    },
    'Mustard': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '120kg/acre',
        'note': 'Apply before sowing.',
        'source': 'http://example.com/mustard-fertilizer-details'
    },
    'Soybean': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '110kg/acre',
        'note': 'Apply during early flowering.',
        'source': 'http://example.com/soybean-fertilizer-details'
    },
    'Sunflower': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '130kg/acre',
        'note': 'Apply during early stages.',
        'source': 'http://example.com/sunflower-fertilizer-details'
    },
    'Sesame (Til)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '100kg/acre',
        'note': 'Apply at sowing.',
        'source': 'http://example.com/sesame-fertilizer-details'
    },
    'Safflower': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '110kg/acre',
        'note': 'Apply at sowing.',
        'source': 'http://example.com/safflower-fertilizer-details'
    },
    'Linseed (Flaxseed)': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '120kg/acre',
        'note': 'Apply during early growth stage.',
        'source': 'http://example.com/linseed-fertilizer-details'
    },
    'Castor': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '130kg/acre',
        'note': 'Apply during flowering.',
        'source': 'http://example.com/castor-fertilizer-details'
    },
    'Niger seed': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '90kg/acre',
        'note': 'Apply at sowing.',
        'source': 'http://example.com/niger-seed-fertilizer-details'
    },
    'Cottonseed': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '100kg/acre',
        'note': 'Apply during early growth stage.',
        'source': 'http://example.com/cottonseed-fertilizer-details'
    },
    'Potato': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '150kg/acre',
        'note': 'Apply during early growth stage.',
        'source': 'http://example.com/potato-fertilizer-details'
    },
    'Tomato': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '120kg/acre',
        'note': 'Apply during flowering stage.',
        'source': 'http://example.com/tomato-fertilizer-details'
    },
    'Onion': {
        'fertilizer': 'Urea, DAP, MOP',
        'dosage': '100kg/acre',
        'note': 'Apply at sowing.',
        'source': 'http://example.com/onion-fertilizer-details'
    },
      // Add more crops here...
    };
    
    // Function to get prediction from the Flask AI model
    const getFlaskPrediction = async (req, res) => {
      try {
        const flaskURL = process.env.FLASK_URL || 'http://127.0.0.1:5001/predict';
    
        const response = await axios.post(flaskURL, req.body);
    
        res.status(200).json({
          status: 'success',
          data: response.data.data,
        });
      } catch (error) {
        console.error('Error connecting to Flask:', error.message);
        res.status(500).json({
          status: 'error',
          message: 'Could not get prediction from AI model.',
        });
      }
    };
    
    // Endpoint for fertilizer recommendations
    app.post('/api/fertilizer', async (req, res) => {
      const crop = req.body.crop;
    
      if (cropRecommendations[crop]) {
        res.json(cropRecommendations[crop]);
      } else {
        res.status(404).json({ error: 'Crop not found.' });
      }
    });
    
    // Endpoint to get fertilizer recommendation from AI model (Flask integration)
    app.post('/api/ai/fertilizer', getFlaskPrediction);
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
    
};
