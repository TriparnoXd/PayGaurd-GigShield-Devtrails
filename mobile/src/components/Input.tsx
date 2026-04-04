import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
  prefix?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  icon,
  prefix,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          error && styles.error,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors['outline-variant']}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors.outline,
    marginLeft: spacing[2],
    marginBottom: spacing[2],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['surface-container-low'],
    borderRadius: borderRadius.md,
    padding: spacing[2],
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focused: {
    backgroundColor: colors['surface-container-highest'],
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  error: {
    borderColor: colors.error,
  },
  iconContainer: {
    paddingHorizontal: spacing[2],
  },
  prefix: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['body-lg'],
    fontWeight: typography.weights.semibold,
    color: colors['on-surface-variant'],
    paddingRight: spacing[2],
    borderRightWidth: 1,
    borderRightColor: colors['outline-variant'],
    marginRight: spacing[2],
  },
  input: {
    flex: 1,
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['body-lg'],
    fontWeight: typography.weights.semibold,
    color: colors['on-surface'],
    padding: spacing[2],
  },
  errorText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-sm'],
    color: colors.error,
    marginLeft: spacing[2],
    marginTop: spacing[1],
  },
});
