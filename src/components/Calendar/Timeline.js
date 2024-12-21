// src/components/Calendar/Timeline.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../../theme';

const Timeline = ({ 
  events, 
  hourHeight, 
  openEditEventModal 
}) => {
  const hoursArray = Array.from({ length: 24 }, (_, i) => i);
  
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.timelineContainer}>
      {hoursArray.map((h) => (
        <View key={h} style={styles.timelineHourBlock}>
          <View style={styles.timeColumn}>
            <Text style={styles.timelineTime}>
              {h.toString().padStart(2, '0')}:00
            </Text>
          </View>
          <View style={styles.eventsColumn} />
        </View>
      ))}

      {events.map(ev => {
        const top = ev.startHour * hourHeight;
        const duration = Math.max(1, ev.endHour - ev.startHour) * hourHeight;
        return (
          <TouchableOpacity 
            key={ev.id} 
            onPress={() => openEditEventModal(ev)} 
            style={[styles.eventAbsolute, { top, height: duration, backgroundColor: ev.color }]}
          >
            <Text style={styles.eventTitle}>{ev.title}</Text>
            {ev.detail ? <Text style={styles.eventDetail}>{ev.detail}</Text> : null}
            {ev.repeat !== 'none' && (
              <Text style={styles.repeatLabel}>Repeats {ev.repeat}</Text>
            )}
          </TouchableOpacity>
        );
      })}
      <View style={{ height: hourHeight * 24 + 80 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    position: 'relative',
    paddingHorizontal: theme.spacing.medium,
  },
  timelineHourBlock: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeColumn: {
    width: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: theme.spacing.small,
  },
  timelineTime: {
    fontSize: 12,
    color: '#999',
  },
  eventsColumn: {
    flex: 1,
    position: 'relative',
  },
  eventAbsolute: {
    position: 'absolute',
    left: 50,
    right: theme.spacing.small,
    borderRadius: 8,
    padding: theme.spacing.small,
    marginHorizontal: theme.spacing.small,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  eventDetail: {
    fontSize: 14,
    color: '#000',
  },
  repeatLabel: {
    fontSize: 12,
    color: '#000',
  },
});

export default Timeline;