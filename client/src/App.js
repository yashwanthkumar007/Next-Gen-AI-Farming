import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecommendForm from './pages/RecommendForm';
import DashboardFarmer from './pages/DashboardFarmer';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardBuyer from './pages/DashboardBuyer';
import CropMarket from './pages/CropMarket';
import CropListingForm from './pages/CropListingForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recommend" element={<RecommendForm />} />
        <Route path="/farmer-dashboard" element={<DashboardFarmer />} />
        <Route path="/admin-dashboard" element={<DashboardAdmin />} />
        <Route path="/buyer-dashboard" element={<DashboardBuyer />} />
        <Route path="/market" element={<CropMarket />} />
        <Route path="/list-crop" element={<CropListingForm />} />
      
      </Routes>
    </Router>
  );
}

export default App;
