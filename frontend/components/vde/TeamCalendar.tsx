"use client";

import { CalendarDays, Clock, Video, FileText, AlertTriangle } from "lucide-react";

interface CalEvent {
  id: string;
  title: string;
  type: "meeting" | "deadline" | "deliverable";
  time: string;
  duration?: string;
  day: string;
  color: string;
}

const events: CalEvent[] = [
  { id: "1", title: "Project Kickoff Call", type: "meeting", time: "2:00 PM", duration: "45 min", day: "Mon", color: "brand-blue" },
  { id: "2", title: "BRD Review Due", type: "deadline", time: "5:00 PM", day: "Mon", color: "red-500" },
  { id: "3", title: "Stakeholder 1:1 — Priya", type: "meeting", time: "10:30 AM", duration: "30 min", day: "Tue", color: "brand-blue" },
  { id: "4", title: "Scope Change Comms Due", type: "deadline", time: "9:00 AM", day: "Wed", color: "red-500" },
  { id: "5", title: "Status Report Due", type: "deliverable", time: "12:00 PM", day: "Wed", color: "emerald-500" },
  { id: "6", title: "Final Walkthrough", type: "meeting", time: "3:00 PM", duration: "30 min", day: "Wed", color: "brand-blue" },
];

const colorMap: Record<string, string> = {
  "brand-blue": "bg-blue-50 border-brand-blue text-brand-blue shadow-sm",
  "red-500": "bg-red-50 border-red-500 text-red-700 shadow-sm",
  "emerald-500": "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm",
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

const typeIcons = { meeting: Video, deadline: AlertTriangle, deliverable: FileText };

export default function TeamCalendar() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="h-12 border-b border-slate-200 bg-white shadow-sm flex items-center px-4 shrink-0 z-10">
        <CalendarDays className="w-4 h-4 text-brand-blue mr-2" />
        <h2 className="text-sm font-bold text-slate-900">Week View — Day 1-3</h2>
        <div className="flex-1" />
        <div className="flex gap-4 text-[10px] font-bold text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(37,99,235,0.4)]" /> Meeting</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" /> Deadline</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" /> Deliverable</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-6 min-h-full">
          {/* Time column */}
          <div className="border-r border-slate-200 bg-slate-50 shrink-0">
            <div className="h-10 border-b border-slate-200" />
            {hours.map((h) => (
              <div key={h} className="h-16 border-b border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-400 font-mono text-right">{h}</div>
            ))}
          </div>
          {/* Day columns */}
          {days.map((day) => {
            const dayEvents = events.filter((e) => e.day === day);
            return (
              <div key={day} className="border-r border-slate-200 relative bg-white">
                <div className="h-10 border-b border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 bg-slate-50/90 backdrop-blur-sm sticky top-0 z-10">{day}</div>
                {hours.map((h) => (
                  <div key={h} className="h-16 border-b border-slate-100" />
                ))}
                {/* Events overlay */}
                {dayEvents.map((ev) => {
                  const Icon = typeIcons[ev.type];
                  const colorClass = colorMap[ev.color];
                  return (
                    <div key={ev.id} className={`absolute left-1 right-1 border-l-[3px] rounded-r-md px-2 py-1.5 cursor-pointer hover:opacity-90 transition-opacity ${colorClass}`}
                      style={{ top: `${40 + getTimeOffset(ev.time)}px` }}>
                      <p className="text-[10px] font-bold truncate flex items-center gap-1.5">
                        <Icon className="w-3 h-3 shrink-0" /> {ev.title}
                      </p>
                      <p className="text-[9px] font-medium opacity-80 mt-0.5">{ev.time}{ev.duration ? ` · ${ev.duration}` : ""}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getTimeOffset(time: string): number {
  const [h, rest] = time.split(":");
  const [m, period] = rest.split(" ");
  let hour = parseInt(h);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return (hour - 8) * 64 + (parseInt(m) / 60) * 64;
}
