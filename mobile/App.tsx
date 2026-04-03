import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './src/screens/OnboardingScreen';

const Stack = createStackNavigator();

export default function App() {
  const initialRouteName = process.env.EXPO_PUBLIC_INITIAL_ROUTE || 'Onboarding';

  return (
    <NavigationContainer onError={(error) => {
      console.warn('Navigation error:', error);
      // Could show fallback UI or log to analytics
    }}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OTPVerification" component={() => null} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}