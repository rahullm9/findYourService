import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  DollarSign, 
  AlertCircle, 
  MoreVertical,
  Briefcase,
  PenTool,
  Loader2,
  Plus,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${window.location.origin}/api/posts/my-posts`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`${window.location.origin}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (response.ok) {
        setPosts(posts.filter(p => p._id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      alert("Error deleting post");
    }
  };

  const handleToggleStatus = async (post) => {
    const newStatus = post.status === "Active" ? "Completed" : "Active";
    try {
      const response = await fetch(`${window.location.origin}/api/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setPosts(posts.map(p => p._id === post._id ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`${window.location.origin}/api/posts/${editingPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(editingPost),
      });
      if (response.ok) {
        const updated = await response.json();
        setPosts(posts.map(p => p._id === updated._id ? updated : p));
        setEditingPost(null);
      }
    } catch (err) {
      alert("Error updating post");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-500 font-bold animate-pulse">Loading your posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800">My Posts</h2>
          <p className="text-slate-500 text-sm font-medium">Manage your service listings and requests</p>
        </div>
        <button 
          onClick={fetchPosts}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
          title="Refresh List"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">No posts yet</h3>
          <p className="text-slate-500 text-sm mb-8">You haven't created any service listings or requests.</p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100">
            Create First Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <motion.div 
              layout
              key={post._id} 
              className={`bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col ${post.status !== "Active" ? "opacity-75 grayscale-[0.5]" : ""}`}
            >
              {/* Type Ribbon */}
              <div className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${post.type === "Offering" ? "bg-purple-600 text-white" : "bg-indigo-600 text-white"}`}>
                {post.type === "Offering" ? <PenTool size={10} /> : <Briefcase size={10} />}
                {post.type}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-slate-800 text-lg leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tighter">
                      {post.title}
                    </h3>
                    <p className="text-xs font-bold text-indigo-600 mt-1">{post.category}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                    post.urgency === "High" ? "bg-rose-50 text-rose-600 border-rose-100" :
                    post.urgency === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-emerald-50 text-emerald-600 border-emerald-100"
                  }`}>
                    {post.urgency}
                  </div>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium">
                  {post.description}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MapPin size={14} className="text-slate-300" /> {post.location?.address || "Location not set"}
                    </span>
                    <span className="flex items-center gap-1 text-slate-800 bg-slate-50 px-2 py-1 rounded-lg">
                      <DollarSign size={14} className="text-emerald-500" /> {post.price > 0 ? post.price : "Flexible"}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                       <button 
                        onClick={() => setEditingPost(post)}
                        className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all border border-slate-100"
                       >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post._id)}
                        className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all border border-rose-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleToggleStatus(post)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                        post.status === "Active" 
                        ? "bg-slate-800 text-white hover:bg-slate-900" 
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {post.status === "Active" ? (
                        <><CheckCircle2 size={16} /> Mark Completed</>
                      ) : (
                        <><RefreshCw size={16} /> Re-activate</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal Overlay */}
      <AnimatePresence>
        {editingPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setEditingPost(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Edit Post</h3>
                <button onClick={() => setEditingPost(null)} className="text-slate-400 hover:text-slate-600">
                  <Trash2 size={24} className="rotate-45" />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Title</label>
                  <input 
                    required type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none font-bold"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
                  <textarea 
                    required rows={4}
                    value={editingPost.description}
                    onChange={(e) => setEditingPost({...editingPost, description: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none font-medium text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price</label>
                    <input 
                      type="number"
                      value={editingPost.price}
                      onChange={(e) => setEditingPost({...editingPost, price: e.target.value})}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Urgency</label>
                    <select 
                      value={editingPost.urgency}
                      onChange={(e) => setEditingPost({...editingPost, urgency: e.target.value})}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none font-bold"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <button 
                  disabled={isUpdating}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-3 disabled:bg-slate-400"
                >
                  {isUpdating ? <Loader2 size={20} className="animate-spin" /> : "Save Changes"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyPosts;
