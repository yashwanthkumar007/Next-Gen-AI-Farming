import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const DashboardBuyer = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/crops');
        const data = await res.json();
        setCrops(data);
      } catch (err) {
        console.error('Error fetching crops:', err);
        setCrops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const handleInterest = (crop) => {
    alert(`✅ You have expressed interest in buying ${crop.name} from ${crop.farmer || 'Farmer'}`);
    // Optional: Later call POST /api/crops/:id/interest to reduce quantity
  };

  return (
    <div className="bg-light min-vh-100 px-3 py-5 animate__animated animate__fadeIn">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-warning">🛒 Buyer Dashboard</h3>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate('/profile')}
          >
            👤 My Profile
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-warning" role="status" />
            <p className="text-muted mt-2">Loading crop listings...</p>
          </div>
        ) : crops.length === 0 ? (
          <div className="text-center mt-5 text-muted">
            🚫 Market is currently unavailable.
          </div>
        ) : (
          <div className="row g-4">
            {crops.map((crop, index) => (
              <div className="col-md-4" key={index}>
                <div className="card shadow-sm border-0 p-3">
                  <h5 className="text-success">{crop.name}</h5>
                  <ul className="list-unstyled small text-muted mb-2">
                    <li>📍 {crop.location}</li>
                    <li>🧺 Quantity: {crop.quantity}kg</li>
                    <li>💰 Price: {crop.price}</li>
                    <li>
                      👨‍🌾 Farmer:{' '}
                      <button
                        className="btn btn-link p-0"
                        onClick={() => navigate(`/farmer/${crop.farmerId}`)}
                      >
                        {crop.farmer || 'N/A'}
                      </button>
                    </li>
                  </ul>
                  <button
                    className="btn btn-sm btn-outline-warning w-100"
                    onClick={() => handleInterest(crop)}
                  >
                    Express Interest
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBuyer;
