import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import NavbarWithLogout from '../components/NavbarWithLogout';

const states = {
  'Tamil Nadu': ['Erode', 'Chennai', 'Madurai'],
  Punjab: ['Amritsar', 'Ludhiana'],
  Maharashtra: ['Pune', 'Nagpur'],
};

const CropMarketPrices = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch market prices from backend
  const handleFetch = async () => {
    if (!selectedState || !selectedDistrict) return;

    setLoading(true);
    setError(null);

    const apiUrl = `http://localhost:5000/request?commodity=all&state=${selectedState}&market=${selectedDistrict}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setPrices(data);  // Set the fetched prices

    } catch (err) {
      setError('Error fetching market prices. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPrices([]);
  }, [selectedState, selectedDistrict]);

  return (
    <div className="bg-light min-vh-100 px-3 py-5 animate__animated animate__fadeIn">
      <div className="container">
      <NavbarWithLogout />

        <h3 className="text-center text-primary mb-4">📈 Market Price Recommendation</h3>

        <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 600 }}>
          <div className="mb-3">
            <label className="form-label">Select State</label>
            <select
              className="form-select"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('');
              }}
            >
              <option value="">-- Choose State --</option>
              {Object.keys(states).map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </div>

          {selectedState && (
            <div className="mb-3">
              <label className="form-label">Select District</label>
              <select
                className="form-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">-- Choose District --</option>
                {states[selectedState].map((district) => (
                  <option key={district}>{district}</option>
                ))}
              </select>
            </div>
          )}

          <button
            className="btn btn-primary w-100"
            disabled={!selectedState || !selectedDistrict}
            onClick={handleFetch}
          >
            Show Market Prices
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 alert alert-danger text-center">
            {error}
          </div>
        )}

        {prices.length > 0 && !loading && (
          <div className="mt-4">
            <h5 className="text-center text-success mb-3">
              📍 Market Prices for {selectedDistrict}, {selectedState}
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Crop</th>
                    <th>Market Price</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.Commodity}</td>
                      <td>{item['Model Prize']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropMarketPrices;
