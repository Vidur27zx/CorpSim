"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/stores/auth-store";
import { api } from "@/lib/api";
import {
  Zap,
  Search,
  Building2,
  Briefcase,
  Clock,
  Award,
  ChevronRight,
  ArrowLeft,
  Star,
} from "lucide-react";
import type { SimulationTemplate } from "@/types";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function SimulationsPage() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const [templates, setTemplates] = useState<SimulationTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    loadTemplates();
  }, [isAuthenticated]);

  const loadTemplates = async () => {
    try {
      const data = await api.get<SimulationTemplate[]>("/api/simulations/templates", { token: token! });
      setTemplates(data);
    } catch {
      // Use demo templates if API not available
      setTemplates(demoTemplates);
    } finally {
      setIsLoading(false);
    }
  };

  const startSimulation = async (templateId: string) => {
    try {
      const sim = await api.post<{ id: string }>("/api/simulations/start", { template_id: templateId, difficulty: "standard" }, { token: token! });
      router.push(`/simulation/${sim.id}`);
    } catch {
      router.push(`/simulation/demo`);
    }
  };

  const filtered = templates.filter((t) => {
    const matchesSearch =
      !search ||
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.role?.toLowerCase().includes(search.toLowerCase()) ||
      t.company_name?.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = !filterIndustry || t.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/dashboard")} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <h1 className="text-lg font-bold text-slate-900">Simulations</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, company, or title..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-sm"
            />
          </div>
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/20 shadow-sm cursor-pointer"
          >
            <option value="">All Industries</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Technology">Technology</option>
            <option value="Consulting">Consulting</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>

        {/* Template Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
                <div className="h-3 bg-slate-100 rounded w-1/2 mb-6" />
                <div className="h-20 bg-slate-100 rounded mb-4" />
                <div className="h-8 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(filtered.length > 0 ? filtered : demoTemplates).map((template) => (
              <motion.div
                key={template.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl overflow-hidden group cursor-pointer border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all"
                onClick={() => startSimulation(template.id)}
              >
                {/* Color band */}
                <div className="h-1.5 bg-gradient-to-r from-brand-blue to-cyan-500" />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold text-brand-blue mb-1">{template.company_name}</p>
                      <h3 className="font-bold text-slate-900">{template.role}</h3>
                    </div>
                    {template.is_partner && (
                      <span className="text-xs font-bold bg-orange-50 border border-orange-100 text-orange-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" /> Partner
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-4">{template.title}</p>

                  <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-300" /> {template.duration_days} days
                    </span>
                    <span className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                      <Briefcase className="w-3.5 h-3.5 text-slate-300" /> {template.industry}
                    </span>
                    <span className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                      <Award className="w-3.5 h-3.5 text-slate-300" /> {template.min_crs_cert}+ CRS
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      template.difficulty === "hard"
                        ? "bg-red-50 text-red-600 border-red-200"
                        : template.difficulty === "standard"
                        ? "bg-blue-50 text-brand-blue border-blue-200"
                        : "bg-emerald-50 text-emerald-600 border-emerald-200"
                    }`}>
                      {template.difficulty || "Standard"}
                    </span>
                    <span className="text-xs text-brand-blue font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Launch <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}

// Demo templates for when the API isn't connected
const demoTemplates: SimulationTemplate[] = [
  {
    id: "demo-1",
    partner_id: null,
    role: "Business Analyst",
    company_name: "JPMorgan Chase",
    industry: "Financial Services",
    difficulty: "standard",
    duration_days: 3,
    title: "Basel III Finalization — Regulatory Reporting System Upgrade",
    description: "Lead business analysis for a high-visibility regulatory reporting project.",
    tools_enabled: { inbox: true, slack: true, docvault: true, taskboard: true, meetingroom: true, calendar: true },
    is_partner: true,
    min_crs_cert: 600,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    partner_id: null,
    role: "Product Manager",
    company_name: "Google",
    industry: "Technology",
    difficulty: "hard",
    duration_days: 5,
    title: "Google Maps Feature Launch — AR Navigation v2",
    description: "Manage the launch of a new AR navigation feature across mobile platforms.",
    tools_enabled: { inbox: true, slack: true, docvault: true, taskboard: true, meetingroom: true, datastudio: true, calendar: true },
    is_partner: true,
    min_crs_cert: 750,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-3",
    partner_id: null,
    role: "Management Consultant",
    company_name: "McKinsey & Company",
    industry: "Consulting",
    difficulty: "hard",
    duration_days: 5,
    title: "Retail Digital Transformation — Due Diligence",
    description: "Conduct strategic due diligence for a major retail client's digital transformation.",
    tools_enabled: { inbox: true, slack: true, docvault: true, taskboard: true, meetingroom: true, datastudio: true, calendar: true },
    is_partner: false,
    min_crs_cert: 750,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-4",
    partner_id: null,
    role: "Data Analyst",
    company_name: "Goldman Sachs",
    industry: "Financial Services",
    difficulty: "standard",
    duration_days: 3,
    title: "Trading Desk Analytics — P&L Attribution Dashboard",
    description: "Build and present a P&L attribution analysis for the equities trading desk.",
    tools_enabled: { inbox: true, slack: true, docvault: true, taskboard: true, datastudio: true, calendar: true },
    is_partner: false,
    min_crs_cert: 600,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-5",
    partner_id: null,
    role: "UX Designer",
    company_name: "Microsoft",
    industry: "Technology",
    difficulty: "standard",
    duration_days: 3,
    title: "Teams Mobile Redesign — User Research Sprint",
    description: "Lead a user research sprint and present design recommendations for Teams mobile.",
    tools_enabled: { inbox: true, slack: true, docvault: true, taskboard: true, meetingroom: true, calendar: true },
    is_partner: false,
    min_crs_cert: 600,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-6",
    partner_id: null,
    role: "Risk Analyst",
    company_name: "Deloitte",
    industry: "Consulting",
    difficulty: "easy",
    duration_days: 3,
    title: "Enterprise Risk Assessment — SOX Compliance Review",
    description: "Conduct a SOX compliance review and present findings to the audit committee.",
    tools_enabled: { inbox: true, slack: true, docvault: true, taskboard: true, meetingroom: true, calendar: true },
    is_partner: false,
    min_crs_cert: 500,
    created_at: new Date().toISOString(),
  },
];
