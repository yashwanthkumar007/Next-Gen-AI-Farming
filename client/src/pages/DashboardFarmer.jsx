import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarWithLogout from '../components/NavbarWithLogout';

const DashboardFarmer = () => {
  const navigate = useNavigate();

  

  const handleRecommendation = () => {
    navigate('/recommend');
  };

  return (
    <div style={{ backgroundColor: '#f0f9f1', minHeight: '100vh' }}>
      <div className="container py-5">
     
      <button className="btn btn-outline-primary me-2" onClick={() => navigate('/profile')}>
  👤 My Profile
</button>

        <div className="text-center mb-4">
          <h2 className="text-success">👨‍🌾 Farmer Dashboard</h2>
          <p>Welcome to your smart farming assistant</p>
        </div>

        <div className="card shadow-sm p-4 border-0 rounded-4">
          <h5 className="mb-3">What would you like to do?</h5>
          <button className="btn btn-outline-success w-100 mb-3" onClick={handleRecommendation}>
            Get Fertilizer Recommendation
          </button>
          <button className="btn btn-outline-success w-100 mb-3" onClick={() => navigate('/list-crop')}>
          + List New Crop
          </button>

          <button className="btn btn-outline-secondary w-100">
            View Crop Market (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardFarmer;
