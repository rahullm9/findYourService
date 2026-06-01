import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MessageSquare, 
  CheckCircle, 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  Users,
  Star,
  Award
} from "lucide-react";
import aboutImg from "../../assets/about_platform.png";

const About = () => {
  const [activeTab, setActiveTab] = useState("customers");

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay } 
    }
  });

  const tabContent = {
    customers: [
      {
        icon: <Search className="w-6 h-6 text-orange-500" />,
        title: "1. Search for Services",
        desc: "Browse a wide variety of categories—plumbing, tutoring, mechanics, carpentry, and more. Use filters to find experts in your local area."
      },
      {
        icon: <MessageSquare className="w-6 h-6 text-orange-500" />,
        title: "2. Connect & Chat",
        desc: "Communicate directly with the providers through our workspace. Discuss requirements, negotiate pricing, and coordinate schedules with no hidden fees."
      },
      {
        icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
        title: "3. Get Work Done",
        desc: "Enjoy top-quality service. Once the job is completed, leave a rating and review to guide fellow community members."
      }
    ],
    workers: [
      {
        icon: <Briefcase className="w-6 h-6 text-amber-500" />,
        title: "1. Create a Worker Profile",
        desc: "Sign up and build a professional showcase. Detail your skills, experience, rates, and past work to stand out to potential clients."
      },
      {
        icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
        title: "2. Receive Service Queries",
        desc: "Get discovered by clients in your area looking for your specific skillset. Answer queries and discuss job details in real-time."
      },
      {
        icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
        title: "3. Grow Your Business",
        desc: "Deliver exceptional service, build your reputation with glowing five-star reviews, and grow your local client base."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 pt-24">
      {/* Hero Banner Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-wider">
            <Award size={14} /> About FindYourService
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Connecting People Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Need Work Done</span> With Those Ready To Work.
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            FindYourService is a community-driven digital marketplace built to eliminate the hassle of finding reliable local help. We empower local service professionals to grow their businesses while giving customers access to trusted experts at their fingertips.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-slate-700 bg-white shadow-sm border border-slate-100 px-4 py-2 rounded-xl">
              <Users className="text-orange-500 w-5 h-5" />
              <span className="font-semibold text-sm">Community Powered</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 bg-white shadow-sm border border-slate-100 px-4 py-2 rounded-xl">
              <Star className="text-amber-500 w-5 h-5 fill-amber-500" />
              <span className="font-semibold text-sm">Top-rated Professionals</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-amber-100 rounded-3xl filter blur-2xl opacity-40 -z-10 transform scale-95" />
          <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <img 
              src={aboutImg} 
              alt="FindYourService community illustration" 
              className="rounded-2xl max-h-[400px] object-cover w-full"
            />
          </div>
        </motion.div>
      </div>

      {/* How it Works Section */}
      <div className="bg-white border-y border-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center mb-12">
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0)}
            className="text-orange-600 text-sm font-bold uppercase tracking-wider mb-2"
          >
            How it Works
          </motion.p>
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.1)}
            className="text-3xl md:text-4xl font-extrabold text-slate-900"
          >
            Simple, Transparent, and Reliable
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp(0.2)}
            className="text-slate-500 mt-4 max-w-xl mx-auto"
          >
            Whether you need a plumber for an emergency repair or want to showcase your teaching skills, FindYourService makes connection seamless.
          </motion.p>

          {/* Toggle Tab Buttons */}
          <div className="flex justify-center mt-10">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 shadow-inner">
              <button
                onClick={() => setActiveTab("customers")}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  activeTab === "customers" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                For Customers
              </button>
              <button
                onClick={() => setActiveTab("workers")}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  activeTab === "workers" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                For Service Providers
              </button>
            </div>
          </div>
        </div>

        {/* Tab Cards Content */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {tabContent[activeTab].map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 border border-slate-100 p-8 rounded-2xl relative overflow-hidden group hover:border-orange-200 transition duration-300 hover:shadow-lg"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-300" />
                  <div className="p-3.5 bg-white border border-slate-100 rounded-xl w-fit shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 space-y-4">
            <p className="text-orange-600 text-sm font-bold uppercase tracking-wider">Why Choose Us</p>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Designed for Local Growth & Trust</h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              We stand apart by offering a direct, secure, and hassle-free connection between client and professional.
            </p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <span className="text-2xl">🤝</span>
              <h4 className="text-base font-extrabold text-slate-900">Direct Communication</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                No intermediate commission cuts. Chat directly, exchange details, and keep 100% of your earnings.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <span className="text-2xl">⚡</span>
              <h4 className="text-base font-extrabold text-slate-900">Instant Local Search</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Find helpers in your immediate vicinity. Save valuable time with quick geo-targeted service suggestions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <span className="text-2xl">🛡️</span>
              <h4 className="text-base font-extrabold text-slate-900">Vetted & Rated</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Every service professional builds a verifiable profile backed by real ratings and transparent user feedback.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <span className="text-2xl">💼</span>
              <h4 className="text-base font-extrabold text-slate-900">Empowering Workers</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                We provide local workers with a digital storefront to gain visibility and build a strong professional footprint.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
