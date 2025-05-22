import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DashboardFarmer.css';

const DashboardFarmer = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Get Fertilizer Recommendation',
      route: '/recommend',
      bg: 'images/fertilizer.jpg',
    },
    {
      title: 'List New Crop',
      route: '/list-crop',
      bg: 'images/crop.jpg',
    },
    {
      title: 'Leaf Color Chart',
      route: '/leaf-color-checker',
      bg: 'images/leaf.jpg',
    },
    {
      title: 'Soil Health',
      route: '/soil-health',
      bg: 'images/soil.jpg',
    },
    {
      title: 'Manage My Crops',
      route: '/farmer-crops',
      bg: 'images/manage.jpg',
    },
    {
      title: 'Market Prices',
      route: '/price-market',
      bg: 'images/market.jpg',
    },
  ];

  return (
    <main style={{ backgroundColor: '#f0f9f1', minHeight: '100vh' }}>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg rounded-4 px-4 mb-4 vibrant-nav">
          <span className="navbar-brand text-white fw-bold h4">👨‍🌾 Farmer Dashboard</span>
          <div className="ms-auto d-flex gap-2">
            <button className="btn btn-light" onClick={() => navigate('/profile')}>
              👤 My Profile
            </button>
            <button className="btn btn-light" onClick={() => navigate('/my-transactions')}>
              💰 My Transactions
            </button>
          </div>
        </nav>

        <h5 className="mb-3 text-center text-success fw-semibold">
          Welcome to your smart farming assistant
        </h5>

        <div className="row g-4">
          {cards.map((card, index) => (
            <div key={index} className="col-md-6">
              <div
                className="dashboard-card"
                style={{
                  backgroundImage: `url(${card.bg})`,
                }}
                onClick={() => navigate(card.route)}
              >
                <div className="card-overlay text-white fw-semibold">{card.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardFarmer;
