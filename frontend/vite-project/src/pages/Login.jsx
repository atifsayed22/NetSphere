import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onLoginSuccess }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', data);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // ✅ Notify App.jsx that user is now authenticated
      if (onLoginSuccess) onLoginSuccess();

      // ✅ Navigate to homepage
      navigate('/home');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="w-full border px-3 py-2" required />
        <input {...register("password")} placeholder="Password" type="password" className="w-full border px-3 py-2" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
