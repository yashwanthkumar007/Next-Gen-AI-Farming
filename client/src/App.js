import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import RecommendForm from "./pages/RecommendForm";
import DashboardFarmer from "./pages/DashboardFarmer";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardBuyer from "./pages/DashboardBuyer";
import CropMarket from "./pages/CropMarket";
import CropListingForm from "./pages/CropListingForm";
import CropMarketPrices from "./pages/CropMarketPrices";
import SoilHealthForm from "./pages/SoilHealthForm";
import LeafColorChecker from "./pages/LeafColorChecker";
import UserProfile from "./pages/UserProfile";
import FarmerPublicProfile from "./pages/FarmerPublicProfile";
import FarmerMyCrops from "./pages/FarmerMyCrops";
import MarketData from "./pages/MarketData";
import AdminUserList from "./pages/AdminUserList";
import AdminCropList from "./pages/AdminCropList";
import MarketPriceViewer from "./pages/MarketPriceViewer";

// Components
import NavbarWithLogout from "./components/NavbarWithLogout";
import ProtectedRoute from "./components/ProtectedRoute";

// Styles
import "./styles/market.css";

// Layout-aware routing wrapper
const AppRoutes = () => {
  const location = useLocation();

  // Hide navbar on login and register pages
  const hideNavbarRoutes = ["/", "/register"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <NavbarWithLogout />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboards */}
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <DashboardFarmer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <DashboardBuyer />
            </ProtectedRoute>
          }
        />

        {/* Farmer Routes */}
        <Route
          path="/market"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <CropMarket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-crop"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <CropListingForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaf-color-checker"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <LeafColorChecker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/market-prices"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <CropMarketPrices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/soil-health"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <SoilHealthForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer-crops"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <FarmerMyCrops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketdata"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <MarketData />
            </ProtectedRoute>
          }
        />

        {/* Shared Profile Access */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["farmer", "buyer"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/:id"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <FarmerPublicProfile />
            </ProtectedRoute>
          }
        />

        {/* Recommendation (AI-based) */}
        <Route
          path="/recommend"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <RecommendForm />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/crops"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCropList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pricedata"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MarketPriceViewer />
            </ProtectedRoute>
          }
        />

        {/* Alias route for farmers to view market prices */}
        <Route
          path="/price-market"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <MarketPriceViewer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
