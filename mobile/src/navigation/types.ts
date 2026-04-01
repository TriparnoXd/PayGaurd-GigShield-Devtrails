import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  OTPVerification: { phoneNumber: string };
  ProtectionPlans: undefined;
  Dashboard: undefined;
  Earnings: undefined;
  ClaimProgress: { claimId?: string };
  PayoutConfirmation: { amount: number; claimId: string };
};

export type TabParamList = {
  Dashboard: undefined;
  Earnings: undefined;
  Shield: undefined;
};

export type BottomTabName = keyof TabParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}