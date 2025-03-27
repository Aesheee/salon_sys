import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import './RegistrationForm.css';

import HomePage from './HomePage';
import ServicesPage from './ServicesPage';
import ProfilePage from './ProfilePage';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [selectedServices, setSelectedServices] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage selectedServices={selectedServices} setSelectedServices={setSelectedServices} />} />
      <Route path="/profile" element={<ProfilePage selectedServices={selectedServices} />} />
    </Routes>
  );
}

export default App;
