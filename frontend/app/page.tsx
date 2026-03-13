"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Monitor,
  MessageSquare,
  FileText,
  BarChart3,
  Mic,
  Award,
  ArrowRight,
  ChevronRight,
  Check,
  Star,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const heroRadarData = [
  { pillar: "Communication", value: 85 },
  { pillar: "Analysis", value: 72 },
  { pillar: "Documentation", value: 68 },
  { pillar: "Stakeholder", value: 78 },
  { pillar: "Delivery", value: 90 },
  { pillar: "Technical", value: 65 },
  { pillar: "Problem Solving", value: 82 },
  { pillar: "Professional", value: 88 },
];

const roles = [
  "Business Analyst", "Product Manager", "Data Analyst", "UX Designer",
  "Software Engineer", "Consultant", "Financial Analyst", "Marketing Manager",
  "Risk Analyst", "Operations Manager", "Project Manager", "Investment Banking Analyst",
];

const companies = [
  "JPMorgan", "Google", "McKinsey", "Goldman Sachs",
  "Microsoft", "Deloitte", "Amazon", "BCG",
];

const features = [
  {
    icon: Monitor,
    title: "Virtual Desktop Environment",
    description: "Full-screen browser-based simulated OS with Email, Slack, Documents, Kanban, Meetings, and more.",
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Interactions",
    description: "Every email, chat message, and meeting is generated and graded by Claude AI in real time.",
  },
  {
    icon: BarChart3,
    title: "8-Pillar CRS Score",
    description: "Corporate Readiness Score across Communication, Analysis, Documentation, and 5 more pillars.",
  },
  {
    icon: Award,
    title: "Shareable Certificates",
    description: "Earn certificates recognized by top companies. Share directly to LinkedIn.",
  },
  {
    icon: Shield,
    title: "Curveball Events",
    description: "Real-world surprises: scope changes, stakeholder conflicts, deadline shifts — just like real corporate life.",
  },
  {
    icon: TrendingUp,
    title: "Detailed Debrief",
    description: "Per-event scoring breakdown with model answers, showing exactly where to improve.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    features: ["1 simulation/month", "Basic CRS score", "Community access"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    features: ["Unlimited simulations", "Full 8-pillar debrief", "Certificates", "Priority AI", "All modules"],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    name: "Pro+",
    price: "$49",
    period: "/mo",
    features: ["Everything in Pro", "Partner tracks", "Elite certificates", "LinkedIn integration", "Priority support"],
    cta: "Start Pro+",
    highlighted: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-brand-blue selection:text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-brand-navy tracking-tight">
              CorpSim AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">Features</Link>
            <Link href="/universities" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">For Universities</Link>
            <Link href="/enterprises" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">For Enterprises</Link>
            <Link href="/#pricing" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-medium bg-gradient-brand text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.05),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-sm font-medium mb-8">
              <Star className="w-4 h-4" />
              Build Corporate Readiness Before Graduation
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-brand-navy leading-tight mb-6 max-w-4xl mx-auto tracking-tight">
              Experience the Job {" "}
              <span className="text-brand-blue">Before Day One</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Step into an immersive AI-powered Virtual Desktop. Handle real emails, navigate stakeholder meetings, and build the exact skills top employers hire for.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link
                href="/auth/register"
                className="bg-brand-blue text-white font-medium px-8 py-3.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 text-lg"
              >
                Start Free Simulation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/enterprises" className="text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 font-medium px-8 py-3.5 rounded-lg flex items-center gap-2 transition-colors text-lg shadow-sm">
                Explore Enterprise <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-12 md:gap-20 mb-20">
              {[
                { value: "50+", label: "Corporate Roles" },
                { value: "Top 100", label: "University Partners" },
                { value: "8", label: "Core Competencies" },
                { value: "98%", label: "Hiring Manager Approval" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-brand-navy mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Radar Preview */}
            <motion.div variants={fadeUp} className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <p className="text-lg font-bold text-brand-navy">Corporate Readiness Score (CRS)</p>
                <div className="px-3 py-1 bg-green-50 text-green-700 text-sm font-bold rounded-md">Overall: 84/100</div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={heroRadarData} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="pillar" tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="value" stroke="#0066FF" strokeWidth={2} fill="#0066FF" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role Selector Marquee */}
      <section className="py-8 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider">Trusted by students entering world-class organizations</p>
        </div>
        <div className="flex items-center justify-center gap-10 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((c) => (
            <span key={c} className="text-lg font-bold text-slate-800">{c}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Every Tool Necessary to Evaluate & Ensure{" "}
              <span className="text-brand-blue">Job Excellence</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We replace outdated multiple-choice tests with a live Virtual Desktop Environment containing 7 integrated applications for true skills assessment.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors">
                  <feature.icon className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">{feature.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Flexible Plans for Every Journey
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 max-w-2xl mx-auto">
              Whether you're a student preparing for interviews, or an Enterprise building a talent pipeline, we have a plan for you.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Free */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold text-brand-navy">Free</h3>
              <p className="text-sm text-slate-500 mt-2">Perfect for exploring the platform.</p>
              <div className="mt-6 mb-8">
                <span className="text-4xl font-extrabold text-brand-navy">$0</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /> 1 simulation/month</li>
                <li className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /> Basic CRS score</li>
                <li className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /> Standard feedback</li>
              </ul>
              <Link href="/auth/register" className="block text-center font-semibold py-3 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">Start Free</Link>
            </motion.div>

            {/* Pro */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border-2 border-brand-blue shadow-xl shadow-blue-500/10 flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              <h3 className="text-xl font-bold text-brand-navy">Pro</h3>
              <p className="text-sm text-slate-500 mt-2">For serious career preparation.</p>
              <div className="mt-6 mb-8">
                <span className="text-4xl font-extrabold text-brand-navy">$29</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-5 h-5 text-brand-blue flex-shrink-0" /> Unlimited simulations</li>
                <li className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-5 h-5 text-brand-blue flex-shrink-0" /> Full 8-pillar AI debrief</li>
                <li className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-5 h-5 text-brand-blue flex-shrink-0" /> Shareable Certificates</li>
                <li className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-5 h-5 text-brand-blue flex-shrink-0" /> Priority grading</li>
              </ul>
              <Link href="/auth/register" className="block text-center font-semibold py-3 rounded-lg bg-brand-blue text-white hover:bg-blue-700 transition-colors shadow-md">Upgrade to Pro</Link>
            </motion.div>

            {/* Enterprise / College */}
            <motion.div variants={fadeUp} className="bg-brand-navy rounded-2xl p-8 border border-slate-800 shadow-xl flex flex-col">
              <h3 className="text-xl font-bold text-white">Enterprise & College</h3>
              <p className="text-sm text-slate-300 mt-2">For university cohorts and corporate hiring.</p>
              <div className="mt-6 mb-8">
                <span className="text-4xl font-extrabold text-white">Custom</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-200"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> Custom private simulations</li>
                <li className="flex items-center gap-3 text-sm text-slate-200"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> Talent funnel analytics</li>
                <li className="flex items-center gap-3 text-sm text-slate-200"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> SSO Integration</li>
                <li className="flex items-center gap-3 text-sm text-slate-200"><Check className="w-5 h-5 text-blue-400 flex-shrink-0" /> Dedicated success manager</li>
              </ul>
              <Link href="#" className="block text-center font-semibold py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">Contact Sales</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center bg-brand-navy rounded-3xl p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,255,0.4),transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Step Into Your Corporate Career
            </h2>
            <p className="text-blue-100 max-w-lg mx-auto mb-8 font-medium">
              Join leading universities and top-tier candidates who train their skills in our AI-powered environments.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex justify-center items-center gap-2 bg-white text-brand-navy font-bold px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors text-lg"
              >
                Start for Free
              </Link>
              <Link
                href="#"
                className="inline-flex justify-center items-center gap-2 border border-blue-400 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-lg"
              >
                Request Enterprise Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-brand-blue flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-brand-navy">CorpSim AI</span>
          </div>
          <p className="text-sm font-medium text-slate-500">© 2024 CorpSim AI. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-brand-blue transition-colors">Privacy</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-brand-blue transition-colors">Terms</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-brand-blue transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
