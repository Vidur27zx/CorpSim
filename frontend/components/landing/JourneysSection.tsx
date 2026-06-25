"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  Briefcase,
  Building2,
  Check,
  ClipboardCheck,
  Download,
  FileText,
  Filter,
  GraduationCap,
  Globe,
  LineChart,
  Mail,
  Monitor,
  Search,
  Settings,
  Share2,
  Shield,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

type JourneyId = "students" | "colleges" | "enterprises";

type PreviewMetric = {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
};

type PreviewCard = {
  title: string;
  meta?: string;
  detail?: string;
  tag?: string;
  icon?: LucideIcon;
  selected?: boolean;
};

type PreviewBar = {
  label: string;
  value: number;
  sub?: string;
  highlight?: boolean;
};

type PreviewTable = {
  headers: string[];
  rows: string[][];
  highlightRows?: number[];
  highlightCells?: string[];
};

type PreviewColumn = {
  title: string;
  items: string[];
  active?: boolean;
};

type PreviewTimelineItem = {
  time: string;
  title: string;
  active?: boolean;
};

type PreviewSection =
  | { type: "metrics"; items: PreviewMetric[] }
  | { type: "cards"; title?: string; items: PreviewCard[]; columns?: 2 | 3 | 4 }
  | { type: "bars"; title?: string; items: PreviewBar[]; compact?: boolean }
  | { type: "table"; title?: string; table: PreviewTable }
  | { type: "columns"; title?: string; columns: PreviewColumn[] }
  | { type: "timeline"; title?: string; items: PreviewTimelineItem[] }
  | { type: "checklist"; title?: string; items: string[]; activeIndex?: number }
  | { type: "editor"; title: string; subject: string; lines: string[] }
  | { type: "certificate"; title: string; rows: { label: string; value: string }[] }
  | { type: "actions"; items: string[] };

type PreviewData = {
  title: string;
  subtitle: string;
  sections: PreviewSection[];
};

type JourneyStep = {
  icon: LucideIcon;
  title: string;
  description: string;
  preview: PreviewData;
};

type JourneyTab = {
  id: JourneyId;
  label: string;
  tabIcon: LucideIcon;
  steps: JourneyStep[];
};

const previewTheme = {
  bg: "#050505",
  panel: "#0B0B0B",
  panelElevated: "#111111",
  card: "#151515",
  cardHover: "#1A1A1A",
  border: "#2A2A2A",
  borderSoft: "#202020",
  textPrimary: "#FFFFFF",
  textSecondary: "#C7C7C7",
  textMuted: "#7A7A7A",
  accent: "#F5A400",
  accentSoft: "rgba(245, 164, 0, 0.12)",
  accentBorder: "rgba(245, 164, 0, 0.35)",
  grayBar: "#3A3A3A",
  grayBarLight: "#555555",
};

const sidebarItems: Record<JourneyId, { name: string; icon: LucideIcon }[]> = {
  students: [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Roles", icon: Target },
    { name: "Simulations", icon: Monitor },
    { name: "Tasks", icon: ClipboardCheck },
    { name: "Scores", icon: Star },
    { name: "Certificate", icon: Award },
  ],
  colleges: [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Cohorts", icon: Users },
    { name: "Students", icon: GraduationCap },
    { name: "Skill Gaps", icon: Search },
    { name: "Reports", icon: FileText },
    { name: "Outcomes", icon: TrendingUp },
  ],
  enterprises: [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Simulations", icon: Monitor },
    { name: "Candidates", icon: Users },
    { name: "Evaluation", icon: ClipboardCheck },
    { name: "Analytics", icon: LineChart },
    { name: "Reports", icon: FileText },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function StatusPill({ text, active }: { text: string; active?: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold"
      style={{
        background: active ? previewTheme.accentSoft : previewTheme.panelElevated,
        borderColor: active ? previewTheme.accentBorder : previewTheme.border,
        color: active ? previewTheme.accent : previewTheme.textMuted,
      }}
    >
      {text}
    </span>
  );
}

function MetricCard({ metric }: { metric: PreviewMetric }) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{
        background: metric.highlight ? previewTheme.accentSoft : previewTheme.card,
        borderColor: metric.highlight ? previewTheme.accentBorder : previewTheme.borderSoft,
      }}
    >
      <p className="text-lg font-bold" style={{ color: metric.highlight ? previewTheme.accent : previewTheme.textPrimary }}>
        {metric.value}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase" style={{ color: previewTheme.textMuted }}>
        {metric.label}
      </p>
      {metric.sub && (
        <p className="mt-1 text-[10px]" style={{ color: previewTheme.textMuted }}>
          {metric.sub}
        </p>
      )}
    </div>
  );
}

