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
import SoilHealthForm from './pages/SoilHealthForm';
import LeafColorChecker from "./pages/LeafColorChecker";
import UserProfile from "./pages/UserProfile";
import NavbarWithLogout from "./components/NavbarWithLogout";
import FarmerPublicProfile from "./pages/FarmerPublicProfile";
import FarmerMyCrops from "./pages/FarmerMyCrops";
import MarketData from "./pages/MarketData";
import './styles/market.css';
import AdminUserList from "./pages/AdminUserList";
import AdminCropList from "./pages/AdminCropList";
import MarketPriceViewer from './pages/MarketPriceViewer';
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const token = localStorage.getItem('token'); // ✅ Check token

  return (
    <Router>
      {token && <NavbarWithLogout />} {/* ✅ Only show if logged in */}
      
      <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    {/* Protected Routes by Role */}
    <Route path="/farmer-dashboard" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <DashboardFarmer />
      </ProtectedRoute>
    } />

    <Route path="/admin-dashboard" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardAdmin />
      </ProtectedRoute>
    } />

    <Route path="/buyer-dashboard" element={
      <ProtectedRoute allowedRoles={['buyer']}>
        <DashboardBuyer />
      </ProtectedRoute>
    } />

    {/* Farmer-only Pages */}
    <Route path="/market" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <CropMarket />
      </ProtectedRoute>
    } />
    <Route path="/list-crop" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <CropListingForm />
      </ProtectedRoute>
    } />
    <Route path="/leaf-color-checker" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <LeafColorChecker />
      </ProtectedRoute>
    } />
    <Route path="/market-prices" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <CropMarketPrices />
      </ProtectedRoute>
    } />
    <Route path="/soil-health" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <SoilHealthForm />
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute allowedRoles={['farmer', 'buyer']}>
        <UserProfile />
      </ProtectedRoute>
    } />
    <Route path="/farmer-crops" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <FarmerMyCrops />
      </ProtectedRoute>
    } />

    {/* Shared Route: View Public Profile */}
    <Route path="/farmer/:id" element={
      <ProtectedRoute allowedRoles={['buyer']}>
        <FarmerPublicProfile />
      </ProtectedRoute>
    } />

    {/* Shared: Recommend AI */}
    <Route path="/recommend" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <RecommendForm />
      </ProtectedRoute>
    } />

    <Route path="/marketdata" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <MarketData />
      </ProtectedRoute>
    } />

    {/* Admin-Only Pages */}
    <Route path="/admin/users" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminUserList />
      </ProtectedRoute>
    } />
    <Route path="/admin/crops" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminCropList />
      </ProtectedRoute>
    } />
    <Route path="/admin/pricedata" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <MarketPriceViewer />
      </ProtectedRoute>
    } />
    <Route path="/price-market" element={
      <ProtectedRoute allowedRoles={['farmer']}>
        <MarketPriceViewer />
      </ProtectedRoute>
    } />
  </Routes>
</Router>

  );
}

export default App;
