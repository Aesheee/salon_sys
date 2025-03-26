import React from 'react';
import RegistrationForm from './RegistrationForm';
import HomePage from './HomePage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>
    </Router>
  );
}

export default App;