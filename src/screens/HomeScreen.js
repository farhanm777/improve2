import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
  const isFocused = useIsFocused();

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Dynamically set StatusBar style */}
      {isFocused && <StatusBar style="dark" />}
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Greeting Section */}
        <View style={styles.headerContainer}>
          <Text variant="headlineMedium" style={styles.greetingText}>Good morning</Text>
          <View style={styles.headerActions}>
            <IconButton 
              icon="calendar" 
              iconColor={theme.colors.text} 
              size={24} 
              onPress={() => {}}
            />
            <IconButton 
              icon="bell" 
              iconColor={theme.colors.text} 
              size={24} 
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Progress Card */}
        <Card style={styles.progressCard}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.dateText}>{getCurrentDate()}</Text>
            <Text variant="titleLarge" style={styles.sectionTitle}>Today's progress</Text>
            <View style={styles.progressInfo}>
              <Text variant="headlineMedium" style={styles.percentageText}>83%</Text>
              <Text variant="bodyMedium" style={styles.tasksInfo}>10/12 Tasks</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarFill} />
            </View>
          </Card.Content>
        </Card>

        {/* Ongoing Tasks */}
        <View style={styles.taskSection}>
          <Text variant="titleLarge" style={styles.taskSectionTitle}>Ongoing <Text style={styles.taskCount}>2</Text></Text>
          <View style={styles.taskItem}>
            <View style={styles.checkboxPlaceholder} />
            <Text variant="bodyMedium" style={styles.taskText}>Create wireframe</Text>
            <Text variant="bodySmall" style={styles.taskDueText}>Today</Text>
          </View>
          <View style={styles.taskItem}>
            <View style={styles.checkboxPlaceholder} />
            <Text variant="bodyMedium" style={styles.taskText}>Design home page</Text>
            <Text variant="bodySmall" style={styles.taskDueText}>Today</Text>
          </View>
        </View>

        {/* Completed Tasks */}
        <View style={styles.taskSection}>
          <Text variant="titleLarge" style={styles.taskSectionTitle}>Completed <Text style={styles.taskCount}>10</Text></Text>
          <View style={[styles.taskItem, styles.completedTaskItem]}>
            <View style={[styles.checkboxPlaceholder, { backgroundColor: theme.colors.primary }]} />
            <Text variant="bodyMedium" style={styles.taskText}>Watering the plants</Text>
            <Text variant="bodySmall" style={styles.taskDueText}>Today</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <MaterialCommunityIcons name="plus" size={28} color={theme.colors.onPrimary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  scrollContent: {
    padding: theme.spacing.medium
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.medium
  },
  greetingText: {
    color: theme.colors.text,
    fontWeight: 'bold'
  },
  headerActions: {
    flexDirection: 'row'
  },
  progressCard: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    borderRadius: theme.roundness
  },
  dateText: {
    color: theme.colors.text,
    marginBottom: theme.spacing.small
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.small
  },
  percentageText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    marginRight: theme.spacing.small
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.onSurfaceDisabled,
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBarFill: {
    width: '83%',
    height: '100%',
    backgroundColor: theme.colors.primary
  },
  taskSection: {
    marginBottom: theme.spacing.medium
  },
  taskSectionTitle: {
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.small
  },
  taskCount: {
    fontWeight: 'normal'
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.small,
    marginBottom: theme.spacing.xsmall,
    borderRadius: theme.roundness
  },
  completedTaskItem: {
    opacity: 0.6
  },
  checkboxPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: theme.colors.onSurfaceDisabled,
    marginRight: theme.spacing.small
  },
  taskText: {
    color: theme.colors.text,
    flex: 1
  },
  taskDueText: {
    color: theme.colors.onSurfaceDisabled,
    marginLeft: theme.spacing.small
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.medium,
    bottom: theme.spacing.medium,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;