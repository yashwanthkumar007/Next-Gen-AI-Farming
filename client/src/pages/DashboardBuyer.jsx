import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const DashboardBuyer = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from backend
    setTimeout(() => {
      setCrops([
        {
          name: 'Tomato',
          quantity: '300kg',
          price: '₹25/kg',
          location: 'Coimbatore',
          farmer: 'Velu',
        },
        {
          name: 'Chili',
          quantity: '100kg',
          price: '₹60/kg',
          location: 'Madurai',
          farmer: 'Ravi',
        },
        {
          name: 'Brinjal',
          quantity: '80kg',
          price: '₹30/kg',
          location: 'Salem',
          farmer: 'Meena',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInterest = (crop) => {
    alert(`✅ You have expressed interest in buying ${crop.name} from ${crop.farmer}`);
  };

  return (
    <div className="bg-light min-vh-100 px-3 py-5 animate__animated animate__fadeIn">
      <div className="container">
        <h3 className="text-warning text-center mb-4">🛒 Buyer Dashboard</h3>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-warning" role="status" />
            <p className="text-muted mt-2">Loading crop listings...</p>
          </div>
        ) : (
          <div className="row g-4">
            {crops.map((crop, index) => (
              <div className="col-md-4" key={index}>
                <div className="card shadow-sm border-0 p-3">
                  <h5 className="text-success">{crop.name}</h5>
                  <ul className="list-unstyled small text-muted mb-2">
                    <li>📍 {crop.location}</li>
                    <li>🧺 Quantity: {crop.quantity}</li>
                    <li>💰 Price: {crop.price}</li>
                    <li>👨‍🌾 Farmer: {crop.farmer}</li>
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
