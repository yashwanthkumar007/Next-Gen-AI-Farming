import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecommendForm from "./pages/RecommendForm";
import DashboardFarmer from "./pages/DashboardFarmer";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardBuyer from "./pages/DashboardBuyer";
import CropMarket from "./pages/CropMarket";
import CropListingForm from "./pages/CropListingForm";
import CropMarketPrices from "./pages/CropMarketPrices";
import Register from './pages/Register';
import profile from './pages/UserProfile';
import UserProfile from "./pages/UserProfile";
import NavbarWithLogout from "./components/NavbarWithLogout";

function App() {
  const token = localStorage.getItem('token'); // ✅ Check token

  return (
    <Router>
      {token && <NavbarWithLogout />} {/* ✅ Only show if logged in */}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommend" element={<RecommendForm />} />
        <Route path="/farmer-dashboard" element={<DashboardFarmer />} />
        <Route path="/admin-dashboard" element={<DashboardAdmin />} />
        <Route path="/buyer-dashboard" element={<DashboardBuyer />} />
        <Route path="/market" element={<CropMarket />} />
        <Route path="/list-crop" element={<CropListingForm />} />
        <Route path="/market-prices" element={<CropMarketPrices />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
