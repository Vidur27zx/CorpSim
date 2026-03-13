import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";

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

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  setToken: (token: string) => void;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  university?: string;
  degree?: string;
  grad_year?: number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 800));
          set({ token: "mock-token", isAuthenticated: true });
          await get().fetchUser();
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 800));
          set({ token: "mock-token", isAuthenticated: true });
          await get().fetchUser();
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      fetchUser: async () => {
        const token = get().token;
        if (!token) return;
        try {
          await new Promise(resolve => setTimeout(resolve, 300));
          const mockUser: User = {
            id: "1",
            email: "demo@example.com",
            username: "demo_student",
            full_name: "Demo Student",
            university: "State University",
            degree: "B.S. Computer Science",
            grad_year: 2025,
            linkedin_url: null,
            avatar_url: null,
            crs_score: 78,
            crs_breakdown: null,
            streak_days: 3,
            plan_tier: "free",
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          set({ user: mockUser, isAuthenticated: true });
        } catch {
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
      },
    }),
    {
      name: "corpsim-auth",
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
