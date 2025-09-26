// src/pages/Terms.jsx
import { Link } from "react-router-dom";
import "./Terms.css";

export default function Terms() {
  return (
    <div className="terms-page">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">🌱 AgriConnect</div>
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
            <Link to="/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/terms" className="active">
              Terms
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
      <section className="terms-hero">
        <h1>📜 Terms of Service</h1>
        <p>
          Please read these terms carefully before using AgriConnect. By
          accessing or using our platform, you agree to these terms.
        </p>
      </section>

      {/* ✅ Content Section */}
      <section className="terms-content">
        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using AgriConnect, you agree to comply with and be
            bound by these Terms of Service and our Privacy Policy.
          </p>
        </div>

        <div className="terms-section">
          <h2>2. Use of the Platform</h2>
          <p>
            You agree to use the platform only for lawful purposes. Farmers and
            buyers must provide accurate information and comply with local laws.
          </p>
        </div>

        <div className="terms-section">
          <h2>3. Accounts and Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and agree to notify us immediately of any unauthorized use.
          </p>
        </div>

        <div className="terms-section">
          <h2>4. Limitation of Liability</h2>
          <p>
            AgriConnect is not liable for any direct or indirect damages arising
            from transactions, disputes, or misuse of the platform.
          </p>
        </div>

        <div className="terms-section">
          <h2>5. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            platform after changes indicates your acceptance of the new terms.
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
