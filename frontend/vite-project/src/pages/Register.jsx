// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, formData);
      if (res.status === 201 || res.data.success) {
        setSuccess("✅ Account created! Redirecting to login...");
        setFormData({ name: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("❌ Something went wrong. Try again.");
      }
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "❌ Registration failed";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Title */}
        <h2 className="auth-title">
          Create Account ✨
        </h2>
        <p className="auth-subtitle">
          Fill in your details to get started
        </p>

        {/* Error/Success */}
        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}
        {success && (
          <p className="auth-success">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name */}
          <div className="auth-input-group">
            <FiUser className="auth-input-icon" />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="auth-input"
              required
            />
          </div>

          {/* Email */}
          <div className="auth-input-group">
            <FiMail className="auth-input-icon" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="auth-input"
              required
            />
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <FiLock className="auth-input-icon" />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="auth-input"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="auth-submit-btn"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="auth-link-text">
          Already have an account?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
