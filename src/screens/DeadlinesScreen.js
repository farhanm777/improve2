import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DeadlineItem from '../components/DeadlineItem';
import AddDeadlineModal from '../components/AddDeadlineModal';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

const DeadlinesScreen = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDeadline, setNewDeadline] = useState({ title: '', dueDate: new Date(), tag: 'work' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDeadlineId, setEditingDeadlineId] = useState(null);
  const isFocused = useIsFocused();

  const ensureValidDate = (deadline) => {
    return {
      ...deadline,
      dueDate: new Date(deadline.dueDate), // Ensure `dueDate` is a Date object
    };
  };

  // Load deadlines from AsyncStorage when the component mounts
  useEffect(() => {
    const loadDeadlines = async () => {
      try {
        const storedDeadlines = await AsyncStorage.getItem('deadlines');
        if (storedDeadlines) {
          const parsedDeadlines = JSON.parse(storedDeadlines);
          const validDeadlines = parsedDeadlines.map(ensureValidDate); // Ensure valid dates
          setDeadlines(validDeadlines);
        }
      } catch (error) {
        console.error('Failed to load deadlines:', error);
      }
    };

    loadDeadlines();
  }, []);

  // Save deadlines to AsyncStorage whenever they change
  useEffect(() => {
    const saveDeadlines = async () => {
      try {
        await AsyncStorage.setItem('deadlines', JSON.stringify(deadlines));
      } catch (error) {
        console.error('Failed to save deadlines:', error);
      }
    };

    saveDeadlines();
  }, [deadlines]);

  const addDeadline = (deadline) => {
    setDeadlines((prev) => [...prev, { ...deadline, id: uuidv4() }]);
  };

  const updateDeadline = (updatedDeadline) => {
    setDeadlines((prev) =>
      prev.map((deadline) =>
        deadline.id === updatedDeadline.id ? { ...updatedDeadline } : deadline
      )
    );
  };

  const deleteDeadline = (id) => {
    Alert.alert(
      'Delete Deadline',
      'Are you sure you want to delete this deadline?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDeadlines((prev) => prev.filter((deadline) => deadline.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const editDeadline = (deadline) => {
    const validDeadline = ensureValidDate(deadline); // Ensure `dueDate` is valid
    setIsEditing(true);
    setEditingDeadlineId(validDeadline.id);
    setNewDeadline(validDeadline);
    setModalVisible(true);
  };

  const sortedDeadlines = [...deadlines].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setIsEditing(false);
    setEditingDeadlineId(null);
    setNewDeadline({ title: '', dueDate: new Date(), tag: 'work' });
  };

  const saveDeadline = () => {
    if (newDeadline.title.trim() === '') {
      Alert.alert('Validation Error', 'Please enter a title for the deadline.');
      return;
    }

    if (isEditing) {
      updateDeadline(newDeadline);
    } else {
      addDeadline(newDeadline);
    }

    closeModal();
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setNewDeadline((prev) => ({ ...prev, dueDate: currentDate }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Update status bar style dynamically */}
        {isFocused && <StatusBar style="dark" />}
        <Text style={styles.header}>Upcoming Deadlines</Text>

        <FlatList
          data={sortedDeadlines}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DeadlineItem
              deadline={item}
              onDelete={deleteDeadline}
              onEdit={editDeadline}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No deadlines added yet</Text>}
        />

        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

        <AddDeadlineModal
          visible={modalVisible}
          onClose={closeModal}
          onSave={saveDeadline}
          newDeadline={newDeadline}
          setNewDeadline={setNewDeadline}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          onDateChange={onDateChange}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Matches the overall container background color
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#6200ee',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 5,
  },
});

export default DeadlinesScreen;