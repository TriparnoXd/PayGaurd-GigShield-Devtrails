import React, { useState } from 'react';
import { TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  style?: ViewStyle;
}

const Input: React.FC<InputProps> = ({ style, ...props }) => {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, focused && styles.focused, style]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  focused: {
    borderColor: '#007bff',
  },
});

export default Input;