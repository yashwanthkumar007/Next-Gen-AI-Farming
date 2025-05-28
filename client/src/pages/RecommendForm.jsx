import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationSelector from './LocationSelector';
import { useLocation } from 'react-router-dom';
import '../styles/RecommendForm.css'; // New CSS file

const initialFormState = { crop: '', location: '' };

const RecommendForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(Date.now());
  const [locationSelected, setLocationSelected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setFormData(initialFormState);
    setResult(null);
    setLocationSelected(false);
    setResetKey(Date.now());
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/recommend/api/fertilizer', formData);
      if (res.data.status === 'success') {
        setResult(res.data.data);
      } else {
        setResult(res.data);
      }
    } catch (err) {
      console.error(err);
      setResult({ error: 'Something went wrong.' });
    }
  };

  return (
    <div className="recommend-bg min-vh-100 py-5 px-3">
      <div className="container">
        <div className="text-white p-4 rounded shadow header-card mb-4">
          <h2 className="text-center fw-bold">🌾 Fertilizer Recommendation System</h2>
          <p className="text-center mb-0">Get the right nutrients for your crop and location</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-form rounded-4 shadow p-4">
          <div className="mb-3">
            <label className="form-label fw-bold">Crop Name</label>
            <input
              type="text"
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter crop name (e.g., Rice, Wheat)"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Location</label>
            <LocationSelector
              key={resetKey}
              onLocationSelect={(loc) => {
                setFormData((prev) => ({ ...prev, location: loc }));
                setLocationSelected(true);
              }}
            />
            {locationSelected && formData.location && (
              <div className="form-text text-success mt-1">
                <strong>Selected Location:</strong> {formData.location}
              </div>
            )}
          </div>

          <button className="btn btn-success w-100 fw-semibold">Get Recommendation</button>
        </form>

        {result && (
          <div className="mt-4 p-4 rounded-4 shadow glass-result">
            <h5 className="text-success mb-3 fw-bold">Recommended Fertilizer Plan:</h5>
            {result.error ? (
            <p className="text-danger">{result.error}</p>
            ) : (
            <ul className="list-group list-group-flush ">
              <li className="list-group-item"><strong>Crop:</strong> {result.crop}</li>
              <li className="list-group-item"><strong>Location:</strong> {result.location}</li>
              <li className="list-group-item"><strong>Fertilizer:</strong> {result.fertilizer}</li>
              <li className="list-group-item"><strong>Dosage:</strong> {result.dosage}</li>
              <li className="list-group-item"><strong>Note:</strong> {result.note}</li>
            <li className="list-group-item">
        📘 <strong>External Source:</strong>{' '}
        <a href={result.source} target="_blank" rel="noreferrer">View Fertilizer Details</a>
      </li>
    </ul>
  )}
</div>

        )}
      </div>
    </div>
  );
};

export default RecommendForm;
