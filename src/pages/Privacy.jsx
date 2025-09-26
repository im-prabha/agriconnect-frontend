// src/pages/Privacy.jsx
import { Link } from "react-router-dom";
import "./Privacy.css";

export default function Privacy() {
  return (
    <div className="privacy-page">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="navbar-logo"> AgriConnect</div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/features">Features</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/privacy" className="active">
              Privacy
            </Link>
          </li>
        </ul>
        <div className="navbar-actions">
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
          <Link to="/signup" className="btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <section className="privacy-hero">
        <h1>🔒 Privacy Policy</h1>
        <p>
          Your privacy is important to us. Learn how AgriConnect collects, uses,
          and protects your information.
        </p>
      </section>

      {/* ✅ Content Section */}
      <section className="privacy-content">
        <div className="privacy-section">
          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, phone
            number, email, and location to provide better services and
            facilitate farmer-buyer interactions.
          </p>
        </div>

        <div className="privacy-section">
          <h2>2. How We Use Your Data</h2>
          <p>
            Your data is used to improve our platform, connect you with buyers
            and farmers, enhance transparency, and provide personalized
            recommendations.
          </p>
        </div>

        <div className="privacy-section">
          <h2>3. Data Security</h2>
          <p>
            We implement strict security measures to protect your information
            from unauthorized access, disclosure, alteration, or destruction.
          </p>
        </div>

        <div className="privacy-section">
          <h2>4. Third-Party Sharing</h2>
          <p>
            We do not sell or trade your personal information. Data may only be
            shared with trusted partners necessary for delivering our services.
          </p>
        </div>

        <div className="privacy-section">
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your information at
            any time. Please contact us for assistance regarding your data.
          </p>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
        <ul>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms of Service</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
