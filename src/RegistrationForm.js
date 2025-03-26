import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // set loading true while fetching
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setUserId(data.userId);
      setIsRegistered(true);
      setIsLogin(false);
      navigate('/homepage'); // navigate to lowercase homepage
    } else {
      const error = await response.json();
      alert("Registration failed: " + (error.message || "An unknown error occurred."));
    }
    setIsLoading(false); // reset loading
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      setUserId(data.userId);
      setIsLogin(true);
      alert('Login successful! Welcome back.');
      navigate('/homepage');
    } else {
      const error = await response.json();
      alert("Login failed: " + (error.message || "An unknown error occurred"));
    }
    setIsLoading(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsRegistered(false);
  };

  return (
    <div className="container">
      {isLoading && <p>Loading...</p>} {/* Loading state indicator */}
      {!isRegistered && !isLogin && (
        <div>
          <h2>Registration Form</h2>
          <form onSubmit={handleRegisterSubmit}>
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Register</button>
            <div className="toggle-link">
              <p>Already have an account? <button type="button" onClick={toggleForm}>Login here</button></p>
            </div>
          </form>
        </div>
      )}
      {isLogin && !isRegistered && (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <label>Username:</label>
            <input type="text" name="username" value={loginData.username} onChange={handleChange} required />
            <label>Password:</label>
            <input type="password" name="password" value={loginData.password} onChange={handleChange} required />
            <button type="submit">Login</button>
            <div className="toggle-link">
              <p>Don't have an account? <button type="button" onClick={toggleForm}>Register here</button></p>
            </div>
          </form>
        </div>
      )}
      {isRegistered && (
        <div>
          <h2>Select a Service</h2>
          {/* Placeholder while waiting for further implementation */}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;