# predict.py
from flask import Blueprint, request, jsonify
from model_utils import get_recommendation

predict_route = Blueprint('predict_route', __name__)

@predict_route.route('/', methods=['POST'])
def predict():
    try:
        data = request.json
        crop = data.get('crop', 'default')
        location = data.get('location', 'unknown')

        recommendation = get_recommendation(crop, location)

        return jsonify({'status': 'success', 'data': recommendation}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
