import React, { useState } from "react";
import { 
  PlusCircle, 
  Tag, 
  MapPin, 
  DollarSign, 
  AlertCircle, 
  ChevronRight, 
  Check, 
  Loader2, 
  PenTool, 
  Briefcase 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    price: "",
    urgency: "Low",
    type: "Requesting",
  });

  const categories = [
    "Plumber", "Electrician", "Tutor", "Cleaning", 
    "Web Dev", "Graphic Design", "Gardening", "Other"
  ];

  const urgencyLevels = [
    { id: "Low", label: "Low", color: "bg-emerald-50 text-emerald-700 border-emerald-100", active: "bg-emerald-600 text-white shadow-emerald-100" },
    { id: "Medium", label: "Medium", color: "bg-amber-50 text-amber-700 border-amber-100", active: "bg-amber-500 text-white shadow-amber-100" },
    { id: "High", label: "High", color: "bg-rose-50 text-rose-700 border-rose-100", active: "bg-rose-600 text-white shadow-rose-100" },
  ];

  const postTypes = [
    { id: "Requesting", label: "Requesting Help", icon: <Briefcase size={16} />, color: "bg-indigo-50 text-indigo-700 border-indigo-100", active: "bg-indigo-600 text-white shadow-indigo-100" },
    { id: "Offering", label: "Offering Service", icon: <PenTool size={16} />, color: "bg-purple-50 text-purple-700 border-purple-100", active: "bg-purple-600 text-white shadow-purple-100" },
  ];

  // Safe user retrieval
  const getUserInfo = () => {
    try {
      return JSON.parse(localStorage.getItem("userInfo")) || {};
    } catch (e) {
      return {};
    }
  };

  const userInfo = getUserInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // Get coordinates (Browser API or Profile fallback)
    const getCoordinates = () => {
      return new Promise((resolve) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve([pos.coords.longitude, pos.coords.latitude]),
            () => {
              // Fallback to profile coordinates if browser blocked
              if (userInfo.location?.lng && userInfo.location?.lat) {
                resolve([userInfo.location.lng, userInfo.location.lat]);
              } else {
                resolve(null);
              }
            },
            { timeout: 5000 }
          );
        } else {
          resolve(userInfo.location?.lng ? [userInfo.location.lng, userInfo.location.lat] : null);
        }
      });
    };

    try {
      const coords = await getCoordinates();
      
      if (!coords) {
        setError("Location access required. Please enable location or update your profile.");
        setLoading(false);
        return;
      }

      const postPayload = {
        ...formData,
        location: {
          coordinates: coords,
          address: formData.location, // The text input value
        },
      };

      const response = await fetch(`${window.location.origin}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(postPayload),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Post created successfully! It's now visible to users nearby.");
        setFormData({ title: "", category: "", description: "", location: "", price: "", urgency: "Low", type: "Requesting" });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <PlusCircle size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">Create a New Post</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">List a service or post a request</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Post Type Selection */}
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Check size={14} className="text-indigo-600" /> What are you doing?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {postTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 group ${
                    formData.type === type.id 
                    ? `${type.active} scale-[1.02]` 
                    : `${type.color} border-transparent hover:border-slate-200`
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${formData.type === type.id ? "bg-white/20" : "bg-white shadow-sm"}`}>
                    {type.icon}
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Title & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <PenTool size={14} /> Post Title
              </label>
              <input
                required
                type="text"
                placeholder="e.g., Expert Math Tutor needed"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Tag size={14} /> Category
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none transition-all font-medium appearance-none bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={14} /> Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe your service or request in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none transition-all font-medium resize-none"
            />
          </div>

          {/* Location & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} /> Location / Area
              </label>
              <input
                required
                type="text"
                placeholder="e.g., Bandra West, Mumbai"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <DollarSign size={14} /> Expected Price (Optional)
              </label>
              <input
                type="number"
                placeholder="Starting from..."
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none transition-all font-medium"
              />
            </div>
          </div>

          {/* Urgency Colorful Cards */}
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle size={14} /> Level of Urgency
            </label>
            <div className="grid grid-cols-3 gap-4">
              {urgencyLevels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: level.id })}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group ${
                    formData.urgency === level.id 
                    ? `${level.active} scale-[1.02]` 
                    : `${level.color} border-transparent hover:border-slate-200`
                  }`}
                >
                  <span className="text-sm font-black uppercase tracking-widest">{level.label}</span>
                  <div className={`w-2 h-2 rounded-full ${formData.urgency === level.id ? "bg-white" : "bg-current opacity-40"}`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Status Messages */}
          <AnimatePresence>
            {success && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 font-bold text-sm flex items-center gap-3">
                <Check size={18} /> {success}
              </motion.div>
            )}
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100 font-bold text-sm flex items-center gap-3">
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-[0.98] disabled:bg-slate-400"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <> Publish Post <ChevronRight size={24} /> </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
