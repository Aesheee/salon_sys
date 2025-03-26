// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Our Salon!</h1>
      <p>Experience the best beauty treatments at our salon.</p>
      <nav>
        <ul>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;