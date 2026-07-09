"use client";

import { useEffect, useState } from "react";
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

type PreviewInteraction = {
  title: string;
  context: string;
  status: string;
  metric?: string;
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
  bg: "#0B0B0B",
  panel: "#0B0B0B",
  panelElevated: "#141414",
  card: "#151515",
  cardHover: "#1D1D1D",
  border: "#4A4A4A",
  borderSoft: "#242424",
  textPrimary: "#FFFFFF",
  textSecondary: "#D6D6D6",
  textMuted: "#A4A4A4",
  accent: "#F69507",
  accentSoft: "rgba(255, 177, 59, 0.12)",
  accentBorder: "rgba(246, 149, 7, 0.45)",
  grayBar: "#4A4A4A",
  grayBarLight: "#A4A4A4",
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

function MetricCard({
  metric,
  active,
  onInteract,
}: {
  metric: PreviewMetric;
  active?: boolean;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onInteract({
          title: metric.label,
          context: metric.sub ?? "Live performance signal",
          status: metric.highlight ? "High priority signal" : "Available for review",
          metric: metric.value,
        })
      }
      className="rounded-lg border p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#F69507]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
      style={{
        background: active || metric.highlight ? previewTheme.accentSoft : previewTheme.card,
        borderColor: active || metric.highlight ? previewTheme.accentBorder : previewTheme.borderSoft,
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
    </button>
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

function PreviewCardGrid({
  section,
  activeTitle,
  onInteract,
}: {
  section: Extract<PreviewSection, { type: "cards" }>;
  activeTitle?: string;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
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
            <button
              type="button"
              key={item.title}
              onClick={() =>
                onInteract({
                  title: item.title,
                  context: item.meta ?? item.detail ?? "Simulation workspace item",
                  status: item.tag ?? (item.selected ? "Selected for review" : "Ready to inspect"),
                  metric: item.detail,
                })
              }
              className="rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#F69507]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
              style={{
                background: activeTitle === item.title || item.selected ? previewTheme.accentSoft : previewTheme.card,
                borderColor: activeTitle === item.title || item.selected ? previewTheme.accentBorder : previewTheme.borderSoft,
              }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
                  style={{
                    background: previewTheme.panelElevated,
                    borderColor: activeTitle === item.title || item.selected ? previewTheme.accentBorder : previewTheme.borderSoft,
                  }}
                >
                  <Icon className="h-4 w-4" style={{ color: activeTitle === item.title || item.selected ? previewTheme.accent : previewTheme.textMuted }} />
                </div>
                {item.tag && <StatusPill text={item.tag} active={activeTitle === item.title || item.selected} />}
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
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DataTable({
  section,
  activeTitle,
  onInteract,
}: {
  section: Extract<PreviewSection, { type: "table" }>;
  activeTitle?: string;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
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
                <tr
                  key={row.join("-")}
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    onInteract({
                      title: row[0],
                      context: row.slice(1).join(" / "),
                      status: rowHighlighted ? "Recommended action" : "Candidate evidence opened",
                    })
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      onInteract({
                        title: row[0],
                        context: row.slice(1).join(" / "),
                        status: rowHighlighted ? "Recommended action" : "Candidate evidence opened",
                      });
                    }
                  }}
                  className="cursor-pointer border-t transition-colors hover:bg-white/[0.04] focus-visible:outline-none"
                  style={{ borderColor: previewTheme.borderSoft, background: activeTitle === row[0] ? previewTheme.accentSoft : undefined }}
                >
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

function ColumnBoard({
  section,
  activeTitle,
  onInteract,
}: {
  section: Extract<PreviewSection, { type: "columns" }>;
  activeTitle?: string;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
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
                <button
                  type="button"
                  key={item}
                  onClick={() =>
                    onInteract({
                      title: item,
                      context: `${column.title} workflow`,
                      status: column.active ? "Currently in focus" : "Pipeline item opened",
                    })
                  }
                  className="w-full rounded-lg border px-3 py-2 text-left text-[11px] transition-colors hover:border-[#F69507]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
                  style={{
                    background: activeTitle === item || (index === 0 && column.active) ? previewTheme.panel : previewTheme.card,
                    borderColor: activeTitle === item || (index === 0 && column.active) ? previewTheme.accentBorder : previewTheme.borderSoft,
                    color: previewTheme.textSecondary,
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline({
  section,
  activeTitle,
  onInteract,
}: {
  section: Extract<PreviewSection, { type: "timeline" }>;
  activeTitle?: string;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
  return (
    <div className="rounded-xl border p-4" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
      <SectionTitle title={section.title} />
      <div className="space-y-3">
        {section.items.map((item) => (
          <button
            type="button"
            key={`${item.time}-${item.title}`}
            onClick={() =>
              onInteract({
                title: item.title,
                context: `Scheduled at ${item.time}`,
                status: item.active ? "Current task in progress" : "Queued workflow event",
              })
            }
            className="flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
            style={{ background: activeTitle === item.title ? previewTheme.accentSoft : undefined }}
          >
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: activeTitle === item.title || item.active ? previewTheme.accent : previewTheme.grayBarLight }}
            />
            <span className="w-16 text-[11px] font-semibold" style={{ color: activeTitle === item.title || item.active ? previewTheme.accent : previewTheme.textMuted }}>
              {item.time}
            </span>
            <span className="text-xs" style={{ color: previewTheme.textSecondary }}>
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Checklist({
  section,
  activeTitle,
  onInteract,
}: {
  section: Extract<PreviewSection, { type: "checklist" }>;
  activeTitle?: string;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
  return (
    <div className="rounded-xl border p-4" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
      <SectionTitle title={section.title} />
      <div className="space-y-2.5">
        {section.items.map((item, index) => {
          const active = section.activeIndex === index;

          return (
            <button
              type="button"
              key={item}
              onClick={() =>
                onInteract({
                  title: item,
                  context: "Evaluation checklist",
                  status: active ? "Primary checkpoint" : "Checkpoint available",
                })
              }
              className="flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
              style={{ background: activeTitle === item ? previewTheme.accentSoft : undefined }}
            >
              <div
                className="flex h-5 w-5 items-center justify-center rounded-md border"
                style={{
                  background: activeTitle === item || active ? previewTheme.accentSoft : previewTheme.panelElevated,
                  borderColor: activeTitle === item || active ? previewTheme.accentBorder : previewTheme.border,
                }}
              >
                <Check className="h-3 w-3" style={{ color: activeTitle === item || active ? previewTheme.accent : previewTheme.textMuted }} />
              </div>
              <span className="text-xs" style={{ color: active ? previewTheme.textPrimary : previewTheme.textSecondary }}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EditorPreview({
  section,
  activeTitle,
  onInteract,
}: {
  section: Extract<PreviewSection, { type: "editor" }>;
  activeTitle?: string;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
  return (
    <div className="rounded-xl border p-4" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
      <SectionTitle title={section.title} />
      <button
        type="button"
        onClick={() =>
          onInteract({
            title: section.subject,
            context: section.title,
            status: "Subject opened for review",
          })
        }
        className="mb-3 w-full rounded-lg border px-3 py-2 text-left transition-colors hover:border-[#F69507]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
        style={{ background: activeTitle === section.subject ? previewTheme.accentSoft : previewTheme.panelElevated, borderColor: activeTitle === section.subject ? previewTheme.accentBorder : previewTheme.border }}
      >
        <p className="text-[11px]" style={{ color: previewTheme.textMuted }}>
          Subject
        </p>
        <p className="text-sm font-semibold" style={{ color: previewTheme.textPrimary }}>
          {section.subject}
        </p>
      </button>
      <div className="space-y-2">
        {section.lines.map((line) => (
          <button
            type="button"
            key={line}
            onClick={() =>
              onInteract({
                title: line,
                context: section.subject,
                status: "Draft line selected",
              })
            }
            className="w-full rounded-md px-3 py-2 text-left text-xs transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
            style={{ background: activeTitle === line ? previewTheme.accentSoft : previewTheme.panel, color: previewTheme.textSecondary }}
          >
            {line}
          </button>
        ))}
      </div>
    </div>
  );
}

function CertificatePreview({
  section,
  activeTitle,
  onInteract,
}: {
  section: Extract<PreviewSection, { type: "certificate" }>;
  activeTitle?: string;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
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
          <button
            type="button"
            key={row.label}
            onClick={() =>
              onInteract({
                title: row.label,
                context: row.value,
                status: "Credential evidence selected",
              })
            }
            className="rounded-lg border p-3 text-left transition-colors hover:border-[#F69507]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
            style={{ background: activeTitle === row.label ? previewTheme.accentSoft : previewTheme.panelElevated, borderColor: activeTitle === row.label ? previewTheme.accentBorder : previewTheme.borderSoft }}
          >
            <p className="text-[10px] font-semibold uppercase" style={{ color: previewTheme.textMuted }}>
              {row.label}
            </p>
            <p className="mt-1 text-xs font-semibold" style={{ color: previewTheme.textSecondary }}>
              {row.value}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ActionRow({
  section,
  activeTitle,
  onInteract,
}: {
  section: Extract<PreviewSection, { type: "actions" }>;
  activeTitle?: string;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {section.items.map((item, index) => {
        const Icon = index === 0 ? Download : Share2;

        return (
          <button
            type="button"
            key={item}
            onClick={() =>
              onInteract({
                title: item,
                context: index === 0 ? "Export workflow" : "Share workflow",
                status: "Action previewed",
              })
            }
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-semibold transition-colors hover:border-[#F69507]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
            style={{
              background: activeTitle === item || index === 0 ? previewTheme.accentSoft : previewTheme.card,
              borderColor: activeTitle === item || index === 0 ? previewTheme.accentBorder : previewTheme.borderSoft,
              color: activeTitle === item || index === 0 ? previewTheme.accent : previewTheme.textSecondary,
            }}
          >
            <Icon className="h-3.5 w-3.5" />
            {item}
          </button>
        );
      })}
    </div>
  );
}

function PreviewSectionRenderer({
  section,
  activeTitle,
  onInteract,
}: {
  section: PreviewSection;
  activeTitle?: string;
  onInteract: (interaction: PreviewInteraction) => void;
}) {
  if (section.type === "metrics") {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {section.items.map((metric) => (
          <MetricCard key={metric.label} metric={metric} active={activeTitle === metric.label} onInteract={onInteract} />
        ))}
      </div>
    );
  }

  if (section.type === "cards") return <PreviewCardGrid section={section} activeTitle={activeTitle} onInteract={onInteract} />;
  if (section.type === "bars") {
    return (
      <div className="rounded-xl border p-4" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
        <SectionTitle title={section.title} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {section.items.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() =>
                onInteract({
                  title: item.label,
                  context: item.sub ?? `${item.value}% configured`,
                  status: item.highlight ? "Priority performance signal" : "Performance signal opened",
                  metric: item.sub ?? `${item.value}%`,
                })
              }
              className="rounded-lg p-2 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
              style={{ background: activeTitle === item.label ? previewTheme.accentSoft : undefined }}
            >
              <NeutralProgressBar item={item} compact={section.compact} />
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (section.type === "table") return <DataTable section={section} activeTitle={activeTitle} onInteract={onInteract} />;
  if (section.type === "columns") return <ColumnBoard section={section} activeTitle={activeTitle} onInteract={onInteract} />;
  if (section.type === "timeline") return <Timeline section={section} activeTitle={activeTitle} onInteract={onInteract} />;
  if (section.type === "checklist") return <Checklist section={section} activeTitle={activeTitle} onInteract={onInteract} />;
  if (section.type === "editor") return <EditorPreview section={section} activeTitle={activeTitle} onInteract={onInteract} />;
  if (section.type === "certificate") return <CertificatePreview section={section} activeTitle={activeTitle} onInteract={onInteract} />;
  return <ActionRow section={section} activeTitle={activeTitle} onInteract={onInteract} />;
}

type EnterprisePrototypeTabId =
  | "dashboard"
  | "programs"
  | "templates"
  | "schedule"
  | "parameters"
  | "stakeholders"
  | "program"
  | "daily"
  | "builder"
  | "resources"
  | "rubric"
  | "assign"
  | "progress"
  | "evidence"
  | "governance"
  | "reports"
  | "insights";

type EnterprisePrototypeTab = {
  id: EnterprisePrototypeTabId;
  label: string;
  icon: LucideIcon;
};

const enterprisePrototypeTabs: EnterprisePrototypeTab[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "program", label: "Setup", icon: Briefcase },
  { id: "builder", label: "Build", icon: Settings },
  { id: "rubric", label: "Evaluation", icon: Target },
  { id: "assign", label: "Schedule & Publish", icon: ClipboardCheck },
  { id: "progress", label: "Monitor", icon: LineChart },
  { id: "evidence", label: "Review Evidence", icon: Search },
  { id: "insights", label: "Insights", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: Download },
];

const enterpriseTabParent: Partial<Record<EnterprisePrototypeTabId, EnterprisePrototypeTabId>> = {
  programs: "dashboard",
  templates: "program",
  resources: "builder",
  daily: "builder",
  stakeholders: "builder",
  parameters: "rubric",
  governance: "assign",
  schedule: "assign",
};

const outerStepToEnterpriseTab: EnterprisePrototypeTabId[] = ["program", "builder", "rubric", "progress", "evidence", "reports"];

const enterpriseTabCopy: Record<EnterprisePrototypeTabId, { title: string; subtitle: string; status: string; metric?: string }> = {
  dashboard: {
    title: "Enterprise Control Dashboard",
    subtitle: "A compact command center for programs, live cohorts, review queues, and readiness signals.",
    status: "Dashboard live",
    metric: "4 programs",
  },
  programs: {
    title: "Program Library",
    subtitle: "Manage role-based simulations across sales, strategy, operations, customer success, and analyst tracks.",
    status: "Programs mapped",
    metric: "12 active",
  },
  templates: {
    title: "Simulation Templates",
    subtitle: "Start from proven workplace scenarios and adapt duration, role, skills, and stakeholder pressure.",
    status: "Templates ready",
    metric: "6",
  },
  schedule: {
    title: "Schedule a Role Program",
    subtitle: "Set duration, daily unlocks, reviewers, reminders, and cohort visibility for a new assignment.",
    status: "Schedule draft",
    metric: "3-5 days",
  },
  parameters: {
    title: "Simulation Parameters",
    subtitle: "Control difficulty, ambiguity, data complexity, AI guidance, stakeholder pressure, and scoring strictness.",
    status: "Parameters open",
    metric: "10 controls",
  },
  stakeholders: {
    title: "AI Stakeholder Layer",
    subtitle: "Configure the realistic people, constraints, emails, and curveballs candidates will respond to.",
    status: "Stakeholders active",
    metric: "6 personas",
  },
  program: {
    title: "Program Setup",
    subtitle: "Define the role, company context, cohort, duration, resources, and stakeholders in one launch-ready brief.",
    status: "Program setup open",
    metric: "5 days",
  },
  daily: {
    title: "Daily Task Timeline",
    subtitle: "Candidates receive one realistic workplace task per day, from market entry to final recommendation.",
    status: "Daily tasks configured",
    metric: "Day 1-5",
  },
  builder: {
    title: "Build Simulation",
    subtitle: "Generate daily tasks, resource packs, AI stakeholder events, and scenario pressure from the approved setup.",
    status: "Builder open",
    metric: "Live",
  },
  resources: {
    title: "Resource Pack",
    subtitle: "Attach the market brief, logistics sheet, competitor notes, leadership email, and sales channel options.",
    status: "Resources ready",
    metric: "6 files",
  },
  rubric: {
    title: "Evaluation Rubric",
    subtitle: "Define what will be measured across market analysis, logistics reasoning, GTM thinking, and communication.",
    status: "Rubric calibrated",
    metric: "8 pillars",
  },
  assign: {
    title: "Schedule & Publish",
    subtitle: "Review launch readiness, assign the cohort, set daily unlocks, and publish from one control screen.",
    status: "Ready to publish",
    metric: "120",
  },
  progress: {
    title: "Live Progress",
    subtitle: "Monitor day-wise completion, stuck points, at-risk candidates, and submission quality while the simulation runs.",
    status: "Live monitoring",
    metric: "71%",
  },
  evidence: {
    title: "Candidate Evidence",
    subtitle: "Open candidate submissions, daily task evidence, AI notes, and skill-level signals.",
    status: "Evidence review",
    metric: "CRS",
  },
  governance: {
    title: "Governance & Review Controls",
    subtitle: "Lock rubrics, review AI scoring, keep audit trails, and require override reasons before decisions move forward.",
    status: "Controls locked",
    metric: "Audit",
  },
  insights: {
    title: "AI-Generated Insights",
    subtitle: "Review cohort readiness, top skills, improvement areas, and recommendations after completion.",
    status: "Insights generated",
    metric: "72/100",
  },
  reports: {
    title: "Reports & Handoff",
    subtitle: "Export cohort summaries, shortlist evidence, skill-gap reports, and stakeholder-ready decision packs.",
    status: "Reports ready",
    metric: "4 exports",
  },
};

const mokabaraDailyTasks = [
  {
    day: "Day 1",
    title: "Market Entry Brief",
    detail: "Assess luggage demand, customer segments, competitors, and entry attractiveness for Malaysia and Singapore.",
    status: "Brief unlocked",
    score: "92%",
  },
  {
    day: "Day 2",
    title: "Logistics & Operations",
    detail: "Compare warehousing, customs, returns, shipping timelines, and last-mile delivery constraints.",
    status: "In progress",
    score: "71%",
  },
  {
    day: "Day 3",
    title: "GTM & Sales Channels",
    detail: "Choose between marketplaces, D2C, retail partners, influencer launches, and corporate channels.",
    status: "Scheduled",
    score: "Fri",
  },
  {
    day: "Day 4",
    title: "Pricing, Risk & Financials",
    detail: "Estimate duties, CAC, pricing bands, margin pressure, break-even logic, and launch risks.",
    status: "Scheduled",
    score: "Sat",
  },
  {
    day: "Day 5",
    title: "Executive Recommendation",
    detail: "Submit final market-entry plan: launch sequence, operating model, risks, KPIs, and country priority.",
    status: "Final output",
    score: "Memo",
  },
];

const mokabaraResourcePack = [
  {
    title: "Market research brief",
    detail: "Demand signals, market sizing prompts, customer segments, tourism/business travel context, and early competitor notes.",
    icon: FileText,
    signal: "Demand",
    bullets: ["Singapore: higher purchasing power", "Malaysia: broader volume potential", "Premium cabin luggage demand rising"],
  },
  {
    title: "Logistics cost sheet",
    detail: "Warehousing, duties, returns, shipping timelines, last-mile delivery assumptions, and operating cost ranges.",
    icon: ClipboardCheck,
    signal: "Cost risk",
    bullets: ["Singapore warehouse cost is high", "Malaysia last-mile coverage varies by city", "Return logistics affects margin"],
  },
  {
    title: "Competitor snapshot",
    detail: "Local and global luggage brands, marketplace pricing, D2C offers, retail presence, and positioning gaps.",
    icon: Search,
    signal: "Positioning",
    bullets: ["Marketplace discounting pressure", "Premium utility positioning gap", "Retail partners demand launch support"],
  },
  {
    title: "Customer personas",
    detail: "Frequent flyers, students, young professionals, founders, and business travelers with channel and price sensitivity.",
    icon: Users,
    signal: "Segments",
    bullets: ["Students prioritize durability and price", "Business travelers value warranty and cabin fit", "Young professionals respond to creators"],
  },
  {
    title: "Leadership email",
    detail: "CEO asks for a country-first recommendation with launch sequence, operating model, risk view, and 90-day KPIs.",
    icon: Mail,
    signal: "Executive ask",
    bullets: ["Pick one country first", "Defend channel choice", "Show risk and KPI logic"],
  },
  {
    title: "Sales channel options",
    detail: "Marketplace, D2C, retail partnerships, influencer-led launch, campus communities, and corporate gifting channels.",
    icon: Globe,
    signal: "GTM",
    bullets: ["Marketplace for discovery", "D2C for brand control", "Retail for trust and trial"],
  },
];

const mokabaraCandidateEvidence = [
  {
    name: "Aarav Mehta",
    day: "Day 2",
    crs: "81",
    signal: "Logistics reasoning",
    recommendation: "Review",
    note: "Good Singapore warehouse cost comparison, but return-cost sensitivity needs stronger evidence.",
  },
  {
    name: "Diya Rao",
    day: "Day 2",
    crs: "88",
    signal: "Market analysis",
    recommendation: "Advance",
    note: "Clear country sequencing, strong demand logic, and practical marketplace-to-D2C transition plan.",
  },
  {
    name: "Kabir Shah",
    day: "Day 1",
    crs: "62",
    signal: "Needs structure",
    recommendation: "Needs training",
    note: "Identified demand, but missed import duties, returns, and channel economics in the recommendation.",
  },
  {
    name: "Naina Iyer",
    day: "Day 2",
    crs: "91",
    signal: "Executive clarity",
    recommendation: "Advance",
    note: "Strong executive memo with clear Singapore-first thesis and Malaysia pilot risk controls.",
  },
];

const enterpriseProgramRows = [
  { name: "Mokabara SEA Expansion", role: "Business Analyst", duration: "5 days", status: "Day 2 live", cohort: "120", score: "72" },
  { name: "Sales Pipeline Sprint", role: "Sales Associate", duration: "3 days", status: "Draft", cohort: "64", score: "-" },
  { name: "Customer Escalation Lab", role: "Customer Success", duration: "4 days", status: "Scheduled", cohort: "48", score: "-" },
  { name: "Operations Breakdown Case", role: "Ops Analyst", duration: "5 days", status: "Review", cohort: "82", score: "78" },
];

const simulationTemplateRows = [
  { title: "Market Expansion Analyst", detail: "Country entry, logistics, GTM, pricing, risk", duration: "5 days", skills: "Analysis + strategy" },
  { title: "Sales Pipeline Simulation", detail: "Lead research, qualification, objections, forecast", duration: "3 days", skills: "Sales judgment" },
  { title: "Customer Escalation Scenario", detail: "Complaint triage, account context, response plan", duration: "4 days", skills: "Communication" },
  { title: "Founder Office Sprint", detail: "Ambiguous brief, prioritization, investor-style memo", duration: "5 days", skills: "Ownership" },
];

const stakeholderPersonaRows = [
  { name: "Regional Sales Lead", behavior: "Pushes aggressive launch targets", event: "Asks for channel split by Day 3" },
  { name: "Logistics Manager", behavior: "Raises cost and delivery constraints", event: "Flags Singapore warehouse cost spike" },
  { name: "Finance Reviewer", behavior: "Challenges margin assumptions", event: "Requests break-even sensitivity" },
  { name: "Customer Persona", behavior: "Adds price and warranty objections", event: "Compares local competitor offers" },
  { name: "Leadership Sponsor", behavior: "Changes executive priority", event: "Asks for one-country launch decision" },
  { name: "Retail Partner", behavior: "Negotiates launch support", event: "Requests shelf visibility commitment" },
];

const parameterRows = [
  { label: "Difficulty", value: 72, note: "Intermediate plus" },
  { label: "Ambiguity", value: 64, note: "Some missing data" },
  { label: "Data complexity", value: 68, note: "Market + cost sheets" },
  { label: "Stakeholder pressure", value: 76, note: "Daily prompts" },
  { label: "AI guidance", value: 35, note: "Low hints" },
  { label: "Scoring strictness", value: 82, note: "Hiring-grade" },
];

const governanceRows = [
  { label: "Rubric version", value: "v2.4 locked", active: true },
  { label: "AI score review", value: "Human approval required", active: true },
  { label: "Bias checks", value: "Enabled for shortlist", active: false },
  { label: "Override reason", value: "Mandatory before export", active: false },
];

function MiniField({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div
      className="rounded-lg border px-2.5 py-2 text-left"
      style={{
        background: active ? previewTheme.accentSoft : previewTheme.card,
        borderColor: active ? previewTheme.accentBorder : previewTheme.borderSoft,
      }}
    >
      <p className="text-[9px] font-bold uppercase" style={{ color: previewTheme.textMuted }}>
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-bold" style={{ color: active ? previewTheme.accent : previewTheme.textPrimary }}>
        {value}
      </p>
    </div>
  );
}

function MiniProgress({ label, value, active }: { label: string; value: number; active?: boolean }) {
  return (
    <div className="w-full rounded-lg p-2 text-left">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-[10px] font-semibold" style={{ color: previewTheme.textSecondary }}>
          {label}
        </span>
        <span className="text-[10px] font-bold" style={{ color: active ? previewTheme.accent : previewTheme.textMuted }}>
          {value}%
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full" style={{ background: previewTheme.borderSoft }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: active ? previewTheme.accent : previewTheme.grayBarLight }} />
      </div>
    </div>
  );
}

function getActionOutcome(interaction: PreviewInteraction) {
  const status = interaction.status.toLowerCase();

  if (status.includes("dashboard live")) return "Admins see live programs, participants, review queues, and cohort readiness at a glance.";
  if (status.includes("programs mapped")) return "Admins can open, duplicate, compare, or schedule role-based simulations from the program library.";
  if (status.includes("templates ready")) return "A template can be converted into a full 3-5 day simulation with role, skills, and daily tasks prefilled.";
  if (status.includes("schedule draft")) return "The admin sets cohort, daily unlock time, reviewers, reminders, and publish rules before launch.";
  if (status.includes("parameters open")) return "Simulation behavior can be tuned before launch: ambiguity, AI guidance, difficulty, and scoring strictness.";
  if (status.includes("stakeholders active")) return "AI personas create realistic workplace messages, constraints, and curveballs during the simulation.";
  if (status.includes("program setup open")) return "This is the single setup brief used by the builder, rubric, scheduler, and publish flow.";
  if (status.includes("program brief open")) return "The program brief defines the company, markets, role context, duration, and final candidate output.";
  if (status.includes("daily tasks configured")) return "Candidates receive one workplace task per day across the 3-5 day simulation window.";
  if (status.includes("builder open")) return "The builder generates the daily sequence, resource pack, stakeholder events, and evaluation rubric.";
  if (status.includes("resources ready")) return "Admins control which briefs, sheets, personas, and emails candidates use inside the workspace.";
  if (status.includes("rubric calibrated")) return "Each submission is scored against the eight pillars and mapped to role-readiness signals.";
  if (status.includes("ready to publish")) return "The admin reviews readiness, confirms cohort timing, then publishes without jumping across separate setup pages.";
  if (status.includes("assignment ready")) return "Publishing sends invites, schedules daily unlocks, enables reminders, and opens live monitoring.";
  if (status.includes("live monitoring")) return "Admins can see completion, stuck points, at-risk candidates, and quality signals while the simulation runs.";
  if (status.includes("evidence review")) return "Reviewers inspect candidate submissions, AI notes, skill signals, and shortlist recommendations.";
  if (status.includes("controls locked")) return "Rubrics, score review, bias checks, and override rules are enforced before reports are exported.";
  if (status.includes("insights generated")) return "CorpSim summarizes completion, readiness, top skills, gaps, and recommended follow-up actions.";
  if (status.includes("reports ready")) return "Stakeholder-ready exports can be shared with HR, faculty, placement teams, or leadership.";
  if (status.includes("setup item")) return "This item is edited inside setup and reused automatically by build, evaluation, and publish.";
  if (status.includes("readiness check")) return "The admin can inspect this launch requirement here before pressing publish.";
  if (status.includes("program opened")) return "Program detail is selected; the admin can duplicate, monitor, or move it into setup.";
  if (status.includes("template")) return "Template selection pre-fills role, duration, skills, resources, and rubric structure.";
  if (status.includes("schedule action")) return "Daily unlocks, reviewer access, reminders, and participant invites are queued.";
  if (status.includes("schedule item")) return "The selected day opens as an editable assignment task inside the program plan.";
  if (status.includes("parameter")) return "Future prompts, AI guidance, scoring strictness, and pressure level adjust for the cohort.";
  if (status.includes("persona")) return "This AI stakeholder can message candidates, add constraints, or trigger a curveball.";
  if (status.includes("resource")) return "The selected file becomes part of the candidate workspace and admin evidence pack.";
  if (status.includes("generation")) return "CorpSim drafts daily tasks, resource prompts, stakeholder events, and scoring criteria.";
  if (status.includes("publish")) return "Invites are sent, Day 1 unlocks, and live monitoring becomes active for the cohort.";
  if (status.includes("constraint")) return "The constraint is marked for admin review and can be added into the live simulation.";
  if (status.includes("control")) return "Governance settings update the review flow before scores can be exported.";
  if (status.includes("export")) return "A stakeholder-ready report is prepared for HR, faculty, placement, or leadership review.";
  if (status.includes("advance") || status.includes("review") || status.includes("training")) return "Candidate evidence is opened so reviewers can compare submissions before shortlisting.";

  return "The workspace updates the selected detail so a decision-maker can see what happens next.";
}

function WorkflowModuleButton({
  id,
  label,
  detail,
  icon: Icon,
  onTabChange,
}: {
  id: EnterprisePrototypeTabId;
  label: string;
  detail: string;
  icon: LucideIcon;
  onTabChange: (tabId: EnterprisePrototypeTabId) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onTabChange(id)}
      className="rounded-lg border px-2.5 py-2 text-left transition-colors hover:border-[#F69507]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
      style={{ background: previewTheme.panelElevated, borderColor: previewTheme.borderSoft }}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: previewTheme.accent }} />
        <p className="truncate text-[11px] font-bold" style={{ color: previewTheme.textPrimary }}>
          {label}
        </p>
      </div>
      <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed" style={{ color: previewTheme.textMuted }}>
        {detail}
      </p>
    </button>
  );
}

function EnterpriseAdminWorkspace({
  activeTab,
  activeInteraction,
  onInteract,
  onTabChange,
}: {
  activeTab: EnterprisePrototypeTabId;
  activeInteraction: PreviewInteraction;
  onInteract: (interaction: PreviewInteraction) => void;
  onTabChange: (tabId: EnterprisePrototypeTabId) => void;
}) {
  if (activeTab === "dashboard") {
    return (
      <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid grid-cols-2 gap-2.5">
          <MiniField label="Live programs" value="4 active" active />
          <MiniField label="Participants" value="314" />
          <MiniField label="Review queue" value="38 submissions" active />
          <MiniField label="Avg readiness" value="72 / 100" />
          <WorkflowModuleButton
            id="programs"
            label="Open program library"
            detail="All active, draft, scheduled, and completed role simulations."
            icon={Briefcase}
            onTabChange={onTabChange}
          />
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Today in the workspace" />
          <div className="space-y-2">
            {enterpriseProgramRows.slice(0, 3).map((program, index) => (
              <button
                type="button"
                key={program.name}
                onClick={() =>
                  onInteract({
                    title: program.name,
                    context: `${program.role} program for ${program.cohort} participants. Status: ${program.status}.`,
                    status: "Program opened",
                    metric: program.score === "-" ? program.duration : `${program.score}/100`,
                  })
                }
                className="grid w-full grid-cols-[minmax(0,1fr)_70px_54px] gap-2 rounded-lg border px-2.5 py-2 text-left text-[10px] transition-colors hover:border-[#F69507]/50"
                style={{ background: index === 0 ? previewTheme.accentSoft : previewTheme.panelElevated, borderColor: index === 0 ? previewTheme.accentBorder : previewTheme.borderSoft }}
              >
                <div className="min-w-0">
                  <p className="truncate font-bold" style={{ color: previewTheme.textPrimary }}>{program.name}</p>
                  <p className="mt-0.5 truncate" style={{ color: previewTheme.textMuted }}>{program.role}</p>
                </div>
                <span style={{ color: index === 0 ? previewTheme.accent : previewTheme.textSecondary }}>{program.status}</span>
                <span className="text-right font-bold" style={{ color: previewTheme.textMuted }}>{program.cohort}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "programs") {
    return (
      <div className="rounded-lg border" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
        <div className="grid grid-cols-[minmax(0,1.2fr)_0.8fr_58px_62px] gap-2 border-b px-3 py-2 text-[9px] font-bold uppercase" style={{ borderColor: previewTheme.borderSoft, color: previewTheme.textMuted }}>
          <span>Program</span>
          <span>Role</span>
          <span>Run</span>
          <span className="text-right">CRS</span>
        </div>
        {enterpriseProgramRows.map((program, index) => (
          <button
            type="button"
            key={program.name}
            onClick={() =>
              onInteract({
                title: program.name,
                context: `${program.duration} ${program.role} workflow. Cohort: ${program.cohort}.`,
                status: program.status,
                metric: program.score === "-" ? program.duration : `${program.score}/100`,
              })
            }
            className="grid w-full grid-cols-[minmax(0,1.2fr)_0.8fr_58px_62px] gap-2 border-b px-3 py-2 text-left text-[11px] transition-colors hover:bg-white/[0.04]"
            style={{ background: activeInteraction.title === program.name || index === 0 ? previewTheme.accentSoft : "transparent", borderColor: previewTheme.borderSoft }}
          >
            <span className="truncate font-bold" style={{ color: previewTheme.textPrimary }}>{program.name}</span>
            <span className="truncate" style={{ color: previewTheme.textMuted }}>{program.role}</span>
            <span style={{ color: index === 0 ? previewTheme.accent : previewTheme.textSecondary }}>{program.duration}</span>
            <span className="text-right font-bold" style={{ color: previewTheme.textMuted }}>{program.score}</span>
          </button>
        ))}
      </div>
    );
  }

  if (activeTab === "templates") {
    return (
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {simulationTemplateRows.map((template, index) => (
          <button
            type="button"
            key={template.title}
            onClick={() =>
              onInteract({
                title: template.title,
                context: template.detail,
                status: "Template selected",
                metric: template.duration,
              })
            }
            className="rounded-lg border p-3 text-left transition-colors hover:border-[#F69507]/50"
            style={{ background: index === 0 ? previewTheme.accentSoft : previewTheme.card, borderColor: index === 0 ? previewTheme.accentBorder : previewTheme.borderSoft }}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-black leading-tight" style={{ color: previewTheme.textPrimary }}>{template.title}</p>
              <StatusPill text={template.duration} active={index === 0} />
            </div>
            <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed" style={{ color: previewTheme.textMuted }}>{template.detail}</p>
            <p className="mt-2 text-[10px] font-bold uppercase" style={{ color: index === 0 ? previewTheme.accent : previewTheme.textMuted }}>{template.skills}</p>
          </button>
        ))}
      </div>
    );
  }

  if (activeTab === "schedule") {
    return (
      <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid grid-cols-2 gap-2.5">
          <MiniField label="New program" value="Sales Pipeline Sprint" active />
          <MiniField label="Role" value="Sales Associate" active />
          <MiniField label="Duration" value="3 days" />
          <MiniField label="Daily unlock" value="10:00 AM" />
          <MiniField label="Cohort" value="BBA Final Year" />
          <MiniField label="Reviewers" value="HR + Faculty" />
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Schedule rules" />
          {["Day 1: lead research and ICP fit", "Day 2: discovery call objections", "Day 3: forecast and manager memo"].map((item, index) => (
            <button
              type="button"
              key={item}
              onClick={() =>
                onInteract({
                  title: item,
                  context: "Daily sales simulation task selected",
                  status: "Schedule item opened",
                  metric: `Day ${index + 1}`,
                })
              }
              className="mb-2 flex w-full items-center justify-between rounded-lg border px-2.5 py-2 text-left text-[10px] font-semibold"
              style={{ background: index === 0 ? previewTheme.accentSoft : previewTheme.panelElevated, borderColor: index === 0 ? previewTheme.accentBorder : previewTheme.borderSoft, color: previewTheme.textSecondary }}
            >
              <span>{item}</span>
              <span style={{ color: index === 0 ? previewTheme.accent : previewTheme.textMuted }}>{index === 0 ? "Ready" : "Queued"}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() =>
              onInteract({
                title: "Schedule program",
                context: "Creates daily tasks, reminder cadence, reviewer access, and participant invite links.",
                status: "Schedule action previewed",
                metric: "Ready",
              })
            }
            className="mt-1 inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-[11px] font-black"
            style={{ background: previewTheme.accent, color: previewTheme.bg }}
          >
            Schedule program
          </button>
        </div>
      </div>
    );
  }

  if (activeTab === "parameters") {
    return (
      <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Adjust simulation behavior" />
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {parameterRows.map((item, index) => (
              <button
                type="button"
                key={item.label}
                onClick={() =>
                  onInteract({
                    title: item.label,
                    context: item.note,
                    status: "Parameter adjusted",
                    metric: `${item.value}%`,
                  })
                }
                className="rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/[0.04]"
                style={{ background: index === 3 ? previewTheme.accentSoft : "transparent" }}
              >
                <div className="px-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-[10px] font-semibold" style={{ color: previewTheme.textSecondary }}>
                      {item.label}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: index === 3 ? previewTheme.accent : previewTheme.textMuted }}>
                      {item.value}%
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full" style={{ background: previewTheme.borderSoft }}>
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: index === 3 ? previewTheme.accent : previewTheme.grayBarLight }} />
                  </div>
                </div>
                <p className="px-2 text-[9px] font-semibold uppercase" style={{ color: previewTheme.textMuted }}>{item.note}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
          <SectionTitle title="What this controls" />
          <p className="text-xs font-semibold leading-relaxed" style={{ color: previewTheme.textPrimary }}>
            Admins decide how realistic the pressure feels: missing information, stakeholder interruptions, scoring strictness, daily task unlocks, and AI hint levels.
          </p>
        </div>
      </div>
    );
  }

  if (activeTab === "stakeholders") {
    return (
      <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {stakeholderPersonaRows.map((persona, index) => (
            <button
              type="button"
              key={persona.name}
              onClick={() =>
                onInteract({
                  title: persona.name,
                  context: `${persona.behavior}. ${persona.event}.`,
                  status: "AI persona opened",
                  metric: index === 1 ? "Live" : "Ready",
                })
              }
              className="rounded-lg border p-2.5 text-left transition-colors hover:border-[#F69507]/50"
              style={{ background: index === 1 ? previewTheme.accentSoft : previewTheme.card, borderColor: index === 1 ? previewTheme.accentBorder : previewTheme.borderSoft }}
            >
              <p className="text-xs font-bold" style={{ color: previewTheme.textPrimary }}>{persona.name}</p>
              <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed" style={{ color: previewTheme.textMuted }}>{persona.behavior}</p>
            </button>
          ))}
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Current curveball" />
          <p className="text-xs font-black" style={{ color: previewTheme.textPrimary }}>Logistics Manager</p>
          <p className="mt-2 text-[11px] leading-relaxed" style={{ color: previewTheme.textSecondary }}>
            Singapore warehouse quotes increased by 18%. Candidates must update country priority, margin assumptions, and GTM sequence before Day 3 unlocks.
          </p>
          <div className="mt-3">
            <StatusPill text="Day 2 interruption" active />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "program") {
    return (
      <div className="grid gap-3 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-lg border p-3" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
          <p className="text-[10px] font-bold uppercase" style={{ color: previewTheme.accent }}>
            Launch brief
          </p>
          <h3 className="mt-2 text-base font-black leading-tight" style={{ color: previewTheme.textPrimary }}>
            Mokabara Malaysia + Singapore Expansion
          </h3>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed" style={{ color: previewTheme.textSecondary }}>
            Candidates act as expansion analysts and work through market, logistics, GTM, pricing, risk, and final executive recommendation tasks across a 5-day simulation.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <MiniField label="Role" value="Business Analyst" active />
            <MiniField label="Cohort" value="Final Year Business" />
            <MiniField label="Duration" value="5 days" active />
            <MiniField label="Output" value="Executive recommendation" />
          </div>
          <div className="mt-3">
            <WorkflowModuleButton
              id="templates"
              label="Browse templates"
              detail="Pick a role-ready simulation template before building the program."
              icon={FileText}
              onTabChange={onTabChange}
            />
          </div>
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Setup feeds the full workflow" />
          {[
            ["Template", "Market Expansion Analyst"],
            ["Company context", "Mokabara entering Malaysia + Singapore"],
            ["Resources", "Market brief, logistics sheet, personas, email"],
            ["AI stakeholders", "Sales, logistics, finance, leadership"],
            ["Evaluation", "8-pillar rubric auto-linked"],
          ].map(([label, value], index) => (
            <button
              type="button"
              key={label}
              onClick={() =>
                onInteract({
                  title: label,
                  context: value,
                  status: "Setup item opened",
                  metric: index === 0 ? "Base" : "Ready",
                })
              }
              className="mb-2 grid w-full grid-cols-[88px_minmax(0,1fr)] gap-2 rounded-lg border px-2.5 py-2 text-left text-[10px] transition-colors hover:border-[#F69507]/50"
              style={{ background: index === 0 ? previewTheme.accentSoft : previewTheme.panelElevated, borderColor: index === 0 ? previewTheme.accentBorder : previewTheme.borderSoft }}
            >
              <span className="font-bold uppercase" style={{ color: index === 0 ? previewTheme.accent : previewTheme.textMuted }}>
                {label}
              </span>
              <span className="truncate font-semibold" style={{ color: previewTheme.textSecondary }}>
                {value}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "daily") {
    return (
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="space-y-2.5">
        {mokabaraDailyTasks.map((task, index) => (
          <button
            type="button"
            key={task.day}
            onClick={() =>
              onInteract({
                title: task.title,
                context: task.detail,
                status: `${task.day} selected`,
                metric: task.score,
              })
            }
            className="grid w-full gap-2 rounded-lg border px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-[#F69507]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60 sm:grid-cols-[62px_minmax(0,1fr)_70px]"
            style={{
              background: index === 1 ? previewTheme.accentSoft : previewTheme.card,
              borderColor: index === 1 ? previewTheme.accentBorder : previewTheme.borderSoft,
            }}
          >
            <div>
              <p className="text-[11px] font-black" style={{ color: index === 1 ? previewTheme.accent : previewTheme.textPrimary }}>
                {task.day}
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase" style={{ color: previewTheme.textMuted }}>
                {task.status}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: previewTheme.textPrimary }}>
                {task.title}
              </p>
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed" style={{ color: previewTheme.textMuted }}>
                {task.detail}
              </p>
            </div>
            <StatusPill text={task.score} active={index === 1} />
          </button>
        ))}
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Day 2 live constraints" />
          {["Customs and import duties", "Singapore warehousing cost", "Malaysia last-mile coverage", "Returns management"].map((item, index) => (
            <button
              type="button"
              key={item}
              onClick={() =>
                onInteract({
                  title: item,
                  context: "Operational risk selected for review",
                  status: "Constraint opened",
                })
              }
              className="mb-2 flex w-full items-center justify-between rounded-lg border px-2.5 py-2 text-left text-[10px] font-semibold"
              style={{
                background: index === 1 ? previewTheme.accentSoft : previewTheme.panelElevated,
                borderColor: index === 1 ? previewTheme.accentBorder : previewTheme.borderSoft,
                color: index === 1 ? previewTheme.accent : previewTheme.textSecondary,
              }}
            >
              {item}
              <span style={{ color: previewTheme.textMuted }}>{index === 1 ? "High" : "Med"}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "builder") {
    return (
      <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-2.5">
          <MiniField label="Simulation" value="Mokabara SEA Expansion" active />
          <MiniField label="Duration" value="5 days" active />
          <MiniField label="Daily unlock" value="Enabled" />
          <MiniField label="Role" value="Business Analyst / Expansion Associate" />
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <WorkflowModuleButton
              id="daily"
              label="Daily tasks"
              detail="Review the 3-5 day candidate task sequence."
              icon={ClipboardCheck}
              onTabChange={onTabChange}
            />
            <WorkflowModuleButton
              id="resources"
              label="Resources"
              detail="Briefs, sheets, personas, emails, and channel options."
              icon={FileText}
              onTabChange={onTabChange}
            />
            <WorkflowModuleButton
              id="stakeholders"
              label="AI stakeholders"
              detail="People, constraints, messages, and curveballs."
              icon={Users}
              onTabChange={onTabChange}
            />
          </div>
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Scenario Configuration" />
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <MiniField label="Markets" value="Malaysia + Singapore" active />
            <MiniField label="Industry" value="Travel goods / luggage" />
            <MiniField label="Difficulty" value="Intermediate" />
            <MiniField label="AI stakeholders" value="Logistics, Sales, Finance" active />
          </div>
          <button
            type="button"
            onClick={() =>
              onInteract({
                title: "Generate daily task sequence",
                context: "Creates the 5-day task sequence, resource pack, rubric, and stakeholder events.",
                status: "Generation previewed",
                metric: "AI",
              })
            }
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-bold transition-colors hover:border-[#F69507]/60"
            style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder, color: previewTheme.accent }}
          >
            <Settings className="h-3.5 w-3.5" />
            Generate 5-day simulation
          </button>
        </div>
      </div>
    );
  }

  if (activeTab === "resources") {
    const selectedResource =
      mokabaraResourcePack.find((resource) => resource.title === activeInteraction.title) ?? mokabaraResourcePack[3];

    return (
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {mokabaraResourcePack.map((resource) => {
          const ResourceIcon = resource.icon;
          const selected = selectedResource.title === resource.title;
          return (
            <button
              type="button"
              key={resource.title}
              onClick={() =>
                onInteract({
                  title: resource.title,
                  context: resource.detail,
                  status: "Resource opened",
                  metric: resource.signal,
                })
              }
              className="rounded-lg border p-2.5 text-left transition-colors hover:border-[#F69507]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
              style={{ background: selected ? previewTheme.accentSoft : previewTheme.card, borderColor: selected ? previewTheme.accentBorder : previewTheme.borderSoft }}
            >
              <ResourceIcon className="mb-2 h-3.5 w-3.5" style={{ color: selected ? previewTheme.accent : previewTheme.textMuted }} />
              <p className="text-xs font-bold" style={{ color: previewTheme.textPrimary }}>
                {resource.title}
              </p>
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed" style={{ color: previewTheme.textMuted }}>
                {resource.detail}
              </p>
            </button>
          );
        })}
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
          <SectionTitle title="Resource detail" />
          <p className="text-sm font-black leading-tight" style={{ color: previewTheme.textPrimary }}>
            {selectedResource.title}
          </p>
          <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed" style={{ color: previewTheme.textSecondary }}>
            {selectedResource.detail}
          </p>
          <div className="mt-3 space-y-1.5">
            {selectedResource.bullets.map((bullet) => (
              <div key={bullet} className="rounded-md border px-2.5 py-1.5 text-[10px] font-semibold" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft, color: previewTheme.textSecondary }}>
                {bullet}
              </div>
            ))}
          </div>
          <div className="mt-3">
            <StatusPill text={selectedResource.signal} active />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "rubric") {
    return (
      <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Eight Pillars Measured" />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <MiniProgress label="Market analysis" value={24} active />
            <MiniProgress label="Logistics reasoning" value={16} />
            <MiniProgress label="GTM thinking" value={18} active />
            <MiniProgress label="Financial judgment" value={14} />
            <MiniProgress label="Prioritization" value={10} />
            <MiniProgress label="Communication" value={8} />
            <MiniProgress label="Decision-making" value={6} />
            <MiniProgress label="Executive clarity" value={4} />
          </div>
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
          <SectionTitle title="What good looks like" />
          <p className="text-xs font-semibold leading-relaxed" style={{ color: previewTheme.textPrimary }}>
            Candidate prioritizes one launch market first, supports the choice with logistics and GTM tradeoffs, and writes a clear executive recommendation.
          </p>
          <div className="mt-3">
            <WorkflowModuleButton
              id="parameters"
              label="Tune simulation parameters"
              detail="Difficulty, ambiguity, AI guidance, pressure, and scoring strictness."
              icon={Settings}
              onTabChange={onTabChange}
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "assign") {
    return (
      <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Publish readiness" />
          {[
            ["Program setup", "Role, company, cohort, duration"],
            ["Simulation build", "Daily tasks and AI stakeholders"],
            ["Evaluation rules", "8 pillars and reviewer policy"],
            ["Resources", "Candidate brief, sheets, personas"],
            ["Schedule", "Mon 10:00 AM to Fri 6:00 PM"],
          ].map(([label, value], index) => (
            <button
              type="button"
              key={label}
              onClick={() =>
                onInteract({
                  title: label,
                  context: value,
                  status: "Readiness check opened",
                  metric: "Ready",
                })
              }
              className="mb-2 flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors hover:border-[#F69507]/50"
              style={{ background: index === 4 ? previewTheme.accentSoft : previewTheme.panelElevated, borderColor: index === 4 ? previewTheme.accentBorder : previewTheme.borderSoft }}
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
                <Check className="h-3 w-3" style={{ color: previewTheme.accent }} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold" style={{ color: previewTheme.textPrimary }}>
                  {label}
                </p>
                <p className="truncate text-[10px]" style={{ color: previewTheme.textMuted }}>
                  {value}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Launch controls" />
          <div className="grid grid-cols-2 gap-2.5">
            <MiniField label="Assigned cohort" value="Final Year Business" active />
            <MiniField label="Participants" value="120 candidates" />
            <MiniField label="Daily unlock" value="10:00 AM" active />
            <MiniField label="Reminders" value="Auto-enabled" />
          </div>
          <div className="mt-3 rounded-lg border p-2.5" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
            <p className="text-[10px] font-bold uppercase" style={{ color: previewTheme.accent }}>
              What publish does
            </p>
            <p className="mt-1 text-[11px] font-semibold leading-relaxed" style={{ color: previewTheme.textSecondary }}>
              Sends invites, locks the rubric, schedules the 5 daily tasks, enables AI review, and opens the live monitoring dashboard.
            </p>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <WorkflowModuleButton
              id="schedule"
              label="Schedule rules"
              detail="Daily unlocks, reviewers, reminders, and invite method."
              icon={ClipboardCheck}
              onTabChange={onTabChange}
            />
            <WorkflowModuleButton
              id="governance"
              label="Governance"
              detail="Rubric lock, AI review, bias checks, and override reasons."
              icon={Shield}
              onTabChange={onTabChange}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              onInteract({
                title: "Publish simulation",
                context: "Sends invites, schedules daily unlocks, and activates admin monitoring.",
                status: "Publish action previewed",
                metric: "Ready",
              })
            }
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-[11px] font-black"
            style={{ background: previewTheme.accent, color: previewTheme.bg }}
          >
            Publish simulation
          </button>
        </div>
      </div>
    );
  }

  if (activeTab === "progress") {
    return (
      <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid grid-cols-2 gap-2.5">
          <MiniField label="Day 1 completed" value="92%" active />
          <MiniField label="Day 2 in progress" value="71%" active />
          <MiniField label="At-risk participants" value="14" />
          <MiniField label="Avg submission quality" value="76 / 100" />
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Common stuck point" />
          <p className="text-xs font-bold" style={{ color: previewTheme.textPrimary }}>
            Logistics cost tradeoffs
          </p>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed" style={{ color: previewTheme.textMuted }}>
            Many candidates identified demand but missed customs, return logistics, and last-mile delivery constraints before choosing a market.
          </p>
          <div className="mt-3 space-y-1.5">
            <MiniProgress label="Market evidence submitted" value={92} active />
            <MiniProgress label="Operations model quality" value={64} />
            <MiniProgress label="GTM channel rationale" value={58} />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "evidence") {
    const selectedCandidate =
      mokabaraCandidateEvidence.find((candidate) => candidate.name === activeInteraction.title) ?? mokabaraCandidateEvidence[1];

    return (
      <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-xl border" style={{ borderColor: previewTheme.borderSoft }}>
          <div className="grid grid-cols-[1fr_44px_1fr] gap-2 border-b px-2.5 py-2 text-[9px] font-bold uppercase" style={{ background: previewTheme.panelElevated, borderColor: previewTheme.borderSoft, color: previewTheme.textMuted }}>
            <span>Candidate</span>
            <span>CRS</span>
            <span>Signal</span>
          </div>
          {mokabaraCandidateEvidence.map((candidate) => (
            <button
              type="button"
              key={candidate.name}
              onClick={() =>
                onInteract({
                  title: candidate.name,
                  context: `${candidate.day} submission selected. Strongest signal: ${candidate.signal}.`,
                  status: candidate.recommendation,
                  metric: candidate.crs,
                })
              }
              className="grid w-full grid-cols-[1fr_44px_1fr] gap-2 border-b px-2.5 py-2 text-left text-[11px] transition-colors hover:bg-white/[0.04]"
              style={{ background: selectedCandidate.name === candidate.name ? previewTheme.accentSoft : previewTheme.card, borderColor: previewTheme.borderSoft }}
            >
              <span className="font-bold" style={{ color: previewTheme.textPrimary }}>{candidate.name}</span>
              <span style={{ color: previewTheme.accent }}>{candidate.crs}</span>
              <span className="truncate" style={{ color: previewTheme.textMuted }}>{candidate.signal}</span>
            </button>
          ))}
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
          <SectionTitle title="Evidence preview" />
          <p className="text-xs font-bold" style={{ color: previewTheme.textPrimary }}>
            {selectedCandidate.name} · {selectedCandidate.day}
          </p>
          <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed" style={{ color: previewTheme.textSecondary }}>
            {selectedCandidate.note}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <MiniField label="Decision" value={selectedCandidate.recommendation} active />
            <MiniField label="Signal" value={selectedCandidate.signal} />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "governance") {
    return (
      <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Decision controls" />
          <div className="space-y-2">
            {governanceRows.map((row) => (
              <button
                type="button"
                key={row.label}
                onClick={() =>
                  onInteract({
                    title: row.label,
                    context: row.value,
                    status: row.active ? "Control active" : "Control available",
                    metric: row.active ? "On" : "Set",
                  })
                }
                className="flex w-full items-center justify-between rounded-lg border px-2.5 py-2 text-left text-[10px] font-semibold transition-colors hover:border-[#F69507]/50"
                style={{ background: row.active ? previewTheme.accentSoft : previewTheme.panelElevated, borderColor: row.active ? previewTheme.accentBorder : previewTheme.borderSoft }}
              >
                <span style={{ color: row.active ? previewTheme.accent : previewTheme.textSecondary }}>{row.label}</span>
                <span className="text-right" style={{ color: previewTheme.textMuted }}>{row.value}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
          <SectionTitle title="Audit trail" />
          {["Rubric locked before launch", "AI scores reviewed after Day 5", "Shortlist requires evidence view", "Exports include score explanation"].map((item, index) => (
            <div key={item} className="mb-2 grid grid-cols-[24px_minmax(0,1fr)] gap-2 text-[11px]">
              <span className="font-black" style={{ color: previewTheme.accent }}>0{index + 1}</span>
              <span style={{ color: previewTheme.textSecondary }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "insights") {
    return (
      <div className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid grid-cols-2 gap-2.5">
          <MiniField label="Completion rate" value="87%" active />
          <MiniField label="Cohort readiness" value="72 / 100" active />
          <MiniField label="Top skill" value="Market analysis" />
          <MiniField label="Improvement area" value="Business communication" />
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
          <SectionTitle title="AI-generated insight" />
          <p className="line-clamp-3 text-xs font-semibold leading-relaxed" style={{ color: previewTheme.textPrimary }}>
            Most candidates selected Singapore first because of higher purchasing power, but only 38% accounted for warehousing, duties, and return-cost impact.
          </p>
          <div className="mt-3 space-y-1.5">
            <MiniProgress label="Analysis" value={84} active />
            <MiniProgress label="Operations judgment" value={68} />
            <MiniProgress label="Executive writing" value={61} />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "reports") {
    return (
      <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {[
            { title: "Cohort readiness report", detail: "Skill distribution, completion, and Day 1-5 progression", metric: "PDF" },
            { title: "Shortlist evidence pack", detail: "Candidate-level submissions, signals, and AI notes", metric: "CSV" },
            { title: "Training gap memo", detail: "Where the cohort struggled and what to teach next", metric: "Memo" },
            { title: "Placement handoff", detail: "Shareable decision summary for HR or placement teams", metric: "Link" },
          ].map((report, index) => (
            <button
              type="button"
              key={report.title}
              onClick={() =>
                onInteract({
                  title: report.title,
                  context: report.detail,
                  status: "Export previewed",
                  metric: report.metric,
                })
              }
              className="rounded-lg border p-3 text-left transition-colors hover:border-[#F69507]/50"
              style={{ background: index === 0 ? previewTheme.accentSoft : previewTheme.card, borderColor: index === 0 ? previewTheme.accentBorder : previewTheme.borderSoft }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold" style={{ color: previewTheme.textPrimary }}>{report.title}</p>
                <Download className="h-3.5 w-3.5" style={{ color: index === 0 ? previewTheme.accent : previewTheme.textMuted }} />
              </div>
              <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed" style={{ color: previewTheme.textMuted }}>{report.detail}</p>
            </button>
          ))}
        </div>
        <div className="rounded-lg border p-3" style={{ background: previewTheme.card, borderColor: previewTheme.borderSoft }}>
          <SectionTitle title="Ready to share" />
          <MiniProgress label="Evidence attached" value={96} active />
          <MiniProgress label="Reviewer approvals" value={82} />
          <MiniProgress label="Candidate feedback prepared" value={88} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-lg border p-4" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder }}>
        <p className="text-[10px] font-bold uppercase" style={{ color: previewTheme.accent }}>
          5-day simulation
        </p>
        <h3 className="mt-2 text-lg font-black leading-tight" style={{ color: previewTheme.textPrimary }}>
          Mokabara Malaysia + Singapore Expansion
        </h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed" style={{ color: previewTheme.textSecondary }}>
          Candidates act as expansion analysts and work through market, logistics, GTM, pricing, risk, and final executive recommendation tasks over multiple days.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <MiniField label="Company" value="Mokabara" active />
        <MiniField label="Markets" value="Malaysia + Singapore" />
        <MiniField label="Duration" value="5 days" active />
        <MiniField label="Output" value="Expansion recommendation" />
      </div>
    </div>
  );
}

function PreviewBrowserFrame({
  journeyId,
  stepIndex,
  preview,
  onStepChange,
}: {
  journeyId: JourneyId;
  stepIndex: number;
  preview: PreviewData;
  onStepChange: (stepIndex: number) => void;
}) {
  const items = sidebarItems[journeyId];
  const urlSlug = journeyId === "enterprises" ? "enterprise" : journeyId;
  const defaultEnterpriseTab = outerStepToEnterpriseTab[stepIndex] ?? "dashboard";
  const [activeInteraction, setActiveInteraction] = useState<PreviewInteraction>({
    title: enterpriseTabCopy[defaultEnterpriseTab].title,
    context: enterpriseTabCopy[defaultEnterpriseTab].subtitle,
    status: enterpriseTabCopy[defaultEnterpriseTab].status,
    metric: enterpriseTabCopy[defaultEnterpriseTab].metric,
  });
  const [activeEnterpriseTab, setActiveEnterpriseTab] = useState<EnterprisePrototypeTabId>(defaultEnterpriseTab);
  const activeEnterpriseCopy = enterpriseTabCopy[activeEnterpriseTab];
  const handleEnterpriseTabChange = (tabId: EnterprisePrototypeTabId) => {
    setActiveEnterpriseTab(tabId);
    const nextCopy = enterpriseTabCopy[tabId];
    setActiveInteraction({
      title: nextCopy.title,
      context: nextCopy.subtitle,
      status: nextCopy.status,
      metric: nextCopy.metric,
    });
  };

  useEffect(() => {
    if (journeyId !== "enterprises") {
      setActiveInteraction({
        title: preview.title,
        context: preview.subtitle,
        status: "Live prototype ready",
        metric: "Interactive",
      });
      return;
    }

    const nextTab = outerStepToEnterpriseTab[stepIndex] ?? "dashboard";
    const nextCopy = enterpriseTabCopy[nextTab];
    setActiveEnterpriseTab(nextTab);
    setActiveInteraction({
      title: nextCopy.title,
      context: nextCopy.subtitle,
      status: nextCopy.status,
      metric: nextCopy.metric,
    });
  }, [journeyId, preview.subtitle, preview.title, stepIndex]);

  return (
    <div
      className="relative min-h-[500px] w-full overflow-hidden rounded-2xl border shadow-2xl shadow-black/40 backdrop-blur-xl lg:aspect-[16/8.8] lg:min-h-0"
      style={{
        background: "linear-gradient(145deg, rgba(20,20,20,0.92), rgba(11,11,11,0.86))",
        borderColor: "rgba(164, 164, 164, 0.2)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-white/[0.12] to-transparent" />
      <div className="relative z-20 flex h-10 items-center gap-3 border-b px-4" style={{ background: "rgba(20,20,20,0.72)", borderColor: previewTheme.borderSoft }}>
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

      <div className="relative z-20 flex h-[calc(100%-2.5rem)]">
        <aside className="hidden w-52 flex-col gap-1 overflow-y-auto border-r p-3 [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden" style={{ background: "rgba(11, 11, 11, 0.82)", borderColor: previewTheme.borderSoft }}>
          <div className="mb-3 flex items-center gap-2 px-2">
            <div className="rounded-lg border p-1.5" style={{ background: previewTheme.bg, borderColor: previewTheme.accentBorder }}>
              <Image src="/pidot-logo.png" alt="Pi Dot" width={64} height={18} className="h-4 w-auto" />
            </div>
            <span className="ml-auto rounded border px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: previewTheme.accentSoft, borderColor: previewTheme.accentBorder, color: previewTheme.accent }}>
              Pro
            </span>
          </div>
          {journeyId === "enterprises" ? (
            <>
              {enterprisePrototypeTabs.map((tab) => {
                const TabIcon = tab.icon;
                const active = tab.id === activeEnterpriseTab || enterpriseTabParent[activeEnterpriseTab] === tab.id;

                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => handleEnterpriseTabChange(tab.id)}
                    className="flex items-center gap-2 rounded-lg border-l-2 px-2.5 py-1.5 text-left text-[10px] font-semibold transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
                    style={{
                      background: active ? previewTheme.panelElevated : "transparent",
                      borderLeftColor: active ? previewTheme.accent : "transparent",
                      color: active ? previewTheme.accent : previewTheme.textMuted,
                    }}
                  >
                    <TabIcon className="h-3.5 w-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </>
          ) : (
            items.map((item, index) => {
              const Icon = item.icon;
              const active = index === stepIndex % items.length;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => onStepChange(index)}
                  className="flex items-center gap-2 rounded-lg border-l-2 px-2.5 py-1.5 text-left text-[10px] font-semibold transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
                  style={{
                    background: active ? previewTheme.panelElevated : "transparent",
                    borderLeftColor: active ? previewTheme.accent : "transparent",
                    color: active ? previewTheme.accent : previewTheme.textMuted,
                  }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })
          )}
        </aside>

        <main className="flex-1 overflow-y-auto p-3 [scrollbar-width:none] sm:p-4 md:p-5 [&::-webkit-scrollbar]:hidden" style={{ background: "rgba(11, 11, 11, 0.88)" }}>
          <div className="max-w-4xl">
            <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_230px]">
              <div>
                <h3 className="text-base font-bold md:text-lg" style={{ color: previewTheme.textPrimary }}>
                  {journeyId === "enterprises" ? activeEnterpriseCopy.title : preview.title}
                </h3>
                <p className="mt-1 line-clamp-2 max-w-2xl text-xs leading-relaxed" style={{ color: previewTheme.textMuted }}>
                  {journeyId === "enterprises" ? activeEnterpriseCopy.subtitle : preview.subtitle}
                </p>
                {journeyId === "enterprises" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <StatusPill text="Enterprise Manager" />
                    <StatusPill text={activeEnterpriseCopy.status} active />
                    <StatusPill text="Mokabara 5-day program" />
                  </div>
                )}
              </div>
              <div
                className="rounded-lg border p-2.5 text-left"
                style={{
                  background: "linear-gradient(145deg, rgba(255,177,59,0.12), rgba(255,255,255,0.03))",
                  borderColor: previewTheme.accentBorder,
                }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[10px] font-bold uppercase" style={{ color: previewTheme.accent }}>
                    Action preview
                  </p>
                  {activeInteraction.metric && <StatusPill text={activeInteraction.metric} active />}
                </div>
                <p className="truncate text-xs font-bold" style={{ color: previewTheme.textPrimary }}>
                  {activeInteraction.title}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed" style={{ color: previewTheme.textSecondary }}>
                  {activeInteraction.context}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase" style={{ color: previewTheme.textMuted }}>
                  {activeInteraction.status}
                </p>
                {journeyId === "enterprises" && (
                  <div className="mt-2 rounded-md border px-2 py-1.5" style={{ background: previewTheme.bg, borderColor: previewTheme.borderSoft }}>
                    <p className="text-[9px] font-bold uppercase" style={{ color: previewTheme.textMuted }}>
                      Next in product
                    </p>
                    <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-relaxed" style={{ color: previewTheme.textSecondary }}>
                      {getActionOutcome(activeInteraction)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {journeyId === "enterprises" ? (
              <div className="space-y-4">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
                  {enterprisePrototypeTabs.map((tab) => {
                    const TabIcon = tab.icon;
                    const active = tab.id === activeEnterpriseTab || enterpriseTabParent[activeEnterpriseTab] === tab.id;

                    return (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => handleEnterpriseTabChange(tab.id)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-bold transition-colors hover:border-[#F69507]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB13B]/60"
                        style={{
                          background: active ? previewTheme.accentSoft : previewTheme.card,
                          borderColor: active ? previewTheme.accentBorder : previewTheme.borderSoft,
                          color: active ? previewTheme.accent : previewTheme.textMuted,
                        }}
                      >
                        <TabIcon className="h-3.5 w-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
                <EnterpriseAdminWorkspace
                  activeTab={activeEnterpriseTab}
                  activeInteraction={activeInteraction}
                  onInteract={setActiveInteraction}
                  onTabChange={handleEnterpriseTabChange}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {preview.sections.map((section, index) => (
                  <PreviewSectionRenderer
                    key={`${section.type}-${index}`}
                    section={section}
                    activeTitle={activeInteraction.title}
                    onInteract={setActiveInteraction}
                  />
                ))}
              </div>
            )}
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
        title: "Design the role before you hire",
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
        title: "Simulate your business environment",
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
        title: "Watch candidates perform",
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
        title: "Hire the right candidate",
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
  const [activeStep, setActiveStep] = useState<number>(0);
  const activeJourney = journeyTabs.find((tab) => tab.id === "enterprises") ?? journeyTabs[2];
  const activePreview = activeJourney.steps[activeStep].preview;

  return (
    <section className="bg-[#0B0B0B] px-6 pb-12 pt-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mb-10 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#4A4A4A]/65 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_22px_55px_rgba(0,0,0,0.45),0_0_34px_rgba(246,149,7,0.16)]"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#4A4A4A]/70 bg-[#0B0B0B]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.28),transparent_32%),radial-gradient(circle_at_58%_78%,rgba(246,149,7,0.42),transparent_38%)]" />
              <div className="absolute left-2 top-2 h-3 w-7 rounded-full bg-white/15 blur-[1px]" />
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Everything in your control
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#D6D6D6]">
              From role requirements to final shortlist, you define how candidates are tested, evaluated, and selected in
              an environment that mirrors your real business.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
          <motion.aside
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-xl border border-[#4A4A4A]/60 bg-[#0B0B0B]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl lg:sticky lg:top-24 lg:self-start"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.08] to-transparent" />
            <motion.div
              key="enterprises"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative grid grid-cols-1 gap-2"
            >
              {activeJourney.steps.map((step, index) => {
                const isActive = activeStep === index;
                const StepIcon = step.icon;

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={`group relative flex h-[54px] w-full items-center gap-3 rounded-lg border px-3 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[#F69507]/70 bg-[#F69507]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_0_24px_rgba(246,149,7,0.12)]"
                        : "border-[#4A4A4A]/60 bg-black hover:border-[#A4A4A4]/70"
                    }`}
                  >
                    {isActive && <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#F69507] to-transparent" />}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                        isActive ? "border-[#F69507]/50 bg-[#F69507]/10 text-[#FFB13B]" : "border-[#4A4A4A]/70 bg-[#0B0B0B] text-[#A4A4A4]"
                      }`}
                    >
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <span className="min-w-0 truncate text-[13px] font-bold text-white">{step.title}</span>
                  </button>
                );
              })}
            </motion.div>
          </motion.aside>

          <motion.div
            key={`enterprises-${activeStep}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0"
          >
            <PreviewBrowserFrame
              journeyId="enterprises"
              stepIndex={activeStep}
              preview={activePreview}
              onStepChange={setActiveStep}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
