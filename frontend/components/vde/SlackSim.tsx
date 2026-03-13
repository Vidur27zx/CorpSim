"use client";

import { useState } from "react";
import { Hash, User, Send, AtSign, Smile } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  type: "channel" | "dm";
  unread: number;
}

interface Message {
  id: string;
  channel: string;
  from: string;
  fromTitle: string;
  avatar: string;
  text: string;
  time: string;
  isMention: boolean;
}

const channels: Channel[] = [
  { id: "general", name: "general", type: "channel", unread: 0 },
  { id: "project-alpha", name: "project-alpha", type: "channel", unread: 1 },
  { id: "risk-team", name: "risk-team", type: "channel", unread: 0 },
  { id: "dm-lisa", name: "Lisa Park", type: "dm", unread: 1 },
  { id: "dm-sarah", name: "Sarah Chen", type: "dm", unread: 0 },
];

const allMessages: Record<string, Message[]> = {
  general: [
    { id: "g1", channel: "general", from: "Sarah Chen", fromTitle: "VP", avatar: "SC", text: "Welcome to the team! We have a new BA joining us on the Basel III project. Please give them a warm welcome! 🎉", time: "10:00 AM", isMention: false },
    { id: "g2", channel: "general", from: "Tom Walsh", fromTitle: "Finance Ops", avatar: "TW", text: "Welcome aboard! Looking forward to working together.", time: "10:05 AM", isMention: false },
  ],
  "project-alpha": [
    { id: "p1", channel: "project-alpha", from: "Lisa Park", fromTitle: "Tech PM", avatar: "LP", text: "Team — reminder that the BRD review comments are due by EOD today. Please flag any scope concerns early.", time: "9:30 AM", isMention: false },
    { id: "p2", channel: "project-alpha", from: "Priya Kapoor", fromTitle: "Regulatory", avatar: "PK", text: "I've added some notes on the compliance requirements in Section 3. @student please review when you get a chance.", time: "11:00 AM", isMention: true },
  ],
  "dm-lisa": [
    { id: "d1", channel: "dm-lisa", from: "Lisa Park", fromTitle: "Technology PM", avatar: "LP", text: "Hey! FYI — Section 4.2 references Murex feed integration we discussed deprioritizing last sprint. Worth flagging before Sarah commits to it in scope. Don't quote me though 😅", time: "9:15 AM", isMention: false },
  ],
  "dm-sarah": [
    { id: "s1", channel: "dm-sarah", from: "Sarah Chen", fromTitle: "VP", avatar: "SC", text: "Hi! Can you make sure you're ready for the 2 PM kickoff? Let me know if you have any setup issues.", time: "8:45 AM", isMention: false },
  ],
};

export default function SlackSim() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [messageText, setMessageText] = useState("");

  const messages = allMessages[activeChannel] || [];
  const currentChannel = channels.find((c) => c.id === activeChannel);

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessageText("");
  };

  return (
    <div className="h-full flex bg-white">
      {/* Channel list */}
      <div className="w-56 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 z-10">
        <div className="p-3 border-b border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Channels</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {channels.filter(c => c.type === "channel").map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                activeChannel === ch.id ? "bg-blue-50 text-brand-blue font-bold" : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Hash className="w-3.5 h-3.5" />
              <span className="flex-1 text-left truncate">{ch.name}</span>
              {ch.unread > 0 && (
                <span className="w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm">{ch.unread}</span>
              )}
            </button>
          ))}

          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide pt-4 pb-1 px-2.5">Direct Messages</p>
          {channels.filter(c => c.type === "dm").map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                activeChannel === ch.id ? "bg-blue-50 text-brand-blue font-bold" : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <div className="relative">
                <User className="w-3.5 h-3.5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-slate-50" />
              </div>
              <span className="flex-1 text-left truncate">{ch.name}</span>
              {ch.unread > 0 && (
                <span className="w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm">{ch.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel header */}
        <div className="h-12 border-b border-slate-200 flex items-center px-4 shrink-0 shadow-sm z-10 bg-white">
          <div className="flex items-center gap-2">
            {currentChannel?.type === "channel" ? (
              <Hash className="w-4 h-4 text-slate-400" />
            ) : (
              <User className="w-4 h-4 text-slate-400" />
            )}
            <span className="font-bold text-slate-900 text-sm">{currentChannel?.name}</span>
          </div>
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 group ${msg.isMention ? "bg-amber-50/50 -mx-4 px-4 py-2 rounded-lg border-l-4 border-amber-400/50" : ""}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-slate-900">{msg.from}</span>
                  <span className="text-[10px] font-bold text-slate-400">{msg.time}</span>
                </div>
                <p className="text-sm text-slate-700 font-medium mt-1 leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Compose */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-end gap-2 bg-white border border-slate-200 rounded-xl p-2 shadow-sm focus-within:border-brand-blue/30 focus-within:ring-1 focus-within:ring-brand-blue/30 transition-all">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Message ${currentChannel?.type === "channel" ? "#" : ""}${currentChannel?.name}...`}
              rows={1}
              className="flex-1 bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none py-1.5 px-3"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="flex items-center gap-1 shrink-0 px-1 pb-1">
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <AtSign className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <Smile className="w-4 h-4" />
              </button>
              <button
                onClick={handleSend}
                disabled={!messageText.trim()}
                className="p-1.5 rounded-lg bg-brand-blue text-white hover:bg-blue-700 transition-colors disabled:opacity-50 ml-1 shadow-sm shadow-blue-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
