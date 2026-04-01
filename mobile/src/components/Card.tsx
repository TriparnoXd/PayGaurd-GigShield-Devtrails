import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient' | 'high-vis';
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
  padding = 'md',
}) => {
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.container,
      ...paddingStyles[padding],
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: colors['surface-container-lowest'],
          ...shadows.md,
        };
      case 'glass':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(104, 29, 247, 0.06)',
        };
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      case 'high-vis':
        return {
          ...baseStyle,
          backgroundColor: colors['secondary-container'],
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: colors['surface-container'],
        };
    }
  };

  return (
    <View style={[getContainerStyle(), style]}>
      {children}
    </View>
  );
};

const paddingStyles = {
  none: {
    padding: 0,
  },
  sm: {
    padding: spacing[3],
  },
  md: {
    padding: spacing[4],
  },
  lg: {
    padding: spacing[6],
  },
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.default,
    overflow: 'hidden',
  },
});
