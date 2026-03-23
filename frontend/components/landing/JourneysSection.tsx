"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Building2,
  Briefcase,
  Monitor,
  MessageSquare,
  BarChart3,
  Award,
  Star,
  Users,
  TrendingUp,
  Shield,
  Eye,
  Filter,
  UserCheck,
  Target,
  Settings,
  Globe,
  ClipboardCheck,
  Search,
  LineChart,
  ChevronDown,
  Mail,
  FileText,
  Mic,
  Check,
  AlertTriangle,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────── types ─────────────────────── */
type JourneyStep = {
  icon: LucideIcon;
  title: string;
  description: string;
  preview: React.ReactNode;
};

type JourneyTab = {
  id: string;
  label: string;
  tabIcon: LucideIcon;
  steps: JourneyStep[];
};

/* ─────────────── animation variants ────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ────────────── reusable mini-components ────────────── */
function MiniBar({ label, value, color = "bg-brand-blue" }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-400 w-28 truncate">{label}</span>
      <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-slate-500 w-8 text-right">{value}%</span>
    </div>
  );
}

function MiniStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-center">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{label}</p>
      {sub && <p className="text-[10px] text-slate-600 mt-0.5">{sub}</p>}
    </div>
  );
}

function MiniTag({ text, active }: { text: string; active?: boolean }) {
  return (
    <span className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${active ? "bg-brand-blue/20 text-blue-400 border border-blue-500/30" : "bg-white/[0.04] text-slate-500 border border-white/[0.06]"}`}>
      {text}
    </span>
  );
}

/* ──────────────── enterprise previews ──────────────── */
const EnterpriseRoleDesign = () => (
  <div className="space-y-5">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-white">Role Configuration</h4>
      <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-semibold">Draft</span>
    </div>
    <div className="grid grid-cols-3 gap-3">
      <div>
        <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Job Title</label>
        <div className="mt-1 bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-sm text-white">Senior Business Analyst</div>
      </div>
      <div>
        <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Department</label>
        <div className="mt-1 bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-sm text-white flex items-center justify-between">Strategy & Ops <ChevronDown className="w-3 h-3 text-slate-500" /></div>
      </div>
      <div>
        <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Experience Level</label>
        <div className="mt-1 bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-sm text-white flex items-center justify-between">Entry Level (0-2 yrs) <ChevronDown className="w-3 h-3 text-slate-500" /></div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Location</label>
        <div className="mt-1 bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-sm text-white">Mumbai, India (Hybrid)</div>
      </div>
      <div>
        <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Hiring Manager</label>
        <div className="mt-1 bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-sm text-white">Rajesh Khanna, VP Strategy</div>
      </div>
    </div>
    <div>
      <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Required Competency Weights</label>
      <div className="space-y-2">
        <MiniBar label="Communication" value={85} color="bg-blue-500" />
        <MiniBar label="Data Analysis" value={90} color="bg-cyan-500" />
        <MiniBar label="Stakeholder Mgmt" value={70} color="bg-violet-500" />
        <MiniBar label="Problem Solving" value={80} color="bg-emerald-500" />
        <MiniBar label="Documentation" value={75} color="bg-pink-500" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/[0.06]">
      <div className="text-center">
        <p className="text-xs text-slate-500">Min. CRS</p>
        <p className="text-sm font-bold text-amber-400">650 / 1000</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-500">Open Positions</p>
        <p className="text-sm font-bold text-white">4</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-500">Candidates Pool</p>
        <p className="text-sm font-bold text-brand-blue">386</p>
      </div>
    </div>
  </div>
);

const EnterpriseSimulateEnv = () => (
  <div className="space-y-5">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-white">Simulation Environment</h4>
      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">Configure</span>
    </div>
    <div className="grid grid-cols-4 gap-3">
      <MiniStat label="Company" value="Acme Corp" />
      <MiniStat label="Industry" value="Financial Services" />
      <MiniStat label="Team Size" value="12" />
      <MiniStat label="Duration" value="3 Days" />
    </div>
    <div>
      <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Day-by-Day Workflow</label>
      <div className="space-y-2">
        {[
          { day: "Day 1", tasks: ["Onboarding Email", "Team Standup", "Client Brief Review", "Draft Response"], color: "text-blue-400" },
          { day: "Day 2", tasks: ["Data Analysis", "Stakeholder Call", "Strategy Document", "Crisis Event"], color: "text-violet-400" },
          { day: "Day 3", tasks: ["Presentation Prep", "Board Meeting", "Final Deliverable", "Debrief"], color: "text-emerald-400" },
        ].map(d => (
          <div key={d.day} className="flex items-center gap-3">
            <span className={`text-[10px] font-bold w-10 ${d.color}`}>{d.day}</span>
            <div className="flex items-center gap-1 flex-1">
              {d.tasks.map((t, i) => (
                <div key={t} className="flex items-center gap-1 flex-1">
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded px-2 py-1.5 text-[10px] text-slate-300 font-medium flex-1 text-center truncate">{t}</div>
                  {i < d.tasks.length - 1 && <div className="w-2 h-px bg-white/20 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-6 pt-2 border-t border-white/[0.06]">
      {["Curveball Events", "Time Pressure", "AI Persona Agents"].map(t => (
        <label key={t} className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-8 h-4 bg-brand-blue/30 rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-brand-blue rounded-full" /></div>
          {t}
        </label>
      ))}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-[10px] text-slate-500">Difficulty</span>
        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Advanced</span>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3">
      <div className="text-center bg-white/[0.02] border border-white/[0.06] rounded-lg p-2">
        <p className="text-xs text-slate-500">Candidates Invited</p>
        <p className="text-sm font-bold text-white">386</p>
      </div>
      <div className="text-center bg-white/[0.02] border border-white/[0.06] rounded-lg p-2">
        <p className="text-xs text-slate-500">Started Simulation</p>
        <p className="text-sm font-bold text-green-400">312</p>
      </div>
      <div className="text-center bg-white/[0.02] border border-white/[0.06] rounded-lg p-2">
        <p className="text-xs text-slate-500">Completion Rate</p>
        <p className="text-sm font-bold text-brand-blue">89%</p>
      </div>
    </div>
  </div>
);

const EnterpriseEvalCriteria = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-white">Scoring Rubric</h4>
      <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 font-semibold">8 Pillars</span>
    </div>
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {[
        { name: "Communication", w: 15 }, { name: "Analysis", w: 20 },
        { name: "Documentation", w: 10 }, { name: "Stakeholder Mgmt", w: 12 },
        { name: "Delivery", w: 15 }, { name: "Technical Skills", w: 10 },
        { name: "Problem Solving", w: 10 }, { name: "Professional Ethics", w: 8 },
      ].map(p => (
        <div key={p.name} className="flex items-center justify-between">
          <span className="text-xs text-slate-400">{p.name}</span>
          <span className="text-xs font-bold text-white bg-white/[0.06] px-2 py-0.5 rounded">{p.w}%</span>
        </div>
      ))}
    </div>
    <div className="border-t border-white/[0.06] pt-3 space-y-2">
      <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Custom Signals</label>
      <div className="flex flex-wrap gap-2">
        <MiniTag text="Email tone" active />
        <MiniTag text="Meeting articulation" active />
        <MiniTag text="Time management" />
        <MiniTag text="Document accuracy" active />
        <MiniTag text="Conflict resolution" />
      </div>
    </div>
  </div>
);

const EnterpriseWatchPerform = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-white">Live Monitoring</h4>
      <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> 4 Active</span>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {[
        { name: "Alex Rivera", role: "Business Analyst", status: "In Meeting", score: 78, color: "text-green-400" },
        { name: "Priya Sharma", role: "Business Analyst", status: "Drafting Email", score: 82, color: "text-green-400" },
        { name: "James Wu", role: "Product Manager", status: "Crisis Event", score: 65, color: "text-amber-400" },
        { name: "Sarah Kim", role: "Business Analyst", status: "Doc Review", score: 71, color: "text-green-400" },
      ].map(c => (
        <div key={c.name} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center text-[9px] text-white font-bold">{c.name.split(" ").map(n => n[0]).join("")}</div>
              <div>
                <p className="text-xs font-semibold text-white">{c.name}</p>
                <p className="text-[9px] text-slate-500">{c.role}</p>
              </div>
            </div>
            <span className={`text-sm font-bold ${c.color}`}>{c.score}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-slate-400">{c.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EnterpriseShortlist = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-white">Performance Leaderboard</h4>
      <div className="flex items-center gap-2">
        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">386 Candidates</span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-semibold">12 Shortlisted</span>
      </div>
    </div>
    {/* Table Header */}
    <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold border-b border-white/[0.06]">
      <span className="col-span-1">#</span>
      <span className="col-span-3">Candidate</span>
      <span className="col-span-1 text-center">CRS</span>
      <span className="col-span-1 text-center">COM</span>
      <span className="col-span-1 text-center">ANL</span>
      <span className="col-span-1 text-center">DLV</span>
      <span className="col-span-1 text-center">STK</span>
      <span className="col-span-1 text-center">DOC</span>
      <span className="col-span-2 text-right">Status</span>
    </div>
    {/* Table Rows */}
    <div className="space-y-1">
      {[
        { rank: 1, name: "Priya Sharma", crs: 824, comm: 91, analysis: 88, delivery: 85, stakeholder: 82, doc: 90, flag: "★ Top Performer", flagColor: "bg-amber-500/10 text-amber-400" },
        { rank: 2, name: "Alex Rivera", crs: 789, comm: 85, analysis: 82, delivery: 80, stakeholder: 79, doc: 84, flag: "Shortlisted", flagColor: "bg-green-500/10 text-green-400" },
        { rank: 3, name: "Sarah Kim", crs: 756, comm: 78, analysis: 80, delivery: 77, stakeholder: 75, doc: 81, flag: "Shortlisted", flagColor: "bg-green-500/10 text-green-400" },
        { rank: 4, name: "James Wu", crs: 698, comm: 72, analysis: 68, delivery: 71, stakeholder: 70, doc: 65, flag: "Under Review", flagColor: "bg-slate-500/10 text-slate-400" },
        { rank: 5, name: "Maya Patel", crs: 681, comm: 70, analysis: 74, delivery: 68, stakeholder: 66, doc: 72, flag: "Under Review", flagColor: "bg-slate-500/10 text-slate-400" },
      ].map(c => (
        <div key={c.rank} className={`grid grid-cols-12 gap-2 px-3 py-2.5 rounded-lg items-center transition-colors ${c.rank === 1 ? "bg-amber-500/5 border border-amber-500/15" : "bg-white/[0.01] hover:bg-white/[0.03] border border-transparent"}`}>
          <span className={`col-span-1 text-xs font-black ${c.rank === 1 ? "text-amber-400" : "text-slate-500"}`}>{c.rank}</span>
          <div className="col-span-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center text-[9px] text-white font-bold flex-shrink-0">{c.name.split(" ").map(n => n[0]).join("")}</div>
            <span className="text-xs font-semibold text-white truncate">{c.name}</span>
          </div>
          <span className={`col-span-1 text-center text-xs font-bold ${c.crs >= 750 ? "text-green-400" : c.crs >= 650 ? "text-brand-blue" : "text-slate-400"}`}>{c.crs}</span>
          <span className="col-span-1 text-center text-[11px] text-slate-300">{c.comm}</span>
          <span className="col-span-1 text-center text-[11px] text-slate-300">{c.analysis}</span>
          <span className="col-span-1 text-center text-[11px] text-slate-300">{c.delivery}</span>
          <span className="col-span-1 text-center text-[11px] text-slate-300">{c.stakeholder}</span>
          <span className="col-span-1 text-center text-[11px] text-slate-300">{c.doc}</span>
          <div className="col-span-2 flex justify-end">
            <span className={`text-[9px] px-2 py-0.5 rounded font-semibold ${c.flagColor}`}>{c.flag}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
      <span className="text-[10px] text-slate-500">Showing top 5 of 386 candidates</span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] px-2.5 py-1 rounded bg-brand-blue/10 text-brand-blue border border-brand-blue/20 font-semibold cursor-pointer">Export to CSV</span>
        <span className="text-[10px] px-2.5 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-semibold cursor-pointer">Send to ATS</span>
      </div>
    </div>
  </div>
);

const EnterpriseHire = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-white">Hiring Decision</h4>
      <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-semibold">Ready to Hire</span>
    </div>
    <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center text-white font-bold text-sm">PS</div>
      <div className="flex-1">
        <p className="text-sm font-bold text-white">Priya Sharma</p>
        <p className="text-xs text-slate-500">Senior Business Analyst • Strategy & Ops</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-black text-green-400">824</p>
        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">CRS Score</p>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-2">
      <MiniStat label="Communication" value="91" />
      <MiniStat label="Analysis" value="88" />
      <MiniStat label="Delivery" value="85" />
      <MiniStat label="Leadership" value="82" />
    </div>
    <div className="flex items-center gap-2 pt-1">
      <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5 text-center">
        <span className="text-xs font-bold text-green-400">✓ AI Recommendation: Strong Hire</span>
      </div>
    </div>
  </div>
);

/* ──────────────── student previews ──────────────── */
const StudentChooseRole = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-bold text-white">Choose Your Role</h4>
    <div className="grid grid-cols-3 gap-3">
      {[
        { role: "Business Analyst", company: "JPMorgan", color: "from-blue-500 to-cyan-500", selected: true },
        { role: "Product Manager", company: "Google", color: "from-violet-500 to-purple-500", selected: false },
        { role: "Data Analyst", company: "McKinsey", color: "from-emerald-500 to-teal-500", selected: false },
      ].map(r => (
        <div key={r.role} className={`rounded-xl p-4 border transition-all ${r.selected ? "bg-brand-blue/10 border-brand-blue/40 shadow-lg shadow-blue-500/5" : "bg-white/[0.02] border-white/[0.06]"}`}>
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center mb-3`}>
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs font-bold text-white">{r.role}</p>
          <p className="text-[10px] text-slate-500">{r.company}</p>
          {r.selected && <div className="mt-2 flex items-center gap-1"><Check className="w-3 h-3 text-brand-blue" /><span className="text-[10px] text-brand-blue font-semibold">Selected</span></div>}
        </div>
      ))}
    </div>
  </div>
);

