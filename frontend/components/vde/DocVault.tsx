"use client";

import { useState } from "react";
import {
  Folder,
  FileText,
  FilePlus,
  ChevronRight,
  ChevronDown,
  Save,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  Heading1,
  Heading2,
  Send,
} from "lucide-react";

interface DocFile {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: DocFile[];
  content?: string;
}

const fileTree: DocFile[] = [
  {
    id: "project",
    name: "Basel III Project",
    type: "folder",
    children: [
      {
        id: "brd",
        name: "BRD_v0.9.md",
        type: "file",
        content: `# Business Requirements Document v0.9\n## Basel III Finalization — Regulatory Reporting System Upgrade\n\n### 1. Executive Summary\nThis document outlines the business requirements for upgrading the regulatory reporting system to comply with Basel III Finalization standards.\n\n### 2. Project Scope\n- Upgrade risk-weighted asset calculations\n- Implement standardized approach for credit risk\n- Update operational risk framework\n- Enhance market risk reporting\n\n### 3. Stakeholders\n- **Project Sponsor:** David Martinez, MD Risk Technology\n- **Business Lead:** Sarah Chen, VP Business Analysis\n- **Compliance Lead:** Priya Kapoor, Director Regulatory Compliance\n- **Technology PM:** Lisa Park\n\n### 4. Technical Requirements\n\n#### 4.1 Data Pipeline Updates\nExisting ETL processes must be modified to support new risk metrics.\n\n#### 4.2 Murex Feed Integration\n**[NOTE: This section references Murex feed integration that may be deprioritized]**\nIntegrate Murex trading system feeds for real-time position data.\n\n#### 4.3 Reporting Dashboard\nNew Power BI dashboards for regulatory reporting.\n\n### 5. Timeline\n- Phase 1: Q1 2024 (Requirements & Design)\n- Phase 2: Q2 2024 (Development)\n- Phase 3: Q3 2024 (UAT & Go-Live)\n\n### 6. Risks\n- Regulatory timeline changes\n- Data quality dependencies\n- Resource availability`,
      },
      {
        id: "status",
        name: "Status_Report.md",
        type: "file",
        content: "# Weekly Status Report\n\n## Week 1\n\n**Status:** On Track\n\n### Completed\n- [ ] Add completed items here\n\n### In Progress\n- [ ] BRD Review\n- [ ] Stakeholder alignment\n\n### Blockers\n- None currently",
      },
      {
        id: "meeting-notes",
        name: "Meeting Notes",
        type: "folder",
        children: [
          { id: "mn1", name: "Kickoff_Notes.md", type: "file", content: "# Kickoff Meeting Notes\n\nDate: Day 1, 2:00 PM\n\n## Attendees\n- Sarah Chen\n- David Martinez\n- Priya Kapoor\n- Lisa Park\n\n## Key Points\n- Add notes here..." },
        ],
      },
    ],
  },
  {
    id: "templates",
    name: "Templates",
    type: "folder",
    children: [
      { id: "t1", name: "Change_Control.md", type: "file", content: "# Change Control Document\n\n## Change ID: [TBD]\n## Date: \n## Requested By: \n\n### Change Description\n\n### Impact Assessment\n\n### Approval\n- [ ] Business Lead\n- [ ] Technology Lead\n- [ ] Compliance" },
    ],
  },
];

export default function DocVault() {
  const [selectedFile, setSelectedFile] = useState<DocFile | null>(null);
  const [content, setContent] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["project"]));

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectFile = (file: DocFile) => {
    if (file.type === "file") {
      setSelectedFile(file);
      setContent(file.content || "");
    }
  };

  const renderTree = (files: DocFile[], depth: number = 0) => (
    <div className="space-y-0.5">
      {files.map((file) => (
        <div key={file.id}>
          <button
            onClick={() => file.type === "folder" ? toggleFolder(file.id) : selectFile(file)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
              selectedFile?.id === file.id ? "bg-blue-50 text-brand-blue font-bold" : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100"
            }`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
          >
            {file.type === "folder" ? (
              <>
                {expandedFolders.has(file.id) ? <ChevronDown className="w-3 h-3 text-slate-400" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
                <Folder className="w-3.5 h-3.5 text-brand-blue" />
              </>
            ) : (
              <>
                <span className="w-3" />
                <FileText className="w-3.5 h-3.5 text-slate-400" />
              </>
            )}
            <span className="truncate">{file.name}</span>
          </button>
          {file.type === "folder" && expandedFolders.has(file.id) && file.children && (
            renderTree(file.children, depth + 1)
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex bg-white">
      {/* File tree */}
      <div className="w-60 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 z-10">
        <div className="p-3 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Files</span>
          <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-brand-blue transition-colors">
            <FilePlus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {renderTree(fileTree)}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {selectedFile ? (
          <>
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-200 flex items-center px-4 gap-1 shrink-0 bg-white shadow-sm z-10">
              <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"><Bold className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"><Italic className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"><Underline className="w-4 h-4" /></button>
              <div className="w-px h-5 bg-slate-200 mx-2" />
              <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"><Heading1 className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"><Heading2 className="w-4 h-4" /></button>
              <div className="w-px h-5 bg-slate-200 mx-2" />
              <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"><List className="w-4 h-4" /></button>
              <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"><ListOrdered className="w-4 h-4" /></button>
              <div className="flex-1" />
              <button className="flex items-center gap-1.5 text-xs font-bold text-brand-blue bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors shadow-sm">
                <Send className="w-3.5 h-3.5" /> Submit for Review
              </button>
              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <Save className="w-3.5 h-3.5" /> Save
              </button>
            </div>

            {/* Editor area */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
              <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm min-h-[800px]">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full min-h-[700px] bg-transparent text-sm text-slate-800 font-medium font-mono leading-relaxed focus:outline-none resize-none"
                  spellCheck
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 font-medium text-sm bg-slate-50/50">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Select a file from the tree to edit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
