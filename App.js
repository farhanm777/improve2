import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import CalendarScreen from './src/components/Calendar/CalendarScreen';
import DeadlinesScreen from './src/screens/DeadlinesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Hides the header for all screens
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: { backgroundColor: '#f2f2f2' }, // Optional customization for tab bar style
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Deadlines" component={DeadlinesScreen} />
      </Tab.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}