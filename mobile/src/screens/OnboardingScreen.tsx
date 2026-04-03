import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [riderId, setRiderId] = useState('');
  const [selectedHub, setSelectedHub] = useState(null);
  const [user, setUser] = useState(null);

  const [hubs, setHubs] = useState([
    { id: 1, name: 'Hub A', selected: false },
    { id: 2, name: 'Hub B', selected: false },
    { id: 3, name: 'Hub C', selected: false },
  ]);

  const handleHubSelect = (hubId) => {
    setHubs(hubs.map(hub => ({ ...hub, selected: hub.id === hubId })));
    setSelectedHub(hubId);
  };

  const handleSecureIncome = () => {
    // Validate phone number
    const phoneNumberObj = parsePhoneNumberFromString(mobileNumber, 'IN');
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
      // Show error to user
      Alert.alert('Error', 'Please enter a valid Indian phone number');
      return;
    }

    // Only proceed with verified data from backend in real implementation
    // For now, store minimal data and let backend handle verification
    setUser({
      phoneNumber: phoneNumberObj.formatInternational(), // Properly formatted
      riderId: riderId.trim(), // Basic sanitization
      hub: selectedHub,
      isVerified: false, // Will be updated after OTP verification
    });

    navigation.navigate('OTPVerification', {
      phoneNumber: phoneNumberObj.formatInternational()
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Rider ID"
        value={riderId}
        onChangeText={setRiderId}
      />
      
      <Text style={styles.subtitle}>Select Hub</Text>
      {hubs.map((hub) => (
        <TouchableOpacity
          key={hub.id}
          style={[
            styles.hubButton,
            hub.selected && styles.hubButtonSelected,
          ]}
          onPress={() => handleHubSelect(hub.id)}
          activeOpacity={0.7}
          accessibilityRole="radio"
          accessibilityChecked={hub.selected === true}
          accessibilityLabel={
            `${hub.name}, ${hub.selected ? 'selected' : 'not selected'}`
          }
        >
          <Text>{hub.name}</Text>
          {hub.selected && (
            <View style={styles.checkMark}>
              <Text style={styles.checkMarkIcon}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.button} onPress={handleSecureIncome}>
        <Text style={styles.buttonText}>Secure My Income</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  hubButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    borderRadius: 5,
  },
  hubButtonSelected: {
    backgroundColor: '#eee',
  },
  checkMark: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#007bff',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMarkIcon: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OnboardingScreen;