function NeutralProgressBar({ item, compact }: { item: PreviewBar; compact?: boolean }) {
  return (
    <div className={compact ? "space-y-1" : "space-y-1.5"}>
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-xs font-medium" style={{ color: previewTheme.textSecondary }}>
          {item.label}
        </span>
        <span className="text-xs font-semibold" style={{ color: item.highlight ? previewTheme.accent : previewTheme.textMuted }}>
          {item.sub ?? item.value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full" style={{ background: "#242424" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${item.value}%`, background: item.highlight ? previewTheme.accent : previewTheme.grayBarLight }}
        />
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title?: string }) {
  if (!title) return null;

  return (
    <p className="mb-3 text-[10px] font-bold uppercase" style={{ color: previewTheme.textMuted }}>
      {title}
    </p>
  );
}

function PreviewCardGrid({ section }: { section: Extract<PreviewSection, { type: "cards" }> }) {
  const gridClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[section.columns ?? 3];

  return (
    <div>
      <SectionTitle title={section.title} />
      <div className={`grid grid-cols-1 gap-3 ${gridClass}`}>
        {section.items.map((item) => {
          const Icon = item.icon ?? FileText;

          return (
            <div
              key={item.title}
              className="rounded-xl border p-3 transition-colors"
              style={{
                background: item.selected ? previewTheme.accentSoft : previewTheme.card,
                borderColor: item.selected ? previewTheme.accentBorder : previewTheme.borderSoft,
              }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                  style={{
                    background: previewTheme.panelElevated,
                    borderColor: item.selected ? previewTheme.accentBorder : previewTheme.borderSoft,
                  }}
                >
                  <Icon className="h-4 w-4" style={{ color: item.selected ? previewTheme.accent : previewTheme.textMuted }} />
                </div>
                {item.tag && <StatusPill text={item.tag} active={item.selected} />}
              </div>
              <p className="text-sm font-bold" style={{ color: previewTheme.textPrimary }}>
                {item.title}
              </p>
              {item.meta && (
                <p className="mt-1 text-xs" style={{ color: previewTheme.textSecondary }}>
                  {item.meta}
                </p>
              )}
              {item.detail && (
                <p className="mt-2 text-[11px]" style={{ color: previewTheme.textMuted }}>
                  {item.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DataTable({ section }: { section: Extract<PreviewSection, { type: "table" }> }) {
  return (
    <div>
      <SectionTitle title={section.title} />
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: previewTheme.borderSoft }}>
        <table className="min-w-full text-left">
          <thead style={{ background: previewTheme.panelElevated }}>
            <tr>
              {section.table.headers.map((header) => (
                <th key={header} className="px-3 py-2 text-[10px] font-bold uppercase" style={{ color: previewTheme.textMuted }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ background: previewTheme.card }}>
            {section.table.rows.map((row, rowIndex) => {
              const rowHighlighted = section.table.highlightRows?.includes(rowIndex);

              return (
                <tr key={row.join("-")} className="border-t" style={{ borderColor: previewTheme.borderSoft }}>
                  {row.map((cell, cellIndex) => {
                    const cellHighlighted = section.table.highlightCells?.includes(cell);

                    return (
                      <td
                        key={`${cell}-${cellIndex}`}
                        className="whitespace-nowrap px-3 py-2 text-xs"
                        style={{
                          color: cellHighlighted || rowHighlighted ? previewTheme.accent : cellIndex === 0 ? previewTheme.textPrimary : previewTheme.textSecondary,
                        }}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ColumnBoard({ section }: { section: Extract<PreviewSection, { type: "columns" }> }) {
  return (
    <div>
      <SectionTitle title={section.title} />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
        {section.columns.map((column) => (
          <div
            key={column.title}
            className="rounded-xl border p-3"
            style={{
              background: column.active ? previewTheme.accentSoft : previewTheme.panelElevated,
              borderColor: column.active ? previewTheme.accentBorder : previewTheme.borderSoft,
            }}
          >
            <p className="mb-3 text-xs font-bold" style={{ color: column.active ? previewTheme.accent : previewTheme.textSecondary }}>
              {column.title}
            </p>
            <div className="space-y-2">
              {column.items.map((item, index) => (
                <div
                  key={item}
                  className="rounded-lg border px-3 py-2 text-[11px]"
                  style={{
                    background: index === 0 && column.active ? previewTheme.panel : previewTheme.card,
                    borderColor: index === 0 && column.active ? previewTheme.accentBorder : previewTheme.borderSoft,
                    color: previewTheme.textSecondary,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline({ section }: { section: Extract<PreviewSection, { type: "timeline" }> }) {
  return (
    <div className="rounded-xl border p-4" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
      <SectionTitle title={section.title} />
      <div className="space-y-3">
        {section.items.map((item) => (
          <div key={`${item.time}-${item.title}`} className="flex items-center gap-3">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: item.active ? previewTheme.accent : previewTheme.grayBarLight }}
            />
            <span className="w-16 text-[11px] font-semibold" style={{ color: item.active ? previewTheme.accent : previewTheme.textMuted }}>
              {item.time}
            </span>
            <span className="text-xs" style={{ color: previewTheme.textSecondary }}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Checklist({ section }: { section: Extract<PreviewSection, { type: "checklist" }> }) {
  return (
    <div className="rounded-xl border p-4" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
      <SectionTitle title={section.title} />
      <div className="space-y-2.5">
        {section.items.map((item, index) => {
          const active = section.activeIndex === index;

          return (
            <div key={item} className="flex items-center gap-3">
              <div
                className="flex h-5 w-5 items-center justify-center rounded-md border"
                style={{
                  background: active ? previewTheme.accentSoft : previewTheme.panelElevated,
                  borderColor: active ? previewTheme.accentBorder : previewTheme.border,
                }}
              >
                <Check className="h-3 w-3" style={{ color: active ? previewTheme.accent : previewTheme.textMuted }} />
              </div>
              <span className="text-xs" style={{ color: active ? previewTheme.textPrimary : previewTheme.textSecondary }}>
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EditorPreview({ section }: { section: Extract<PreviewSection, { type: "editor" }> }) {
  return (
    <div className="rounded-xl border p-4" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
      <SectionTitle title={section.title} />
      <div className="mb-3 rounded-lg border px-3 py-2" style={{ background: previewTheme.panelElevated, borderColor: previewTheme.border }}>
        <p className="text-[11px]" style={{ color: previewTheme.textMuted }}>
          Subject
        </p>
        <p className="text-sm font-semibold" style={{ color: previewTheme.textPrimary }}>
          {section.subject}
        </p>
      </div>
      <div className="space-y-2">
        {section.lines.map((line) => (
          <div key={line} className="rounded-md px-3 py-2 text-xs" style={{ background: previewTheme.panel, color: previewTheme.textSecondary }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificatePreview({ section }: { section: Extract<PreviewSection, { type: "certificate" }> }) {
  return (
    <div className="rounded-2xl border p-5" style={{ background: previewTheme.card, borderColor: previewTheme.accentBorder }}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase" style={{ color: previewTheme.textMuted }}>
            Verified Credential
          </p>
          <p className="mt-1 text-lg font-black" style={{ color: previewTheme.textPrimary }}>
            {section.title}
          </p>
        </div>
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border text-sm font-black"
          style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder, color: previewTheme.accent }}
        >
          CS
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {section.rows.map((row) => (
          <div key={row.label} className="rounded-lg border p-3" style={{ background: previewTheme.panelElevated, borderColor: previewTheme.borderSoft }}>
            <p className="text-[10px] font-semibold uppercase" style={{ color: previewTheme.textMuted }}>
              {row.label}
            </p>
            <p className="mt-1 text-xs font-semibold" style={{ color: previewTheme.textSecondary }}>
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionRow({ section }: { section: Extract<PreviewSection, { type: "actions" }> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {section.items.map((item, index) => {
        const Icon = index === 0 ? Download : Share2;

        return (
          <div
            key={item}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-semibold"
            style={{
              background: index === 0 ? previewTheme.accentSoft : previewTheme.card,
              borderColor: index === 0 ? previewTheme.accentBorder : previewTheme.borderSoft,
              color: index === 0 ? previewTheme.accent : previewTheme.textSecondary,
            }}
          >
            <Icon className="h-3.5 w-3.5" />
            {item}
          </div>
        );
      })}
    </div>
  );
}

function PreviewSectionRenderer({ section }: { section: PreviewSection }) {
  if (section.type === "metrics") {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {section.items.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    );
  }

  if (section.type === "cards") return <PreviewCardGrid section={section} />;
  if (section.type === "bars") {
    return (
      <div className="rounded-xl border p-4" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
        <SectionTitle title={section.title} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {section.items.map((item) => (
            <NeutralProgressBar key={item.label} item={item} compact={section.compact} />
          ))}
        </div>
      </div>
    );
  }
  if (section.type === "table") return <DataTable section={section} />;
  if (section.type === "columns") return <ColumnBoard section={section} />;
  if (section.type === "timeline") return <Timeline section={section} />;
  if (section.type === "checklist") return <Checklist section={section} />;
  if (section.type === "editor") return <EditorPreview section={section} />;
  if (section.type === "certificate") return <CertificatePreview section={section} />;
  return <ActionRow section={section} />;
}

function PreviewBrowserFrame({ journeyId, stepIndex, preview }: { journeyId: JourneyId; stepIndex: number; preview: PreviewData }) {
  const items = sidebarItems[journeyId];
  const urlSlug = journeyId === "enterprises" ? "enterprise" : journeyId;

  return (
    <div className="w-full overflow-hidden rounded-2xl border shadow-2xl shadow-black/40" style={{ background: previewTheme.panelElevated, borderColor: previewTheme.borderSoft }}>
      <div className="flex h-10 items-center gap-3 border-b px-4" style={{ background: previewTheme.panelElevated, borderColor: previewTheme.borderSoft }}>
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full" style={{ background: previewTheme.grayBar }} />
          <div className="h-3 w-3 rounded-full" style={{ background: previewTheme.accent }} />
          <div className="h-3 w-3 rounded-full" style={{ background: previewTheme.grayBar }} />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="rounded-md border px-4 py-0.5 font-mono text-[10px]" style={{ background: previewTheme.panel, borderColor: previewTheme.border, color: previewTheme.textMuted }}>
            app.corporatesimulation.ai/{urlSlug}
          </div>
        </div>
      </div>

      <div className="flex h-[620px]">
        <aside className="hidden w-52 flex-col gap-1 border-r p-4 md:flex" style={{ background: previewTheme.panel, borderColor: previewTheme.borderSoft }}>
          <div className="mb-5 flex items-center gap-2 px-2">
            <div className="rounded-lg border p-1.5" style={{ background: previewTheme.bg, borderColor: previewTheme.accentBorder }}>
              <Image src="/pidot-logo.png" alt="Pi Dot" width={64} height={18} className="h-4 w-auto" />
            </div>
            <span className="ml-auto rounded border px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder, color: previewTheme.accent }}>
              Pro
            </span>
          </div>
          {items.map((item, index) => {
            const Icon = item.icon;
            const active = index === stepIndex % items.length;

            return (
              <div
                key={item.name}
                className="flex items-center gap-2.5 rounded-lg border-l-2 px-3 py-2 text-[11px] font-medium transition-colors"
                style={{
                  background: active ? previewTheme.panelElevated : "transparent",
                  borderLeftColor: active ? previewTheme.accent : "transparent",
                  color: active ? previewTheme.accent : previewTheme.textMuted,
                }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{item.name}</span>
              </div>
            );
          })}
        </aside>

        <main className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-9" style={{ background: previewTheme.bg }}>
          <div className="max-w-4xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold" style={{ color: previewTheme.textPrimary }}>
                {preview.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm" style={{ color: previewTheme.textMuted }}>
                {preview.subtitle}
              </p>
            </div>
            <div className="space-y-5">
              {preview.sections.map((section, index) => (
                <PreviewSectionRenderer key={`${section.type}-${index}`} section={section} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const journeyTabs: JourneyTab[] = [
  {
    id: "students",
    label: "For Students",
    tabIcon: GraduationCap,
    steps: [
      {
        icon: Target,
        title: "Select a role track",
        description: "Explore role-based simulation tracks across business functions and start with the path aligned to your goals.",
        preview: {
          title: "Select a role track",
          subtitle: "Review role-based simulation tracks and begin a guided readiness path.",
          sections: [
            {
              type: "cards",
              items: [
                { title: "Business Analyst", meta: "Financial services case track", detail: "6 tasks", tag: "Foundational", icon: Briefcase },
                { title: "Product Manager", meta: "SaaS feature launch", detail: "8 tasks", tag: "Recommended", icon: Target, selected: true },
                { title: "Data Analyst", meta: "Revenue insights sprint", detail: "7 tasks", tag: "Intermediate", icon: BarChart3 },
              ],
            },
            {
              type: "bars",
              title: "Role Readiness Snapshot",
              items: [
                { label: "Communication", value: 72, sub: "72/100" },
                { label: "Problem Solving", value: 68, sub: "68/100" },
                { label: "Business Writing", value: 74, sub: "74/100", highlight: true },
                { label: "Suggested Track", value: 82, sub: "Product Manager", highlight: true },
              ],
            },
          ],
        },
      },
      {
        icon: Monitor,
        title: "Complete a simulated workday",
        description: "Work through a virtual desktop with mail, chat, documents, task boards, and meetings.",
        preview: {
          title: "Simulated Workday",
          subtitle: "A timed workplace environment with communication, documentation, and delivery tasks.",
          sections: [
            {
              type: "timeline",
              title: "Today",
              items: [
                { time: "09:30", title: "Inbox brief received", active: true },
                { time: "10:00", title: "Stakeholder sync" },
                { time: "11:15", title: "Update project brief" },
                { time: "12:30", title: "Submit recommendation" },
              ],
            },
            {
              type: "cards",
              title: "Workspace Apps",
              columns: 3,
              items: [
                { title: "Mail", meta: "3 priority threads", icon: Mail, selected: true },
                { title: "Chat", meta: "Stakeholder updates", icon: Users },
                { title: "Docs", meta: "Project brief", icon: FileText },
                { title: "Kanban", meta: "7 work items", icon: ClipboardCheck },
                { title: "Meeting Notes", meta: "Sync summary", icon: Monitor },
                { title: "Analytics", meta: "Revenue view", icon: BarChart3 },
              ],
            },
            {
              type: "metrics",
              items: [
                { label: "Time Remaining", value: "42 min", highlight: true },
                { label: "Tasks Completed", value: "3 of 7" },
                { label: "Unread Briefs", value: "2" },
                { label: "Focus Score", value: "81" },
              ],
            },
          ],
        },
      },
      {
        icon: ClipboardCheck,
        title: "Complete workplace assignments",
        description: "Respond to realistic messages, prepare business documents, and manage competing priorities.",
        preview: {
          title: "Workplace assignments",
          subtitle: "Complete tasks that test judgment, communication, and execution.",
          sections: [
            {
              type: "columns",
              title: "Task Board",
              columns: [
                { title: "To Do", items: ["Prioritize client escalation", "Read campaign performance brief"] },
                { title: "In Progress", active: true, items: ["Draft stakeholder email", "Prepare recommendation memo"] },
                { title: "Review", items: ["Update project tracker"] },
                { title: "Completed", items: ["Summarize meeting notes"] },
              ],
            },
            {
              type: "bars",
              title: "Task Quality Signals",
              items: [
                { label: "Clarity", value: 78 },
                { label: "Prioritization", value: 84, highlight: true },
                { label: "Evidence Use", value: 69 },
                { label: "Ownership", value: 73 },
              ],
            },
          ],
        },
      },
      {
        icon: BarChart3,
        title: "Receive structured feedback",
        description: "Every response is evaluated against role-specific criteria for clarity, accuracy, and effectiveness.",
        preview: {
          title: "Structured performance feedback",
          subtitle: "Each response is evaluated against workplace-ready criteria.",
          sections: [
            {
              type: "editor",
              title: "Reply Draft",
              subject: "Client Escalation: Pricing Clarification",
              lines: [
                "Hi Maya, thanks for flagging the pricing concern. I reviewed the revised scope and the delta appears tied to the analytics module.",
                "I can confirm the updated estimate by 4 PM today after checking with Finance.",
                "Next step: send a concise comparison table with assumptions and owner names.",
              ],
            },
            {
              type: "cards",
              title: "Live Feedback",
              columns: 4,
              items: [
                { title: "Tone", meta: "Professional", icon: Check },
                { title: "Clarity", meta: "Strong", icon: FileText },
                { title: "Missing", meta: "Add specific next step", icon: Search, selected: true },
                { title: "Risk", meta: "Timeline is vague", icon: Shield },
              ],
            },
            {
              type: "bars",
              title: "Improvement Signals",
              items: [
                { label: "Add owner name", value: 78, highlight: true, sub: "Current response: 78/100" },
                { label: "Mention deadline", value: 66 },
                { label: "Attach supporting metric", value: 58 },
                { label: "Clarify follow-up channel", value: 62 },
              ],
            },
          ],
        },
      },
      {
        icon: Star,
        title: "Review your readiness score",
        description: "Understand performance across communication, analysis, delivery, and other readiness pillars.",
        preview: {
          title: "Readiness score",
          subtitle: "Understand your performance across the skills employers evaluate.",
          sections: [
            {
              type: "metrics",
              items: [
                { label: "Corporate Readiness Score", value: "84/100", sub: "Simulation complete", highlight: true },
                { label: "Strongest Pillar", value: "Writing", sub: "88/100" },
                { label: "Tasks Reviewed", value: "7" },
                { label: "Next Practice", value: "Memo" },
              ],
            },
            {
              type: "bars",
              title: "Pillar Breakdown",
              items: [
                { label: "Communication", value: 86, highlight: false },
                { label: "Analytical Thinking", value: 81 },
                { label: "Business Writing", value: 88, highlight: true },
                { label: "Prioritization", value: 76 },
                { label: "Stakeholder Management", value: 79 },
                { label: "Problem Solving", value: 83 },
                { label: "Ownership", value: 87 },
                { label: "Tool Fluency", value: 82 },
              ],
            },
            {
              type: "cards",
              items: [
                { title: "Next improvement", meta: "Make recommendations more specific and metric-backed.", icon: LineChart, selected: true },
              ],
            },
          ],
        },
      },
      {
        icon: Award,
        title: "Earn a verified certificate",
        description: "Complete qualifying simulations and share verified performance evidence with recruiters.",
        preview: {
          title: "Verified certificate",
          subtitle: "Convert simulation performance into a credible proof-of-skill asset.",
          sections: [
            {
              type: "certificate",
              title: "Corporate Simulation Certificate",
              rows: [
                { label: "Role Track", value: "Product Manager Simulation" },
                { label: "CRS", value: "84/100" },
                { label: "Completed", value: "7 workplace tasks" },
                { label: "Verified Skills", value: "Communication, Analysis, Execution" },
              ],
            },
            { type: "actions", items: ["Download PDF", "Share to LinkedIn", "Add to Profile"] },
            {
              type: "cards",
              title: "Verification",
              columns: 3,
              items: [
                { title: "Credential ID", meta: "CS-PM-84-2026" },
                { title: "Verification Link", meta: "verify.corporatesimulation.ai" },
                { title: "Issuer", meta: "Corporate Simulation", selected: true },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "colleges",
    label: "For Colleges",
    tabIcon: Building2,
    steps: [
      {
        icon: Users,
        title: "Launch cohort simulations",
        description: "Import student rosters and organize participation by program, year, or custom cohort.",
        preview: {
          title: "Launch cohort simulations",
          subtitle: "Deploy role-based simulations across departments, cohorts, or placement cells.",
          sections: [
            {
              type: "cards",
              title: "Cohorts",
              items: [
                { title: "MBA 2026", meta: "142 students", detail: "Product & Strategy Track", icon: GraduationCap, selected: true },
                { title: "BBA Final Year", meta: "218 students", detail: "Business Analyst Track", icon: Users },
                { title: "Engineering Management", meta: "96 students", detail: "Data & Operations Track", icon: BarChart3 },
              ],
            },
            { type: "checklist", title: "Simulation Setup", items: ["Select role tracks", "Set deadline", "Invite students", "Enable CRS reporting"], activeIndex: 1 },
          ],
        },
      },
      {
        icon: Settings,
        title: "Assign role-based simulations",
        description: "Assign role templates to specific cohorts, departments, or individual learners.",
        preview: {
          title: "Track student readiness",
          subtitle: "Monitor interview readiness and identify students who need additional support.",
          sections: [
            {
              type: "metrics",
              items: [
                { label: "Active Students", value: "456" },
                { label: "Completion", value: "71%", highlight: true },
                { label: "Average CRS", value: "82" },
                { label: "Need Support", value: "64" },
              ],
            },
            {
              type: "bars",
              title: "Readiness Distribution",
              items: [
                { label: "Interview Ready", value: 54, highlight: true },
                { label: "Needs Practice", value: 32 },
                { label: "At Risk", value: 14 },
              ],
            },
            {
              type: "table",
              title: "Student Activity",
              table: {
                headers: ["Student", "Role Track", "CRS", "Status", "Last Activity"],
                rows: [
                  ["Aditi Menon", "Product", "88", "Interview Ready", "Today"],
                  ["Rohan Iyer", "Analyst", "79", "Practice", "Yesterday"],
                  ["Meera Das", "Ops", "68", "Support", "2 days ago"],
                ],
                highlightRows: [0],
              },
            },
          ],
        },
      },
      {
        icon: LineChart,
        title: "Track competency across pillars",
        description: "Monitor average scores across all 8 CRS pillars with trend analysis.",
        preview: {
          title: "Identify skill gaps",
          subtitle: "Find cohort-level weaknesses before placement season begins.",
          sections: [
            {
              type: "bars",
              title: "8-pillar Cohort Breakdown",
              items: [
                { label: "Communication", value: 78 },
                { label: "Analysis", value: 74 },
                { label: "Documentation", value: 69 },
                { label: "Prioritization", value: 72 },
                { label: "Stakeholder Management", value: 66, highlight: true },
                { label: "Problem Solving", value: 76 },
                { label: "Ownership", value: 80 },
                { label: "Tool Fluency", value: 71 },
              ],
            },
            {
              type: "cards",
              title: "Recommended Interventions",
              items: [
                { title: "Business writing workshop", meta: "Department-wide writing practice", icon: FileText },
                { title: "Stakeholder communication lab", meta: "Most urgent gap", icon: Users, selected: true },
                { title: "Case prioritization sprint", meta: "Timed decision drills", icon: Target },
              ],
            },
          ],
        },
      },
      {
        icon: Search,
        title: "Identify students needing support",
        description: "Use score thresholds and activity signals to intervene before placement deadlines.",
        preview: {
          title: "Placement pipeline",
          subtitle: "Move learners from practice to shortlist-ready with measurable progress.",
          sections: [
            {
              type: "columns",
              title: "Pipeline",
              columns: [
                { title: "Invited", items: ["456 students", "3 departments"] },
                { title: "In Simulation", active: true, items: ["324 active", "71% completion"] },
                { title: "Completed", items: ["208 certificates", "82 avg CRS"] },
                { title: "Interview Ready", items: ["146 ready", "38 top decile"] },
              ],
            },
            {
              type: "cards",
              title: "Company Interest",
              columns: 4,
              items: [
                { title: "Deloitte", meta: "38 eligible" },
                { title: "Accenture", meta: "74 eligible", selected: true },
                { title: "ZS", meta: "22 eligible" },
                { title: "Product Startups", meta: "41 eligible" },
              ],
            },
          ],
        },
      },
      {
        icon: Globe,
        title: "Benchmark against peer institutions",
        description: "Compare cohort readiness against peer benchmarks and institutional goals.",
        preview: {
          title: "Cohort reports",
          subtitle: "Generate department-wise readiness reports for faculty, placement teams, and leadership.",
          sections: [
            {
              type: "cards",
              title: "Report Library",
              columns: 4,
              items: [
                { title: "Department Readiness Report", icon: FileText, selected: true },
                { title: "Placement Skill Gap Report", icon: Search },
                { title: "Recruiter Match Report", icon: Users },
                { title: "Monthly Progress Summary", icon: LineChart },
              ],
            },
            {
              type: "cards",
              title: "Report Preview",
              items: [
                { title: "Executive Summary", meta: "Cohort readiness improved 14 points" },
                { title: "Top Performing Tracks", meta: "Product & Strategy, Data Operations" },
                { title: "Weakest Skill Areas", meta: "Stakeholder communication, documentation", selected: true },
                { title: "Recommended Training Plan", meta: "Three-week placement readiness sprint" },
              ],
            },
          ],
        },
      },
      {
        icon: TrendingUp,
        title: "Improve placement outcomes",
        description: "Share verified readiness evidence with hiring partners to support placement decisions.",
        preview: {
          title: "Employment outcomes",
          subtitle: "Connect simulation performance to recruiter shortlists and placement outcomes.",
          sections: [
            {
              type: "metrics",
              items: [
                { label: "Shortlist Conversion", value: "+23%", highlight: true },
                { label: "Interview Readiness", value: "31% faster" },
                { label: "Average CRS", value: "84" },
                { label: "Certificates Shared", value: "128" },
              ],
            },
            {
              type: "bars",
              title: "Readiness Lift",
              items: [
                { label: "Before Simulation", value: 48 },
                { label: "After 1 Simulation", value: 68 },
                { label: "After 3 Simulations", value: 84, highlight: true },
              ],
            },
            {
              type: "cards",
              title: "Outcome Drivers",
              items: [
                { title: "Higher business writing score" },
                { title: "Better role clarity", selected: true },
                { title: "Faster task completion" },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "enterprises",
    label: "For Enterprises",
    tabIcon: Briefcase,
    steps: [
      {
        icon: BarChart3,
        title: "Define role-specific assessments",
        description: "Configure job title, department, competency weights, and minimum readiness thresholds.",
        preview: {
          title: "Create role-based simulations",
          subtitle: "Assess candidates through role-relevant work instead of generic tests.",
          sections: [
            {
              type: "cards",
              title: "Role Simulations",
              columns: 2,
              items: [
                { title: "Business Analyst", meta: "Market sizing + stakeholder memo", icon: Briefcase },
                { title: "Product Associate", meta: "Feature prioritization + PRD review", icon: Target, selected: true },
                { title: "Customer Success", meta: "Escalation handling + renewal plan", icon: Users },
                { title: "Operations Analyst", meta: "SLA breach + root-cause report", icon: BarChart3 },
              ],
            },
            {
              type: "cards",
              title: "Setup Panel",
              columns: 4,
              items: [
                { title: "Role Level", meta: "Associate" },
                { title: "Difficulty", meta: "Intermediate", selected: true },
                { title: "Time Limit", meta: "90 minutes" },
                { title: "Evaluation", meta: "8 pillars" },
              ],
            },
          ],
        },
      },
      {
        icon: Settings,
        title: "Configure the assessment environment",
        description: "Set up company context, workflow stages, difficulty level, and scenario events.",
        preview: {
          title: "Candidate screening",
          subtitle: "Invite candidates into a realistic work simulation and compare performance objectively.",
          sections: [
            {
              type: "cards",
              title: "Filters",
              columns: 4,
              items: [
                { title: "Role", meta: "Product Associate", selected: true },
                { title: "Score Range", meta: "75-100" },
                { title: "Completion", meta: "All" },
                { title: "Cohort", meta: "June hiring" },
              ],
            },
            {
              type: "table",
              title: "Candidate Pipeline",
              table: {
                headers: ["Candidate", "Role", "Completion", "CRS", "Status"],
                rows: [
                  ["Aarav Mehta", "Product Associate", "100%", "86", "Shortlist"],
                  ["Nisha Rao", "Business Analyst", "92%", "81", "Review"],
                  ["Kabir Shah", "Ops Analyst", "65%", "72", "Pending"],
                ],
                highlightRows: [0],
                highlightCells: ["Shortlist"],
              },
            },
          ],
        },
      },
      {
        icon: Filter,
        title: "Control evaluation criteria",
        description: "Customize scoring rubrics, pillar weight distribution, and signal monitoring.",
        preview: {
          title: "Evaluate real work output",
          subtitle: "Review emails, memos, prioritization boards, and decision quality in one place.",
          sections: [
            {
              type: "editor",
              title: "Submitted Recommendation Memo",
              subject: "Feature Prioritization for Enterprise Onboarding",
              lines: [
                "Recommendation: ship admin role mapping before analytics filters because it removes the current onboarding blocker.",
                "Evidence: 42% of stalled trials cite unclear permissions as the first support ticket.",
                "Risk: analytics teams may need a temporary manual report during the next sprint.",
              ],
            },
            {
              type: "bars",
              title: "Evaluation Rubric",
              items: [
                { label: "Business clarity", value: 84 },
                { label: "Evidence quality", value: 78 },
                { label: "Prioritization", value: 86, highlight: true },
                { label: "Stakeholder judgment", value: 74 },
                { label: "Written communication", value: 82 },
              ],
            },
            {
              type: "cards",
              items: [
                { title: "Reviewer note", meta: "Strong structure. Needs clearer risk mitigation.", selected: true },
              ],
            },
          ],
        },
      },
      {
        icon: Monitor,
        title: "Monitor candidate performance",
        description: "Review candidate progress as they complete role-specific workplace scenarios.",
        preview: {
          title: "Candidate comparison",
          subtitle: "Compare candidates using structured skill signals instead of resume bias.",
          sections: [
            {
              type: "table",
              title: "Skill Comparison",
              table: {
                headers: ["Candidate", "CRS", "Communication", "Analysis", "Ownership", "Recommendation"],
                rows: [
                  ["Aarav Mehta", "86", "Strong", "Strong", "Strong", "Top Match"],
                  ["Nisha Rao", "81", "Strong", "Review", "Strong", "Review"],
                  ["Kabir Shah", "72", "Review", "Needs Evidence", "Review", "Needs Evidence"],
                ],
                highlightRows: [0],
                highlightCells: ["Top Match"],
              },
            },
            {
              type: "cards",
              title: "Ranking Signals",
              columns: 3,
              items: [
                { title: "Top Match", meta: "Aarav Mehta", icon: Star, selected: true },
                { title: "Strong Communicator", meta: "Nisha Rao", icon: Mail },
                { title: "Best Analyst", meta: "Aarav Mehta", icon: BarChart3 },
              ],
            },
          ],
        },
      },
      {
        icon: Shield,
        title: "Shortlist using performance signals",
        description: "Rank candidates using readiness scores, pillar breakdowns, and structured review flags.",
        preview: {
          title: "Talent intelligence",
          subtitle: "Understand hiring funnel quality, role readiness, and skill supply.",
          sections: [
            {
              type: "metrics",
              items: [
                { label: "Candidates Assessed", value: "312" },
                { label: "Shortlist-ready", value: "68", highlight: true },
                { label: "Top-quartile CRS", value: "84" },
                { label: "Saved per Candidate", value: "4.2 hrs" },
              ],
            },
            {
              type: "bars",
              title: "Hiring Funnel",
              items: [
                { label: "Invited", value: 100 },
                { label: "Started", value: 82 },
                { label: "Completed", value: 71 },
                { label: "Shortlisted", value: 38, highlight: true },
                { label: "Interviewed", value: 24 },
              ],
            },
            {
              type: "bars",
              title: "Skill Supply",
              items: [
                { label: "Communication", value: 78 },
                { label: "Product Thinking", value: 84, highlight: true },
                { label: "Analysis", value: 73 },
                { label: "Execution", value: 80 },
              ],
            },
          ],
        },
      },
      {
        icon: UserCheck,
        title: "Make evidence-based hiring decisions",
        description: "Use structured recommendations backed by objective simulation performance data.",
        preview: {
          title: "Hiring decision report",
          subtitle: "Turn simulation evidence into a clear, defensible hiring recommendation.",
          sections: [
            {
              type: "metrics",
              items: [
                { label: "Candidate", value: "Aarav Mehta" },
                { label: "Role", value: "Product Associate" },
                { label: "Final CRS", value: "86/100" },
                { label: "Recommendation", value: "Advance", sub: "Final interview", highlight: true },
              ],
            },
            {
              type: "cards",
              title: "Evidence",
              columns: 4,
              items: [
                { title: "Strong stakeholder communication", icon: Users, selected: true },
                { title: "Clear prioritization logic", icon: Target },
                { title: "Good written structure", icon: FileText },
                { title: "Needs more metric depth", icon: LineChart },
              ],
            },
            { type: "actions", items: ["Export PDF", "Share with Hiring Panel", "Add to ATS"] },
          ],
        },
      },
    ],
  },
];

export default function JourneysSection() {
  const [activeTab, setActiveTab] = useState<JourneyId>("students");
  const [activeStep, setActiveStep] = useState<number>(0);
  const activeJourney = journeyTabs.find((tab) => tab.id === activeTab) ?? journeyTabs[0];
  const activePreview = activeJourney.steps[activeStep].preview;

  const handleTabSwitch = (tabId: JourneyId) => {
    setActiveTab(tabId);
    setActiveStep(0);
  };

  return (
    <section className="bg-[#0a0a0a] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mb-16 text-center"
        >
          <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-extrabold text-white md:text-5xl">
            One Platform.{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Three Journeys.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400">
            Whether you&apos;re a learner, university team, or hiring organization, Corporate Simulation adapts to your goals.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {journeyTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabSwitch(tab.id)}
              className={`flex items-center gap-2.5 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-amber-500/50 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 shadow-lg shadow-amber-500/10"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] hover:text-slate-300"
              }`}
            >
              <tab.tabIcon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {activeJourney.steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <motion.button
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => setActiveStep(index)}
                className={`relative flex min-h-[72px] items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-300 ${
                  isActive
                    ? "border-white/[0.15] bg-white/[0.06]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.05]"
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-amber-500/15" : "bg-white/[0.06]"}`}>
                  <step.icon className={`h-4 w-4 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                </div>
                <span className={`text-[13px] font-medium ${isActive ? "text-white" : "text-slate-400"}`}>
                  {step.title}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          key={`${activeTab}-${activeStep}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <PreviewBrowserFrame journeyId={activeTab} stepIndex={activeStep} preview={activePreview} />
        </motion.div>
      </div>
    </section>
  );
}
