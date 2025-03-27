// HomePage.js
import React, { useState } from 'react';
import Navigation from './Navigation'; // Import the Navigation component
import ProfilePage from './ProfilePage';
import ServicesPage from './ServicesPage';
const HomePage = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedServices, setSelectedServices] = useState([]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <section id="home" className="active" style={homeStyle}>
            <div className="homepage">
              <h1 style={{ fontFamily: 'Times New Roman', fontSize: '60px' }}>
                <b style={{ color: '#f2ca7b' }}>Experience</b> the Best<br />
                <b style={{ color: '#f2ca7b' }}>—</b> Beauty Services
              </h1>
              <p>Your destination for rejuvenating beauty treatments and personalized care.<br />
                Step into a world of relaxation and let our expert team enhance your natural beauty.<br />
                Book your appointment today and shine brighter with us!
              </p>
              <button style={buttonStyle} onClick={() => alert('Book Now clicked')}>Book Now</button>
            </div>
            <div className="secondhome">
              <h1>Are You Ready to Bloom?</h1>
              <p>Allow us to curate an aesthetic that expresses your personality, helping you feel like your most authentic self.<br />
                Our beauty services are driven by a passion for people. We love seeing our clients’ faces when they see their new look—there’s truly nothing like it!
              </p>
              <button style={buttonStyle} onClick={() => alert('Book Now clicked')}>Book Now</button>
            </div>
          </section>
        );

      case 'services':
        return <ServicesPage selectedServices={selectedServices} setSelectedServices={setSelectedServices} />;
        
      case 'profile':
        return <ProfilePage selectedServices={selectedServices} />;

      default:
        return null;
    }
  };

  return (
    <div>
      <Navigation onNavigate={handleNavigate} />
      {renderCurrentPage()}
    </div>
  );
};

const homeStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}

const buttonStyle = {
  backgroundImage: 'linear-gradient(to bottom right, #cb9909, #3e1b18)',
  width: '30%',
  padding: '10px',
  color: 'white',
  border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
}

export default HomePage;