import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationSelector from './LocationSelector';
import { useLocation } from 'react-router-dom';

const initialFormState = { crop: '', location: '' };

const RecommendForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(Date.now());
  const [locationSelected, setLocationSelected] = useState(false); // State to control location display
  const location = useLocation();

  useEffect(() => {
    setFormData(initialFormState);
    setResult(null);
    setLocationSelected(false); // Reset the location display on page refresh
    setResetKey(Date.now()); // Trigger re-render of LocationSelector component
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
    <div className="container">
      <h3 className="mb-4">🧪 Fertilizer Recommendation</h3>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Crop Name</label>
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
          <label className="form-label">Location</label>
          <LocationSelector
            key={resetKey}
            onLocationSelect={(loc) => {
              setFormData((prev) => ({ ...prev, location: loc }));
              setLocationSelected(true); // Mark location as selected
            }}
          />
          {locationSelected && formData.location && (
            <div className="form-text text-success mt-1">
              <strong>Selected Location:</strong> <strong>{formData.location}</strong>
            </div>
          )}
        </div>

        <button className="btn btn-success w-100">Get Recommendation</button>
      </form>

      {result && (
        <div className="mt-4 p-3 border rounded bg-white">
          <h5 className="text-success mb-3">Recommended Fertilizer Plan:</h5>
          {result.error ? (
            <p className="text-danger">{result.error}</p>
          ) : (
            <ul className="list-group">
              <li className="list-group-item"><strong>Crop:</strong> {result.crop}</li>
              <li className="list-group-item"><strong>Location:</strong> {result.location}</li>
              <li className="list-group-item"><strong>Fertilizer:</strong> {result.fertilizer}</li>
              <li className="list-group-item"><strong>Dosage:</strong> {result.dosage}</li>
              <li className="list-group-item"><strong>Note:</strong> {result.note}</li>
              <li className="list-group-item">
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
