// src/pages/FarmerDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/axiosConfig";
import "./FarmerDashboard.css";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    image: null,
    contactInfo: "",
    logisticsAvailable: "no",
    vehicleType: "",
    logisticsRate: "",
    producedDate: "",
    description: "",
  });
  const [messages, setMessages] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("farmerToken");
      const res = await API.get("/products/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      quantity: "",
      image: null,
      contactInfo: "",
      logisticsAvailable: "no",
      vehicleType: "",
      logisticsRate: "",
      producedDate: "",
      description: "",
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    // ✅ Image validation (mandatory)
    if (!form.image) {
      showMessage("form", "❌ Please upload a product image", "error");
      return;
    }

    // ✅ Mobile number validation
    if (!/^[0-9]{10}$/.test(form.contactInfo)) {
      showMessage("form", "❌ Please enter a valid 10-digit mobile number", "error");
      return;
    }

    if (!form.description.trim()) {
      showMessage("form", "❌ Description is required", "error");
      return;
    }
    if (!form.producedDate) {
      showMessage("form", "❌ Produced Date is required", "error");
      return;
    }

    try {
      const token = localStorage.getItem("farmerToken");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("contactInfo", form.contactInfo);
      formData.append("producedDate", form.producedDate);
      formData.append("description", form.description);

      if (form.logisticsAvailable === "yes") {
        formData.append("logisticsAvailable", "yes");
        formData.append("vehicleType", form.vehicleType);
        formData.append("logisticsRate", form.logisticsRate);
      } else {
        formData.append("logisticsAvailable", "no");
        formData.append("vehicleType", "LOGISTICS NOT AVAILABLE");
        formData.append("logisticsRate", "0");
      }

      // ✅ image always required at this point
      formData.append("image", form.image);

      const res = await API.post("/products", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showMessage("form", res.data.message || "✅ Product added successfully", "success");
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err);
      showMessage("form", err.response?.data?.message || "❌ Failed to add product", "error");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("farmerToken");
      await API.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showMessage("global", "✅ Product deleted successfully", "success");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err.response?.data || err);
      showMessage("global", "❌ Failed to delete product", "error");
    } finally {
      setConfirmDelete(null);
    }
  };

  // ✅ Unified message handler (extended fade duration to 5s)
  const showMessage = (id, text, type) => {
    setMessages((prev) => ({
      ...prev,
      [id]: { text, type, fading: false },
    }));

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [id]: { ...prev[id], fading: true },
      }));
    }, 4500); // start fading after 4.5s

    setTimeout(() => {
      setMessages((prev) => {
        const newMsgs = { ...prev };
        delete newMsgs[id];
        return newMsgs;
      });
    }, 5500); // fully remove after 5.5s
  };

  const handleLogout = () => {
    localStorage.removeItem("farmerToken");
    navigate("/login");
  };

  return (
    <div className="farmer-dashboard">
      {/* Navbar */}
      <header className="navbar">
        <h1>🌱 AgriConnect</h1>
        <nav>
          <Link to="/profile">My Profile</Link>
          <Link to="/farmer-orders">My Orders</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>

      {/* Dashboard Title */}
      <div className="dashboard-title">
        <h2>👨‍🌾 Farmer Dashboard</h2>
      </div>

      {/* Add Product Form */}
      <form onSubmit={addProduct} className="farmer-product-form">
        <h3>➕ Add New Product</h3>

        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="farmer-input"
        />
        <input
          type="number"
          placeholder="Price per kg"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="farmer-input"
        />
        <input
          type="number"
          placeholder="Quantity in kg"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
          className="farmer-input"
        />
        <input
          type="text"
          placeholder="Farmer Contact number"
          value={form.contactInfo}
          onChange={(e) =>
            setForm({ ...form, contactInfo: e.target.value.replace(/\D/g, "") })
          }
          maxLength="10"
          required
          className="farmer-input"
        />

        <label>📅 Produced Date</label>
        <input
          type="date"
          value={form.producedDate}
          onChange={(e) => setForm({ ...form, producedDate: e.target.value })}
          required
          className="farmer-input"
        />

        <label>📝 Product Description</label>
        <textarea
          placeholder="Enter product description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="farmer-textarea"
        />

        {/* Logistics choice */}
        <div className="farmer-logistics-choice">
          <label>
            <input
              type="radio"
              name="logistics"
              checked={form.logisticsAvailable === "yes"}
              onChange={() => setForm({ ...form, logisticsAvailable: "yes" })}
            />
            Yes, Logistics Available
          </label>
          <label>
            <input
              type="radio"
              name="logistics"
              checked={form.logisticsAvailable === "no"}
              onChange={() => setForm({ ...form, logisticsAvailable: "no" })}
            />
            No, Logistics Not Available
          </label>
        </div>

        {form.logisticsAvailable === "yes" && (
          <>
            <input
              type="text"
              placeholder="Vehicle Type (e.g., Tractor, Tempo)"
              value={form.vehicleType}
              onChange={(e) =>
                setForm({ ...form, vehicleType: e.target.value })
              }
              required
              className="farmer-input"
            />
            <input
              type="number"
              placeholder="Logistics Rate (₹ per km)"
              value={form.logisticsRate}
              onChange={(e) =>
                setForm({ ...form, logisticsRate: e.target.value })
              }
              required
              className="farmer-input"
            />
          </>
        )}

        {/* File upload (mandatory) */}
        <div className="farmer-file-upload">
          <label htmlFor="productImage" className="farmer-upload-label">
            📷 Upload Product Image <span className="required">*</span>
          </label>
          <input
            id="productImage"
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="farmer-hidden-input"
            required
          />
          {form.image && (
            <p className="farmer-file-selected">✅ Selected: {form.image.name}</p>
          )}
        </div>

        <div className="farmer-form-buttons">
          <button type="submit" className="farmer-btn farmer-green">
            Add Product
          </button>
          <button type="button" onClick={resetForm} className="farmer-btn farmer-gray">
            🔄 Reset
          </button>
        </div>

        {/* Inline messages for form */}
        {messages["form"] && (
          <div
            className={`action-message ${messages["form"].type} ${
              messages["form"].fading ? "fade-out" : ""
            }`}
          >
            {messages["form"].text}
          </div>
        )}
      </form>

      {/* Product List */}
      <h2 className="farmer-section-title">📦 My Products</h2>

      {/* Global message for product actions */}
      {messages["global"] && (
        <div
          className={`action-message ${messages["global"].type} ${
            messages["global"].fading ? "fade-out" : ""
          }`}
        >
          {messages["global"].text}
        </div>
      )}

      {products.length === 0 ? (
        <p className="farmer-no-products">No products added yet.</p>
      ) : (
        <div className="farmer-product-grid">
          {products.map((p) => (
            <div key={p._id} className="farmer-product-card">
              <div className="farmer-card-image">
                {p.imageSrc ? (
                  <img src={p.imageSrc} alt={p.name} className="product-image" />
                ) : (
                  <div className="product-image placeholder">No Image</div>
                )}
              </div>

              <div className="farmer-card-details">
                <h3 className="product-name">{p.name}</h3>
                <div className="detail-item highlight">
                  <span className="label">Price:</span> ₹{p.price}/kg
                </div>
                <div className="detail-item">
                  <span className="label">Quantity:</span> {p.quantity} kg
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

                {/* Delete Button + Confirmation */}
                <div className="farmer-actions">
                  {confirmDelete === p._id ? (
                    <>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="btn red"
                      >
                        Confirm ❌
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="btn gray"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(p._id)}
                      className="btn red"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
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
