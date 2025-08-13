import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';
import { FiHome, FiUsers, FiUser, FiSearch } from 'react-icons/fi';
import { FaNetworkWired, FaProjectDiagram, FaShareAlt, FaSitemap, FaConnectdevelop } from "react-icons/fa";
const Header = ({ activeTab, setActiveTab , setIsAuthenticated }) => {
  const navigate = useNavigate();


  const navItems = [
    { id: 'home', label: 'Home', icon: <FiHome size={20} />, path: '/home' },
    { id: 'network', label: 'Network', icon: <FiUsers size={20} />, path: '/network' },
    { id: 'profile', label: 'Profile', icon: <FiUser size={20} />, path: '/profile' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false)
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-3xl"> 
            <FaNetworkWired className="text-blue-700" size={28} />    
   
            </span>
            <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
              NetSphere
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-6 hidden sm:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search connections, posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Navigation + Logout */}
          <div className="flex items-center space-x-2">
            <nav className="flex space-x-2">
              {navItems.map(({ id, label, icon, path }) => (
                <Link
                  key={id}
                  to={path}
                  onClick={() => setActiveTab(id)}
                  className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    activeTab === id
                      ? 'text-blue-600 bg-blue-100 shadow-sm'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-xs font-semibold hidden sm:block mt-0.5">{label}</span>
                </Link>
              ))}
            </nav>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-3 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
