// src/pages/FarmerOrders.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axiosConfig";
import { authHeaderForRole } from "../utils/auth";
import "./FarmerOrders.css";

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [confirmingAction, setConfirmingAction] = useState(null); // { orderId, action }
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/farmer", {
        headers: authHeaderForRole("farmer"),
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching farmer orders:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/orders/${id}/status`,
        { status },
        { headers: authHeaderForRole("farmer") }
      );
      setConfirmingAction(null); // reset confirmation
      fetchOrders();
    } catch (err) {
      alert("Error updating order status");
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

  const handleLogout = () => {
    localStorage.removeItem("farmerToken");
    navigate("/login");
  };

  return (
    <div className="farmer-orders">
      {/* Navbar */}
      <header className="navbar">
        <h1>🌱 AgriConnect</h1>
        <nav>
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/farmer-dashboard">My Dashboard</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>

      <div className="dashboard-title">
        <h2>📋 Farmer Orders</h2>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3 className="order-product">{order.product?.name}</h3>

              <div className="order-detail">
                <span className="label">Buyer:</span> {order.buyer?.email}
              </div>
              <div className="order-detail">
                <span className="label">📱 Buyer Mobile:</span>{" "}
                {order.buyerContact}
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

              {/* Snapshot fields */}
              <div className="order-detail">
                <span className="label">Farmer Name:</span> {order.farmerName}
              </div>
              <div className="order-detail">
                <span className="label">Farmer Contact:</span>{" "}
                {order.farmerContact}
              </div>
              <div className="order-detail">
                <span className="label">Logistics:</span>{" "}
                {order.logisticsAvailable === "yes"
                  ? `${order.vehicleType} - ₹${order.logisticsRate}/km`
                  : "Not available"}
              </div>

              {/* Action buttons with confirmation */}
              {order.status === "pending" && (
                <>
                  {confirmingAction?.orderId === order._id ? (
                    <div className="confirmation-box">
                      <p>
                        ⚠️ Are you sure you want to{" "}
                        {confirmingAction.action === "accepted" ? (
                          <strong className="highlight-accept">Accept</strong>
                        ) : (
                          <strong className="highlight-reject">Reject</strong>
                        )}{" "}
                        this order?
                      </p>
                      <div className="confirm-buttons">
                        <button
                          className={`confirm-btn ${
                            confirmingAction.action === "accepted"
                              ? "accepted"
                              : "rejected"
                          }`}
                          onClick={() =>
                            updateStatus(order._id, confirmingAction.action)
                          }
                        >
                          Yes,{" "}
                          {confirmingAction.action === "accepted"
                            ? "Accept"
                            : "Reject"}
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => setConfirmingAction(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button
                        className="accept-btn"
                        onClick={() =>
                          setConfirmingAction({
                            orderId: order._id,
                            action: "accepted",
                          })
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() =>
                          setConfirmingAction({
                            orderId: order._id,
                            action: "rejected",
                          })
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </>
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
