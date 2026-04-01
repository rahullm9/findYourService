import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/signin");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Not Authorized</h2>
          <p className="text-slate-600 mb-6">Please log in to access your dashboard.</p>
          <Link 
            to="/signin" 
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Content Components
  const Overview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100 border-l-8 border-l-indigo-600">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Hello, {user.name}! 👋
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Welcome back to your service terminal.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Active Requests", count: 0, color: "bg-indigo-50 border-indigo-100 text-indigo-700" },
          { label: "Pending Reviews", count: 0, color: "bg-amber-50 border-amber-100 text-amber-700" },
          { label: "Total Earnings", count: "$0.00", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${stat.color} shadow-sm group hover:scale-[1.02] transition-all`}>
            <p className="text-sm font-bold uppercase tracking-wider opacity-60 mb-1">{stat.label}</p>
            <p className="text-3xl font-black">{stat.count}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const ProfileView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b pb-4 border-slate-50">Profile Information</h2>
      <div className="space-y-6">
        {[
          { label: "Full Name", value: user.name },
          { label: "Email Address", value: user.email },
          { label: "Joined Date", value: new Date().toLocaleDateString() },
        ].map((field, i) => (
          <div key={i}>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{field.label}</p>
            <p className="text-lg font-semibold text-slate-700">{field.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const PlaceholderView = ({ title }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 border border-slate-200">
        <span className="text-4xl">🛠️</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title} Section</h2>
      <p className="text-slate-500 max-w-sm font-medium">This module is under development and will be available soon in your FindYourService dashboard.</p>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Overview />;
      case "profile": return <ProfileView />;
      case "create-post": return <PlaceholderView title="Create Post" />;
      case "my-posts": return <PlaceholderView title="My Posts" />;
      case "messages": return <PlaceholderView title="Messages" />;
      case "nearby": return <PlaceholderView title="Nearby Services" />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Sidebar Component */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
        user={user} 
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
