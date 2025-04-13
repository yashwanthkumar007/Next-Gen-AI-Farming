# app.py
from flask import Flask
from flask_cors import CORS
from predict import predict_route

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Health check route
@app.route('/')
def home():
    return " Next-Gen AI Farming API is running."

# Register prediction route
app.register_blueprint(predict_route, url_prefix='/predict')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
