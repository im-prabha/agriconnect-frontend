// src/pages/BuyerOrders.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axiosConfig";
import { authHeaderForRole } from "../utils/auth";
import "./BuyerOrders.css";

export default function BuyerOrders() {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState({});
  const [confirmingOrderId, setConfirmingOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/buyer", {
        headers: authHeaderForRole("buyer"),
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching buyer orders:", err);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "status accepted";
      case "pending":
        return "status pending";
      case "rejected":
        return "status rejected";
      case "cancelled":
        return "status cancelled";
      default:
        return "status";
    }
  };

  const handleCancelConfirm = (orderId) => {
    setConfirmingOrderId(orderId);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await API.delete(`/orders/${orderId}/cancel`, {
        headers: authHeaderForRole("buyer"),
      });

      setMessages((prev) => ({
        ...prev,
        [orderId]: { type: "success", text: res.data.message },
      }));

      setConfirmingOrderId(null);
      fetchOrders();
    } catch (err) {
      console.error("Error canceling order:", err);
      setMessages((prev) => ({
        ...prev,
        [orderId]: {
          type: "error",
          text:
            err.response?.data?.message ??
            "Failed to cancel order. Please try again.",
        },
      }));
      setConfirmingOrderId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("buyerToken");
    navigate("/login");
  };

  return (
    <div className="buyer-orders">
      {/* Navbar */}
      <header className="navbar">
        <h1>🌱 AgriConnect</h1>
        <nav>
          <Link to="/profile">My Profile</Link>
          <Link to="/buyer-dashboard">My Dashboard</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>

      <div className="dashboard-title">
        <h2>🛍️ Buyer Orders</h2>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3 className="order-product">{order.product?.name}</h3>

              <div className="order-detail">
                <span className="label">Farmer:</span> {order.farmer?.email}
              </div>
              <div className="order-detail">
                <span className="label">Quantity:</span> {order.quantity}
              </div>
              <div className="order-detail">
                <span className="label">Total:</span> ₹{order.totalPrice}
              </div>

              {/* Status */}
              <div className={getStatusClass(order.status)}>
                <span className="status-badge"></span>
                Status: {order.status}
              </div>

              <div className="order-detail">
                <span className="label">Farmer Name:</span> {order.farmerName}
              </div>
              <div className="order-detail">
                <span className="label">Farmer Contact:</span>{" "}
                {order.farmerContact}
              </div>
              <div className="order-detail">
                <span className="label">Produced:</span>{" "}
                {new Date(order.product?.producedDate).toLocaleDateString()}
              </div>
              <div className="order-detail">
                <span className="label">Note:</span> {order.product?.description}
              </div>
              <div className="order-detail">
                <span className="label">Logistics:</span>{" "}
                {order.logisticsAvailable === "yes"
                  ? `${order.vehicleType} - ₹${order.logisticsRate}/km`
                  : "Not available"}
              </div>
              <div className="order-detail">
                <span className="label">📱 Your Mobile:</span>{" "}
                {order.buyerContact}
              </div>

              {/* Cancel button only for pending */}
              {order.status === "pending" && confirmingOrderId !== order._id && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancelConfirm(order._id)}
                >
                  Cancel Order
                </button>
              )}

              {/* Confirmation */}
              {confirmingOrderId === order._id && (
                <div className="confirm-box">
                  <p>Do you want to cancel this order?</p>
                  <div className="confirm-actions">
                    <button
                      className="confirm-yes"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Yes
                    </button>
                    <button
                      className="confirm-no"
                      onClick={() => setConfirmingOrderId(null)}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages[order._id] && (
                <p
                  className={`order-message ${
                    messages[order._id].type === "success"
                      ? "success-text"
                      : "error-text"
                  }`}
                >
                  {messages[order._id].text}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

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
