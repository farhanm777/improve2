import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import theme from '../../theme';

const DayCard = ({
  selectedDay,
  setSelectedDay,
  selectedYear,
  selectedMonth,
  daysInMonth,
  weekdayName,
  displayedEvents,
}) => {
  const scrollViewRef = useRef(null);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === selectedYear && today.getMonth() === selectedMonth;

  useEffect(() => {
    if (isCurrentMonth && scrollViewRef.current) {
      const todayIndex = today.getDate() - 1; // Zero-based index
      const itemWidth = 70; // Approximate width of each day item, adjust as needed
      const offset = Math.max(0, todayIndex * itemWidth - (itemWidth * 2)); // Center the item (subtract space for 2 items on each side)

      scrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  }, [isCurrentMonth]);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <View style={styles.dayCard}>
      <Text style={styles.meetingsCount}>
        {displayedEvents.length} Event{displayedEvents.length !== 1 ? 's' : ''}
      </Text>
      <Text style={styles.weekdayTitle}>{weekdayName}</Text>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
          const isSelected = d === selectedDay;
          const isToday = isCurrentMonth && d === today.getDate();
          const date = new Date(selectedYear, selectedMonth, d);
          const weekdayShort = date.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <TouchableOpacity
              key={d}
              style={[styles.dayItem, isSelected && styles.selectedDayItem, isToday && styles.todayItem]}
              onPress={() => setSelectedDay(d)}
            >
              <Text style={[styles.dayItemNumber, isSelected && styles.selectedDayText]}>
                {d}
              </Text>
              <Text style={[styles.dayItemWeekday, isSelected && styles.selectedDayText]}>
                {weekdayShort}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dayCard: {
    backgroundColor: '#fff',
    marginHorizontal: theme.spacing.medium,
    borderRadius: 20,
    padding: theme.spacing.medium,
    marginTop: theme.spacing.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  meetingsCount: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  weekdayTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
    marginBottom: 12,
  },
  dayScrollContainer: {
    marginBottom: -10,
  },
  dayItem: {
    width: 60,
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
  },
  selectedDayItem: {
    backgroundColor: `${theme.colors.primary}20`, // 20 for opacity
  },
  todayItem: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  dayItemNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  dayItemWeekday: {
    fontSize: 14,
    color: '#666',
  },
  selectedDayText: {
    color: theme.colors.primary,
  },
});

export default DayCard;