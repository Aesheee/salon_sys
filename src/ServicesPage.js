import React, { useEffect, useState } from 'react';

const ServicesPage = ({ selectedServices, setSelectedServices }) => {
  const [services, setServices] = useState([]);
  
  // Fetch services from the backend API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/services'); // Adjust the endpoint to your backend
        const data = await response.json();
        
        // Convert the binary image data for display
        const formattedData = data.map(service => ({
          ...service,
          picture: `data:image/jpeg;base64,${Buffer.from(service.Picture).toString('base64')}`, // Convert BLOB to base64
        }));

        setServices(formattedData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const toggleService = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName) 
        : [...prev, serviceName]
    );
  };

  return (
    <div>
      <h1>Our Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.services_id}>
            <input
              type="checkbox"
              checked={selectedServices.includes(service.services_name)}
              onChange={() => toggleService(service.services_name)}
            />
            <div>
              <h2>{service.services_name}</h2>
              <p>Price: ${service.price.toFixed(2)}</p>
              <p>{service.Service_Description}</p>
              <img 
                src={service.picture} 
                alt={service.services_name} 
                style={{ width: '100px', height: '100px' }} // Adjust size as necessary
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesPage;