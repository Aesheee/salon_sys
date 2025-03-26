import React, { useState, useEffect } from 'react';

const ServiceForm = ({ userId }) => {
  const [serviceCategory, setServiceCategory] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (serviceCategory) {
      fetch(`http://localhost:3000/services/${serviceCategory}`)
        .then((response) => response.json())
        .then((data) => setServices(data))
        .catch((error) => console.error('Error fetching services:', error));
    }
  }, [serviceCategory]);

  const handleServiceCategoryChange = (e) => {
    setServiceCategory(e.target.value);
    setSelectedService('');
    setPrice(0);
  };

  const handleServiceChange = (e) => {
    const selected = services.find(service => service.services_name === e.target.value);
    if (selected) {
      setSelectedService(selected.services_name);
      setPrice(selected.price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmMessage = `You selected: ${selectedService} from category with a price of $${price}. Do you want to proceed with the booking?`;

    const confirmBooking = window.confirm(confirmMessage);

    if (confirmBooking) {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, serviceId: services.find(service => service.services_name === selectedService)?.services_id, total: price }),
      });

      if (response.ok) {
        alert("Your booking has been confirmed!");
      } else {
        alert("Error in booking. Please try again.");
      }
    } else {
      alert("You chose not to proceed with the booking.");
    }
  };

  return (
    <div>
  
      <form onSubmit={handleSubmit}>
        <div>
          <label>Services Category:</label>
          <select value={serviceCategory} onChange={handleServiceCategoryChange}>
            <option value="">Select a category</option>
            <option value="Hair">Hair</option>
            <option value="Nail">Nail</option>
          </select>
        </div>
        <div>
          {serviceCategory && (
            <>
              <h3>Available Services:</h3>
              {services.map((service) => (
                <div key={service.services_id}>
                  <input
                    type="radio"
                    id={service.services_name}
                    name="service"
                    value={service.services_name}
                    onChange={handleServiceChange}
                  />
                  <label htmlFor={service.services_name}>
                    {service.services_name} - Php {service.price}
                  </label>
                </div>
              ))}
            </>
          )}
        </div>
        <button type="submit" disabled={!selectedService}>
          Proceed
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;