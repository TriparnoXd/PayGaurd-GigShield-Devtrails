import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputRefs.current[index] = ref; }}
          style={[
            styles.input,
            otp[index] && styles.inputFilled,
          ]}
          value={otp[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) =>
            handleKeyPress(nativeEvent.key, index)
          }
          keyboardType="number-pad"
          maxLength={1}
          selectionColor={colors.primary}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[3],
  },
  input: {
    width: 52,
    height: 64,
    backgroundColor: colors['surface-container-low'],
    borderRadius: borderRadius.md,
    textAlign: 'center',
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['headline-md'],
    fontWeight: typography.weights.bold,
    color: colors['on-surface'],
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputFilled: {
    backgroundColor: colors['surface-container-highest'],
    borderColor: colors.primary,
  },
});