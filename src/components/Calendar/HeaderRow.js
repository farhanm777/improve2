// src/components/Calendar/HeaderRow.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

const HeaderRow = ({ navigation, displayedMonthName, selectedYear, onPress }) => {
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons
          name="arrow-back"
          size={20}
          color="#fff"
          style={{ marginRight: theme.spacing.small }}
        />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPress} style={styles.monthYearSelector}>
        <Text style={styles.headerTitle}>
          {displayedMonthName} {selectedYear} ▼
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
    paddingTop: theme.spacing.large,
    paddingBottom: theme.spacing.small,
    justifyContent: 'space-between',
    backgroundColor: '#000', // Ensure the background color matches the topSection
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  monthYearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});

export default HeaderRow;