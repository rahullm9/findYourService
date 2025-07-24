import { Link } from "react-router-dom";
import React from 'react';

const Heropage = () => {
  return (
    <section className="p-12 relative bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center  shadow-xl">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Your One-Stop Solution for Professional Services
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Whether you need a skilled tradesperson, an experienced tutor, or a helping hand, "Find Your Services" connects you with trusted professionals and opportunities.
        </p>
        <Link to="services" ><button className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Get Started
        </button></Link>
      </div>
    </section>
  );
};

export default Heropage;
