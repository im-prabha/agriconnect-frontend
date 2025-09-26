import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Landing.css";

export default function Landing() {
  useEffect(() => {
    const featureCards = document.querySelectorAll(".feature-card");
    const testimonialCards = document.querySelectorAll(".testimonial-card");

    function checkReveal() {
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      // Features reveal stagger
      const featuresTop = document
        .querySelector(".features")
        ?.getBoundingClientRect().top;

      if (featuresTop && featuresTop < windowHeight - revealPoint) {
        featureCards.forEach((card, index) => {
          setTimeout(() => card.classList.add("show"), index * 200);
        });
      }

      // Testimonials reveal stagger
      const testimonialsTop = document
        .querySelector(".testimonials")
        ?.getBoundingClientRect().top;

      if (testimonialsTop && testimonialsTop < windowHeight - revealPoint) {
        testimonialCards.forEach((card, index) => {
          setTimeout(() => card.classList.add("show"), index * 200);
        });
      }
    }

    window.addEventListener("scroll", checkReveal);
    checkReveal();

    return () => window.removeEventListener("scroll", checkReveal);
  }, []);

  return (
    <div className="landing">
      {/* Navbar */}
      <header className="navbar">
        <h1>🌱 AgriConnect</h1>
        <nav>
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <h2>
          Empowering Farmers, <br /> Connecting Buyers
        </h2>
        <p>
          AgriConnect eliminates middlemen by creating a direct, transparent, and
          fair marketplace where farmers get better value, and buyers get fresh
          produce at fair prices.
        </p>
        <div className="buttons">
          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="features">
        <h3>Why Choose AgriConnect?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>🌾 For Farmers</h4>
            <p>
              Sell directly to buyers, gain fair pricing, and avoid exploitative
              middlemen.
            </p>
          </div>
          <div className="feature-card">
            <h4>🛒 For Buyers</h4>
            <p>
              Access fresh, high-quality farm products straight from the source.
            </p>
          </div>
          <div className="feature-card">
            <h4>🌍 Our Mission</h4>
            <p>
              Strengthen rural communities through transparency and
              sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h3>Join the Future of Farming Today</h3>
        <p>
          Be part of a transparent marketplace where farmers thrive, buyers save,
          and communities grow stronger.
        </p>
        <Link to="/signup" className="cta-btn">
          Get Started Now
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h3>What Our Users Say</h3>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            “AgriConnect helped me sell my harvest directly and earn 30% more
            profit.”
            <br />— Ramesh, Farmer
          </div>
          <div className="testimonial-card">
            “I now buy fresh produce at fair prices without middlemen.”
            <br />— Anjali, Buyer
          </div>
          <div className="testimonial-card">
            “This platform is revolutionizing rural trade and supporting
            communities.”
            <br />— NGO Partner
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
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
