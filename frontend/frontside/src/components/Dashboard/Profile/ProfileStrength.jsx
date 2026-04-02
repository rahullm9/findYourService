import React from "react";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const ProfileStrength = ({ profile }) => {
  const calculateStrength = () => {
    let strength = 20; // Base strength for name/email (already exists)
    const checklist = [
      { id: "photo", label: "Add profile photo", weight: 20, completed: !!profile.profilePhoto },
      { id: "bio", label: "Add bio", weight: 20, completed: !!profile.bio },
      { id: "skills", label: "Add skills", weight: 15, completed: profile.skills && profile.skills.length > 0 },
      { id: "location", label: "Add location", weight: 15, completed: !!(profile.location && profile.location.city) },
      { id: "pricing", label: "Set pricing", weight: 10, completed: profile.pricing > 0 },
    ];

    const completedWeight = checklist.reduce((acc, item) => (item.completed ? acc + item.weight : acc), 0);
    return {
      percentage: strength + completedWeight,
      checklist,
    };
  };

  const { percentage, checklist } = calculateStrength();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        Profile Strength: <span className="text-indigo-600">{percentage}%</span>
      </h3>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-3 rounded-full mb-6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        />
      </div>

      {/* Actionable Checklist */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">To improve:</h4>
        {checklist.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {item.completed ? (
                <CheckCircle size={16} className="text-emerald-500" />
              ) : (
                <Circle size={16} className="text-slate-300" />
              )}
              <span className={item.completed ? "text-slate-500 line-through" : "text-slate-700 font-medium"}>
                {item.label}
              </span>
            </div>
            {!item.completed && (
              <span className="text-indigo-500 font-bold">+{item.weight}%</span>
            )}
          </div>
        ))}
      </div>

      {percentage < 100 && (
        <div className="mt-6 p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start gap-2">
          <AlertCircle size={16} className="text-indigo-600 mt-0.5 shrink-0" />
          <p className="text-xs text-indigo-700 leading-relaxed font-medium">
            A complete profile helps you build trust and get 3x more service requests.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileStrength;
