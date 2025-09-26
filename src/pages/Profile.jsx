// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axiosConfig";
import "./Profile.css";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const farmerToken = localStorage.getItem("farmerToken");
        const buyerToken = localStorage.getItem("buyerToken");
        const token = farmerToken || buyerToken;

        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err);
      }
    };
    fetchProfile();
  }, []);

  if (!profileData) return <p className="profile-loading">Loading profile...</p>;

  return (
    <div className="profile-page">
      {/* Navbar */}
      <header className="profile-navbar">
        <h1> AgriConnect</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main className="profile-container">
        <div className="profile-card">
          <h2>
            {profileData.role === "farmer"
              ? "👨‍🌾 Your Profile"
              : "🛒 Buyer Profile"}
          </h2>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Role:</strong> {profileData.role}</p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(profileData.createdAt).toLocaleDateString()}
          </p>

          {/* Go Back Button */}
          <button className="back-button" onClick={() => navigate(-1)}>
            ⬅ Go Back
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="profile-footer">
        <p>© 2025 AgriConnect. All rights reserved.</p>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
