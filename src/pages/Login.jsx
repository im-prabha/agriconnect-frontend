// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api"; // ✅ use centralized axios instance
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // ✅ use environment-based API URL
      const res = await api.post("/api/auth/login", form);

      console.log("Login response:", res.data);

      const token = res.data?.token;
      const role = res.data?.role;

      if (!token || !role) {
        setError("Login succeeded but server did not return token or role.");
        return;
      }

      // Save tokens based on role
      if (role === "farmer") {
        localStorage.setItem("farmerToken", token);
      } else if (role === "buyer") {
        localStorage.setItem("buyerToken", token);
      }

      // Also store generic values
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setSuccess("Login successful ✅");

      setTimeout(() => {
        if (role === "farmer") navigate("/farmer-dashboard");
        else if (role === "buyer") navigate("/buyer-dashboard");
        else navigate("/");
      }, 1200);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <div className="login-page">
      {/* Home Button */}
      <button className="home-btn" onClick={() => navigate("/")}>
        ⬅ Home
      </button>

      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        {/* Email */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        {/* Password */}
        <div className="password-wrapper">
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            required
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn">
          Login
        </button>

        {/* Redirect to Signup */}
        <p className="redirect-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Signup here
          </Link>
        </p>
      </form>
    </div>
  );
}
