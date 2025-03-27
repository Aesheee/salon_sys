// ProfilePage.js
import React from 'react';

const ProfilePage = ({ selectedServices }) => {
  return (
    <div>
      <h1>Your Profile</h1>
      <h2>Selected Services</h2>
      {selectedServices.length > 0 ? (
        <ul>
          {selectedServices.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      ) : (
        <p>No services selected yet.</p>
      )}
    </div>
  );
};

export default ProfilePage;