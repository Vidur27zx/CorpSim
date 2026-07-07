"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  LineChart,
  Mail,
  MessageSquare,
  Monitor,
  RefreshCw,
  Send,
  Settings,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

type RelevanceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  visual: "conversation" | "operations";
};

type WorkflowItem = {
  label: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  metric: string;
  metricLabel: string;
  cards: { label: string; value: string; icon: LucideIcon }[];
  stages: { title: string; meta: string; active?: boolean }[];
  checklist: string[];
  progress: { label: string; value: number; active?: boolean }[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const relevanceCards: RelevanceCard[] = [
  {
    title: "AI-Powered Conversations",
    description:
      "Simulate real workplace conversations with clients, vendors, recruiters, and internal teams through structured AI roleplay.",
    icon: MessageSquare,
    visual: "conversation",
  },
  {
    title: "Experiential Learning",
    description:
      "Mirror how companies operate, from decision-making and cross-functional collaboration to deadlines, constraints, and performance pressure.",
    icon: ClipboardCheck,
    visual: "operations",
  },
];

const workflowSteps: WorkflowItem[] = [
  {
    label: "Create",
    icon: BookOpen,
    headline: "Build role-linked projects",
    description: "Turn placement goals into structured simulations with business context, deliverables, and evaluation pillars.",
    metric: "8",
    metricLabel: "CRS pillars mapped",
    cards: [
      { label: "Cohort", value: "MBA 2026", icon: GraduationCap },
      { label: "Timeline", value: "3-week sprint", icon: Clock3 },
      { label: "Track", value: "Product + Analyst", icon: Target },
    ],
    stages: [
      { title: "Role brief", meta: "Company context", active: true },
      { title: "Deliverables", meta: "Memo, email, decision" },
      { title: "Rubric", meta: "Faculty approved" },
    ],
    checklist: ["Role outcomes defined", "Scenario constraints added", "Rubric ready for review"],
    progress: [
      { label: "Scenario depth", value: 88, active: true },
      { label: "Rubric coverage", value: 82 },
      { label: "Faculty readiness", value: 76 },
    ],
  },
  {
    label: "Assign",
    icon: Send,
    headline: "Launch to cohorts in minutes",
    description: "Assign simulations by department, program, role track, or placement-readiness intervention group.",
    metric: "142",
    metricLabel: "learners assigned",
    cards: [
      { label: "Programs", value: "MBA, B.Tech", icon: Building2 },
      { label: "Sections", value: "6 cohorts", icon: Users },
      { label: "Window", value: "Jul 8-28", icon: Calendar },
    ],
    stages: [
      { title: "Select cohort", meta: "142 learners", active: true },
      { title: "Set schedule", meta: "3 checkpoints" },
      { title: "Publish", meta: "Auto reminders" },
    ],
    checklist: ["Cohort imported", "Deadline configured", "Student instructions generated"],
    progress: [
      { label: "Invite coverage", value: 96, active: true },
      { label: "Calendar fit", value: 88 },
      { label: "Faculty notifications", value: 72 },
    ],
  },
  {
    label: "Simulate",
    icon: Monitor,
    headline: "Run workplace scenarios",
    description: "Students work through AI-led stakeholder conversations, timed decisions, and realistic business deliverables.",
    metric: "4",
    metricLabel: "live scenario modes",
    cards: [
      { label: "Conversation", value: "Client escalation", icon: MessageSquare },
      { label: "Output", value: "Decision memo", icon: FileText },
      { label: "Timer", value: "90 minutes", icon: Clock3 },
    ],
    stages: [
      { title: "Brief", meta: "Read context" },
      { title: "Interact", meta: "AI stakeholders", active: true },
      { title: "Submit", meta: "Work output" },
    ],
    checklist: ["Stakeholder prompts active", "Timer and constraints enabled", "Submission workspace ready"],
    progress: [
      { label: "Immersion quality", value: 91, active: true },
      { label: "Decision pressure", value: 84 },
      { label: "Output clarity", value: 78 },
    ],
  },
  {
    label: "Manage",
    icon: Settings,
    headline: "Coordinate faculty oversight",
    description: "Give program teams a clean operating view for deadlines, exceptions, interventions, and support queues.",
    metric: "18",
    metricLabel: "faculty actions queued",
    cards: [
      { label: "Exceptions", value: "5 flagged", icon: Settings },
      { label: "Support", value: "12 tickets", icon: Users },
      { label: "Reviews", value: "34 pending", icon: ClipboardCheck },
    ],
    stages: [
      { title: "Track progress", meta: "Completion by section", active: true },
      { title: "Resolve blockers", meta: "Student support" },
      { title: "Review queue", meta: "Faculty actions" },
    ],
    checklist: ["At-risk learners surfaced", "Extension requests grouped", "Faculty ownership assigned"],
    progress: [
      { label: "Operational clarity", value: 86, active: true },
      { label: "Support response", value: 73 },
      { label: "Review throughput", value: 69 },
    ],
  },
  {
    label: "Monitor",
    icon: BarChart3,
    headline: "Track readiness live",
    description: "Monitor completion, skill gaps, cohort trends, and readiness lift while simulations are still underway.",
    metric: "84",
    metricLabel: "average readiness score",
    cards: [
      { label: "Completion", value: "78%", icon: CheckCircle2 },
      { label: "Gap", value: "Stakeholder mgmt", icon: Target },
      { label: "Lift", value: "+19 pts", icon: TrendingUp },
    ],
    stages: [
      { title: "Activity", meta: "Starts and submissions" },
      { title: "Signals", meta: "8-pillar trends", active: true },
      { title: "Interventions", meta: "Recommended labs" },
    ],
    checklist: ["Cohort dashboard live", "Skill gaps ranked", "Intervention list generated"],
    progress: [
      { label: "Signal freshness", value: 93, active: true },
      { label: "Completion confidence", value: 78 },
      { label: "Gap visibility", value: 88 },
    ],
  },
  {
    label: "Evaluate",
    icon: ClipboardCheck,
    headline: "Review evidence, not guesswork",
    description: "Evaluate submissions with structured rubrics, AI assistance, and faculty moderation built into the flow.",
    metric: "312",
    metricLabel: "evidence points captured",
    cards: [
      { label: "Rubric", value: "8 pillars", icon: Target },
      { label: "Evidence", value: "Memo + chat", icon: FileText },
      { label: "Status", value: "Moderated", icon: CheckCircle2 },
    ],
    stages: [
      { title: "Auto-score", meta: "First pass" },
      { title: "Faculty review", meta: "Moderation", active: true },
      { title: "Publish result", meta: "Verified profile" },
    ],
    checklist: ["Submissions scored", "Reviewer notes captured", "Readiness certificate prepared"],
    progress: [
      { label: "Rubric alignment", value: 89, active: true },
      { label: "Evidence quality", value: 81 },
      { label: "Review consistency", value: 77 },
    ],
  },
  {
    label: "Iterate",
    icon: RefreshCw,
    headline: "Improve the next run",
    description: "Use cohort outcomes to refine role tracks, scenario difficulty, interventions, and faculty playbooks.",
    metric: "3",
    metricLabel: "intervention sprints",
    cards: [
      { label: "Weakest pillar", value: "Prioritization", icon: Target },
      { label: "Recommended lab", value: "Decision writing", icon: BookOpen },
      { label: "Next run", value: "Higher difficulty", icon: RefreshCw },
    ],
    stages: [
      { title: "Analyze gaps", meta: "Cohort patterns", active: true },
      { title: "Tune scenario", meta: "Difficulty and context" },
      { title: "Relaunch", meta: "New sprint" },
    ],
    checklist: ["Outcome review complete", "New practice lab drafted", "Scenario changes approved"],
    progress: [
      { label: "Learning loop", value: 87, active: true },
      { label: "Scenario improvement", value: 74 },
      { label: "Faculty adoption", value: 80 },
    ],
  },
  {
    label: "Scale",
    icon: TrendingUp,
    headline: "Expand across programs",
    description: "Standardize simulation-led readiness across departments while preserving program-specific role tracks.",
    metric: "6",
    metricLabel: "departments onboarded",
    cards: [
      { label: "Programs", value: "6 active", icon: Building2 },
      { label: "Benchmarks", value: "Peer-ready", icon: LineChart },
      { label: "Reports", value: "Leadership pack", icon: FileText },
    ],
    stages: [
      { title: "Template library", meta: "Reusable tracks" },
      { title: "Benchmark", meta: "Department view", active: true },
      { title: "Report", meta: "Placement outcomes" },
    ],
    checklist: ["Templates standardized", "Benchmarks available", "Leadership reporting enabled"],
    progress: [
      { label: "Program coverage", value: 92, active: true },
      { label: "Reporting maturity", value: 84 },
      { label: "Placement partner signal", value: 79 },
    ],
  },
];

function StatusPill({ children, active }: { children: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold ${
        active
          ? "border-amber-500/35 bg-amber-500/10 text-amber-300"
          : "border-white/[0.08] bg-white/[0.03] text-slate-500"
      }`}
    >
      {children}
    </span>
  );
}

function ProgressRow({ label, value, active }: { label: string; value: number; active?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-[11px] font-semibold text-slate-400">{label}</span>
        <span className={`text-[11px] font-bold ${active ? "text-amber-300" : "text-slate-500"}`}>{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${active ? "bg-amber-400" : "bg-slate-600"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ConversationVisual() {
  const threads = [
    { label: "Client escalation", meta: "Needs response", active: true },
    { label: "Vendor pricing", meta: "3 new facts" },
    { label: "Internal handoff", meta: "Pending owner" },
  ];

  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#080808] p-4">
      <div className="absolute right-10 top-6 h-32 w-32 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="relative grid h-full grid-cols-1 gap-3 sm:grid-cols-[0.86fr_1.14fr]">
        <div className="rounded-xl border border-white/[0.07] bg-black/30 p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[10px] font-bold uppercase text-slate-600">Scenario inbox</p>
            <StatusPill active>Live</StatusPill>
          </div>
          <div className="space-y-2.5">
            {threads.map((thread) => (
              <div
                key={thread.label}
                className={`rounded-lg border p-3 ${
                  thread.active ? "border-amber-500/30 bg-amber-500/10" : "border-white/[0.07] bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className={`h-3.5 w-3.5 ${thread.active ? "text-amber-300" : "text-slate-500"}`} />
                  <p className="min-w-0 truncate text-xs font-bold text-white">{thread.label}</p>
                </div>
                <p className="mt-1 text-[10px] font-medium text-slate-500">{thread.meta}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-col rounded-xl border border-white/[0.07] bg-black/30">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">Client delivery update</p>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-500">client-brief@corpsim.ai</p>
            </div>
            <StatusPill>12 min</StatusPill>
          </div>
          <div className="flex-1 space-y-3 p-4">
            <div className="max-w-[86%] rounded-lg border border-white/[0.07] bg-white/[0.04] p-3">
              <p className="text-xs font-medium leading-relaxed text-slate-300">
                The client wants a revised launch plan by 5 PM. Identify risks, trade-offs, and the next decision.
              </p>
            </div>
            <div className="ml-auto hidden max-w-[88%] rounded-lg border border-amber-500/25 bg-amber-500/10 p-3 sm:block">
              <p className="text-xs font-medium leading-relaxed text-slate-100">
                I will confirm the blocker, present two rollout options, and recommend the lower-risk path.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OperationsVisual() {
  const columns = [
    { title: "Brief", items: ["Revenue dip", "Client context"] },
    { title: "Analyze", items: ["Root cause", "Trade-offs"], active: true },
    { title: "Decide", items: ["Recommendation", "Owner"] },
  ];

  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#080808] p-4">
      <div className="absolute left-1/2 top-4 h-36 w-36 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="relative h-full rounded-xl border border-white/[0.07] bg-black/30 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-600">Simulation sprint</p>
            <p className="mt-1 text-sm font-bold text-white">Market entry decision room</p>
          </div>
          <div className="flex gap-2">
            <StatusPill active>3 days</StatusPill>
            <StatusPill>4 teams</StatusPill>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {columns.map((column) => (
            <div
              key={column.title}
              className={`min-h-[108px] rounded-lg border p-3 ${
                column.active ? "border-amber-500/30 bg-amber-500/10" : "border-white/[0.07] bg-white/[0.03]"
              }`}
            >
              <p className={`text-xs font-bold ${column.active ? "text-amber-300" : "text-white"}`}>{column.title}</p>
              <div className="mt-3 space-y-2">
                {column.items.map((item) => (
                  <div key={item} className="rounded-md border border-white/[0.07] bg-black/25 px-2.5 py-2 text-[11px] font-medium text-slate-400">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock3 className="h-3.5 w-3.5 text-amber-300" />
              <p className="text-xs font-bold text-white">Pressure signals</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-[11px] font-semibold text-slate-500">Strategy, Ops, Finance, Sales</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ProgressRow label="Time management" value={82} active />
            <ProgressRow label="Team alignment" value={74} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardVisual({ type }: { type: RelevanceCard["visual"] }) {
  return type === "conversation" ? <ConversationVisual /> : <OperationsVisual />;
}

function RelevanceFeatureCard({ card }: { card: RelevanceCard }) {
  const Icon = card.icon;

  return (
    <motion.article
      variants={fadeUp}
      className="group flex min-h-[560px] flex-col overflow-hidden rounded-xl border border-white/[0.1] bg-[#0b0b0b] p-4 shadow-2xl shadow-black/25 transition-colors duration-300 hover:border-amber-500/30"
    >
      <div className="h-[500px] min-h-0 sm:h-80">
        <CardVisual type={card.visual} />
      </div>
      <div className="flex flex-1 flex-col justify-end px-1 pb-2 pt-8">
        <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
          <Icon className="h-4 w-4 text-amber-300" />
        </div>
        <h3 className="max-w-sm text-xl font-bold leading-tight text-white">{card.title}</h3>
        <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-slate-400">{card.description}</p>
        <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-white">
          Learn more <span className="h-px w-8 bg-amber-400/70" />
        </div>
      </div>
    </motion.article>
  );
}

function SimulationMark() {
  return (
    <div className="relative mx-auto mb-9 flex h-24 w-24 items-center justify-center rounded-[1.6rem] border border-white/[0.12] bg-[#0b0b0b] shadow-2xl shadow-amber-500/10">
      <div className="absolute inset-4 rounded-2xl border border-amber-500/25 bg-amber-500/[0.07]" />
      <div className="absolute inset-x-6 top-8 h-px rotate-[-16deg] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      <div className="absolute inset-x-6 bottom-8 h-px rotate-[16deg] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      <GraduationCap className="relative h-8 w-8 text-amber-300" />
    </div>
  );
}

function WorkflowStepButton({
  step,
  active,
  onClick,
}: {
  step: WorkflowItem;
  active?: boolean;
  onClick: () => void;
}) {
  const Icon = step.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group flex flex-col items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
          active
            ? "border-white bg-white text-black shadow-lg shadow-white/10"
            : "border-white/[0.12] bg-white/[0.03] text-slate-400 group-hover:border-amber-400/35 group-hover:text-amber-300"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className={`text-[11px] font-semibold transition-colors ${active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
        {step.label}
      </span>
    </button>
  );
}

function WorkflowStageCard({ stage, index }: { stage: WorkflowItem["stages"][number]; index: number }) {
  return (
    <div
      className={`relative rounded-lg border p-4 text-left ${
        stage.active ? "border-amber-500/35 bg-amber-500/[0.09]" : "border-white/[0.08] bg-white/[0.03]"
      }`}
    >
      <div
        className={`mb-4 flex h-7 w-7 items-center justify-center rounded-lg border text-[11px] font-black ${
          stage.active ? "border-amber-500/40 bg-amber-500/15 text-amber-300" : "border-white/[0.08] bg-black/20 text-slate-500"
        }`}
      >
        {index + 1}
      </div>
      <p className={`text-sm font-bold ${stage.active ? "text-white" : "text-slate-200"}`}>{stage.title}</p>
      <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500">{stage.meta}</p>
      {stage.active && <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.65)]" />}
    </div>
  );
}

function SimulateEasePanel({ step }: { step: WorkflowItem }) {
  const PrimaryIcon = step.icon;

  return (
    <motion.div
      key={step.label}
      variants={fadeUp}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-white/[0.1] bg-[#080808] shadow-2xl shadow-black/30"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        </div>
        <p className="truncate text-[11px] font-semibold text-slate-500">{step.label.toLowerCase()}-workflow.view</p>
        <Calendar className="h-4 w-4 text-slate-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px]">
        <div className="border-b border-white/[0.08] p-5 lg:border-b-0 lg:border-r lg:border-white/[0.08]">
          <div className="mb-5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 text-left">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10">
                  <PrimaryIcon className="h-5 w-5 text-amber-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase text-amber-300/80">{step.label} workflow</p>
                  <h3 className="mt-1 text-2xl font-black leading-tight text-white">{step.headline}</h3>
                  <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-400">{step.description}</p>
                </div>
              </div>
              <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.08] px-4 py-3 text-left">
                <p className="text-3xl font-black text-white">{step.metric}</p>
                <p className="mt-1 text-[10px] font-bold uppercase text-amber-300/80">{step.metricLabel}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {step.cards.map((card) => {
                const Icon = card.icon;

                return (
                  <div key={card.label} className="rounded-lg border border-white/[0.07] bg-black/25 p-3">
                    <Icon className="mb-3 h-4 w-4 text-amber-300" />
                    <p className="text-[10px] font-bold uppercase text-slate-600">{card.label}</p>
                    <p className="mt-1 text-sm font-bold text-white">{card.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-black/30 p-4">
            <div className="mb-4 flex items-center justify-between gap-3 text-left">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-600">Workflow canvas</p>
                <p className="mt-1 text-sm font-bold text-white">Current operating path</p>
              </div>
              <StatusPill active>{step.label}</StatusPill>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {step.stages.map((stage, index) => (
                <WorkflowStageCard key={stage.title} stage={stage} index={index} />
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {step.progress.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
                <ProgressRow label={item.label} value={item.value} active={item.active} />
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 text-left">
          <div className="mb-5 rounded-xl border border-amber-500/25 bg-amber-500/[0.08] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase text-amber-300/80">Active stage</p>
                <p className="mt-1 text-xl font-black text-white">{step.headline}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 shrink-0 text-amber-300" />
            </div>
            <p className="mt-3 text-xs font-medium leading-relaxed text-slate-400">{step.description}</p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="mb-4 text-[10px] font-bold uppercase text-slate-600">Next actions</p>
            <div className="space-y-3">
              {step.checklist.map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                      index === 0 ? "border-amber-500/35 bg-amber-500/10" : "border-white/[0.08] bg-black/20"
                    }`}
                  >
                    <CheckCircle2 className={`h-3 w-3 ${index === 0 ? "text-amber-300" : "text-slate-600"}`} />
                  </div>
                  <p className={`text-xs font-semibold leading-relaxed ${index === 0 ? "text-slate-200" : "text-slate-500"}`}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/25 p-4">
            <p className="mb-4 text-[10px] font-bold uppercase text-slate-600">Readiness signal</p>
            <div className="space-y-4">
              {step.progress.map((item) => (
                <ProgressRow key={item.label} label={item.label} value={item.value} active={item.active} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function UniversitySimulationSections() {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const activeWorkflow = workflowSteps[activeWorkflowIndex];

  return (
    <>
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
              Corporate relevance built into every simulation
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-2xl text-base font-medium leading-relaxed text-slate-400 lg:justify-self-end">
              Each simulation is built using real corporate workflows, problem statements, and expectations sourced from
              industry-leading companies.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            {relevanceCards.map((card) => (
              <RelevanceFeatureCard key={card.title} card={card} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#050505] px-6 pb-24 pt-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={fadeUp}>
              <SimulationMark />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Simulate <span className="text-amber-400">with ease</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-400">
              A structured, project-based simulation layer that fits seamlessly into your academic calendar, designed for
              engineering and management programs.
            </motion.p>

            <motion.div variants={fadeUp} className="mx-auto mt-9 grid max-w-4xl grid-cols-4 gap-4 sm:grid-cols-8">
              {workflowSteps.map((step, index) => (
                <WorkflowStepButton
                  key={step.label}
                  step={step}
                  active={index === activeWorkflowIndex}
                  onClick={() => setActiveWorkflowIndex(index)}
                />
              ))}
            </motion.div>

            <SimulateEasePanel step={activeWorkflow} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
