import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Bell, 
  Trash2, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  const [activeSection, setActiveSection] = useState("security");
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Form States
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [privacy, setPrivacy] = useState(userInfo?.settings?.privacy || { profilePublic: true, showEmail: false });
  const [notifications, setNotifications] = useState(userInfo?.settings?.notifications || { messages: true, posts: true });

  const handleUpdateSettings = async (updatedData) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const response = await fetch("${window.location.origin}/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setSuccessMsg("Settings updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setErrorMsg(data.message || "Failed to update settings");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setErrorMsg("New passwords do not match");
      return;
    }
    handleUpdateSettings({ password: passwords.new });
    setPasswords({ old: "", new: "", confirm: "" });
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch("${window.location.origin}/api/auth/me", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      if (response.ok) {
        localStorage.removeItem("userInfo");
        navigate("/signin");
      }
    } catch (err) {
      setErrorMsg("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  const Switch = ({ enabled, onChange, label, sublabel }) => (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all cursor-pointer group" onClick={() => onChange(!enabled)}>
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-800 uppercase tracking-tighter">{label}</p>
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">{sublabel}</p>
      </div>
      <div className={`w-12 h-6 rounded-full transition-all relative ${enabled ? "bg-indigo-600" : "bg-slate-200"}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${enabled ? "left-7 shadow-md" : "left-1"}`}></div>
      </div>
    </div>
  );

  const sections = [
    { id: "security", label: "Security & Login", icon: Lock },
    { id: "privacy", label: "Privacy Control", icon: Eye },
    { id: "notifications", label: "Alert Configs", icon: Bell },
    { id: "danger", label: "Zone of Danger", icon: ShieldAlert },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
         <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
               <ShieldCheck className="text-indigo-600" size={28} /> Terminal Settings
            </h2>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-[0.2em] mt-1 ml-1">Configure your findYourService parameters</p>
         </div>
         {successMsg && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-emerald-50 text-emerald-600 px-6 py-2.5 rounded-2xl border border-emerald-100 flex items-center gap-3 font-black text-[10px] uppercase tracking-widest shadow-sm">
               <CheckCircle2 size={16} /> {successMsg}
            </motion.div>
         )}
         {errorMsg && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-rose-50 text-rose-600 px-6 py-2.5 rounded-2xl border border-rose-100 flex items-center gap-3 font-black text-[10px] uppercase tracking-widest shadow-sm">
               <AlertTriangle size={16} /> {errorMsg}
            </motion.div>
         )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 space-y-3">
           {sections.map((sec) => (
             <button
               key={sec.id}
               onClick={() => setActiveSection(sec.id)}
               className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all border ${
                 activeSection === sec.id 
                 ? "bg-slate-900 border-slate-800 text-white shadow-xl translate-x-2" 
                 : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200"
               }`}
             >
               <div className="flex items-center gap-4">
                  <sec.icon size={20} className={activeSection === sec.id ? "text-indigo-400" : "text-slate-400"} />
                  <span className="font-black text-xs uppercase tracking-widest">{sec.label}</span>
               </div>
               <ChevronRight size={16} className={activeSection === sec.id ? "opacity-100" : "opacity-0"} />
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 sm:p-12 min-h-[400px]"
              >
                {activeSection === "security" && (
                   <div className="space-y-10">
                      <div className="border-b border-slate-50 pb-6">
                         <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Credential Update</h3>
                         <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Keep your access secure and encrypted</p>
                      </div>

                      <form onSubmit={handlePasswordChange} className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Password</label>
                            <div className="relative">
                               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                               <input 
                                 type="password" required value={passwords.old}
                                 onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                                 className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
                                 placeholder="Enter old credentials"
                               />
                            </div>
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">New Password</label>
                              <input 
                                type="password" required value={passwords.new}
                                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
                                placeholder="Min 6 characters"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm New</label>
                              <input 
                                type="password" required value={passwords.confirm}
                                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-indigo-100 transition-all font-medium"
                                placeholder="Repeat new"
                              />
                            </div>
                         </div>
                         <button 
                           type="submit" disabled={loading}
                           className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
                         >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : "Validate & Update"}
                         </button>
                      </form>
                   </div>
                )}

                {activeSection === "privacy" && (
                   <div className="space-y-10">
                      <div className="border-b border-slate-50 pb-6">
                         <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Visibility Control</h3>
                         <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Manage what data is exposed to the network</p>
                      </div>

                      <div className="space-y-4">
                         <Switch 
                           enabled={privacy.profilePublic} 
                           onChange={(val) => { 
                             setPrivacy({...privacy, profilePublic: val});
                             handleUpdateSettings({ settings: { ...userInfo.settings, privacy: { ...privacy, profilePublic: val } } });
                           }}
                           label="Public Profile" 
                           sublabel="Allow anyone on findYourService to discover you"
                         />
                         <Switch 
                           enabled={privacy.showEmail} 
                           onChange={(val) => { 
                             setPrivacy({...privacy, showEmail: val});
                             handleUpdateSettings({ settings: { ...userInfo.settings, privacy: { ...privacy, showEmail: val } } });
                           }}
                           label="Show Email Address" 
                           sublabel="Display your email to potential hires"
                         />
                      </div>

                      <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex gap-4">
                         <Info className="text-indigo-600 shrink-0" size={20} />
                         <p className="text-[11px] font-medium text-indigo-400 leading-relaxed uppercase tracking-wider">
                           Data is encrypted. Even when public, sensitive information like your password string is never visible.
                         </p>
                      </div>
                   </div>
                )}

                {activeSection === "notifications" && (
                   <div className="space-y-10">
                      <div className="border-b border-slate-50 pb-6">
                         <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Signal Management</h3>
                         <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Configure your alert frequency</p>
                      </div>

                      <div className="space-y-4">
                         <Switch 
                           enabled={notifications.messages} 
                           onChange={(val) => {
                             setNotifications({...notifications, messages: val});
                             handleUpdateSettings({ settings: { ...userInfo.settings, notifications: { ...notifications, messages: val } } });
                           }}
                           label="Direct Messages" 
                           sublabel="Pulsing notifications for new chat signals"
                         />
                         <Switch 
                           enabled={notifications.posts} 
                           onChange={(val) => {
                             setNotifications({...notifications, posts: val});
                             handleUpdateSettings({ settings: { ...userInfo.settings, notifications: { ...notifications, posts: val } } });
                           }}
                           label="Network Activity" 
                           sublabel="Updates on nearby services and network changes"
                         />
                      </div>
                   </div>
                )}

                {activeSection === "danger" && (
                   <div className="space-y-10">
                      <div className="border-b border-rose-50 pb-6">
                         <h3 className="text-xl font-black text-rose-600 uppercase tracking-tighter">Danger Sector</h3>
                         <p className="text-xs font-black text-rose-300 uppercase tracking-widest mt-1">Destructive actions - proceed with extreme caution</p>
                      </div>

                      <div className="p-8 bg-rose-50/50 rounded-3xl border border-rose-100 space-y-6">
                         <div className="flex gap-4">
                            <Trash2 className="text-rose-600 shrink-0" size={24} />
                            <div>
                               <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Erase Account Trace</h4>
                               <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1 leading-relaxed">
                                  This action will permanently delete your profile and detach your posts from the active network. 
                                  THIS CANNOT BE UNDONE.
                               </p>
                            </div>
                         </div>

                         {!isDeleting ? (
                            <button 
                              onClick={() => setIsDeleting(true)}
                              className="w-full py-4 bg-white border-2 border-rose-100 text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                            >
                               Initialize Deletion Sequence
                            </button>
                         ) : (
                            <div className="space-y-4 pt-4 border-t border-rose-100">
                               <p className="text-center text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">Confirm Evasion?</p>
                               <div className="grid grid-cols-2 gap-3">
                                  <button onClick={() => setIsDeleting(false)} className="py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
                                  <button onClick={handleDeleteAccount} className="py-3 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-100 flex items-center justify-center">
                                     {loading ? <Loader2 className="animate-spin" size={16} /> : "Yes, Purge Account"}
                                  </button>
                               </div>
                            </div>
                         )}
                      </div>
                   </div>
                )}
              </motion.div>
           </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Settings;
