"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, Briefcase, Zap, LineChart, Network } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function EnterprisesPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-brand-blue selection:text-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-brand-navy tracking-tight">
                CorpSim AI
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">Features</Link>
            <Link href="/universities" className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">For Universities</Link>
            <Link href="/enterprises" className="text-sm font-medium text-brand-blue transition-colors">For Enterprises</Link>
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
              Book a Demo
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
              <Briefcase className="w-4 h-4" />
              Next-Generation Talent Acquisition
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-brand-navy leading-tight mb-6 max-w-4xl mx-auto tracking-tight">
              Hire on Capability, <br/>
              <span className="text-brand-blue">Not Just Pedigree</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Standardize your screening process with immersive corporate role-play. See exactly how candidates handle real-world challenges before day one.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link
                href="#demo"
                className="bg-brand-blue text-white font-medium px-8 py-3.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 text-lg"
              >
                Book Enterprise Demo <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Eliminate Mis-Hires and Acceleration Onboarding
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Traditional interviews are biased and inaccurate. CorpSim AI gives you objective, 8-pillar capability scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Standardized Screening",
                description: "Put candidates through the exact same high-pressure scenarios to ensure objective, capability-based ranking.",
              },
              {
                icon: LineChart,
                title: "Day-1 Ready Hires",
                description: "Select candidates who already know how to navigate complex stakeholder meetings and prioritize tasks correctly.",
              },
              {
                icon: Shield,
                title: "Reduce Mis-Hires",
                description: "Reduce churn by ensuring incoming talent possesses the soft skills required to thrive in your specific environment.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                  <feature.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">{feature.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
