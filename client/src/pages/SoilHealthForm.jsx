import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const SoilHealthForm = () => {
  const [formData, setFormData] = useState({
    crop: '',
    location: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    organicCarbon: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/soil-health', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="container py-5 animate__animated animate__fadeIn">
      <h3 className="text-center text-primary mb-4">🧪 Soil Health Based Fertilizer Recommendation</h3>
      <form onSubmit={handleSubmit} className="border p-4 shadow rounded bg-light">
        <div className="row g-3">
          <div className="col-md-6">
            <label>Crop Name</label>
            <input type="text" className="form-control" name="crop" value={formData.crop} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>Location</label>
            <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label>Nitrogen (N)</label>
            <input type="number" className="form-control" name="nitrogen" value={formData.nitrogen} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label>Phosphorus (P)</label>
            <input type="number" className="form-control" name="phosphorus" value={formData.phosphorus} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label>Potassium (K)</label>
            <input type="number" className="form-control" name="potassium" value={formData.potassium} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>pH Level</label>
            <input type="number" step="0.1" className="form-control" name="ph" value={formData.ph} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>Organic Carbon (%)</label>
            <input type="number" step="0.1" className="form-control" name="organicCarbon" value={formData.organicCarbon} onChange={handleChange} required />
          </div>
        </div>
        <button className="btn btn-success mt-4 w-100" disabled={loading}>
          {loading ? 'Processing...' : 'Get Recommendation'}
        </button>
      </form>

      {result && (
        <div className="mt-4">
          <h5 className="text-success">✅ Recommendation:</h5>
          {result.error ? (
            <p className="text-danger">{result.error}</p>
          ) : (
            <ul className="list-group">
              <li className="list-group-item">Crop: <strong>{result.crop}</strong></li>
              <li className="list-group-item">Location: <strong>{result.location}</strong></li>
              <li className="list-group-item">Recommended Fertilizer: <strong>{result.fertilizer}</strong></li>
              <li className="list-group-item">Dosage: <strong>{result.dosage}</strong></li>
              <li className="list-group-item">Note: {result.note}</li>
              <li className="list-group-item">
                Source: <a href={result.source} target="_blank" rel="noreferrer">Fertilizer Guidelines</a>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SoilHealthForm;
