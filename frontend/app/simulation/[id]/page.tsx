"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/stores/auth-store";
import {
  Mail,
  MessageSquare,
  FileText,
  LayoutGrid,
  Video,
  Database,
  CalendarDays,
  Bell,
  Pause,
  Play,
  Clock,
  TrendingUp,
  ChevronLeft,
  Zap,
  X,
} from "lucide-react";

// VDE App imports
import InboxAI from "@/components/vde/InboxAI";
import SlackSim from "@/components/vde/SlackSim";
import DocVault from "@/components/vde/DocVault";
import TaskBoard from "@/components/vde/TaskBoard";
import MeetingRoom from "@/components/vde/MeetingRoom";
import DataStudio from "@/components/vde/DataStudio";
import TeamCalendar from "@/components/vde/TeamCalendar";

type VDEApp = "inbox" | "slack" | "docvault" | "taskboard" | "meeting" | "datastudio" | "calendar";

const apps: { id: VDEApp; name: string; icon: any; shortName: string }[] = [
  { id: "inbox", name: "InboxAI", icon: Mail, shortName: "Mail" },
  { id: "slack", name: "SlackSim", icon: MessageSquare, shortName: "Chat" },
  { id: "docvault", name: "DocVault", icon: FileText, shortName: "Docs" },
  { id: "taskboard", name: "TaskBoard", icon: LayoutGrid, shortName: "Tasks" },
  { id: "meeting", name: "MeetingRoom", icon: Video, shortName: "Meet" },
  { id: "datastudio", name: "DataStudio", icon: Database, shortName: "Data" },
  { id: "calendar", name: "TeamCalendar", icon: CalendarDays, shortName: "Cal" },
];

// Toast notification type
interface Toast {
  id: string;
  type: "email" | "slack" | "task" | "curveball" | "score";
  title: string;
  message: string;
  timestamp: string;
}

export default function SimulationVDE() {
  const { id } = useParams();
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const [activeApp, setActiveApp] = useState<VDEApp>("inbox");
  const [isPaused, setIsPaused] = useState(false);
  const [simDay, setSimDay] = useState(1);
  const [simTime, setSimTime] = useState("09:00 AM");
  const [totalDays, setTotalDays] = useState(3);
  const [crsLive, setCrsLive] = useState(0);
  const [unreadEmails, setUnreadEmails] = useState(2);
  const [unreadSlack, setUnreadSlack] = useState(1);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulate time progression
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSimTime((prev) => {
        const [time, period] = prev.split(" ");
        const [h, m] = time.split(":").map(Number);
        let newM = m + 15;
        let newH = h;
        let newPeriod = period;
        if (newM >= 60) {
          newM = 0;
          newH += 1;
        }
        if (newH === 12 && newM === 0) {
          newPeriod = period === "AM" ? "PM" : "AM";
        }
        if (newH > 12) newH = 1;
        return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")} ${newPeriod}`;
      });
    }, 30000); // 30 seconds = 15 sim minutes
    return () => clearInterval(timer);
  }, [isPaused]);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const renderApp = () => {
    switch (activeApp) {
      case "inbox": return <InboxAI />;
      case "slack": return <SlackSim />;
      case "docvault": return <DocVault />;
      case "taskboard": return <TaskBoard />;
      case "meeting": return <MeetingRoom />;
      case "datastudio": return <DataStudio />;
      case "calendar": return <TeamCalendar />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 overflow-hidden select-none">
      {/* TOP BAR */}
      <div className="h-12 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1.5 text-slate-500 hover:text-brand-blue transition-colors text-xs font-semibold"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Exit
          </button>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-brand-blue flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-brand-navy">Business Analyst — JPMorgan Chase</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Day */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Day</span>
            <span className="font-bold text-brand-navy">{simDay}</span>
            <span className="text-slate-500 font-medium">of {totalDays}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1.5 text-xs">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-brand-navy font-mono font-bold">{dayNames[simDay - 1] || "Monday"} {simTime}</span>
          </div>

          {/* CRS Live */}
          <div className="flex items-center gap-1.5 text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">{crsLive}</span>
            <span className="text-slate-400 font-medium">CRS</span>
          </div>

          {/* Pause / Resume */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-1.5 rounded-md transition-colors ${isPaused ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-slate-100 text-slate-500 hover:text-brand-navy hover:bg-slate-200"}`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 rounded-md bg-slate-100 text-slate-500 hover:text-brand-navy hover:bg-slate-200 transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            {(unreadEmails + unreadSlack) > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-white">
                {unreadEmails + unreadSlack}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-1 overflow-hidden relative z-0">
        {/* SIDEBAR */}
        <div className="w-16 bg-white border-r border-slate-200 shadow-sm flex flex-col items-center py-3 gap-2 shrink-0 z-10">
          {apps.map((app) => {
            const isActive = activeApp === app.id;
            const badge =
              app.id === "inbox" ? unreadEmails :
              app.id === "slack" ? unreadSlack : 0;

            return (
              <button
                key={app.id}
                onClick={() => setActiveApp(app.id)}
                className={`relative w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all group ${
                  isActive
                    ? "bg-blue-50 text-brand-blue"
                    : "text-slate-400 hover:text-brand-navy hover:bg-slate-50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 w-1 h-6 bg-brand-blue rounded-r-full shadow-sm shadow-blue-500/20"
                  />
                )}
                <app.icon className="w-4.5 h-4.5" />
                <span className="text-[9px] font-bold mt-0.5">{app.shortName}</span>
                {badge > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold border-2 border-white">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* APP CONTENT */}
        <div className="flex-1 bg-white overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeApp}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {renderApp()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* STATUS BAR */}
      <div className="h-7 bg-white border-t border-slate-200 flex items-center justify-between px-4 text-[10px] text-slate-500 font-medium shrink-0 z-10 shadow-[0_-1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <Mail className="w-3 h-3 text-slate-400" /> {unreadEmails} unread
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <MessageSquare className="w-3 h-3 text-slate-400" /> {unreadSlack} mentions
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-100">Next deadline: BRD Review — 5:00 PM</span>
          <span className="bg-slate-100 px-2 py-0.5 rounded-sm border border-slate-200">Focused: {apps.find(a => a.id === activeApp)?.name}</span>
        </div>
      </div>

      {/* TOAST NOTIFICATIONS */}
      <div className="fixed bottom-10 right-4 z-50 space-y-2 w-80">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              className="bg-white rounded-xl p-3 border border-slate-200 shadow-lg shadow-slate-200/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">{toast.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{toast.message}</p>
                </div>
                <button onClick={() => dismissToast(toast.id)} className="text-slate-400 hover:text-slate-600 ml-2 bg-slate-50 hover:bg-slate-100 p-1 rounded-md transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Paused Overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 text-center max-w-sm shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-100">
                <Pause className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Simulation Paused</h2>
              <p className="text-sm font-medium text-slate-500 mb-6 px-4">Your virtual workspace is frozen. No new emails or messages will trigger.</p>
              <button
                onClick={() => setIsPaused(false)}
                className="bg-brand-blue text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mx-auto w-full shadow-sm shadow-blue-500/20"
              >
                <Play className="w-4 h-4 fill-current" /> Resume Simulation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
