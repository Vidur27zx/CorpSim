"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  FileText,
  LockKeyhole,
  Mail,
  SlidersHorizontal,
  Sparkles,
  Target,
  ToggleRight,
  Users,
  type LucideIcon,
} from "lucide-react";

type PreviewStep = {
  id: string;
  point: string;
  screenTitle: string;
  screenSubtitle: string;
  description: string;
  icon: LucideIcon;
  status: string;
};

const previewSteps: PreviewStep[] = [
  {
    id: "access",
    point: "Design the role before you hire",
    screenTitle: "Enterprise Workspace",
    screenSubtitle: "Welcome back, Placement Team",
    description: "Enter through an institution-ready admin workspace built for placement, HR, and training teams.",
    icon: LockKeyhole,
    status: "Admin access verified",
  },
  {
    id: "details",
    point: "Simulate your business environment",
    screenTitle: "Company and Cohort Details",
    screenSubtitle: "Define the organization, target role, and participant group.",
    description: "Capture institution, department, cohort, participant count, and target role before building the simulation.",
    icon: Briefcase,
    status: "Workspace context saved",
  },
  {
    id: "assignment",
    point: "Control evaluation criteria",
    screenTitle: "Choose Assignment Type",
    screenSubtitle: "Select the workplace task learners or candidates will complete.",
    description: "Pick from role-based cases such as business analysis, market research, product strategy, sales, and customer success.",
    icon: ClipboardCheck,
    status: "Business Analyst Case selected",
  },
  {
    id: "configure",
    point: "Watch candidates perform",
    screenTitle: "Configure Simulation",
    screenSubtitle: "Tune difficulty, timing, skills, AI guidance, and submission format.",
    description: "Turn the selected assignment into a realistic workplace scenario with clear skill measurement.",
    icon: SlidersHorizontal,
    status: "Scenario ready to publish",
  },
  {
    id: "schedule",
    point: "Shortlist using performance signals",
    screenTitle: "Schedule and Assign",
    screenSubtitle: "Send the simulation to the right cohort with deadlines and reminders.",
    description: "Schedule the assignment, assign it to a batch or candidate pool, and enable automatic reminders.",
    icon: CalendarClock,
    status: "Assigned to Final Year Business Cohort",
  },
  {
    id: "insights",
    point: "Hire your right candidate",
    screenTitle: "AI-Generated Skill Insights",
    screenSubtitle: "Review completion, readiness, eight-pillar signals, and individual evidence.",
    description: "See cohort performance, skill gaps, and AI feedback once submissions are complete.",
    icon: BarChart3,
    status: "Insights generated",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function FieldRow({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase text-[#A4A4A4]">{label}</p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <p className={active ? "truncate text-sm font-bold text-white" : "truncate text-sm font-semibold text-[#D6D6D6]"}>
          {value}
        </p>
        {active && <span className="h-1.5 w-1.5 rounded-full bg-[#F69507] shadow-[0_0_18px_rgba(246,149,7,0.75)]" />}
      </div>
    </div>
  );
}

function OptionCard({ title, meta, active, icon: Icon }: { title: string; meta: string; active?: boolean; icon: LucideIcon }) {
  return (
    <div
      className="rounded-lg border p-3 transition-colors"
      style={{
        background: active ? "rgba(255, 177, 59, 0.1)" : "rgba(255,255,255,0.035)",
        borderColor: active ? "rgba(246,149,7,0.55)" : "rgba(255,255,255,0.08)",
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <Icon className={active ? "h-4 w-4 text-[#FFB13B]" : "h-4 w-4 text-[#A4A4A4]"} />
        {active && <Check className="h-4 w-4 text-[#FFB13B]" />}
      </div>
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="mt-1 text-[11px] font-medium leading-relaxed text-[#A4A4A4]">{meta}</p>
    </div>
  );
}

function ProgressMetric({ label, value, active }: { label: string; value: number; active?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-[11px] font-semibold text-[#D6D6D6]">{label}</span>
        <span className={active ? "text-[11px] font-bold text-[#FFB13B]" : "text-[11px] font-bold text-[#A4A4A4]"}>
          {value}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div className={active ? "h-full rounded-full bg-[#F69507]" : "h-full rounded-full bg-[#A4A4A4]"} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function AccessScreen() {
  return (
    <div className="grid h-full content-center gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="rounded-xl border border-[#F69507]/35 bg-[#FFB13B]/10 p-5">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#F69507]/45 bg-[#0B0B0B]">
          <LockKeyhole className="h-5 w-5 text-[#FFB13B]" />
        </div>
        <p className="text-[10px] font-bold uppercase text-[#FFB13B]">Enterprise access</p>
        <h3 className="mt-2 text-2xl font-black leading-tight text-white">Welcome back, Placement Team</h3>
        <p className="mt-3 text-sm font-medium leading-relaxed text-[#A4A4A4]">
          Manage simulation assignments, cohorts, and AI-readiness insights from one admin workspace.
        </p>
      </div>
      <div className="space-y-3 rounded-xl border border-white/[0.08] bg-black/25 p-4">
        <FieldRow label="Workspace" value="Enterprise Workspace" active />
        <FieldRow label="Role" value="College Admin / HR Manager" />
        <FieldRow label="Access" value="SSO enabled" />
        <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#F69507] px-4 py-2.5 text-sm font-bold text-[#0B0B0B]">
          Enter dashboard <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DetailsScreen() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FieldRow label="Company / Institution" value="JP Market" active />
        <FieldRow label="Department" value="Placement and Training" />
        <FieldRow label="Cohort" value="Business Analyst Training Batch" />
        <FieldRow label="Participants" value="120 students" active />
        <FieldRow label="Target role" value="Business Analyst" />
        <FieldRow label="Readiness goal" value="Client-ready evaluation" />
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-4">
        <p className="text-[10px] font-bold uppercase text-[#A4A4A4]">Setup quality</p>
        <p className="mt-3 text-4xl font-black text-white">92%</p>
        <p className="mt-2 text-xs font-medium leading-relaxed text-[#A4A4A4]">
          Cohort profile, target role, and evaluation context are ready for assignment generation.
        </p>
      </div>
    </div>
  );
}

function AssignmentScreen() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <OptionCard title="Business Analyst Case" meta="Market sizing, insight synthesis, recommendation memo" icon={BarChart3} active />
      <OptionCard title="Market Research Task" meta="Customer signals, competitor review, opportunity framing" icon={Target} />
      <OptionCard title="Product Strategy Task" meta="Feature prioritization and launch tradeoffs" icon={SlidersHorizontal} />
      <OptionCard title="Customer Success Scenario" meta="Escalation response and client communication" icon={Users} />
      <OptionCard title="Sales Simulation" meta="Lead qualification, objection handling, CRM update" icon={Mail} />
      <OptionCard title="Founder's Office Challenge" meta="Ambiguous business problem with executive summary" icon={Briefcase} />
    </div>
  );
}

function ConfigureScreen() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-3">
        <FieldRow label="Assignment" value="Analyze JP Market Expansion" active />
        <FieldRow label="Duration" value="45 minutes" />
        <FieldRow label="Difficulty" value="Intermediate" />
        <FieldRow label="Submission" value="Decision memo + dashboard notes" />
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-black/25 p-4">
        <p className="mb-4 text-[10px] font-bold uppercase text-[#A4A4A4]">Skills evaluated</p>
        <div className="space-y-3">
          <ProgressMetric label="Analysis" value={88} active />
          <ProgressMetric label="Communication" value={76} />
          <ProgressMetric label="Prioritization" value={81} />
          <ProgressMetric label="Decision-making" value={84} active />
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-[#F69507]/30 bg-[#FFB13B]/10 px-3 py-2">
          <span className="text-xs font-bold text-white">AI guidance level</span>
          <span className="text-xs font-black text-[#FFB13B]">Moderate</span>
        </div>
      </div>
    </div>
  );
}

function ScheduleScreen() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
      <div className="space-y-3">
        <FieldRow label="Start" value="Monday, 10:00 AM" active />
        <FieldRow label="Deadline" value="Wednesday, 6:00 PM" />
        <FieldRow label="Assigned to" value="Final Year Business Cohort" active />
        <FieldRow label="Invite method" value="Email + dashboard notification" />
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase text-[#A4A4A4]">Publish settings</p>
          <ToggleRight className="h-5 w-5 text-[#FFB13B]" />
        </div>
        {["Auto-reminders enabled", "Faculty visibility enabled", "Late submission alerts", "AI evaluation queued"].map((item) => (
          <div key={item} className="mb-3 flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-md border border-[#F69507]/35 bg-[#FFB13B]/10">
              <Check className="h-3 w-3 text-[#FFB13B]" />
            </div>
            <p className="text-xs font-semibold text-[#D6D6D6]">{item}</p>
          </div>
        ))}
        <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#F69507]/45 bg-[#FFB13B]/10 px-4 py-2.5 text-sm font-bold text-[#FFB13B]">
          Publish assignment <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function InsightsScreen() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="grid grid-cols-2 gap-3">
        <FieldRow label="Completion rate" value="87%" active />
        <FieldRow label="Cohort readiness" value="72 / 100" active />
        <FieldRow label="Top skill" value="Analytical reasoning" />
        <FieldRow label="Improvement area" value="Business communication" />
      </div>
      <div className="rounded-xl border border-[#F69507]/30 bg-[#FFB13B]/10 p-4">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#FFB13B]" />
          <p className="text-[10px] font-bold uppercase text-[#FFB13B]">AI insight</p>
        </div>
        <p className="text-sm font-semibold leading-relaxed text-white">
          Most students identified the right market opportunity, but struggled to structure recommendations clearly.
        </p>
        <div className="mt-5 space-y-3">
          <ProgressMetric label="Communication" value={68} />
          <ProgressMetric label="Analysis" value={84} active />
          <ProgressMetric label="Ownership" value={73} />
        </div>
      </div>
    </div>
  );
}

function MockScreen({ activeStep }: { activeStep: PreviewStep }) {
  const screen = useMemo(() => {
    if (activeStep.id === "access") return <AccessScreen />;
    if (activeStep.id === "details") return <DetailsScreen />;
    if (activeStep.id === "assignment") return <AssignmentScreen />;
    if (activeStep.id === "configure") return <ConfigureScreen />;
    if (activeStep.id === "schedule") return <ScheduleScreen />;
    return <InsightsScreen />;
  }, [activeStep.id]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border shadow-2xl shadow-black/30"
      style={{
        borderColor: "rgba(164,164,164,0.2)",
        background: "linear-gradient(145deg, rgba(20,20,20,0.96), rgba(11,11,11,0.92))",
        boxShadow: "0 28px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.1] to-transparent" />
      <div className="relative flex h-11 items-center gap-3 border-b border-white/[0.08] px-4">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4A4A4A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F69507]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4A4A4A]" />
        </div>
        <div className="mx-auto hidden rounded-md border border-white/[0.08] bg-black/25 px-4 py-1 font-mono text-[10px] text-[#A4A4A4] sm:block">
          admin.corpsim.ai/enterprise/simulations
        </div>
        <Clock className="h-4 w-4 text-[#A4A4A4]" />
      </div>
      <div className="relative min-h-[520px] p-4 sm:p-5 lg:aspect-[16/10] lg:min-h-0">
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="flex h-full flex-col"
        >
          <div className="mb-4 flex flex-col gap-3 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase text-[#FFB13B]">{activeStep.status}</p>
              <h3 className="mt-1 text-xl font-black leading-tight text-white">{activeStep.screenTitle}</h3>
              <p className="mt-1 max-w-xl text-sm font-medium leading-relaxed text-[#A4A4A4]">{activeStep.screenSubtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-lg border border-[#F69507]/30 bg-[#FFB13B]/10 px-3 py-2">
              <FileText className="h-4 w-4 text-[#FFB13B]" />
              <span className="text-xs font-bold text-[#FFB13B]">Draft ready</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#FFB13B]" />
            </div>
          </div>
          <div className="min-h-0 flex-1">{screen}</div>
        </motion.div>
      </div>
    </div>
  );
}

export default function EnterpriseSimulationPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeStep = previewSteps[activeIndex];

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % previewSteps.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="bg-[#0B0B0B] px-6 py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F69507]/35 bg-[#FFB13B]/10 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#FFB13B]" />
            <span className="text-xs font-bold uppercase tracking-wide text-[#FFB13B]">Enterprise workflow preview</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="max-w-xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Design, assign, and evaluate workplace simulations without building them from scratch.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-[#A4A4A4] md:text-base">
            CorpSim helps colleges, companies, and training teams create realistic role-based assignments, schedule them
            for cohorts, and review AI-generated skill insights from one enterprise dashboard.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/enterprises" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F69507] px-5 py-3 text-sm font-bold text-[#0B0B0B] transition-opacity hover:opacity-90">
              Create a Simulation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/universities" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition-colors hover:border-[#F69507]/40">
              Explore Enterprise Demo
            </Link>
          </motion.div>

          <motion.div variants={stagger} className="mt-8 hidden space-y-2 lg:block">
            {previewSteps.map((step, index) => {
              const Icon = step.icon;
              const active = index === activeIndex;

              return (
                <motion.button
                  type="button"
                  key={step.id}
                  variants={fadeUp}
                  onClick={() => setActiveIndex(index)}
                  className="group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
                  style={{
                    background: active ? "rgba(255,177,59,0.1)" : "rgba(255,255,255,0.025)",
                    borderColor: active ? "rgba(246,149,7,0.55)" : "rgba(255,255,255,0.09)",
                  }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-[#0B0B0B]">
                    <Icon className={active ? "h-4 w-4 text-[#FFB13B]" : "h-4 w-4 text-[#A4A4A4]"} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{step.point}</p>
                    <p className="mt-0.5 truncate text-xs font-medium text-[#A4A4A4]">{step.screenTitle}</p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <MockScreen activeStep={activeStep} />
          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
            {previewSteps.map((step, index) => (
              <button
                type="button"
                key={step.id}
                onClick={() => setActiveIndex(index)}
                className="min-w-[180px] rounded-xl border px-3 py-3 text-left"
                style={{
                  background: index === activeIndex ? "rgba(255,177,59,0.1)" : "rgba(255,255,255,0.025)",
                  borderColor: index === activeIndex ? "rgba(246,149,7,0.55)" : "rgba(255,255,255,0.09)",
                }}
              >
                <p className="text-xs font-bold text-white">{step.point}</p>
                <p className="mt-1 text-[11px] font-medium text-[#A4A4A4]">{step.screenTitle}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
