import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'high-vis' | 'ghost' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.container,
      ...sizes[size],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          ...styles.primaryContainer,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.secondary,
        };
      case 'high-vis':
        return {
          ...baseStyle,
          backgroundColor: colors['secondary-container'],
        };
      case 'ghost':
        return {
          ...baseStyle,
          ...styles.ghostContainer,
        };
      case 'tertiary':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
        return colors['on-primary'];
      case 'secondary':
        return colors['on-secondary'];
      case 'high-vis':
        return colors['on-secondary-container'];
      case 'ghost':
      case 'tertiary':
        return colors.primary;
      default:
        return colors['on-primary'];
    }
  };

  return (
    <TouchableOpacity
      style={[
        getContainerStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              { color: getTextColor() },
              size === 'lg' && { fontSize: typography.sizes['body-lg'] },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const sizes = {
  sm: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.default,
  },
  md: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.default,
  },
  lg: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    borderRadius: borderRadius.xl,
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },
  primaryContainer: {
    backgroundColor: colors.primary,
    ...shadows.kinetic,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    opacity: 0.5,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    letterSpacing: typography.letterSpacing.tight,
  },
});
