import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';
import { FiHome, FiUsers, FiUser, FiSearch, FiLogOut } from 'react-icons/fi';
import { FaNetworkWired, FaProjectDiagram, FaShareAlt, FaSitemap, FaConnectdevelop } from "react-icons/fa";
const Header = ({ activeTab, setActiveTab , setIsAuthenticated }) => {
  const navigate = useNavigate();


  const navItems = [
    { id: 'home', icon: <FiHome size={18} />, path: '/home' },
    { id: 'network', icon: <FiUsers size={18} />, path: '/network' },
    { id: 'profile', icon: <FiUser size={18} />, path: '/profile' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false)
    navigate('/login');
  };

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        <div className="nav-items">
          {navItems.map(({ id, icon, path }) => (
            <Link
              key={id}
              to={path}
              onClick={() => setActiveTab(id)}
              className={`nav-link ${activeTab === id ? 'active' : ''}`}
            >
              {icon}
            </Link>
          ))}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
