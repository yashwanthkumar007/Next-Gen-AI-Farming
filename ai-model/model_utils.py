# model_utils.py

def get_recommendation(data):
    crop = data.get("crop")
    location = data.get("location")

    # Placeholder logic, later connect to ML model
    return {
        "crop": crop,
        "location": location,
        "fertilizer": "Use 50kg Urea/acre",
        "pesticide": "Apply neem oil spray every 15 days",
        "note": "✅ Based on simulated recommendation"
    }
