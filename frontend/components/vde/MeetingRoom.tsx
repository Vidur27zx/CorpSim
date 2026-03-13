"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Video, Mic, MicOff, Send, Users, FileText, Clock } from "lucide-react";

interface Attendee {
  id: string;
  name: string;
  title: string;
  avatar: string;
  isSpeaking: boolean;
}

interface ChatMessage {
  id: string;
  speaker: string;
  text: string;
  isStudent: boolean;
  time: string;
}

const meetingAttendees: Attendee[] = [
  { id: "sarah", name: "Sarah Chen", title: "VP, Business Analysis", avatar: "SC", isSpeaking: false },
  { id: "david", name: "David Martinez", title: "MD, Risk Technology", avatar: "DM", isSpeaking: false },
  { id: "priya", name: "Priya Kapoor", title: "Dir, Regulatory Compliance", avatar: "PK", isSpeaking: false },
  { id: "lisa", name: "Lisa Park", title: "Technology PM", avatar: "LP", isSpeaking: false },
];

const agenda = [
  "Project overview and timeline",
  "Role assignments and expectations",
  "Key deliverables for Phase 1",
  "Student Q&A — clarifying questions",
  "Next steps and action items",
];

const initialMessages: ChatMessage[] = [
  { id: "1", speaker: "Sarah Chen", text: "Good afternoon, everyone. Thanks for joining the Basel III project kickoff. Let me start with a quick overview of where we are and where we need to get to.", time: "2:00 PM", isStudent: false },
  { id: "2", speaker: "Sarah Chen", text: "As you know, the regulatory deadline is approaching and we need to upgrade our reporting systems to comply with Basel III Finalization standards. This is a Tier 1 priority for the firm.", time: "2:02 PM", isStudent: false },
  { id: "3", speaker: "David Martinez", text: "I want to emphasize — the board is watching this closely. We cannot afford delays. I need everyone operating at full speed from day one.", time: "2:04 PM", isStudent: false },
  { id: "4", speaker: "Sarah Chen", text: "Absolutely. Now, I'd like to turn to our new BA who's joining the team. As our new Business Analyst, would you like to share your initial questions after reviewing the BRD?", time: "2:06 PM", isStudent: false },
];

export default function MeetingRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isMeetingActive, setIsMeetingActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      speaker: "You",
      text: inputText,
      isStudent: true,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    // AI would respond here via API
  };

  return (
    <div className="h-full flex bg-slate-50/50">
      {/* Main meeting area */}
      <div className="flex-1 flex flex-col">
        {/* Video tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 shrink-0 bg-white border-b border-slate-200 shadow-sm z-10">
          {meetingAttendees.map((attendee) => (
            <div
              key={attendee.id}
              className={`relative bg-slate-50 rounded-xl aspect-video flex items-center justify-center border ${
                attendee.isSpeaking ? "border-brand-blue ring-2 ring-brand-blue/20 shadow-sm" : "border-slate-200 shadow-sm"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-sm">
                {attendee.avatar}
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-900 truncate">{attendee.name}</p>
                <p className="text-[10px] font-medium text-slate-500 truncate">{attendee.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat / transcript area */}
        <div className="flex-1 overflow-y-auto px-4 pb-2 space-y-3 pt-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.isStudent ? "flex-row-reverse" : ""}`}>
              <div className={`max-w-md rounded-xl px-4 py-3 shadow-sm ${
                msg.isStudent
                  ? "bg-brand-blue text-white border border-blue-600"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}>
                {!msg.isStudent && (
                  <p className="text-xs font-bold text-brand-blue mb-1">{msg.speaker}</p>
                )}
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1.5 font-bold ${msg.isStudent ? "text-blue-200" : "text-slate-400"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <div className="flex gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2.5 rounded-xl transition-colors border ${isMuted ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-900"}`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your response to the meeting..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all shadow-inner"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="bg-brand-blue text-white font-bold px-5 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2 text-sm shadow-sm shadow-blue-500/20"
            >
              <Send className="w-4 h-4" /> Respond
            </button>
          </div>
        </div>
      </div>

      {/* Side panel — Agenda */}
      <div className="w-64 bg-slate-50 border-l border-slate-200 flex flex-col shrink-0 z-10">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-blue" /> Meeting Agenda
          </h3>
        </div>
        <div className="flex-1 p-4 space-y-3">
          {agenda.map((item, i) => (
            <div key={i} className="flex gap-2 text-xs">
              <span className="text-brand-blue font-bold w-4 shrink-0">{i + 1}.</span>
              <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Users className="w-4 h-4" />
            <span>{meetingAttendees.length + 1} participants</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mt-2">
            <Clock className="w-4 h-4" />
            <span>45 min meeting</span>
          </div>
        </div>
      </div>
    </div>
  );
}
