import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation, 
  Briefcase, 
  PenTool, 
  DollarSign, 
  Loader2, 
  ChevronDown,
  X,
  Target,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Nearby = ({ setActiveTab }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [distance, setDistance] = useState(10); // km
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const categories = ["Plumber", "Electrician", "Tutor", "Cleaning", "Web Dev", "Graphic Design", "Gardening", "Other"];

  useEffect(() => {
    // Initial: Try to get browser location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocation(loc);
          fetchNearby(loc);
        },
        () => {
          // Fallback to profile location if blocked
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          if (userInfo?.location?.lat) {
            const loc = { lat: userInfo.location.lat, lng: userInfo.location.lng };
            setLocation(loc);
            fetchNearby(loc);
          } else {
            setLoading(false);
            setError("Location access denied. Please enable location or update your profile.");
          }
        }
      );
    }
  }, []);

  const fetchNearby = async (loc = location, customFilters = {}) => {
    if (!loc) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        lat: loc.lat,
        lng: loc.lng,
        distance: customFilters.distance || distance,
        category: customFilters.category || category,
        type: customFilters.type || type,
        minPrice: customFilters.minPrice || priceRange.min,
        maxPrice: customFilters.maxPrice || priceRange.max,
      });

      const response = await fetch(`${window.location.origin}/api/posts/nearby?${params}`);
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    fetchNearby(location);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setDistance(10);
    setCategory("");
    setType("");
    setPriceRange({ min: "", max: "" });
    fetchNearby(location, { distance: 10, category: "", type: "", minPrice: "", maxPrice: "" });
  };

  const handleStartChat = async (post) => {
    try {
      const response = await fetch(`${window.location.origin}/api/messages/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
        },
        body: JSON.stringify({
          recipientId: post.user._id,
          postId: post._id,
        }),
      });

      if (response.ok) {
        setActiveTab("messages");
      }
    } catch (err) {
      console.error("Failed to start chat");
    }
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2">
             Nearby Services <span className="text-indigo-600">/ Requests</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1 italic">Providing services or getting help is just around the corner.</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              showFilters ? "bg-slate-800 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
            }`}
          >
            <Filter size={16} /> Filters
          </button>
          
          <button 
             onClick={() => {
               setLoading(true);
               navigator.geolocation.getCurrentPosition((pos) => {
                 const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                 setLocation(loc);
                 fetchNearby(loc);
               });
             }}
             className="p-3 bg-white border border-slate-200 rounded-2xl text-indigo-600 hover:bg-indigo-50 transition-all hover:border-indigo-200"
             title="Update current location"
          >
            <Navigation size={18} />
          </button>
        </div>
      </div>

      {/* Filter Menu (Inline Accordion) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Radius */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                  Distance Radius <span>{distance} km</span>
                </label>
                <input 
                  type="range" min="1" max="50" step="1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Category */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:border-indigo-400 outline-none text-sm font-bold"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Post Type */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">What are you looking for?</label>
                <div className="flex gap-2">
                  {["Offering", "Requesting"].map(t => (
                    <button 
                      key={t}
                      onClick={() => setType(type === t ? "" : t)}
                      className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                        type === t ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {t === "Offering" ? "Providers" : "Requests"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price Limit</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:border-indigo-400 outline-none text-sm font-bold"
                  />
                  <span className="text-slate-300">-</span>
                  <input 
                    type="number" placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:border-indigo-400 outline-none text-sm font-bold"
                  />
                </div>
              </div>
            </div>
            <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
               <button onClick={clearFilters} className="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest">Clear All</button>
               <button onClick={handleApplyFilters} className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100">
                  Update Results
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Results Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
          <p className="text-slate-500 font-black animate-pulse">Scanning the neighborhood...</p>
        </div>
      ) : error ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">{error}</h3>
          <p className="text-slate-400 mt-2 max-w-sm mx-auto">We need your coordinates to find services near you. Please ensure location is enabled.</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-100 text-center">
           <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
             <Search size={40} />
           </div>
           <h3 className="text-2xl font-black text-slate-800 tracking-tight">Nothing found nearby</h3>
           <p className="text-slate-500 mt-3 max-w-md mx-auto font-medium">Try increasing the search radius or choosing a different category. There's always something new popping up!</p>
           <button onClick={() => setDistance(30)} className="mt-8 text-sm font-black text-indigo-600 border-b-2 border-indigo-100 hover:border-indigo-600 py-1 transition-all">
             Try 30km radius?
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
          {posts.map((post) => (
            <motion.div 
              key={post._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {/* User Info / Identity Profile */}
                <div className="sm:w-48 bg-slate-50 p-6 flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-slate-100">
                  <div className="relative mb-4">
                    <img 
                      src={post.user?.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user?.name}`} 
                      alt="Avatar" 
                      className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg">
                      <Check size={12} className="stroke-[4px]" />
                    </div>
                  </div>
                  <h4 className="font-black text-slate-800 leading-tight truncate w-full px-2">{post.user?.name}</h4>
                  <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mt-1">Provider</p>
                </div>

                {/* Post Content */}
                <div className="flex-1 p-8 relative">
                   <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                         post.urgency === "High" ? "bg-rose-50 text-rose-600 border-rose-100" :
                         post.urgency === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" :
                         "bg-emerald-50 text-emerald-600 border-emerald-100"
                       }`}>
                         {post.urgency}
                       </span>
                   </div>

                   <div className="flex items-center gap-2 mb-2">
                      {post.type === "Offering" ? (
                        <div className="bg-purple-100 text-purple-700 p-1.5 rounded-lg"><PenTool size={14} /></div>
                      ) : (
                        <div className="bg-indigo-100 text-indigo-700 p-1.5 rounded-lg"><Briefcase size={14} /></div>
                      )}
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{post.category}</span>
                   </div>

                   <h3 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tighter mb-4 pr-16 leading-tight">
                     {post.title}
                   </h3>

                   <p className="text-sm text-slate-500 line-clamp-3 mb-8 font-medium leading-relaxed italic">
                     "{post.description}"
                   </p>

                   <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                            <MapPin size={16} />
                         </div>
                         <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{post.location?.address?.split(',')[0]}</span>
                      </div>

                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                            <DollarSign size={16} />
                         </div>
                         <span className="text-xs font-black text-slate-800 uppercase tabular-nums">
                           {post.price > 0 ? `${post.price} / hr` : "Flexible"}
                         </span>
                      </div>

                      {post.user?._id !== userInfo?._id && (
                        <button 
                          onClick={() => handleStartChat(post)}
                          className="ml-auto px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100"
                        >
                           Message Provider
                        </button>
                      )}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nearby;
