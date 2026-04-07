import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Camera, 
  Check, 
  Loader2, 
  Languages, 
  Info 
} from "lucide-react";
import { motion } from "framer-motion";
import ProfileStrength from "./ProfileStrength";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    skills: [],
    pricing: 0,
    profilePhoto: "",
    location: { lat: 0, lng: 0, city: "", area: "" },
    availability: "None",
  });
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("${window.location.origin}/api/auth/me", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("${window.location.origin}/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        setSuccess("Profile updated successfully!");
        // Update localStorage if name/email changed
        localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, name: data.name, email: data.email }));
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setSaving(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        // Reverse Geocoding via OpenStreetMap (OSM)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        
        const city = data.address.city || data.address.town || data.address.village || "";
        const area = data.address.suburb || data.address.neighbourhood || data.address.county || "";

        setProfile({
          ...profile,
          location: { lat: latitude, lng: longitude, city, area },
        });
        setSuccess("Location detected and updated!");
      } catch (err) {
        setError("Failed to fetch address from coordinates");
      } finally {
        setSaving(false);
      }
    }, () => {
      setError("Unable to retrieve your location");
      setSaving(false);
    });
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!profile.skills.includes(skillInput.trim())) {
        setProfile({ ...profile, skills: [...profile.skills, skillInput.trim()] });
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      {/* Left: Edit Form */}
      <div className="lg:col-span-2 space-y-6 sm:space-y-8 order-2 lg:order-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Edit Profile</h2>
            <div>
              {success && <span className="text-emerald-500 text-xs sm:text-sm font-bold animate-pulse">{success}</span>}
              {error && <span className="text-rose-500 text-xs sm:text-sm font-bold">{error}</span>}
            </div>
          </div>

          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* User Details */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input
                type="email"
                readOnly
                value={profile.email}
                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Bio - Full Width */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Info size={14} /> Bio (Describe your services)
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={3}
                placeholder="Tell users something about what you do..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Skills - Full Width */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Languages size={14} /> Skills (Type & Press Enter)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-lg flex items-center gap-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-indigo-900">&times;</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={skillInput}
                onKeyDown={handleAddSkill}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Plumbing, Web Dev, etc."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              />
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <DollarSign size={14} /> Pricing (Starting from $)
              </label>
              <input
                type="number"
                value={profile.pricing}
                onChange={(e) => setProfile({ ...profile, pricing: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              />
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={14} /> Availability
              </label>
              <select
                value={profile.availability}
                onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all appearance-none bg-white"
              >
                <option value="None">Prefer not to say</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            {/* Location Detection */}
            <div className="md:col-span-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Location Settings</p>
                  <p className="text-xs text-slate-500 italic">
                    {profile.location.city ? `${profile.location.city}, ${profile.location.area}` : "Not detected yet"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={detectLocation}
                disabled={saving}
                className="px-6 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all shadow-sm"
              >
                Auto-detect Location
              </button>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                {saving ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right: Sidebar Info */}
      <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
        {/* Profile Strength */}
        <ProfileStrength profile={profile} />

        {/* Photo Upload Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Profile Photo</h3>
          <div className="relative inline-block group mb-4">
            <div className="w-40 h-40 rounded-full border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={60} className="text-slate-300" />
              )}
            </div>
            <label className="absolute bottom-1 right-1 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
              <Camera size={18} />
              <input
                type="text"
                placeholder="Enter Photo URL"
                value={profile.profilePhoto}
                onChange={(e) => setProfile({ ...profile, profilePhoto: e.target.value })}
                className="hidden focus:block absolute bottom-12 right-0 w-48 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs shadow-xl"
              />
            </label>
          </div>
          <div className="mt-2">
             <input
                type="text"
                placeholder="Paste Image URL here"
                value={profile.profilePhoto}
                onChange={(e) => setProfile({ ...profile, profilePhoto: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 text-xs focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-2 font-medium">Use a direct image link (e.g., from Unsplash or Imgur)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
