import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SoilHealthForm.css';
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
      setResult(res.data.data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="soil-health-form-wrapper animate__animated animate__fadeIn">
      <div className="soil-health-form-container container p-5">
        <h3 className="text-center text-light mb-4">🧪 Soil Health Based Fertilizer Recommendation</h3>
        <form onSubmit={handleSubmit} className="soil-health-form shadow-lg p-4 rounded">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-white">Crop Name</label>
              <input type="text" className="form-control" name="crop" value={formData.crop} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white">Location</label>
              <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label text-white">Nitrogen (N)</label>
              <input type="number" className="form-control" name="nitrogen" value={formData.nitrogen} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label text-white">Phosphorus (P)</label>
              <input type="number" className="form-control" name="phosphorus" value={formData.phosphorus} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label text-white">Potassium (K)</label>
              <input type="number" className="form-control" name="potassium" value={formData.potassium} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white">pH Level</label>
              <input type="number" step="0.1" className="form-control" name="ph" value={formData.ph} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white">Organic Carbon (%)</label>
              <input type="number" step="0.1" className="form-control" name="organicCarbon" value={formData.organicCarbon} onChange={handleChange} required />
            </div>
          </div>
          <button className="btn btn-outline-darkgreen mt-4 w-100 fw-bold" disabled={loading}>
            {loading ? 'Processing...' : 'Get Recommendation'}
          </button>
        </form>

        {result && (
          <div className="result-box mt-5 p-4 rounded">
            <h5 className="text-light">✅ Recommendation:</h5>
            {result.error ? (
              <p className="text-danger">{result.error}</p>
            ) : (
              <ul className="list-group">
                <li className="list-group-item bg-transparent text-white border-white">Crop: <strong>{result.crop}</strong></li>
                <li className="list-group-item bg-transparent text-white border-white">Location: <strong>{result.location}</strong></li>
                <li className="list-group-item bg-transparent text-white border-white">Recommended Fertilizer: <strong>{result.fertilizer}</strong></li>
                <li className="list-group-item bg-transparent text-white border-white">Dosage: <strong>{result.dosage}</strong></li>
                <li className="list-group-item bg-transparent text-white border-white">Note: {result.note}</li>
                <li className="list-group-item bg-transparent text-white border-white">
                  Source: <a href={result.source} target="_blank" rel="noreferrer" className="text-info">Fertilizer Guidelines</a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilHealthForm;
