"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Check,
  ClipboardCheck,
  LineChart,
  Mail,
  Settings,
  SlidersHorizontal,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

type VisualType = "simulation" | "candidate" | "team" | "builder";

type BeyondHiringCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  visual: VisualType;
};

const cards: BeyondHiringCard[] = [
  {
    title: "Simulation-Led Training & Hiring",
    description: "Assess and prepare candidates through role-specific simulations that reflect real business challenges.",
    icon: Users,
    visual: "simulation",
  },
  {
    title: "Hire the Right Candidate for You",
    description: "Identify candidates whose capabilities, approach, and execution style align with your organizational requirements.",
    icon: LineChart,
    visual: "candidate",
  },
  {
    title: "Enhance Efficiency of Existing Teams",
    description: "Use simulations to improve team readiness, decision-making, and execution quality across critical business workflows.",
    icon: Briefcase,
    visual: "team",
  },
  {
    title: "Personalized Simulations Crafted in Minutes",
    description: "Configure tailored simulations quickly, customized to your roles, workflows, and evaluation parameters.",
    icon: Settings,
    visual: "builder",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function Pill({ children, active }: { children: string; active?: boolean }) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1 text-[10px] font-semibold ${
        active
          ? "border-amber-500/35 bg-amber-500/10 text-amber-300"
          : "border-white/[0.08] bg-white/[0.03] text-slate-500"
      }`}
    >
      {children}
    </span>
  );
}

function ProgressRow({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-[11px] font-medium text-slate-400">{label}</span>
        <span className={active ? "text-[11px] font-bold text-amber-300" : "text-[11px] font-semibold text-slate-500"}>
          {value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div className={active ? "h-full rounded-full bg-amber-400" : "h-full rounded-full bg-slate-600"} style={{ width: value }} />
      </div>
    </div>
  );
}

function SimulationVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#080808] p-4">
      <div className="absolute right-10 top-6 h-28 w-28 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="relative flex h-full gap-4">
        <div className="hidden w-24 shrink-0 rounded-lg border border-white/[0.07] bg-black/35 p-2 sm:block">
          {[
            { icon: Mail, active: true },
            { icon: Users },
            { icon: ClipboardCheck },
            { icon: BarChart3 },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={`mb-2 flex h-8 items-center gap-2 rounded-md px-2 ${item.active ? "bg-amber-500/10 text-amber-300" : "text-slate-600"}`}>
                <Icon className="h-3.5 w-3.5" />
                <span className="h-1.5 w-8 rounded bg-current opacity-40" />
              </div>
            );
          })}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-600">Active scenario</p>
              <p className="mt-1 truncate text-sm font-bold text-white">Client escalation response</p>
            </div>
            <Pill active>42 min</Pill>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Inbox brief", "Stakeholder sync", "Decision memo"].map((item, index) => (
              <div key={item} className={`rounded-lg border p-3 ${index === 1 ? "border-amber-500/30 bg-amber-500/10" : "border-white/[0.07] bg-white/[0.03]"}`}>
                <p className="text-[10px] font-semibold text-slate-500">0{index + 1}</p>
                <p className="mt-2 text-[11px] font-semibold leading-tight text-slate-200">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3 rounded-lg border border-white/[0.07] bg-black/25 p-3">
            <ProgressRow label="Communication" value="84%" active />
            <ProgressRow label="Prioritization" value="72%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CandidateVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#080808] p-4">
      <div className="absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="relative grid h-full grid-cols-[1.1fr_0.9fr] gap-3">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4">
          <p className="text-[10px] font-bold uppercase text-slate-500">Match quality</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-black text-white">92</span>
            <span className="pb-1 text-sm font-bold text-amber-300">/100</span>
          </div>
          <div className="mt-5 space-y-3">
            <ProgressRow label="Role fit" value="90%" active />
            <ProgressRow label="Execution style" value="82%" />
            <ProgressRow label="Stakeholder judgment" value="76%" />
          </div>
        </div>
        <div className="space-y-3">
          {[
            ["Advance", "Final interview", true],
            ["Review", "Metric depth", false],
            ["Evidence", "Strong", false],
          ].map(([label, sub, active]) => (
            <div key={label} className={`rounded-lg border p-3 ${active ? "border-amber-500/30 bg-amber-500/10" : "border-white/[0.07] bg-white/[0.03]"}`}>
              <p className={active ? "text-xs font-bold text-amber-300" : "text-xs font-bold text-white"}>{label}</p>
              <p className="mt-1 text-[10px] font-medium text-slate-500">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#080808] p-4">
      <div className="absolute right-6 top-10 h-32 w-32 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="relative h-full rounded-xl border border-white/[0.07] bg-black/25 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-600">Team readiness</p>
            <p className="mt-1 text-sm font-bold text-white">Operations cohort</p>
          </div>
          <Pill active>+31%</Pill>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["84", "Avg CRS"],
            ["28", "Active"],
            ["12", "Flags"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
              <p className="text-lg font-black text-white">{value}</p>
              <p className="mt-1 text-[10px] font-semibold text-slate-500">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          <ProgressRow label="Decision quality" value="86%" active />
          <ProgressRow label="Documentation" value="74%" />
          <ProgressRow label="Operational readiness" value="81%" />
        </div>
      </div>
    </div>
  );
}

function BuilderVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#080808] p-4">
      <div className="absolute right-12 top-8 h-28 w-28 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="relative grid h-full grid-cols-[0.95fr_1.05fr] gap-3">
        <div className="space-y-3">
          {[
            ["Role context", Target, true],
            ["Workflow", SlidersHorizontal, true],
            ["Rubric", Check, false],
          ].map(([label, Icon, active]) => {
            const StepIcon = Icon as LucideIcon;
            return (
              <div key={label as string} className={`flex items-center gap-3 rounded-lg border p-3 ${active ? "border-amber-500/30 bg-amber-500/10" : "border-white/[0.07] bg-white/[0.03]"}`}>
                <StepIcon className={active ? "h-4 w-4 text-amber-300" : "h-4 w-4 text-slate-500"} />
                <span className={active ? "text-xs font-bold text-white" : "text-xs font-bold text-slate-400"}>{label as string}</span>
              </div>
            );
          })}
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-black/25 p-4">
          <p className="text-[10px] font-bold uppercase text-slate-600">Simulation setup</p>
          <p className="mt-1 text-sm font-bold text-white">Product Associate</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill active>90 min</Pill>
            <Pill>8 pillars</Pill>
            <Pill>Intermediate</Pill>
          </div>
          <div className="mt-5 space-y-3">
            <ProgressRow label="Scenario depth" value="88%" active />
            <ProgressRow label="Evaluator coverage" value="76%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardVisual({ type }: { type: VisualType }) {
  if (type === "candidate") return <CandidateVisual />;
  if (type === "team") return <TeamVisual />;
  if (type === "builder") return <BuilderVisual />;
  return <SimulationVisual />;
}

function BeyondHiringCard({ card }: { card: BeyondHiringCard }) {
  const Icon = card.icon;

  return (
    <motion.article
      variants={fadeUp}
      className="group flex min-h-[470px] flex-col overflow-hidden rounded-xl border border-white/[0.1] bg-[#0B0B0B] p-4 shadow-2xl shadow-black/20 transition-colors duration-300 hover:border-amber-500/30"
    >
      <div className="h-56 min-h-0">
        <CardVisual type={card.visual} />
      </div>
      <div className="flex flex-1 flex-col justify-end px-1 pb-2 pt-7">
        <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
          <Icon className="h-4 w-4 text-amber-300" />
        </div>
        <h3 className="max-w-sm text-xl font-bold leading-tight text-white">{card.title}</h3>
        <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-slate-400">{card.description}</p>
      </div>
    </motion.article>
  );
}

export default function BeyondHiringSection() {
  return (
    <section className="bg-[#050505] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mb-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
        >
          <motion.h2 variants={fadeUp} className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Go beyond traditional hiring
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-base font-medium leading-relaxed text-slate-400 lg:justify-self-end">
            Move past resumes, interviews, and assumptions. Evaluate talent in real-world scenarios where skills,
            decision-making, and execution speak for themselves.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {cards.map((card) => (
            <BeyondHiringCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
