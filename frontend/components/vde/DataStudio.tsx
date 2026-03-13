"use client";

import { useState } from "react";
import { Play, Table, Code, Download } from "lucide-react";

const sampleData = [
  ["Asset Class", "Exposure ($M)", "RWA ($M)", "Capital Req ($M)", "Risk Weight"],
  ["Corporate Bonds", "1,250", "875", "70.0", "70%"],
  ["Sovereign Debt", "800", "0", "0.0", "0%"],
  ["Retail Mortgages", "2,100", "735", "58.8", "35%"],
  ["SME Loans", "450", "337.5", "27.0", "75%"],
  ["Equity Holdings", "300", "450", "36.0", "150%"],
  ["Derivatives", "180", "270", "21.6", "150%"],
];

const sampleSQL = `SELECT asset_class, SUM(exposure_amount) as total_exposure,
  SUM(rwa_amount) as total_rwa
FROM risk_positions
WHERE reporting_date = CURRENT_DATE
GROUP BY asset_class ORDER BY total_rwa DESC;`;

export default function DataStudio() {
  const [activeTab, setActiveTab] = useState<"spreadsheet" | "sql">("spreadsheet");
  const [sqlQuery, setSqlQuery] = useState(sampleSQL);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="h-12 border-b border-slate-200 bg-white shadow-sm flex items-center px-4 gap-2 shrink-0 z-10">
        <button onClick={() => setActiveTab("spreadsheet")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === "spreadsheet" ? "bg-blue-50 text-brand-blue" : "text-slate-500 hover:text-slate-900"}`}>
          <Table className="w-4 h-4" /> Spreadsheet
        </button>
        <button onClick={() => setActiveTab("sql")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${activeTab === "sql" ? "bg-blue-50 text-brand-blue" : "text-slate-500 hover:text-slate-900"}`}>
          <Code className="w-4 h-4" /> SQL Editor
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 px-3 py-1.5 rounded-lg transition-colors shadow-sm"><Download className="w-3.5 h-3.5" /> Export</button>
      </div>
      {activeTab === "spreadsheet" ? (
        <div className="flex-1 overflow-auto p-4 bg-white">
          <table className="w-full border-collapse bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden block">
            <thead className="w-full table"><tr>{sampleData[0].map((h, i) => (<th key={i} className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider text-left px-4 py-3 border-b border-slate-200 sticky top-0">{h}</th>))}</tr></thead>
            <tbody className="w-full table">{sampleData.slice(1).map((row, ri) => (<tr key={ri} className="hover:bg-slate-50/50 transition-colors">{row.map((cell, ci) => (<td key={ci} className={`text-xs px-4 py-3 border-b border-slate-100 ${ci === 0 ? "text-slate-900 font-bold" : "text-slate-700 font-medium font-mono"}`}>{cell}</td>))}</tr>))}</tbody>
          </table>
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-slate-50">
          <div className="flex-1 p-6">
            <div className="w-full h-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">data_query.sql</span>
              </div>
              <textarea value={sqlQuery} onChange={(e) => setSqlQuery(e.target.value)} className="flex-1 w-full bg-transparent p-4 text-sm font-medium text-slate-800 font-mono focus:outline-none resize-none leading-relaxed" spellCheck={false} />
            </div>
          </div>
          <div className="p-4 border-t border-slate-200 bg-white shadow-[0_-1px_2px_rgba(0,0,0,0.02)] z-10 flex items-center justify-end">
            <button className="flex items-center gap-2 bg-brand-blue text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"><Play className="w-4 h-4 fill-current" /> Run Query</button>
          </div>
        </div>
      )}
    </div>
  );
}
