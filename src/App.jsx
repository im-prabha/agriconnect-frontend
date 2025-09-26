// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import BuyerDashboard from "./pages/BuyerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerOrders from "./pages/BuyerOrders";
import FarmerOrders from "./pages/FarmerOrders";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Import new static pages
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// ✅ Import universal profile page
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route should land on Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Static Pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Buyer Routes */}
        <Route
          path="/buyer-dashboard"
          element={
            <ProtectedRoute role="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer-orders"
          element={
            <ProtectedRoute role="buyer">
              <BuyerOrders />
            </ProtectedRoute>
          }
        />

        {/* Farmer Routes */}
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute role="farmer">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer-orders"
          element={
            <ProtectedRoute role="farmer">
              <FarmerOrders />
            </ProtectedRoute>
          }
        />

        {/* ✅ Profile Page (Universal for both roles) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute role={["buyer", "farmer"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback for wrong URLs */}
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", marginTop: "50px" }}>
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}
