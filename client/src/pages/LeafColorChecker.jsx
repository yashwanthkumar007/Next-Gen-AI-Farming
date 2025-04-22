import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const LeafColorChecker = () => {
  const [selectedShade, setSelectedShade] = useState(null);
  const [crop, setCrop] = useState('');
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const recommendations = {
    1: '50kg Urea per acre',
    2: '40kg Urea per acre',
    3: '25kg Urea per acre',
    4: '10kg Urea per acre',
    5: 'No Urea needed'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('crop', crop);
    formData.append('shade', selectedShade);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/lcc', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Something went wrong.' });
    }

    setLoading(false);
  };

  return (
    <div className="container py-5 animate__animated animate__fadeIn">
      <h3 className="text-center text-success mb-4">🍃 Leaf Color Chart (LCC) Recommendation</h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Crop Name</label>
          <input
            type="text"
            className="form-control"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Leaf Image (optional)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Leaf Color Shade</label>
          <div className="d-flex gap-3 flex-wrap">
            {[1, 2, 3, 4, 5].map((shade) => (
              <button
                key={shade}
                type="button"
                className={`rounded-circle border border-dark`}
                onClick={() => setSelectedShade(shade)}
                style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: ['#a2e33f', '#74c63e', '#3e9f39', '#29712e', '#1d4f1f'][shade - 1],
                  outline: selectedShade === shade ? '4px solid #000' : 'none',
                }}
              ></button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary mt-3" type="submit" disabled={!selectedShade || !crop || loading}>
          {loading ? 'Submitting...' : 'Get Recommendation'}
        </button>
      </form>

      {result && (
        <div className="mt-4 text-center">
          <h5 className="text-success">✅ Recommendation</h5>
          {result.error ? (
            <p className="text-danger">{result.error}</p>
          ) : (
            <ul className="list-unstyled">
              <li><strong>Crop:</strong> {result.crop}</li>
              <li><strong>Detected Shade:</strong> {result.shade}</li>
              <li><strong>Fertilizer:</strong> {result.fertilizer}</li>
              <li><strong>Dosage:</strong> {result.dosage}</li>
              <li><strong>Note:</strong> {result.note}</li>
              <li>
                <a href={result.source} target="_blank" rel="noreferrer">
                  🌐 Source: Fertilizer Guide
                </a>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LeafColorChecker;