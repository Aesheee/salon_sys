import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './Honor-Magic-V-Flip-Stock-Wallpaper-.jpg';

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

  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#333',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: '0',
    },
    container: {
      background: 'rgba(255, 255, 255, 0.366)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      borderRadius: '20px',
      width: '400px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    h2: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#444',
    },
    label: {
      marginBottom: '5px',
      display: 'block',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '15px',
    },
    button: {
      backgroundImage: 'linear-gradient(to bottom right, #cb9909, #3e1b18)',
      width: '100%',
      padding: '10px',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
    },
    toggleLink: {
      textAlign: 'center',
      marginTop: '15px',
    },
    toggleButton: {
      border: 'none',
      background: 'none',
      color: '#cb9909',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      {isLoading && <p>Loading...</p>} {/* Loading state indicator */}
      {!isRegistered && !isLogin && (
        <div>
          <h2 style={styles.h2}>Registration Form</h2>
          <form onSubmit={handleRegisterSubmit}>
            <label style={styles.label}>First Name:</label>
            <input style={styles.input} type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <label style={styles.label}>Last Name:</label>
            <input style={styles.input} type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <label style={styles.label}>Username:</label>
            <input style={styles.input} type="text" name="username" value={formData.username} onChange={handleChange} required />
            <label style={styles.label}>Email:</label>
            <input style={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label style={styles.label}>Password:</label>
            <input style={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} required />
            <button style={styles.button} type="submit">Register</button>
            <div style={styles.toggleLink}>
              <p>Already have an account? <button style={styles.toggleButton} type="button" onClick={toggleForm}>Login here</button></p>
            </div>
          </form>
        </div>
      )}
      {isLogin && !isRegistered && (
        <div>
          <h2 style={styles.h2}>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <label style={styles.label}>Username:</label>
            <input style={styles.input} type="text" name="username" value={loginData.username} onChange={handleChange} required />
            <label style={styles.label}>Password:</label>
            <input style={styles.input} type="password" name="password" value={loginData.password} onChange={handleChange} required />
            <button style={styles.button} type="submit">Login</button>
            <div style={styles.toggleLink}>
              <p>Don't have an account? <button style={styles.toggleButton} type="button" onClick={toggleForm}>Register here</button></p>
            </div>
          </form>
        </div>
      )}
      {isRegistered && (
        <div>
          <h2 style={styles.h2}>Select a Service</h2>
          {/* Placeholder while waiting for further implementation */}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;