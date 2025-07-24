import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6 md:px-12 mt-12">
      <div className="max-w-6xl mx-auto text-center md:flex md:justify-between md:items-center">
        <p className="text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Find Your Services. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition duration-200">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-200">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-200">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;