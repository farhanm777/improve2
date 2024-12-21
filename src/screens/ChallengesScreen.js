import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

const ChallengesScreen = () => {
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      {/* Update status bar style dynamically */}
      {isFocused && <StatusBar style="dark" />}
      <Text style={styles.placeholderText}>Challenges Screen Placeholder</Text>
      <Text style={styles.instructions}>
        Add your content or components for challenges here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ChallengesScreen;