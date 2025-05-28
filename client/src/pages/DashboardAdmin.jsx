import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardAdmin.css';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-bg animate__animated animate__fadeIn">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="text-success fw-bold">🧑‍💼 Admin Dashboard</h2>
          <p className="text-dark">Monitor and control user activity, crop listings, and market intelligence.</p>
        </div>

        <div className="row g-4">
          {/* 1. User Management */}
          <div className="col-md-4">
            <div className="card custom-card h-100 p-4">
              <h5>🧾 User Management</h5>
              <p className="small">View, deactivate, or remove farmers and buyers.</p>
              <button
                className="btn btn-outline-success mt-auto w-100"
                onClick={() => navigate('/admin/users')}
              >
                Manage Users
              </button>
            </div>
          </div>

          {/* 2. Crop Listings Monitoring */}
          <div className="col-md-4">
            <div className="card custom-card h-100 p-4">
              <h5>🌿 Crop Listings</h5>
              <p className="small">Review crop entries and delete invalid listings.</p>
              <button
                className="btn btn-outline-success mt-auto w-100"
                onClick={() => navigate('/admin/crops')}
              >
                View Crops
              </button>
            </div>
          </div>

          {/* 3. Market Oversight */}
          <div className="col-md-4">
            <div className="card custom-card h-100 p-4">
              <h5>📊 Market Oversight</h5>
              <p className="small">Check prices and sync with Agmarknet API.</p>
              <button
                className="btn btn-outline-success mt-auto w-100"
                onClick={() => navigate('/admin/pricedata')}
              >
                Sync Market Data
              </button>
            </div>
          </div>

          {/* 4. Transaction Oversight */}
          <div className="col-md-4">
            <div className="card custom-card h-100 p-4">
              <h5>📄 Transaction List</h5>
              <p className="small">Check all transactions.</p>
              <button
                className="btn btn-outline-success mt-auto w-100"
                onClick={() => navigate('/admin/transactions')}
              >
                Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
