import { create } from 'zustand';

export interface EarningRecord {
  date: string;
  amount: number;
  deliveries: number;
  protected: boolean;
}

export interface WeeklyEarnings {
  weekStart: string;
  weekEnd: string;
  totalEarned: number;
  protectedAmount: number;
  dailyBreakdown: EarningRecord[];
}

interface EarningsState {
  weeklyEarnings: WeeklyEarnings | null;
  payoutHistory: { amount: number; date: string; status: 'pending' | 'completed' }[];
  setWeeklyEarnings: (earnings: WeeklyEarnings) => void;
  addPayout: (amount: number) => void;
}

const mockWeeklyEarnings: WeeklyEarnings = {
  weekStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  weekEnd: new Date().toISOString(),
  totalEarned: 4250,
  protectedAmount: 850,
  dailyBreakdown: [
    { date: 'Mon', amount: 650, deliveries: 12, protected: false },
    { date: 'Tue', amount: 780, deliveries: 15, protected: true },
    { date: 'Wed', amount: 520, deliveries: 10, protected: false },
    { date: 'Thu', amount: 890, deliveries: 18, protected: true },
    { date: 'Fri', amount: 450, deliveries: 9, protected: false },
    { date: 'Sat', amount: 620, deliveries: 14, protected: false },
    { date: 'Sun', amount: 340, deliveries: 7, protected: true },
  ],
};

const mockPayoutHistory = [
  { amount: 250, date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), status: 'completed' as const },
  { amount: 180, date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), status: 'completed' as const },
  { amount: 320, date: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), status: 'completed' as const },
];

export const useEarningsStore = create<EarningsState>((set) => ({
  weeklyEarnings: mockWeeklyEarnings,
  payoutHistory: mockPayoutHistory,
  setWeeklyEarnings: (earnings) => set({ weeklyEarnings: earnings }),
  addPayout: (amount) =>
    set((state) => ({
      payoutHistory: [
        { amount, date: new Date().toISOString(), status: 'completed' },
        ...state.payoutHistory,
      ],
    })),
}));