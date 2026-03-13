"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/stores/auth-store";
import {
  Zap,
  Monitor,
  MessageSquare,
  FileText,
  BarChart3,
  Award,
  Mic,
  Trophy,
  TrendingUp,
  ChevronRight,
  Star,
  Flame,
  LogOut,
  Bell,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const modules = [
  { id: "simulation", name: "Corporate Simulation", icon: Monitor, description: "Immersive 3-5 day work simulations", color: "from-blue-500 to-cyan-500", score: null },
  { id: "interview", name: "AI Interview", icon: MessageSquare, description: "Practice behavioral & technical interviews", color: "from-violet-500 to-purple-500", score: null },
  { id: "assessment", name: "AI Assessment", icon: FileText, description: "Skills & aptitude assessments", color: "from-emerald-500 to-teal-500", score: null },
  { id: "technical", name: "Technical Interview", icon: BarChart3, description: "Coding & system design practice", color: "from-orange-500 to-amber-500", score: null },
  { id: "presentation", name: "Mock Presentations", icon: Mic, description: "AI-evaluated presentation practice", color: "from-pink-500 to-rose-500", score: null },
  { id: "resume", name: "Resume Optimizer", icon: FileText, description: "AI-powered resume analysis", color: "from-indigo-500 to-blue-500", score: null },
];

const radarData = [
  { pillar: "Communication", value: 72, fullMark: 100 },
  { pillar: "Analysis", value: 65, fullMark: 100 },
  { pillar: "Documentation", value: 58, fullMark: 100 },
  { pillar: "Stakeholder Mgmt", value: 70, fullMark: 100 },
  { pillar: "Delivery", value: 80, fullMark: 100 },
  { pillar: "Technical", value: 55, fullMark: 100 },
  { pillar: "Problem Solving", value: 68, fullMark: 100 },
  { pillar: "Professional", value: 75, fullMark: 100 },
];

const leaderboard = [
  { rank: 1, name: "Alex Rivera", university: "MIT", score: 892, avatar: "AR" },
  { rank: 2, name: "Priya Sharma", university: "Stanford", score: 878, avatar: "PS" },
  { rank: 3, name: "James Wu", university: "Harvard", score: 865, avatar: "JW" },
  { rank: 4, name: "Sarah Kim", university: "Wharton", score: 851, avatar: "SK" },
  { rank: 5, name: "Michael Chen", university: "Berkeley", score: 843, avatar: "MC" },
];

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    fetchUser();
  }, [isAuthenticated]);

  const crsScore = user?.crs_score || 0;
  const crsPercentage = (crsScore / 1000) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeOffset = circumference - (crsPercentage / 100) * circumference;

  const getTier = (score: number) => {
    if (score >= 900) return { name: "Elite", color: "text-gold" };
    if (score >= 750) return { name: "Advanced", color: "text-accent-blue" };
    if (score >= 600) return { name: "Proficient", color: "text-success" };
    if (score >= 400) return { name: "Developing", color: "text-warning" };
    return { name: "Foundational", color: "text-muted" };
  };

  const tier = getTier(crsScore);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-brand-navy tracking-tight">
              CorpSim AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-blue-500/20">
                {user?.full_name?.charAt(0) || user?.username?.charAt(0) || "U"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{user?.full_name || user?.username}</p>
                <p className="text-xs text-slate-500 font-medium">{user?.university || "Student"}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); router.push("/auth/login"); }}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-red-500"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">

          {/* Welcome + CRS Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile + CRS Card */}
            <motion.div variants={fadeUp} className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex flex-col items-center text-center">
                {/* CRS Ring */}
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                    <circle
                      cx="50" cy="50" r="45" fill="none"
                      stroke="url(#crsGradient)" strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeOffset}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="crsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900">{crsScore}</span>
                    <span className="text-xs text-slate-500 font-medium">/ 1000</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  {user?.full_name || user?.username || "Student"}
                </h2>
                <p className="text-sm text-slate-500 font-medium mb-3">{user?.university || "University"}</p>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${tier.color} bg-slate-50 border border-slate-100`}>
                  <Star className="w-3 h-3" />
                  {tier.name} Tier
                </span>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100 w-full justify-center">
                  <div className="text-center px-2">
                    <p className="text-xl font-black text-slate-900">{user?.streak_days || 0}</p>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1 mt-1"><Flame className="w-3.5 h-3.5 text-orange-500" /> Streak</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div className="text-center px-2">
                    <p className="text-xl font-black text-slate-900">0</p>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1 mt-1"><Award className="w-3.5 h-3.5 text-yellow-500" /> Certs</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div className="text-center px-2">
                    <p className="text-xl font-black text-slate-900">0</p>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1 mt-1"><Trophy className="w-3.5 h-3.5 text-brand-blue" /> Sims</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Radar Chart */}
            <motion.div variants={fadeUp} className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Skill Radar</h3>
                  <p className="text-sm text-slate-500 font-medium mt-0.5">Performance across 8 corporate pillars</p>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" /> +12 this week
                </span>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                      dataKey="pillar"
                      tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={false}
                      axisLine={false}
                    />
                    <Radar
                      name="CRS"
                      dataKey="value"
                      stroke="#2563eb"
                      fill="#3b82f6"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* 6-Module Grid */}
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">Career Development Modules</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {modules.map((mod, i) => (
                <motion.button
                  key={mod.id}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (mod.id === "simulation") router.push("/simulations");
                    else if (mod.id === "interview") router.push("/interview");
                    else if (mod.id === "assessment") router.push("/assessment");
                  }}
                  className="bg-white border border-slate-200 hover:border-brand-blue/30 rounded-xl p-6 text-left group hover:shadow-lg hover:shadow-slate-200/50 transition-all flex flex-col h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-4 shadow-sm`}>
                    <mod.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                    {mod.name}
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-sm font-medium text-slate-500 mb-auto">{mod.description}</p>
                  
                  {mod.id === "simulation" && (
                    <div className="mt-4 flex items-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                        <Star className="w-3 h-3 fill-current" /> Flagship
                      </span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Bottom Row: Leaderboard + Certificates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
            {/* Leaderboard */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" /> Global Leaderboard
                </h3>
                <button className="text-sm font-semibold text-brand-blue hover:text-blue-700 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group"
                  >
                    <span className={`w-6 text-center text-sm font-black ${
                      entry.rank === 1 ? "text-yellow-500" : entry.rank === 2 ? "text-slate-400" : entry.rank === 3 ? "text-orange-500" : "text-slate-400"
                    }`}>
                      {entry.rank}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {entry.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{entry.name}</p>
                      <p className="text-xs font-medium text-slate-500">{entry.university}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-brand-blue">{entry.score}</span>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CRS</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certificates */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-blue" /> My Certificates
                </h3>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm border border-slate-200">
                  <Award className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">No certificates yet</h4>
                <p className="text-sm font-medium text-slate-500 mb-6 max-w-xs">
                  Complete a corporate simulation with a CRS score of 600+ to earn your first verified certificate.
                </p>
                <button
                  onClick={() => router.push("/simulations")}
                  className="text-sm font-bold text-white bg-brand-blue hover:bg-blue-700 px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm shadow-blue-500/20"
                >
                  Start a Simulation <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
