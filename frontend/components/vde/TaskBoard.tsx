"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, CheckCircle, GripVertical, User } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignedBy: string;
  status: "todo" | "in_progress" | "done" | "overdue";
}

const initialTasks: Task[] = [
  { id: "t1", title: "Review BRD v0.9 and add comments", description: "Thoroughly review the Basel III BRD v0.9 document. Focus on Section 4.2.", deadline: "5:00 PM Today", priority: "high", assignedBy: "Sarah Chen", status: "todo" },
  { id: "t2", title: "Prepare kickoff meeting questions", description: "Prepare 3-5 clarifying questions for the 2PM kickoff meeting.", deadline: "1:30 PM Today", priority: "high", assignedBy: "Sarah Chen", status: "todo" },
  { id: "t3", title: "Set up project folder structure", description: "Create folder structure in DocVault for project artifacts.", deadline: "End of Week", priority: "medium", assignedBy: "Sarah Chen", status: "todo" },
];

const columns = [
  { id: "todo", title: "To Do", color: "text-slate-500" },
  { id: "in_progress", title: "In Progress", color: "text-brand-blue font-bold" },
  { id: "done", title: "Done", color: "text-emerald-600 font-bold" },
  { id: "overdue", title: "Overdue", color: "text-red-500 font-bold" },
] as const;

const priorityConfig = {
  urgent: { bg: "bg-red-50 border border-red-200", text: "text-red-700 font-bold", label: "Urgent" },
  high: { bg: "bg-amber-50 border border-amber-200", text: "text-amber-700 font-bold", label: "High" },
  medium: { bg: "bg-blue-50 border border-blue-200", text: "text-brand-blue font-bold", label: "Medium" },
  low: { bg: "bg-slate-100 border border-slate-200", text: "text-slate-600 font-bold", label: "Low" },
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDrop = (columnId: Task["status"]) => {
    if (draggedTask) {
      moveTask(draggedTask, columnId);
      setDraggedTask(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="h-12 border-b border-slate-200 bg-white flex items-center px-4 shrink-0 shadow-sm z-10">
        <h2 className="text-sm font-bold text-slate-900">TaskBoard</h2>
        <span className="ml-2 text-xs font-semibold text-slate-500">{tasks.length} tasks</span>
      </div>

      {/* Kanban columns */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map((col) => {
            const columnTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="w-72 flex flex-col shrink-0"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(col.id)}
              >
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span className={`text-sm font-bold ${col.color}`}>{col.title}</span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-1.5 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex-1 space-y-2 overflow-y-auto">
                  {columnTasks.map((task) => {
                    const prio = priorityConfig[task.priority];
                    return (
                      <motion.div
                        key={task.id}
                        layout
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        className="bg-white border border-slate-200 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-brand-blue/30 transition-all shadow-sm group hover:shadow-md"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-bold text-slate-900 leading-tight flex-1">
                            {task.title}
                          </h4>
                          <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors shrink-0 ml-2" />
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-3 line-clamp-2">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${prio.bg} ${prio.text}`}>
                            {prio.label}
                          </span>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-2.5 h-2.5 text-slate-400" /> {task.deadline}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-100">
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-500">{task.assignedBy}</span>
                        </div>
                      </motion.div>
                    );
                  })}

                  {columnTasks.length === 0 && (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400">
                      Drop tasks here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
