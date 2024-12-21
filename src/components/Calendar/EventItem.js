// src/components/Calendar/EventItem.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

const EventItem = ({ event }) => {
  return (
    <View style={[styles.eventItem, { backgroundColor: event.color }]}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      {event.detail ? <Text style={styles.eventDetail}>{event.detail}</Text> : null}
      {event.repeat !== 'none' && (
        <Text style={styles.repeatLabel}>Repeats {event.repeat}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  eventItem: {
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

export default EventItem;