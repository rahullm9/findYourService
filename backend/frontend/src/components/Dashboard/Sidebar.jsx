import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  User, 
  SquarePlus, 
  ListOrdered, 
  MessageSquare, 
  MapPin, 
  Settings,
  LogOut,
  X
} from "lucide-react";
import io from "socket.io-client";

const socket = io(window.location.origin);

const Sidebar = ({ activeTab, setActiveTab, handleLogout, user, isOpen, setIsOpen }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/messages/unread-count`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUnreadCount(data.count);
      }
    } catch (err) {
      console.error("Failed to fetch unread count");
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    socket.on("new_message_notification", (data) => {
      if (data.to.includes(user?._id)) {
        fetchUnreadCount();
      }
    });

    return () => socket.off("new_message_notification");
  }, [user]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "create-post", label: "Create Post", icon: <SquarePlus size={20} /> },
    { id: "my-posts", label: "My Posts", icon: <ListOrdered size={20} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} />, badge: unreadCount > 0 ? unreadCount : null },
    { id: "nearby", label: "Nearby", icon: <MapPin size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const handleTabClick = (id) => {
    if (id === "messages") setUnreadCount(0);
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`w-64 bg-white h-screen shadow-2xl flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent italic">
            FindYourService
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                activeTab === item.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`${activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-indigo-600"}`}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </div>
              
              {item.badge && (
                <div className="min-w-[20px] h-5 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center px-1.5 rounded-full border-2 border-white shadow-sm animate-bounce">
                  {item.badge}
                </div>
              )}
            </button>
          ))}
        </nav>
...
        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-50">
          <div className="flex items-center space-x-3 px-4 py-3 mb-2 bg-slate-50/50 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-xs border border-white shadow-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
              <p className="text-[11px] text-slate-400 font-medium truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all duration-200 group"
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
