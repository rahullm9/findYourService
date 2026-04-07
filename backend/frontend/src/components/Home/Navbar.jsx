import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contactus" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <Shield size={24} />
          </div>
          <span className="text-2xl font-black text-blue-900 tracking-tight">
            FYS<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`relative text-lg font-semibold transition-colors duration-200 ${
                    location.pathname === link.path 
                      ? "text-blue-700" 
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          
          <Link to="/signin">
            <button className="bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition-all active:scale-95">
              Sign In
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-blue-900 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${
                    location.pathname === link.path 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={20} className={location.pathname === link.path ? "opacity-100" : "opacity-0"} />
                </Link>
              ))}
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <button className="w-full bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">
                  Sign In
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
