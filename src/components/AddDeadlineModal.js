import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddDeadlineModal = ({
  visible,
  onClose,
  onSave,
  newDeadline,
  setNewDeadline,
  showDatePicker,
  setShowDatePicker,
  onDateChange,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Add New Deadline</Text>

          <TextInput
            placeholder="Title"
            value={newDeadline.title}
            onChangeText={(text) => setNewDeadline({ ...newDeadline, title: text })}
            style={styles.input}
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
            <Text style={styles.dateText}>
              {newDeadline.dueDate instanceof Date && !isNaN(newDeadline.dueDate.getTime())
                ? newDeadline.dueDate.toDateString()
                : 'Select a date'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={newDeadline.dueDate || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={newDeadline.tag}
              onValueChange={(value) => setNewDeadline({ ...newDeadline, tag: value })}
              style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Work" value="work" />
              <Picker.Item label="Personal" value="personal" />
              <Picker.Item label="Study" value="study" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Save Deadline" onPress={onSave} />
            <Button title="Cancel" color="red" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  datePicker: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerIOS: {
    height: 200,
    width: '100%',
  },
  pickerItem: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddDeadlineModal;