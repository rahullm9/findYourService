import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Star, ShieldCheck, Users } from "lucide-react";
import heroIllustration from "../../assets/hero_illu.png";

const Heropage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 font-medium text-sm">
              <ShieldCheck size={16} />
              <span>Trusted by 5000+ Professionals</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-extrabold text-blue-900 leading-tight mb-6"
            >
              Find the Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Professional</span> for Every Task
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl"
            >
              Whether you need an expert plumber, a dedicated tutor, or a creative designer, Connect with verified experts in your neighborhood.
            </motion.p>

            {/* Modern Search Bar */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row items-center bg-white p-2 rounded-2xl shadow-xl border border-gray-100 mb-8 max-w-2xl"
            >
              <div className="flex items-center flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
                <Search className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="w-full focus:outline-none text-gray-700 font-medium"
                />
              </div>
              <div className="flex items-center flex-1 px-4 py-3">
                <MapPin className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Your Location"
                  className="w-full focus:outline-none text-gray-700 font-medium"
                />
              </div>
              <Link to="/services" className="w-full md:w-auto">
                <button className="w-full md:w-auto bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:bg-blue-800 active:scale-95">
                  Search
                </button>
              </Link>
            </motion.div>

            {/* Quick Stats/Trust Indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400 fill-yellow-400" size={18} />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-blue-500" size={18} />
                <span>20k+ Successful Projects</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10">
              <img
                src={heroIllustration}
                alt="Service Marketplace"
                className="w-full h-auto drop-shadow-2xl rounded-3xl"
              />
            </div>
            {/* Soft decorative circles behind illustration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-100/40 to-purple-100/40 rounded-full blur-2xl -z-10 animate-pulse" />

            {/* Floating Glassmorphism Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Verified Pro</p>
                  <p className="text-sm font-bold text-gray-800">John D. Plumber</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                  <Star size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">5 Star Rating</p>
                  <p className="text-sm font-bold text-gray-800">Top Rated Expert</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Heropage;

