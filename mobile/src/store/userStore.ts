import { create } from 'zustand';

export interface User {
  phoneNumber: string;
  riderId: string;
  hub: string;
  name?: string;
  isVerified: boolean;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  setVerified: (verified: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
  setVerified: (verified) =>
    set((state) => ({
      user: state.user ? { ...state.user, isVerified: verified } : null,
    })),
  clearUser: () => set({ user: null }),
}));