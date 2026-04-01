import { create } from 'zustand';

export type PlanTier = 'basic' | 'standard' | 'pro';

export interface Policy {
  id: string;
  tier: PlanTier;
  weeklyPremium: number;
  maxPayout: number;
  coverageHours: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface PolicyState {
  activePolicy: Policy | null;
  availablePlans: Policy[];
  setActivePolicy: (policy: Policy) => void;
  clearPolicy: () => void;
}

const defaultPlans: Policy[] = [
  {
    id: 'basic-shield',
    tier: 'basic',
    weeklyPremium: 49,
    maxPayout: 500,
    coverageHours: 8,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
  },
  {
    id: 'standard-shield',
    tier: 'standard',
    weeklyPremium: 79,
    maxPayout: 900,
    coverageHours: 15,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: false,
  },
  {
    id: 'pro-shield',
    tier: 'pro',
    weeklyPremium: 99,
    maxPayout: 1400,
    coverageHours: 22,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: false,
  },
];

export const usePolicyStore = create<PolicyState>((set) => ({
  activePolicy: defaultPlans[0],
  availablePlans: defaultPlans,
  setActivePolicy: (policy) => set({ activePolicy: policy }),
  clearPolicy: () => set({ activePolicy: null }),
}));