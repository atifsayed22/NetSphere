import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import BASE_URL from "../config";

const LoginPage = ({ onLoginSuccess }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (onLoginSuccess) onLoginSuccess();

      navigate("/home");
    } catch (err) {
      console.log(err)
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Title */}
        <h2 className="auth-title">
          Welcome Back 👋
        </h2>
        <p className="auth-subtitle">
          Please login to your account
        </p>

        {/* Error Message */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {/* Email */}
          <div className="auth-input-group">
            <FiMail className="auth-input-icon" />
            <input
              {...register("email")}
              placeholder="Email"
              type="email"
              className="auth-input"
              required
            />
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <FiLock className="auth-input-icon" />
            <input
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="auth-input"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
<p className="auth-link-text">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="auth-link"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