const StudentSimulatedWorkday = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-bold text-white">Virtual Desktop Environment</h4>
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-[10px] text-slate-500 ml-2">Corporate Simulation • Day 1 of 3</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: Mail, name: "Email", badge: "3" },
          { icon: MessageSquare, name: "Slack", badge: "5" },
          { icon: FileText, name: "Docs", badge: null },
          { icon: BarChart3, name: "Kanban", badge: null },
          { icon: Mic, name: "Meetings", badge: "1" },
          { icon: LineChart, name: "Analytics", badge: null },
        ].map(app => (
          <div key={app.name} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-center relative">
            <app.icon className="w-5 h-5 text-slate-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-500 font-medium">{app.name}</p>
            {app.badge && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">{app.badge}</span>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StudentHandleTasks = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-bold text-white">Today&apos;s Tasks</h4>
    <div className="space-y-2">
      {[
        { from: "VP of Strategy", subject: "Q3 Market Analysis — Need by EOD", type: "Email", urgent: true, time: "9:15 AM" },
        { from: "Sarah (PM)", subject: "Can you review the client deck?", type: "Slack", urgent: false, time: "10:30 AM" },
        { from: "Team Lead", subject: "Standup in 15 mins — prepare status update", type: "Meeting", urgent: true, time: "11:00 AM" },
      ].map(t => (
        <div key={t.subject} className={`flex items-center gap-3 p-3 rounded-lg border ${t.urgent ? "bg-amber-500/5 border-amber-500/15" : "bg-white/[0.02] border-white/[0.06]"}`}>
          {t.urgent && <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />}
          {!t.urgent && <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{t.subject}</p>
            <p className="text-[10px] text-slate-500">{t.from} • {t.type}</p>
          </div>
          <span className="text-[10px] text-slate-500 flex-shrink-0">{t.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const StudentAIGrading = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-bold text-white">Real-Time AI Grading</h4>
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">Email Response to VP</span>
        <span className="text-xs font-bold text-green-400">+18 CRS</span>
      </div>
      <div className="space-y-2">
        <MiniBar label="Tone & clarity" value={88} color="bg-green-500" />
        <MiniBar label="Data references" value={72} color="bg-amber-500" />
        <MiniBar label="Actionability" value={95} color="bg-green-500" />
      </div>
      <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-2.5">
        <p className="text-[11px] text-green-400 font-medium">✓ Professional tone maintained. Strong action items. Consider citing the Q2 benchmark for stronger impact.</p>
      </div>
    </div>
  </div>
);

const StudentCRSScore = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-white">Your CRS Breakdown</h4>
      <span className="text-lg font-black text-brand-blue">784 <span className="text-xs text-slate-500 font-medium">/ 1000</span></span>
    </div>
    <div className="space-y-2">
      {[
        { name: "Communication", score: 88, color: "bg-blue-500" },
        { name: "Analysis", score: 82, color: "bg-cyan-500" },
        { name: "Documentation", score: 76, color: "bg-violet-500" },
        { name: "Stakeholder Mgmt", score: 80, color: "bg-emerald-500" },
        { name: "Delivery", score: 91, color: "bg-green-500" },
        { name: "Technical Skills", score: 68, color: "bg-amber-500" },
        { name: "Problem Solving", score: 85, color: "bg-pink-500" },
        { name: "Professional Ethics", score: 90, color: "bg-indigo-500" },
      ].map(p => (
        <MiniBar key={p.name} label={p.name} value={p.score} color={p.color} />
      ))}
    </div>
  </div>
);

const StudentCertificate = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-bold text-white">Your Certificate</h4>
    <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.1] rounded-xl p-6 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl" />
      <div className="relative">
        <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3">
          <Award className="w-6 h-6 text-white" />
        </div>
        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Corporate Simulation Certified</p>
        <p className="text-base font-bold text-white mt-1">Business Analyst</p>
        <p className="text-xs text-slate-400 mt-1">Corporate Readiness Score: <span className="text-brand-blue font-bold">784/1000</span></p>
        <p className="text-[10px] text-slate-500 mt-2">Issued Mar 2026 • Credential ID: CS-2026-4892</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="bg-brand-blue/20 border border-brand-blue/30 rounded-lg px-3 py-1.5 text-[11px] text-brand-blue font-semibold">Share to LinkedIn</div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[11px] text-slate-400 font-semibold">Download PDF</div>
        </div>
      </div>
    </div>
  </div>
);

/* ──────────────── college previews ──────────────── */
const CollegeOnboard = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-white">Cohort Management</h4>
      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">384 Students</span>
    </div>
    <div className="space-y-2">
      {[
        { name: "MBA Class of 2026", students: 180, status: "Active", pct: 94 },
        { name: "BBA Final Year", students: 142, status: "Active", pct: 87 },
        { name: "Engineering + MBA", students: 62, status: "Pending", pct: 0 },
      ].map(c => (
        <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <Users className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-white">{c.name}</p>
            <p className="text-[10px] text-slate-500">{c.students} students • {c.pct}% enrolled</p>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${c.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>{c.status}</span>
        </div>
      ))}
    </div>
  </div>
);

const CollegeAssign = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-bold text-white">Assign Simulations</h4>
    <div className="grid grid-cols-2 gap-3">
      {[
        { role: "Business Analyst", assigned: 98, total: 180, days: "3-day" },
        { role: "Product Manager", assigned: 72, total: 180, days: "5-day" },
        { role: "Financial Analyst", assigned: 68, total: 142, days: "3-day" },
        { role: "Consultant", assigned: 56, total: 142, days: "5-day" },
      ].map(s => (
        <div key={s.role} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3">
          <p className="text-xs font-semibold text-white">{s.role}</p>
          <p className="text-[10px] text-slate-500">{s.days} sim • {s.assigned}/{s.total} assigned</p>
          <div className="mt-2 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-brand-blue rounded-full" style={{ width: `${(s.assigned / s.total) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CollegeTrack = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-bold text-white">Cohort Competency</h4>
    <div className="space-y-2">
      {[
        { name: "Communication", avg: 74, trend: "+3" },
        { name: "Analysis", avg: 68, trend: "+5" },
        { name: "Documentation", avg: 62, trend: "-1" },
        { name: "Stakeholder Mgmt", avg: 71, trend: "+2" },
        { name: "Delivery", avg: 79, trend: "+4" },
      ].map(p => (
        <div key={p.name} className="flex items-center gap-3">
          <span className="text-xs text-slate-400 w-28 truncate">{p.name}</span>
          <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-brand-blue rounded-full" style={{ width: `${p.avg}%` }} />
          </div>
          <span className="text-xs text-slate-500 w-8 text-right">{p.avg}</span>
          <span className={`text-[10px] font-semibold w-6 text-right ${p.trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{p.trend}</span>
        </div>
      ))}
    </div>
  </div>
);

const CollegeAtRisk = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-white">At-Risk Students</h4>
      <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-semibold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> 8 Flagged</span>
    </div>
    <div className="space-y-2">
      {[
        { name: "Rahul Verma", score: 380, issue: "Low Communication", risk: "High" },
        { name: "Lisa Wang", score: 420, issue: "Low Analysis", risk: "Medium" },
        { name: "David Park", score: 395, issue: "Incomplete Simulations", risk: "High" },
      ].map(s => (
        <div key={s.name} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
          <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[9px] text-white font-bold">{s.name.split(" ").map(n => n[0]).join("")}</div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-white">{s.name}</p>
            <p className="text-[10px] text-slate-500">{s.issue} • CRS: {s.score}</p>
          </div>
          <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${s.risk === "High" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"}`}>{s.risk}</span>
        </div>
      ))}
    </div>
  </div>
);

const CollegeBenchmark = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-bold text-white">Institution Benchmark</h4>
    <div className="space-y-2">
      {[
        { name: "Your Institution", score: 684, rank: 12, highlight: true },
        { name: "National Average", score: 612, rank: null, highlight: false },
        { name: "Top 10 Average", score: 758, rank: null, highlight: false },
      ].map(i => (
        <div key={i.name} className={`flex items-center justify-between p-3 rounded-lg border ${i.highlight ? "bg-brand-blue/10 border-brand-blue/25" : "bg-white/[0.02] border-white/[0.06]"}`}>
          <div className="flex items-center gap-2">
            {i.highlight && <Building2 className="w-4 h-4 text-brand-blue" />}
            {!i.highlight && <Globe className="w-4 h-4 text-slate-500" />}
            <span className={`text-xs font-semibold ${i.highlight ? "text-white" : "text-slate-400"}`}>{i.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-bold ${i.highlight ? "text-brand-blue" : "text-slate-400"}`}>{i.score}</span>
            {i.rank && <span className="text-[10px] text-slate-500">Rank #{i.rank}</span>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CollegePlacement = () => (
  <div className="space-y-4">
    <h4 className="text-sm font-bold text-white">Placement Analytics</h4>
    <div className="grid grid-cols-4 gap-2">
      <MiniStat label="Placed" value="89%" sub="vs 72% last yr" />
      <MiniStat label="Avg CRS" value="684" sub="+48 from 2025" />
      <MiniStat label="Top Hires" value="34" sub="CRS > 750" />
      <MiniStat label="Partners" value="18" sub="Companies" />
    </div>
    <div>
      <label className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2 block">Top Hiring Partners</label>
      <div className="flex flex-wrap gap-2">
        {["JPMorgan", "Deloitte", "Google", "McKinsey", "Amazon"].map(c => (
          <span key={c} className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-400 font-medium">{c}</span>
        ))}
      </div>
    </div>
  </div>
);

/* ──────────────── journey data ──────────────── */
const journeyTabs: JourneyTab[] = [
  {
    id: "students",
    label: "For Students",
    tabIcon: GraduationCap,
    steps: [
      { icon: Target, title: "Choose your dream role", description: "Browse 50+ corporate roles across industries and select the career path you want to experience.", preview: <StudentChooseRole /> },
      { icon: Monitor, title: "Step into a simulated workday", description: "Enter a full-screen virtual desktop with Email, Slack, Docs, Kanban, and Meetings.", preview: <StudentSimulatedWorkday /> },
      { icon: ClipboardCheck, title: "Handle real corporate tasks", description: "Respond to AI-generated emails, join stakeholder meetings, and manage competing priorities.", preview: <StudentHandleTasks /> },
      { icon: BarChart3, title: "Get graded by AI in real-time", description: "Every action is evaluated by Claude AI across tone, accuracy, and effectiveness.", preview: <StudentAIGrading /> },
      { icon: Star, title: "Review your 8-pillar CRS score", description: "See exactly where you stand across Communication, Analysis, Delivery, and 5 more pillars.", preview: <StudentCRSScore /> },
      { icon: Award, title: "Earn your shareable certificate", description: "Score 600+ to unlock a verified certificate you can share directly to LinkedIn.", preview: <StudentCertificate /> },
    ],
  },
  {
    id: "colleges",
    label: "For Colleges",
    tabIcon: Building2,
    steps: [
      { icon: Users, title: "Onboard your student cohort", description: "Import your student roster and organize by program, year, or custom cohorts.", preview: <CollegeOnboard /> },
      { icon: Settings, title: "Assign role-based simulations", description: "Choose from 50+ role templates and assign them to specific cohorts or individuals.", preview: <CollegeAssign /> },
      { icon: LineChart, title: "Track competency across pillars", description: "Monitor average scores across all 8 CRS pillars with trend analysis.", preview: <CollegeTrack /> },
      { icon: Search, title: "Identify at-risk students early", description: "AI flags students scoring below thresholds so you can intervene early.", preview: <CollegeAtRisk /> },
      { icon: Globe, title: "Benchmark against peer institutions", description: "See how your cohort compares to national and top-10 institution averages.", preview: <CollegeBenchmark /> },
      { icon: TrendingUp, title: "Boost placement rates with data", description: "Share verified CRS scores with hiring partners to improve placement outcomes.", preview: <CollegePlacement /> },
    ],
  },
  {
    id: "enterprises",
    label: "For Enterprises",
    tabIcon: Briefcase,
    steps: [
      { icon: BarChart3, title: "Design the role before you hire", description: "Configure the exact job title, department, competency weights, and minimum CRS threshold.", preview: <EnterpriseRoleDesign /> },
      { icon: MessageSquare, title: "Simulate your business environment", description: "Set up your company profile, workflow stages, difficulty level, and curveball events.", preview: <EnterpriseSimulateEnv /> },
      { icon: Filter, title: "Control evaluation criteria", description: "Customize scoring rubrics, pillar weight distribution, and signal monitoring.", preview: <EnterpriseEvalCriteria /> },
      { icon: Eye, title: "Watch candidates perform", description: "Monitor candidates in real-time as they navigate your simulated corporate environment.", preview: <EnterpriseWatchPerform /> },
      { icon: Shield, title: "Shortlist using performance signals", description: "Rank candidates by CRS score with per-pillar breakdowns and AI-generated flags.", preview: <EnterpriseShortlist /> },
      { icon: UserCheck, title: "Hire your right candidate", description: "Get AI-powered hiring recommendations backed by objective simulation performance data.", preview: <EnterpriseHire /> },
    ],
  },
];

/* ──────────────── main component ──────────────── */
export default function JourneysSection() {
  const [activeTab, setActiveTab] = useState("students");
  const [activeStep, setActiveStep] = useState<number>(0);
  const activeJourney = journeyTabs.find((t) => t.id === activeTab)!;

  const handleTabSwitch = (tabId: string) => {
    setActiveTab(tabId);
    setActiveStep(0);
  };

  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            One Platform.{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Three Journeys.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Whether you&apos;re a student, a university, or a recruiter — Corporate
            Simulation adapts to your goals.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {journeyTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabSwitch(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/10"
                  : "bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.06] hover:text-slate-300"
              }`}
            >
              <tab.tabIcon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Fixed 3×2 Card Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-3 mb-4"
        >
          {activeJourney.steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.button
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => setActiveStep(idx)}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-300 ${
                  isActive
                    ? "bg-white/[0.06] border-white/[0.15]"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? "bg-amber-500/15" : "bg-white/[0.06]"}`}>
                  <step.icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                </div>
                <span className={`text-[13px] font-medium ${isActive ? "text-white" : "text-slate-400"}`}>
                  {step.title}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Full-Width Dashboard Preview Panel */}
        <motion.div
          key={`${activeTab}-${activeStep}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#111] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
        >
          {/* Window Chrome */}
          <div className="h-10 border-b border-white/[0.06] bg-white/[0.02] flex items-center px-4 gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-md px-4 py-0.5 text-[10px] text-slate-500 font-mono">
                app.corporatesimulation.ai/{activeJourney.id}
              </div>
            </div>
          </div>

          {/* Sidebar + Content */}
          <div className="flex min-h-[460px]">
            {/* Sidebar */}
            <div className="hidden md:flex w-52 border-r border-white/[0.06] bg-[#0c0c0c] p-4 flex-col gap-1">
              <div className="mb-5 px-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-[10px] font-black text-black">π</div>
                <span className="text-xs font-bold text-white">Pi Dot</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold ml-auto">Pro</span>
              </div>
              {[
                { name: "Dashboard", icon: BarChart3 },
                { name: "Roles", icon: Target },
                { name: "Simulations", icon: Monitor },
                { name: "Candidates", icon: Users },
                { name: "Analytics", icon: LineChart },
                { name: "Reports", icon: FileText },
                { name: "Settings", icon: Settings },
              ].map((item, i) => (
                <div
                  key={item.name}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium transition-colors ${
                    i === activeStep % 7 ? "bg-white/[0.06] text-white" : "text-slate-500"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-10 bg-[#0a0a0a] overflow-y-auto">
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold text-white mb-1">{activeJourney.steps[activeStep].title}</h3>
                <p className="text-sm text-slate-500 mb-8">{activeJourney.steps[activeStep].description}</p>
                {activeJourney.steps[activeStep].preview}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
