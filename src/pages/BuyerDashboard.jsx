// src/pages/BuyerDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/axiosConfig";
import "./BuyerDashboard.css";

export default function BuyerDashboard() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [buyerContacts, setBuyerContacts] = useState({});
  const [messages, setMessages] = useState({}); // ✅ per-product messages
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const placeOrder = async (productId) => {
    try {
      const token = localStorage.getItem("buyerToken");
      const buyerContact = buyerContacts[productId] || "";

      if (!/^[0-9]{10}$/.test(buyerContact)) {
        showMessage(productId, "❌ Please enter a valid 10-digit mobile number", "error");
        return;
      }

      const res = await API.post(
        "/orders",
        {
          productId,
          quantity: quantity[productId] || 1,
          buyerContact,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showMessage(productId, res.data.message || "✅ Order placed successfully", "success");

      // ✅ Reset input fields
      setBuyerContacts((prev) => ({ ...prev, [productId]: "" }));
      setQuantity((prev) => ({ ...prev, [productId]: "" }));

      fetchProducts();
    } catch (err) {
      console.error("Error placing order:", err.response?.data || err);
      showMessage(productId, err.response?.data?.message || "❌ Failed to place order", "error");
    }
  };

  // ✅ Helper for showing & auto-hiding messages with fade-out
  const showMessage = (productId, text, type) => {
    setMessages((prev) => ({
      ...prev,
      [productId]: { text, type, fading: false },
    }));

    // Start fade-out before removal
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [productId]: { ...prev[productId], fading: true },
      }));
    }, 2500);

    // Remove after fade-out
    setTimeout(() => {
      setMessages((prev) => {
        const newMessages = { ...prev };
        delete newMessages[productId];
        return newMessages;
      });
    }, 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem("buyerToken");
    navigate("/login");
  };

  return (
    <div className="buyer-dashboard">
      {/* Navbar same as Landing */}
      <header className="navbar">
        <h1>🌱 AgriConnect</h1>
        <nav>
          <Link to="/profile">My Profile</Link>
          <Link to="/buyer-orders">My Orders</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>

      {/* Dashboard Title */}
      <div className="dashboard-title">
        <h2>🛒 Buyer Dashboard</h2>
      </div>

      {products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              {/* Image with overlay and title */}
              <div className="product-image-wrapper">
                {p.imageSrc ? (
                  <img
                    src={p.imageSrc}
                    alt={p.name}
                    className="product-image"
                  />
                ) : (
                  <div className="product-image placeholder">No Image</div>
                )}
                <div className="image-overlay" />
                <span className="image-label">{p.name}</span>
              </div>

              {/* Product Details */}
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>

                <div className="detail-item highlight">
                  <span className="label">Price:</span> ₹{p.price}/kg
                </div>

                <div className="detail-item">
                  <span className="label">Quantity:</span> {p.quantity} kg available
                </div>

                <div className="detail-item">
                  <span className="label">Farmer:</span> {p.farmer?.name}
                </div>

                <div className="detail-item">
                  <span className="label">Contact:</span> {p.contactInfo}
                </div>

                <div className="detail-item">
                  <span className="label">Produced:</span>{" "}
                  {new Date(p.producedDate).toLocaleDateString()}
                </div>

                <div className="detail-item note">
                  <span className="label">Note:</span> {p.description}
                </div>

                <div className="detail-item">
                  <span className="label">Logistics:</span>{" "}
                  {p.logisticsAvailable === "yes"
                    ? `${p.vehicleType} - ₹${p.logisticsRate}/km`
                    : "Not available"}
                </div>
              </div>

              {/* Order Form */}
              <div className="order-form">
                <input
                  type="text"
                  className="styled-input"
                  value={buyerContacts[p._id] || ""}
                  onChange={(e) =>
                    setBuyerContacts({
                      ...buyerContacts,
                      [p._id]: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  maxLength="10"
                  placeholder="📱 Enter mobile number"
                />
                <input
                  type="number"
                  className="styled-input"
                  min="1"
                  value={quantity[p._id] || ""}
                  onChange={(e) =>
                    setQuantity({
                      ...quantity,
                      [p._id]: e.target.value,
                    })
                  }
                  placeholder="📦 Enter quantity"
                />
                <button onClick={() => placeOrder(p._id)} className="btn green">
                  🛒 Place Order
                </button>

                {/* ✅ Inline product-specific message with fade */}
                {messages[p._id] && (
                  <div
                    className={`order-message ${messages[p._id].type} ${
                      messages[p._id].fading ? "fade-out" : ""
                    }`}
                  >
                    {messages[p._id].text}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer same as Landing */}
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
