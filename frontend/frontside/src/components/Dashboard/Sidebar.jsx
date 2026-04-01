import React from "react";
import { 
  LayoutDashboard, 
  User, 
  PlusSquare, 
  ListOrdered, 
  MessageSquare, 
  MapPin, 
  LogOut 
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, handleLogout, user }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "create-post", label: "Create Post", icon: <PlusSquare size={20} /> },
    { id: "my-posts", label: "My Posts", icon: <ListOrdered size={20} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
    { id: "nearby", label: "Nearby", icon: <MapPin size={20} /> },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-xl flex flex-col fixed left-0 top-0 z-20 transition-all duration-300">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          FindYourService
        </h2>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                : "text-gray-600 hover:bg-slate-50 hover:text-indigo-600"
            }`}
          >
            <span className={`${activeTab === item.id ? "text-white" : "text-gray-400 group-hover:text-indigo-600"}`}>
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
