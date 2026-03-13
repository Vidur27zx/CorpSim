"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Inbox,
  Send,
  Archive,
  Trash2,
  Star,
  Paperclip,
  Reply,
  ChevronRight,
  Search,
  MoreHorizontal,
  Clock,
  AlertCircle,
} from "lucide-react";

interface EmailItem {
  id: string;
  from: string;
  fromTitle: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  urgency: number;
  hasAttachment: boolean;
  requiresResponse: boolean;
  deadline: string | null;
}

const demoEmails: EmailItem[] = [
  {
    id: "1",
    from: "Sarah Chen",
    fromTitle: "VP, Business Analysis",
    subject: "Welcome to Basel III Project — BRD Review Needed",
    preview: "Welcome to the team! I've attached the BRD v0.9 for your review...",
    body: `Hi,\n\nWelcome to the Basel III Finalization project team! We're glad to have you on board as our Business Analyst.\n\nI've attached the Business Requirements Document (BRD) v0.9 for the Regulatory Reporting System Upgrade. Please review it thoroughly by end of day today and come prepared with 3-5 clarifying questions for our kickoff meeting at 2:00 PM.\n\nA few things to note:\n- This is a high-visibility project — David Martinez (MD, Risk Technology) is watching closely\n- Pay special attention to Section 4.2 on data feed integrations\n- Lisa Park (Technology PM) can help with any technical questions\n\nLooking forward to working with you.\n\nBest,\nSarah Chen\nVP, Business Analysis\nJPMorgan Chase`,
    time: "8:30 AM",
    isRead: false,
    isStarred: true,
    urgency: 4,
    hasAttachment: true,
    requiresResponse: true,
    deadline: "5:00 PM",
  },
  {
    id: "2",
    from: "David Martinez",
    fromTitle: "Managing Director, Risk Technology",
    subject: "FYI — Regulatory deadline moved",
    preview: "After discussion with the regulatory team, the deadline has been...",
    body: `Team,\n\nAfter discussions with the regulatory affairs team, I wanted to flag that the Basel III implementation deadline has been pulled forward by approximately 3 weeks. The new target is April 15th.\n\nNo immediate action required, but please factor this into your planning and ensure all workstreams are aligned to the accelerated timeline.\n\nI'll discuss this further in our next steering committee.\n\nRegards,\nDavid Martinez\nManaging Director, Risk Technology`,
    time: "5:00 PM",
    isRead: false,
    isStarred: false,
    urgency: 3,
    hasAttachment: false,
    requiresResponse: true,
    deadline: "9:00 AM Tomorrow",
  },
  {
    id: "3",
    from: "HR Team",
    fromTitle: "Human Resources",
    subject: "Welcome to JPMorgan Chase — Onboarding Checklist",
    preview: "Welcome! Please complete the following onboarding items...",
    body: `Welcome to JPMorgan Chase!\n\nPlease complete the following onboarding checklist:\n1. Update your employee profile\n2. Complete mandatory compliance training\n3. Set up VPN and security credentials\n4. Review the Code of Conduct\n\nBest,\nHR Team`,
    time: "7:00 AM",
    isRead: true,
    isStarred: false,
    urgency: 1,
    hasAttachment: false,
    requiresResponse: false,
    deadline: null,
  },
];

const folders = [
  { id: "inbox", name: "Inbox", icon: Inbox, count: 2 },
  { id: "sent", name: "Sent", icon: Send, count: 0 },
  { id: "starred", name: "Starred", icon: Star, count: 1 },
  { id: "archive", name: "Archive", icon: Archive, count: 0 },
  { id: "trash", name: "Trash", icon: Trash2, count: 0 },
];

