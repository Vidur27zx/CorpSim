export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string | null;
  university: string | null;
  degree: string | null;
  grad_year: number | null;
  linkedin_url: string | null;
  avatar_url: string | null;
  crs_score: number;
  crs_breakdown: Record<string, number> | null;
  streak_days: number;
  plan_tier: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SimulationTemplate {
  id: string;
  partner_id: string | null;
  role: string | null;
  company_name: string | null;
  industry: string | null;
  difficulty: string | null;
  duration_days: number;
  title: string | null;
  description: string | null;
  tools_enabled: Record<string, boolean> | null;
  is_partner: boolean;
  min_crs_cert: number;
  created_at: string;
}

export interface Simulation {
  id: string;
  user_id: string;
  template_id: string;
  status: SimulationStatus;
  current_day: number;
  difficulty: string;
  state: SimulationState | null;
  score_breakdown: Record<string, number> | null;
  final_crs: number | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export type SimulationStatus =
  | "created"
  | "day_active"
  | "day_ended"
  | "awaiting_input"
  | "meeting_in_progress"
  | "paused"
  | "completed"
  | "abandoned";

export interface SimulationState {
  emails: Email[];
  slack_messages: SlackMessage[];
  tasks: TaskItem[];
  documents: Document[];
  meetings: Meeting[];
  calendar_events: CalendarEvent[];
}

export interface Email {
  id: string;
  from: string;
  from_name: string;
  from_title: string;
  to: string;
  subject: string;
  body: string;
  sim_time: string;
  sim_day: number;
  is_read: boolean;
  requires_response: boolean;
  response_deadline: string | null;
  urgency_level: number;
  has_attachment: boolean;
  attachment_description: string | null;
}

export interface SlackMessage {
  id: string;
  channel: string;
  from: string;
  from_name: string;
  from_avatar: string;
  message: string;
  sim_time: string;
  sim_day: number;
  is_mention: boolean;
  thread_id: string | null;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "done" | "overdue";
  assigned_by: string;
  sim_day: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  content: string;
  path: string;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  title: string;
  attendees: MeetingAttendee[];
  agenda: string[];
  sim_time: string;
  sim_day: number;
  duration_minutes: number;
  status: "scheduled" | "in_progress" | "completed";
  transcript: MeetingMessage[];
  minutes: MeetingMinutes | null;
}

export interface MeetingAttendee {
  id: string;
  name: string;
  title: string;
  role: string;
  avatar: string;
}

export interface MeetingMessage {
  speaker: string;
  text: string;
  timestamp: string;
  is_student: boolean;
}

export interface MeetingMinutes {
  key_decisions: string[];
  action_items: string[];
  next_meeting: string | null;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: "meeting" | "deadline" | "deliverable";
  start_time: string;
  end_time: string | null;
  sim_day: number;
  color: string;
  description: string | null;
}

export interface SimulationEvent {
  id: string;
  simulation_id: string;
  event_type: string | null;
  direction: string | null;
  app: string | null;
  payload: Record<string, unknown> | null;
  student_action: Record<string, unknown> | null;
  ai_score: AIScore | null;
  scored_at: string | null;
  sim_day: number | null;
  sim_time: string | null;
  created_at: string;
}

export interface AIScore {
  overall_score: number;
  pillar_scores: Record<string, number>;
  strengths: string[];
  improvements: string[];
  model_answer_summary: string;
  red_flags: string[];
}

export interface CRSScore {
  overall_crs: number;
  pillar_scores: Record<string, number>;
  tier: CRSTier;
  events_scored: number;
  events_total: number;
}

export type CRSTier =
  | "Elite"
  | "Advanced"
  | "Proficient"
  | "Developing"
  | "Foundational";

export interface Certificate {
  id: string;
  user_id: string;
  simulation_id: string;
  cert_type: string | null;
  role: string | null;
  company_name: string | null;
  crs_score: number | null;
  issued_at: string;
  verify_url: string | null;
  is_public: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  full_name: string | null;
  university: string | null;
  crs_score: number;
  avatar_url: string | null;
}

// WebSocket event types
export interface WSEmailArrived {
  from: string;
  subject: string;
  body: string;
  priority: number;
  sim_time: string;
}

export interface WSSlackMessage {
  channel: string;
  user: string;
  message: string;
  mentions: string[];
}

export interface WSTaskAssigned {
  title: string;
  description: string;
  deadline: string;
  priority: string;
}

export interface WSScoreUpdated {
  pillar: string;
  old_score: number;
  new_score: number;
  reason: string;
}

export interface WSDayEnded {
  day: number;
  summary: string;
  completed: string[];
  missed: string[];
}
