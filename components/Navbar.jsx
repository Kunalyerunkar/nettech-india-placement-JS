
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  // Hide the sticky CTA on the registration page
  const isRegisterPage = location.pathname === '/register';

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {/* 1. Mobile Menu Overlay - Cascading Style as per Image */}
      <div
        className={`lg:hidden fixed inset-0 w-full h-full bg-[#05070a] z-[500] flex flex-col pt-32 px-8 transition-all duration-500 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              to={link.href}
              className={`block text-[2.75rem] font-black leading-tight transition-all duration-300
                ${location.pathname === link.href
                  ? 'text-blue-500'
                  : 'text-white hover:text-blue-400'}`}
              style={{
                paddingLeft: `${idx * 1.4}rem`,
                transitionDelay: `${idx * 50}ms`
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-auto pb-12">
          <Link
            to="/register"
            className="block w-full py-5 rounded-[2.5rem] text-xl font-black text-white bg-blue-700 hover:bg-blue-800 text-center shadow-2xl shadow-blue-500/30 active:scale-95 transition-transform"
            onClick={() => setIsOpen(false)}
          >
            Get Hired Now
          </Link>
          <p className="text-center text-gray-600 text-[10px] mt-8 font-black uppercase tracking-[0.3em]">NetTech India Placement Cell</p>
        </div>
      </div>

      {/* 2. Main Navbar Bar - Top-most layer */}
      <div className={`fixed w-full z-[510] transition-all duration-500 ease-in-out ${isOpen ? 'top-0' : (isScrolled ? 'top-4 px-4 sm:px-6' : 'top-0')}`}>
        <nav
          className={`mx-auto transition-all duration-500 ease-in-out 
            ${(isScrolled && !isOpen)
              ? 'max-w-6xl rounded-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border border-white/20 dark:border-gray-800 shadow-[0_8px_32px_rgba(0,0,0,0.1)]'
              : 'max-w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'
            } ${isOpen ? 'bg-transparent border-none !shadow-none' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>

              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 group" onClick={() => setIsOpen(false)}>
                  <img
                    src={(isDarkMode || isOpen) ? "/images/logo/NetTech India logo dark.png" : "/images/logo/NetTech India logo.png"}
                    alt="NetTech India"
                    className={`transition-all duration-500 object-contain group-hover:scale-105 ${isScrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-12 lg:h-14'}`}
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
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

                {/* Desktop Utilities */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                  </Link>
                </div>
              </div>

              {/* Mobile/Tablet Toggle Division */}
              <div className="lg:hidden flex items-center space-x-3">
                {!isOpen && (
                  <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`relative z-[600] p-2.5 focus:outline-none rounded-full transition-all duration-300 
                    ${isOpen
                      ? 'text-white bg-white/10 hover:bg-white/20'
                      : 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  aria-label={isOpen ? "Close Menu" : "Open Menu"}
                >
                  {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* 3. Global Sticky Mobile CTA */}
      {!isRegisterPage && !isOpen && (
        <button
          onClick={() => navigate('/register')}
          className="md:hidden fixed bottom-0 left-0 w-full z-[400] bg-blue-700 backdrop-blur-md text-white py-3 px-6 shadow-[0_-4px_24px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3 active:scale-95 transition-all border-t border-white/5"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 fill-current" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_6px_#34d399]"></span>
          </div>
          <span className="font-black uppercase tracking-[0.25em] text-[10px]">Get Hired Now</span>
        </button>
      )}
    </>
  );
};

export default Navbar;
