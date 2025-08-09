import React from "react";

const AuthForm = ({ isSignup, formData, setFormData, handleSubmit, toggleAuth }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      {isSignup && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      {isSignup && (
        <input
          type="text"
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full p-2 border rounded"
        />
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p className="text-sm text-center mt-2">
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <button type="button" onClick={toggleAuth} className="text-blue-500 underline ml-1">
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </form>
    </div>
  );
};

export default AuthForm;
