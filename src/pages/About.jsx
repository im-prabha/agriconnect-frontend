import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  useEffect(() => {
    const sections = document.querySelectorAll(".about-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
  }, []);

  return (
    <div className="about-page">
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
            <Link to="/about" className="active">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
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
      <section className="about-hero">
        <h1>🌾 About AgriConnect</h1>
        <p>
          AgriConnect is a platform built to empower farmers, buyers, and rural
          communities by creating a transparent, fair, and sustainable trade
          ecosystem.
        </p>
      </section>

      {/* ✅ About Content */}
      <section className="about-content">
        <div className="about-section">
          <h2>🚀 Our Mission</h2>
          <p>
            Our mission is to eliminate middlemen in agriculture trade, ensure
            farmers get fair prices, and enable buyers to access fresh produce
            directly from the source. By leveraging technology, we bring
            efficiency, transparency, and trust to the agricultural supply
            chain.
          </p>
        </div>

        <div className="about-section">
          <h2>🌍 Our Vision</h2>
          <p>
            We envision a sustainable and inclusive agricultural economy where
            farmers are empowered, buyers have transparent access to markets,
            and rural communities thrive through stronger connections.
          </p>
        </div>

        <div className="about-section">
          <h2>🤝 Why Choose Us</h2>
          <ul>
            <li>✔ Direct farmer-to-buyer connection</li>
            <li>✔ Transparent and fair pricing system</li>
            <li>✔ Logistics and community support</li>
            <li>✔ User-friendly and accessible for all</li>
          </ul>
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
