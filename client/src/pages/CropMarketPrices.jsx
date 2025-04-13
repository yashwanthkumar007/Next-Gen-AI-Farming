import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const mockPrices = {
  'Tamil Nadu - Erode': [
    { crop: 'Tomato', price: '₹22/kg' },
    { crop: 'Onion', price: '₹18/kg' },
    { crop: 'Brinjal', price: '₹30/kg' },
  ],
  'Punjab - Amritsar': [
    { crop: 'Wheat', price: '₹23/kg' },
    { crop: 'Rice', price: '₹26/kg' },
    { crop: 'Maize', price: '₹20/kg' },
  ],
  'Maharashtra - Pune': [
    { crop: 'Sugarcane', price: '₹34/kg' },
    { crop: 'Cotton', price: '₹57/kg' },
  ],
};

const states = {
  'Tamil Nadu': ['Erode', 'Chennai', 'Madurai'],
  Punjab: ['Amritsar', 'Ludhiana'],
  Maharashtra: ['Pune', 'Nagpur'],
};

const CropMarketPrices = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [prices, setPrices] = useState([]);

  const handleFetch = () => {
    const key = `${selectedState} - ${selectedDistrict}`;
    setPrices(mockPrices[key] || []);
  };

  useEffect(() => {
    setPrices([]);
  }, [selectedState, selectedDistrict]);

  return (
    <div className="bg-light min-vh-100 px-3 py-5 animate__animated animate__fadeIn">
      <div className="container">
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

        {prices.length > 0 && (
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
                      <td>{item.crop}</td>
                      <td>{item.price}</td>
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
