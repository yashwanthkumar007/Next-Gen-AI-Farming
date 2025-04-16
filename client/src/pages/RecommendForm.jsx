import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationSelector from './LocationSelector';
import { useLocation } from 'react-router-dom'; // ✅ import this
import NavbarWithLogout from '../components/NavbarWithLogout';

const initialFormState = { crop: '', location: '' };

const RecommendForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(Date.now());
  const location = useLocation(); // ✅ detects path change

  useEffect(() => {
    // ✅ Reset form whenever route is loaded (fresh or revisited)
    setFormData(initialFormState);
    setResult(null);
    setResetKey(Date.now()); // force remount LocationSelector
  }, [location.pathname]); // runs on route path change

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/recommend', formData);
      setResult(res.data.data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Something went wrong.' });
    }
  };

  return (
    
    <div className="container mt-5">
      
      <h3>🌿 Get Crop Recommendation</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Crop</label>
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
          {formData.location && (
            <div className="form-text text-success mt-1">
              ✅ Selected Location: <strong>{formData.location}</strong>
            </div>
          )}
        </div>

        <button className="btn btn-success">Submit</button>
      </form>

      {result && (
        <div className="mt-4">
          <h5>Recommendation:</h5>
          {result.error ? (
            <p className="text-danger">{result.error}</p>
          ) : (
            <ul>
              <li>Crop: {result.crop}</li>
              <li>Location: {result.location}</li>
              <li>Fertilizer: {result.fertilizer}</li>
              <li>Pesticide: {result.pesticide}</li>
              <li>Note: {result.note}</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendForm;
