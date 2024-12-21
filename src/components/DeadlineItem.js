// components/DeadlineItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DeadlineItem = React.memo(({ deadline, onDelete, onEdit }) => {
  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const deadlineDate = new Date(dueDate);
    return Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysUntilDue(deadline.dueDate);
  let color = 'green';
  if (daysLeft <= 3) color = 'red';
  else if (daysLeft <= 7) color = 'orange';

  return (
    <View style={styles.deadlineItem}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.daysText, { color }]}>
          {`Due in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
        </Text>
        <Text style={styles.titleText}>{deadline.title}</Text>
        <Text style={styles.tagText}>{deadline.tag}</Text>
      </View>
      {/* Edit Button */}
      <TouchableOpacity onPress={() => onEdit(deadline)}>
        <Ionicons name="create-outline" size={24} color="#6200ee" style={{ marginRight: 15 }} />
      </TouchableOpacity>
      {/* Delete Button */}
      <TouchableOpacity onPress={() => onDelete(deadline.id)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  deadlineItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    // Shadows for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    // Elevation for Android
    elevation: 4,
  },
  daysText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
  },
  tagText: {
    fontSize: 14,
    color: '#888',
  },
});

export default DeadlineItem;