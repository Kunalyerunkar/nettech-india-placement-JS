import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Domains', href: '/domains' },
    { name: 'Process', href: '/process' },
    { name: 'Partners', href: '/partners' },
    { name: 'Placements', href: '/success-stories' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${isScrolled ? 'top-4' : 'top-0'}`}>
      <nav
        className={`mx-auto transition-all duration-500 ease-in-out 
          ${isScrolled
            ? 'max-w-6xl rounded-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border border-white/20 dark:border-gray-800 shadow-[0_8px_32px_rgba(0,0,0,0.1)]'
            : 'max-w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>

            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 group">
                <img
                  src={isDarkMode ? "/images/logo/NetTech India logo dark.png" : "/images/logo/NetTech India logo.png"}
                  alt="NetTech India"
                  className={`transition-all duration-500 object-contain group-hover:scale-105 ${isScrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-12 lg:h-14'}`}
                />
              </Link>
            </div>

            {/* Desktop Navigation (LG Breakpoint) */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full
                    ${location.pathname === link.href
                      ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'}`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-4"></div>

              {/* Utility Icons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <Link
                  to="/register"
                  className="relative overflow-hidden bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-black hover:bg-blue-800 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Hired
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>
            </div>

            {/* Mobile/Tablet Toggle (Hidden on LG) */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 text-gray-600 dark:text-gray-300 p-2 focus:outline-none"
              >
                {isOpen ? <X className="w-7 h-7 animate-in spin-in duration-300" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - Modern Full Overlay style */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-white dark:bg-gray-950 z-40 flex flex-col pt-24 px-8 animate-in slide-in-from-right duration-500">
            <div className="space-y-2">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  to={link.href}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  className={`block text-3xl font-black transition-all animate-in slide-in-from-left duration-500
                    ${location.pathname === link.href
                      ? 'text-blue-700 dark:text-blue-500 translate-x-2'
                      : 'text-gray-900 dark:text-white hover:text-blue-600'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pb-12">
              <Link
                to="/register"
                className="block w-full py-5 rounded-[2rem] text-xl font-black text-white bg-blue-700 hover:bg-blue-800 text-center shadow-2xl shadow-blue-500/30 active:scale-95 transition-transform"
                onClick={() => setIsOpen(false)}
              >
                Get Hired Now
              </Link>
              <p className="text-center text-gray-400 text-sm mt-6 font-bold uppercase tracking-widest">NetTech India Placement</p>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;