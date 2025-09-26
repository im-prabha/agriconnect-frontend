import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Features.css";

export default function Features() {
  useEffect(() => {
    const cards = document.querySelectorAll(".feature-card");

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

    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <div className="features-page">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">🌱 AgriConnect</div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/features" className="active">
              Features
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
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
      <section className="features-hero">
        <h1>✨ Features of AgriConnect</h1>
        <p>
          Discover how AgriConnect is transforming agriculture and rural trade
          into a transparent and fair ecosystem.
        </p>
      </section>

      {/* ✅ Features Grid */}
      <section className="features-content">
        <div className="features-grid">
          <div className="feature-card">
            <h3>🌾 Direct Marketplace</h3>
            <p>
              Farmers can sell directly to buyers, eliminating middlemen and
              ensuring better profits.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Transparent Pricing</h3>
            <p>
              Real-time pricing powered by data insights ensures fairness for
              both farmers and buyers.
            </p>
          </div>

          <div className="feature-card">
            <h3>🚚 Logistics Support</h3>
            <p>
              Integrated delivery and pickup solutions help reduce hassles in
              trade and transport.
            </p>
          </div>

          <div className="feature-card">
            <h3>🤝 Community Building</h3>
            <p>
              Connecting farmers, buyers, and NGOs to build stronger rural
              communities.
            </p>
          </div>

          <div className="feature-card">
            <h3>📱 Easy to Use</h3>
            <p>
              A simple and user-friendly platform designed for accessibility in
              both rural and urban areas.
            </p>
          </div>

          <div className="feature-card">
            <h3>🌍 Sustainability</h3>
            <p>
              Promoting eco-friendly practices and fair trade to empower future
              generations.
            </p>
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
