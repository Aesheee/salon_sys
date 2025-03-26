import React from 'react';

const ServicesPage = ({ selectedServices, setSelectedServices }) => {
  const services = ["Haircut", "Coloring", "Manicure", "Pedicure", "Facial"];

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <div>
      <h1>Our Services</h1>
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedServices.includes(service)}
              onChange={() => toggleService(service)}
            />
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesPage;