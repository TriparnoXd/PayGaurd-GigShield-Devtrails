import { create } from 'zustand';

export type ClaimStatus = 'detected' | 'verified' | 'approved' | 'paid';

export type DisruptionType = 'rain' | 'aqi' | 'heat' | 'curfew' | 'outage';

export interface Claim {
  id: string;
  type: DisruptionType;
  status: ClaimStatus;
  amount: number;
  zone: string;
  startTime: string;
  endTime?: string;
  createdAt: string;
}

interface ClaimsState {
  claims: Claim[];
  activeClaim: Claim | null;
  addClaim: (claim: Claim) => void;
  updateClaimStatus: (claimId: string, status: ClaimStatus) => void;
  setActiveClaim: (claim: Claim | null) => void;
}

const mockClaims: Claim[] = [
  {
    id: 'claim-001',
    type: 'rain',
    status: 'approved',
    amount: 250,
    zone: 'Koramangala',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'claim-002',
    type: 'aqi',
    status: 'paid',
    amount: 180,
    zone: 'Whitefield',
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useClaimsStore = create<ClaimsState>((set) => ({
  claims: mockClaims,
  activeClaim: null,
  addClaim: (claim) => set((state) => ({ claims: [claim, ...state.claims] })),
  updateClaimStatus: (claimId, status) =>
    set((state) => ({
      claims: state.claims.map((c) =>
        c.id === claimId ? { ...c, status } : c
      ),
    })),
  setActiveClaim: (claim) => set({ activeClaim: claim }),
}));