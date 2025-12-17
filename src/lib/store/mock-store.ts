import { create } from 'zustand';

export type Role = 'recruiter' | 'candidate';

export interface CandidateProfile {
  id: string;
  name: string;
  headline: string;
  market_value_score: number;
  avatar: string;
  isUnlocked: boolean;
  analysis_summary: string;
  badges: string[];
}

export interface Event {
  id: string;
  title: string;
  price: number;
  status: 'LOCKED' | 'PAID';
}

interface MockState {
  currentUser: {
    role: Role;
    wallet: number;
  };
  candidates: CandidateProfile[];
  events: Event[];
  
  // Actions
  toggleRole: (role: Role) => void;
  simulateUpload: () => Promise<void>;
  unlockCandidate: (id: string) => Promise<void>;
  purchaseTicket: (eventId: string) => Promise<void>;
}

// Mock Data
const MOCK_CANDIDATES = Array.from({ length: 12 }).map((_, i) => ({
  id: `c-${i}`,
  name: `Candidate ${i + 1}`,
  headline: "Full Stack Engineer • Ex-Google",
  market_value_score: 65 + (i % 30),
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  isUnlocked: false,
  analysis_summary: "Strong proficiency in React and Node.js. Top 5% in System Design.",
  badges: ["Vibe Coding", "System Architect"]
}));

export const useMockStore = create<MockState>((set) => ({
  currentUser: {
    role: 'recruiter', // Default to Recruiter for easier demo access
    wallet: 1000,
  },
  candidates: MOCK_CANDIDATES,
  events: [
    { id: 'ev-1', title: 'Advanced AI Architecture', price: 50, status: 'LOCKED' }
  ],

  toggleRole: (role) => set((state) => ({ currentUser: { ...state.currentUser, role } })),

  simulateUpload: async () => {
    await new Promise(r => setTimeout(r, 2000));
    // Increase score of first candidate (simulating 'me')
    set((state) => {
      const updated = [...state.candidates];
      updated[0].market_value_score = Math.min(100, updated[0].market_value_score + 10);
      return { candidates: updated };
    });
  },

  unlockCandidate: async (id) => {
    set((state) => ({
      currentUser: { ...state.currentUser, wallet: state.currentUser.wallet - 250 },
      candidates: state.candidates.map(c => c.id === id ? { ...c, isUnlocked: true } : c)
    }));
  },

  purchaseTicket: async (eventId) => {
    set((state) => ({
      currentUser: { ...state.currentUser, wallet: state.currentUser.wallet - 50 },
      events: state.events.map(e => e.id === eventId ? { ...e, status: 'PAID' } : e)
    }));
  }
}));
