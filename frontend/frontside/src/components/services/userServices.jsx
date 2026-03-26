// src/pages/HomeServices.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wrench,
  Paintbrush,
  Plug,
  BookUser,
  Users,
  Hammer,
} from "lucide-react";

const services = [
  { name: "Mechanic", icon: <Wrench className="h-8 w-8 text-blue-500" /> },
  { name: "Plumber", icon: <Plug className="h-8 w-8 text-green-500" /> },
  { name: "Teacher", icon: <BookUser className="h-8 w-8 text-yellow-500" /> },
  { name: "Student", icon: <Users className="h-8 w-8 text-purple-500" /> },
  { name: "Electrician", icon: <Plug className="h-8 w-8 text-red-500" /> },
  { name: "Painter", icon: <Paintbrush className="h-8 w-8 text-pink-500" /> },
  { name: "Carpenter", icon: <Hammer className="h-8 w-8 text-orange-500" /> },
  { name: "Other Services", icon: <Users className="h-8 w-8 text-gray-500" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function UserServices() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Choose a Service
      </h1>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
            variants={itemVariants}
          >
            {service.icon}
            <p className="mt-4 text-lg font-medium text-gray-700">
              {service.name}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <button className="mt-10 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg">
        <Link to="worker" >Register as Worker</Link>
      </button>
    </div>
  );
}
