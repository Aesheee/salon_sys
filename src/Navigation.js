import React, { useState } from 'react';

const Navigation = ({ onNavigate }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {['home', 'services', 'profile'].map((link) => (
          <li
            key={link}
            style={{
              ...linkStyle,
              color: hoveredLink === link ? '#f2ca7b' : '#333',
              transform: hoveredLink === link ? 'scale(1.1)' : 'scale(1)',
            }}
            onClick={() => onNavigate(link)}
            onMouseEnter={() => handleMouseEnter(link)}
            onMouseLeave={handleMouseLeave}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const navStyle = {
  position: 'fixed',
  width: '100%',
  top: 0,
  background: 'rgba(158, 149, 120, 0.8)',
  borderRadius: '8px',
  padding: '15px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  zIndex: 1000, // Ensure it's above other elements
};

const ulStyle = {
  display: 'flex',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const linkStyle = {
  margin: '0 15px',
  cursor: 'pointer',
  color: '#333',
  fontSize: '18px',
  fontWeight: '600',
  transition: 'color 0.3s, transform 0.3s',
};

const hoverLinkStyle = {
  color: '#f2ca7b', // Hover color
  transform: 'scale(1.1)', // Slightly enlarge on hover
};

export default Navigation;