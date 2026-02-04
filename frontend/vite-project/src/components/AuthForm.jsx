import React from "react";

const AuthForm = ({ isSignup, formData, setFormData, handleSubmit, toggleAuth }) => {
  return (
    <div className="auth-container">

    <form onSubmit={handleSubmit} className="auth-form">
      {isSignup && (
        <>
          <div className="auth-input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="auth-input"
              required
            />
          </div>
        </>
      )}

      <div className="auth-input-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="auth-input"
          required
        />
      </div>

      <div className="auth-input-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="auth-input"
          required
        />
      </div>

      {isSignup && (
        <div className="auth-input-group">
          <input
            type="text"
            name="bio"
            placeholder="Short Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="auth-input"
          />
        </div>
      )}

      <button
        type="submit"
        className="auth-submit-btn"
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p className="auth-link-text">
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <button type="button" onClick={toggleAuth} className="auth-link">
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </form>
    </div>
  );
};

export default AuthForm;
