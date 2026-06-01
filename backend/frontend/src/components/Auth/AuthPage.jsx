import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Loader2
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${window.location.origin}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Save user info and token to localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 font-sans">
      
      {/* Left Panel: Visual Branding Showcase (Desktop Only) */}
      <div className="hidden lg:flex lg:col-span-1 bg-gradient-to-br from-slate-900 to-orange-950 p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle Accent Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full filter blur-[80px]" />
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 z-10 hover:opacity-90 transition">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-extrabold text-xs tracking-wide shadow-md">
            FYS
          </div>
          <span className="font-extrabold text-lg text-white tracking-tight">
            FindYourService
          </span>
        </Link>

        {/* Simplified Core Message */}
        <div className="space-y-6 z-10 my-auto">
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-white leading-snug">
              Connecting local skills, on demand.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Find reliable local service providers or build your professional client base with ease.
            </p>
          </div>

          {/* Simple bullet checklist */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-slate-200 text-xs font-semibold">
              <span className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">✓</span>
              <span>Vetted local professionals</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-200 text-xs font-semibold">
              <span className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">✓</span>
              <span>Direct messaging and coordination</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-200 text-xs font-semibold">
              <span className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">✓</span>
              <span>Zero intermediate commission fees</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-500 z-10">
          © {new Date().getFullYear()} FindYourService.
        </div>
      </div>

      {/* Right Panel: Interactive Form */}
      <div className="lg:col-span-1 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md bg-white border border-slate-100 shadow-xl rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          
          {/* Decorative subtle header line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />
          
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              {isLogin ? "Welcome back" : "Get started"}
            </h3>
            <p className="text-slate-500 text-sm">
              {isLogin ? "Enter your details to access your workspace" : "Register to find services or build your client base"}
            </p>
          </div>

          {/* Validation Alert */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl relative mb-6 flex items-center gap-2"
              >
                <span>⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="fullName"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-1.5"
                >
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required={!isLogin}
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition duration-200 text-sm placeholder:text-slate-400 bg-slate-50/50"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition duration-200 text-sm placeholder:text-slate-400 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Password
                </label>
                {isLogin && (
                  <button 
                    type="button"
                    className="text-xs font-semibold text-orange-600 hover:underline transition"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition duration-200 text-sm placeholder:text-slate-400 bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <hr className="flex-grow border-slate-200" />
            <span className="mx-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">or</span>
            <hr className="flex-grow border-slate-200" />
          </div>

          {/* Social Sign In */}
          <button className="w-full flex items-center justify-center border border-slate-200 rounded-xl py-3 hover:bg-slate-50 transition duration-200 text-sm font-semibold text-slate-700 gap-2 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm">
            <FcGoogle className="text-xl" />
            {isLogin ? "Sign in with Google" : "Sign up with Google"}
          </button>

          {/* Footer Toggle */}
          <p className="text-sm text-slate-500 mt-8 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-orange-600 font-bold hover:underline transition"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
