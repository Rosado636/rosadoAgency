'use client';

import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-700">Rosado Agency</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-amber-700 transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-amber-700 transition-colors">About</a>
            <a href="#services" className="text-gray-700 hover:text-amber-700 transition-colors">Services</a>
            <a href="#testimonials" className="text-gray-700 hover:text-amber-700 transition-colors">Testimonials</a>
            {/* <a href="#faq" className="text-gray-700 hover:text-amber-700 transition-colors">FAQ</a> */}
            <a href="#contact" className="text-gray-700 hover:text-amber-700 transition-colors">Contact</a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone size={16} />
              <span>(254) 548-4815</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail size={16} />
              <span>rosadoagency@gmail.com</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-amber-700 hover:bg-amber-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-amber-700 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-amber-700 transition-colors">About</a>
              <a href="#services" className="text-gray-700 hover:text-amber-700 transition-colors">Services</a>
              <a href="#testimonials" className="text-gray-700 hover:text-amber-700 transition-colors">Testimonials</a>
              {/* <a href="#faq" className="text-gray-700 hover:text-amber-700 transition-colors">FAQ</a> */}
              <a href="#contact" className="text-gray-700 hover:text-amber-700 transition-colors">Contact</a>
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>(254) 548-4815</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>rosadoagency.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

