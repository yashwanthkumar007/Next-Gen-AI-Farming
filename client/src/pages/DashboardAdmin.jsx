import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const DashboardAdmin = () => {
  return (
    <div style={{ background: '#f9f9fc', minHeight: '100vh' }}>
      <div className="container py-5">
   

        <div className="text-center mb-4">
          <h2 className="text-primary">🧑‍💼 Admin Dashboard</h2>
          <p>Manage users, market prices, and backend data</p>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <div className="card shadow-sm p-4 border-0">
              <h5>🧾 Manage Users</h5>
              <p>View and update farmer, buyer, or admin roles</p>
              <button className="btn btn-outline-primary w-100">Open</button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm p-4 border-0">
              <h5>📈 Market Price Control</h5>
              <p>Edit or upload crop pricing data</p>
              <button className="btn btn-outline-primary w-100">Manage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
