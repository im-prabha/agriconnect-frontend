// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api"; // ✅ centralized axios instance
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isPasswordLongEnough = form.password.length >= 12;
  const doPasswordsMatch =
    form.password && form.confirmPassword && form.password === form.confirmPassword;

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.role &&
    isPasswordLongEnough &&
    doPasswordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isFormValid) {
      setError("Please fill all fields correctly.");
      return;
    }

    try {
      // ✅ use environment-based API URL
      const res = await api.post("/auth/register", {
     name: form.name,
     email: form.email,
     password: form.password,
    role: form.role,
    });

      const token = res.data?.token ?? res.data?.user?.token;
      const role = res.data?.role ?? res.data?.user?.role ?? form.role;

      if (!token) {
        setError("Signup succeeded but token not returned.");
        return;
      }

      if (role === "farmer") {
        localStorage.setItem("farmerToken", token);
      } else if (role === "buyer") {
        localStorage.setItem("buyerToken", token);
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setSuccess(res.data?.message ?? "Signup successful ✅");

      setTimeout(() => {
        if (role === "farmer") navigate("/farmer-dashboard");
        else if (role === "buyer") navigate("/buyer-dashboard");
        else navigate("/");
      }, 1200);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message ?? "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      {/* Home Button */}
      <button className="home-btn" onClick={() => navigate("/")}>
        ⬅ Home
      </button>

      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create Your Account</h2>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* Password field */}
        <div className="password-wrapper">
          <input
            name="password"
            placeholder="Password (min 12 chars)"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
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
        {form.password && !isPasswordLongEnough && (
          <p className="hint-text error">❌ Must be at least 12 characters</p>
        )}
        {isPasswordLongEnough && (
          <p className="hint-text success">✅ Strong password</p>
        )}

        {/* Confirm Password field */}
        <div className="password-wrapper">
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showConfirm ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "🙈" : "👁"}
          </button>
        </div>
        {form.confirmPassword && !doPasswordsMatch && (
          <p className="hint-text error">❌ Passwords do not match</p>
        )}
        {doPasswordsMatch && (
          <p className="hint-text success">✅ Passwords match</p>
        )}

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="farmer">Farmer</option>
        </select>

        <button type="submit" className="submit-btn" disabled={!isFormValid}>
          Sign Up
        </button>

        <p className="redirect-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
