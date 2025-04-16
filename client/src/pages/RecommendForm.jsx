import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationSelector from './LocationSelector';
import { useLocation } from 'react-router-dom';

const initialFormState = { crop: '', location: '' };

const RecommendForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(Date.now());
  const location = useLocation();

  // Reset form data and location on page refresh or route change
  useEffect(() => {
    setFormData(initialFormState);
    setResult(null);
    setResetKey(Date.now());
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/fertilizer', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Something went wrong.' });
    }
  };

  return (
    
    <div className="container mt-5">
<<<<<<< HEAD
      <h3 className="mb-4">🧪 Fertilizer Recommendation</h3>
=======
      
      <h3>🌿 Get Crop Recommendation</h3>
>>>>>>> 093ee6312fc0acb31bed6d78ca2cb78b460427b2
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Crop Name</label>
          <input
            type="text"
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <LocationSelector
            key={resetKey}
            onLocationSelect={(loc) =>
              setFormData((prev) => ({ ...prev, location: loc }))
            }
          />
          {/* Conditionally render tick mark */}
          {formData.location && (
            <div className="form-text text-success mt-1">
              ✅ Selected Location: <strong>{formData.location}</strong>
            </div>
          )}
        </div>

        <button className="btn btn-primary">Get Recommendation</button>
      </form>

      {result && (
        <div className="mt-4">
          <h5 className="text-success">Recommended Fertilizer Plan:</h5>
          {result.error ? (
            <p className="text-danger">{result.error}</p>
          ) : (
            <ul>
              <li><strong>Crop:</strong> {result.crop}</li>
              <li><strong>Location:</strong> {result.location}</li>
              <li><strong>Fertilizer:</strong> {result.fertilizer}</li>
              <li><strong>Dosage:</strong> {result.dosage}</li>
              <li><strong>Note:</strong> {result.note}</li>
              <li>
                📘 External Source:{' '}
                <a href={result.source} target="_blank" rel="noreferrer">
                  View Fertilizer Details
                </a>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendForm;
