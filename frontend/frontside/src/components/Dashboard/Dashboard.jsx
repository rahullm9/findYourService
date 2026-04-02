import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  MessageSquare, 
  FileText, 
  MapPin, 
  Clock, 
  UserPlus, 
  ChevronRight,
  Menu 
} from "lucide-react";
import Sidebar from "./Sidebar";
import Profile from "./Profile/Profile";
import CreatePost from "./Post/CreatePost.jsx";
import MyPosts from "./Post/MyPosts.jsx";

// --- Sub-Components (Moved outside for better performance) ---

const StatCard = ({ icon: Icon, label, value, colorClass }) => (
  <div className={`p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all group border-slate-100`}>
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={20} />
      </div>
      <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">+12%</span>
    </div>
    <p className="text-sm font-semibold text-slate-500 mb-1">{label}</p>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
  </div>
);

const RecentActivity = () => {
  const activities = [
    { id: 1, text: "You updated your profile picture", time: "2 hours ago", icon: "👤" },
    { id: 2, text: "New message from Sarah Miller", time: "5 hours ago", icon: "💬" },
    { id: 3, text: "You posted 'Plumbing Service' in Nearby", time: "1 day ago", icon: "📢" },
    { id: 4, text: "Alex Johnson viewed your profile", time: "2 days ago", icon: "👁️" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Clock size={18} className="text-indigo-600" /> Recent Activity
        </h3>
        <button className="text-xs font-semibold text-indigo-600 hover:underline">View All</button>
      </div>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 relative">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-lg border border-slate-100 shrink-0">
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700 leading-tight">{activity.text}</p>
              <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SuggestedUsers = () => {
  const users = [
    { id: 1, name: "Sarah Miller", role: "Electrician", dist: "1.2 km", avatar: "SM" },
    { id: 2, name: "David Chen", role: "House Cleaning", dist: "2.5 km", avatar: "DC" },
    { id: 3, name: "Jessica Lee", role: "Pet Sitter", dist: "3.1 km", avatar: "JL" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <UserPlus size={18} className="text-indigo-600" /> Suggested Nearby
        </h3>
      </div>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                {user.avatar}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role} • {user.dist}</p>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 text-sm font-bold text-slate-500 hover:text-indigo-600 border border-dashed border-slate-200 rounded-xl hover:border-indigo-200 transition-all">
        Discover More
      </button>
    </div>
  );
};

const Overview = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-8 pb-10"
  >
    {/* Header Segment */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 sm:p-10 rounded-3xl shadow-lg shadow-indigo-100 overflow-hidden relative">
      <div className="relative z-10">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-indigo-100 mt-2 font-medium opacity-90 italic">Welcome back, {user?.name}! Here's your summary.</p>
      </div>
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard icon={Eye} label="Profile Views" value="1,280" colorClass="bg-blue-50 text-blue-600" />
      <StatCard icon={MessageSquare} label="Messages" value="24" colorClass="bg-purple-50 text-purple-600" />
      <StatCard icon={FileText} label="Active Posts" value="12" colorClass="bg-emerald-50 text-emerald-600" />
      <StatCard icon={MapPin} label="Nearby Services" value="45" colorClass="bg-rose-50 text-rose-600" />
    </div>

    {/* Main Grid: Activity & Suggestions */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      <div className="lg:col-span-2">
        <RecentActivity />
      </div>
      <div>
        <SuggestedUsers />
      </div>
    </div>
  </motion.div>
);

const PlaceholderView = ({ title }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4"
  >
    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 border border-slate-200">
      <span className="text-3xl italic">🛠️</span>
    </div>
    <h2 className="text-xl font-bold text-slate-800 mb-2">{title} Section</h2>
    <p className="text-sm text-slate-500 max-w-sm font-medium">This module is under development for your FindYourService terminal.</p>
  </motion.div>
);

// --- Main Components ---

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Safe user parsing
  const getInitialUser = () => {
    try {
      return JSON.parse(localStorage.getItem("userInfo"));
    } catch (e) {
      return null;
    }
  };

  const user = getInitialUser();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/signin");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Not Authorized</h2>
          <p className="text-slate-600 mb-6">Please log in to access your dashboard.</p>
          <Link 
            to="/signin" 
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Overview user={user} />;
      case "profile": return <Profile />;
      case "create-post": return <CreatePost />;
      case "my-posts": return <MyPosts />;
      case "messages": return <PlaceholderView title="Messages" />;
      case "nearby": return <PlaceholderView title="Nearby Services" />;
      default: return <Overview user={user} />;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
        user={user} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Top Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-50 sticky top-0 z-30">
          <h2 className="text-lg font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            FindYourService
          </h2>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Dynamic Content Area */}
        <main className={`flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto transition-all duration-300 lg:ml-64 ${isSidebarOpen ? "blur-[2px] pointer-events-none lg:blur-none lg:pointer-events-auto" : ""}`}>
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
