import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardFarmer = () => {
  const navigate = useNavigate();

  return (
    <main style={{ backgroundColor: '#f0f9f1', minHeight: '100vh' }}>
      <div className="container py-4">
        <nav className="navbar navbar-light bg-light rounded-3 mb-4 px-3">
          <span className="navbar-brand mb-0 h5">👨‍🌾 Farmer Dashboard</span>
          <button className="btn btn-outline-primary" onClick={() => navigate('/profile')}>
            👤 My Profile
          </button>
        </nav>

        <div className="card shadow-sm p-4 border-0 rounded-4">
          <h5 className="mb-3 text-center text-success">Welcome to your smart farming assistant</h5>

          <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate('/recommend')}>
            Get Fertilizer Recommendation
          </button>
          <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate('/list-crop')}>
            + List New Crop
          </button>
          <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate('/leaf-color-checker')}>
            🍃 Leaf Color Chart
          </button>
          <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate('/soil-health')}>
            Soil Health
          </button>
          <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate('/farmer-crops')}>
            🌾 Manage My Crops
          </button>
          <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate('/price-market')}>
            📊 Market Prices
          </button>
        </div>
      </div>
    </main>
  );
};

export default DashboardFarmer;
