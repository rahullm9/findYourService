
import React from 'react';
import { BookOpen, Wrench, Hammer, Users, GraduationCap, MoreHorizontal } from 'lucide-react';

const Showoff = () => {
  const services = [
    { name: 'Teacher', icon: <BookOpen className="w-12 h-12 text-blue-600" />, description: 'Find qualified educators for all subjects.' },
    { name: 'Plumber', icon: <Wrench className="w-12 h-12 text-green-600" />, description: 'Connect with reliable plumbers for your home needs.' },
    { name: 'Mechanic', icon: <Hammer className="w-12 h-12 text-red-600" />, description: 'Get expert mechanics for vehicle repairs and maintenance.' },
    { name: 'Carpenter', icon: <Users className="w-12 h-12 text-yellow-600" />, description: 'Hire skilled carpenters for custom furniture and repairs.' },
    { name: 'Students', icon: <GraduationCap className="w-12 h-12 text-purple-600" />, description: 'Discover opportunities for student services and internships.' },
    { name: 'Others', icon: <MoreHorizontal className="w-12 h-12 text-gray-600" />, description: 'Explore a wide range of other professional services.' },
  ];

  return (
    <section id="services" className="py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Our Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col items-center text-center border border-gray-100"
            >
              <div className="mb-6">{service.icon}</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">{service.name}</h4>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showoff;