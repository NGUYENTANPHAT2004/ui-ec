/* eslint-disable @typescript-eslint/no-explicit-any */
// LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e :any) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login with:', formData);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-2">Log in to Exclusive</h1>
      <p className="text-gray-600 mb-6">Enter your details below</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email or Phone Number"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border-b border-gray-300 focus:border-gray-800 focus:outline-none transition-colors"
            required
          />
        </div>
        
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border-b border-gray-300 focus:border-gray-800 focus:outline-none transition-colors"
            required
          />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <Button type="submit" variant="primary" fullWidth>
            Log In
          </Button>
          <Link to="/forgot-password" className="text-red-500 hover:underline ml-4">
            Forget Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;