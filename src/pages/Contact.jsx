// src/pages/Contact.jsx
import { Link } from "react-router-dom";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
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
            <Link to="/contact" className="active">
              Contact
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
      <section className="contact-hero">
        <h1>📞 Contact Us</h1>
        <p>
          Have questions or feedback? We’d love to hear from you.  
          Let’s build a better agricultural ecosystem together.
        </p>
      </section>

      {/* ✅ Contact Information Section */}
      <section className="contact-content">
        <div className="contact-grid">
          <div className="contact-card">
            <h3>🌍 Office Location</h3>
            <p>1/177, West Street, Valliyur, Virudhunagar</p>
          </div>
          <div className="contact-card">
            <h3>📧 Email</h3>
            <p>agriconnectsupport@gmail.com</p>
          </div>
          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p>+91 90257 88385</p>
          </div>
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