export default function InboxAI() {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(demoEmails[0]);
  const [isComposing, setIsComposing] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSend = () => {
    if (!replyText.trim()) return;
    // In production, this sends to the API for AI grading
    setReplyText("");
    setIsComposing(false);
  };

  return (
    <div className="h-full flex">
      {/* Folder sidebar */}
      <div className="w-48 bg-slate-50 border-r border-slate-200 p-3 flex flex-col shrink-0 z-10">
        <button
          onClick={() => setIsComposing(true)}
          className="w-full bg-brand-blue text-white text-sm font-bold py-2.5 rounded-lg mb-4 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
        >
          Compose
        </button>

        <div className="space-y-0.5">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(folder.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeFolder === folder.id ? "bg-blue-50 text-brand-blue font-bold" : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <folder.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{folder.name}</span>
              {folder.count > 0 && (
                <span className="text-xs font-bold">{folder.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Email list */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 z-10">
        <div className="p-3 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {demoEmails.map((email) => (
            <button
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`w-full text-left p-3 border-b border-slate-100 transition-colors ${
                selectedEmail?.id === email.id ? "bg-blue-50/50 border-l-4 border-l-brand-blue pl-2" : "border-l-4 border-l-transparent hover:bg-slate-50 pl-3"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm ${email.isRead ? "text-slate-600 font-medium" : "text-slate-900 font-bold"}`}>
                  {email.from}
                </span>
                <span className={`text-[10px] ml-auto font-medium ${email.isRead ? "text-slate-400" : "text-brand-blue"}`}>{email.time}</span>
              </div>
              <p className={`text-xs mb-1 line-clamp-1 ${email.isRead ? "text-slate-500 font-medium" : "text-slate-900 font-bold"}`}>
                {email.subject}
              </p>
              <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{email.preview}</p>
              <div className="flex items-center gap-2 mt-2">
                {email.requiresResponse && (
                  <span className="text-[9px] bg-amber-50 border border-amber-200 text-amber-700 font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" /> Response needed
                  </span>
                )}
                {email.hasAttachment && (
                  <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                )}
                {email.isStarred && (
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Email reader + composer */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedEmail ? (
          <>
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">{selectedEmail.subject}</h2>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        {selectedEmail.from.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold">{selectedEmail.from}</p>
                        <p className="text-xs text-slate-500 font-medium">{selectedEmail.fromTitle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500">{selectedEmail.time}</p>
                    {selectedEmail.deadline && (
                      <p className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-sm flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3" /> Reply by {selectedEmail.deadline}
                      </p>
                    )}
                  </div>
                </div>

                {selectedEmail.hasAttachment && (
                  <div className="bg-slate-50 rounded-xl p-3 mb-6 flex items-center gap-3 border border-slate-200 w-fit hover:border-brand-blue/30 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                    <div className="bg-white p-2 rounded-lg border border-slate-200 group-hover:border-brand-blue/20">
                      <Paperclip className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900 font-bold">BRD_v0.9_Basel_III.pdf</p>
                      <p className="text-xs text-slate-500 font-medium">2.4 MB — Click to open in DocVault</p>
                    </div>
                  </div>
                )}

                <div className="text-sm text-slate-700 font-medium font-email leading-relaxed whitespace-pre-line">
                  {selectedEmail.body}
                </div>
              </div>
            </div>

            {/* Reply area */}
            <div className="border-t border-slate-200 p-4 bg-slate-50/50">
              {isComposing ? (
                <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Reply className="w-3.5 h-3.5" /> Replying to <span className="text-brand-navy">{selectedEmail.from}</span>
                  </div>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply... (AI will grade your response)"
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 font-medium font-email placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-blue/50 focus:border-brand-blue/50 resize-none transition-colors shadow-inner"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-brand-blue transition-colors border border-transparent hover:border-slate-200">
                        <Paperclip className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsComposing(false)}
                        className="text-sm font-bold text-slate-500 hover:text-slate-900 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSend}
                        disabled={!replyText.trim()}
                        className="bg-brand-blue text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm shadow-blue-500/20"
                      >
                        <Send className="w-3.5 h-3.5" /> Send & Grade
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsComposing(true)}
                  className="w-full text-left p-4 rounded-xl bg-white border border-slate-200 text-slate-500 font-medium text-sm hover:border-brand-blue/30 hover:shadow-sm transition-all"
                >
                  Click to reply to {selectedEmail.from}...
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-sm">
            Select an email to read
          </div>
        )}
      </div>
    </div>
  );
}
