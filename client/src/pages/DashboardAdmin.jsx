import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f9f9fc', minHeight: '100vh' }} className="animate__animated animate__fadeIn">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="text-primary">🧑‍💼 Admin Dashboard</h2>
          <p className="text-muted">Monitor and control user activity, crop listings, and market intelligence.</p>
        </div>

        <div className="row g-4">
          {/* 1. User Management */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="text-success">🧾 User Management</h5>
              <p className="small text-muted">View, deactivate, or remove farmers and buyers.</p>
              <button className="btn btn-outline-success mt-auto w-100" onClick={() => navigate('/admin/users')}
              >
                Manage Users
              </button>
            </div>
          </div>

          {/* 2. Crop Listings Monitoring */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="text-warning">🌿 Crop Listings</h5>
              <p className="small text-muted">Review crop entries and delete invalid listings.</p>
              <button className="btn btn-outline-warning mt-auto w-100" onClick={() => navigate('/admin/crops')}              >
                View Crops
              </button>
            </div>
          </div>

          {/* 3. Market Oversight */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4">
              <h5 className="text-info">📊 Market Oversight</h5>
              <p className="small text-muted">Check prices and sync with Agmarknet API.</p>
              <button className="btn btn-outline-info mt-auto w-100" onClick={() => navigate('/admin/pricedata')}>
                Sync Market Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
