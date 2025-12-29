import React from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12">

          {/* About */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">NetTech India Placement</h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed mb-6">
              Bridging the gap between education and employment. We provide free placement services and industry-focused training to help you secure your dream job.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href='/' className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/domains" className="hover:text-white transition-colors">Job Domains</a></li>
              <li><a href="/process" className="hover:text-white transition-colors">Placement Process</a></li>
              <li><a href="/partners" className="hover:text-white transition-colors">For Partners</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span>
                  201, Ratnamani Building, Dada Patil Wadi,<br />
                  Opp ICICI ATM, Thane West, Mumbai - 400602
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span>+91 816 938 4252 / +91 75067 43540</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span>alliances@nettechindia.com placement@nettechindia.com</span>
              </li>
              <li className="flex items-center">
                <Globe className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span>www.nettechindia.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-800/50 mt-12 pt-8 text-center text-sm text-gray-500 dark:text-gray-600">
          <p>&copy; {new Date().getFullYear()} NetTech India Placement. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;