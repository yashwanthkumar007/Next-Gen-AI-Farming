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
    }
};
