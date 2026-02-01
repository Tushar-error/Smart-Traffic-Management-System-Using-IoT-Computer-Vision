import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Live Monitor', path: '/live' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg-overlay)] backdrop-blur-md shadow-[var(--shadow-xl)]'
          : 'bg-transparent'
      }`}
      style={{
        borderBottom: scrolled ? `1px solid var(--border-primary)` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-lg">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Traffic Management
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 group ${
                  location.pathname === link.path
                    ? 'text-cyan-400'
                    : 'hover:text-cyan-400'
                }`}
                style={{
                  color: location.pathname === link.path ? 'var(--brand-cyan)' : 'var(--text-secondary)',
                }}
              >
                <span className="relative z-10">{link.name}</span>
                {location.pathname === link.path && (
                  <span 
                    className="absolute inset-0 rounded backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
                    }}
                  ></span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="relative cursor-pointer group p-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-primary)',
                borderWidth: '1px',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg
                  className="w-5 h-5 transition-all duration-600 group-hover:rotate-24"
                  style={{ color: 'var(--brand-cyan)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12"
                  style={{ color: 'var(--brand-blue)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            
            <div 
              className="flex items-center space-x-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-primary)',
                borderWidth: '1px',
              }}
            >
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <span 
                className="text-xs font-medium"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Live
              </span>
            </div>
            
            <button className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div 
                className="relative p-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-primary)',
                  borderWidth: '1px',
                }}
              >
                <svg
                  className="w-5 h-5 transition-colors duration-300"
                  style={{ color: 'var(--text-tertiary)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </button>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative group p-2"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative space-y-1.5">
              <span
                className={`block w-6 h-0.5 transition-all duration-300`}
                style={{ backgroundColor: 'var(--text-secondary)' }}
              ></span>
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
                style={{ backgroundColor: 'var(--text-secondary)' }}
              ></span>
              <span
                className={`block w-6 h-0.5 transition-all duration-300`}
                style={{ backgroundColor: 'var(--text-secondary)' }}
              ></span>
            </div>
          </button>
        </div>
      </div>
      
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div 
          className="px-6 py-4 space-y-3 backdrop-blur-md"
          style={{
            backgroundColor: 'var(--bg-overlay)',
            borderTopColor: 'var(--border-primary)',
            borderTopWidth: '1px',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-all duration-300`}
              style={{
                backgroundColor: location.pathname === link.path 
                  ? 'rgba(6, 182, 212, 0.2)' 
                  : 'transparent',
                color: location.pathname === link.path 
                  ? 'var(--brand-cyan)' 
                  : 'var(--text-secondary)',
                borderColor: location.pathname === link.path 
                  ? 'rgba(6, 182, 212, 0.3)' 
                  : 'transparent',
                borderWidth: '1px',
              }}
            >
              {link.name}
            </Link>
          ))}
          
          
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="text-sm font-medium">Theme</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {theme === 'dark' ? 'Dark' : 'Light'}
              </span>
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
          </button>

          <div 
            className="pt-4"
            style={{
              borderTopColor: 'var(--border-primary)',
              borderTopWidth: '1px',
            }}
          >
            <div 
              className="flex items-center justify-between px-4 py-3 rounded-lg"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <span 
                className="text-sm"
                style={{ color: 'var(--text-tertiary)' }}
              >
                System Status
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;