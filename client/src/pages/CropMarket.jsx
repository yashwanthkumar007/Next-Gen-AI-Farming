import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import axios from 'axios';
import NavbarWithLogout from '../components/NavbarWithLogout';


const CropMarket = () => {
  const [role, setRole] = useState('buyer'); // Change to 'farmer' or 'admin' for testing
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/crops')
      .then((res) => {
        setCrops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching crops:', err);
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="bg-light min-vh-100 px-3 py-5 animate__animated animate__fadeIn">
      <div className="container">
      <NavbarWithLogout />

        <h3 className="mb-4 text-center text-primary">🌾 Crop Market</h3>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="text-muted mt-2">Loading market crops...</p>
          </div>
        ) : (
          <>
            {role === 'farmer' && (
              <div className="alert alert-success d-flex justify-content-between align-items-center">
                <span>You can list your own crop for sale here (feature coming soon).</span>
                <button className="btn btn-sm btn-outline-success">+ List Crop</button>
              </div>
            )}

            {role === 'buyer' && (
              <p className="text-muted text-end mb-3">Logged in as: Buyer</p>
            )}

            <div className="row g-4">
              {crops.map((crop, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card shadow-sm p-3 border-0">
                    <h5 className="text-success">{crop.name}</h5>
                    <ul className="list-unstyled small text-muted mb-2">
                      <li>📍 {crop.location}</li>
                      <li>🧺 Quantity: {crop.quantity}</li>
                      <li>💰 Price: {crop.price}</li>
                      <li>👨‍🌾 Farmer: {crop.farmer}</li>
                    </ul>
                    {role === 'buyer' && (
                      <button className="btn btn-sm btn-outline-primary w-100">
                        Express Interest
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CropMarket;
