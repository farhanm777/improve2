import React from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  Modal, 
  ScrollView, 
  Platform 
} from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; // Ensure @react-native-picker/picker is installed
import theme from '../../theme';

const EventModal = ({
  visible,
  onClose,
  onSave,
  onDelete,
  mode,
  tempTitle,
  setTempTitle,
  tempDetail,
  setTempDetail,
  tempStartHour,
  setTempStartHour,
  tempEndHour,
  setTempEndHour,
  tempColor,
  setTempColor,
  tempRepeat,
  setTempRepeat,
  colorOptions,
  repeatOptions,
  hoursArray,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.compactModalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>
              {mode === 'add' ? 'Add Event' : 'Edit Event'}
            </Text>

            {/* Event Title Input */}
            <TextInput
              placeholder="Event Title"
              placeholderTextColor="#999"
              style={styles.textInput}
              value={tempTitle}
              onChangeText={setTempTitle}
            />

            {/* Event Detail Input */}
            <TextInput
              placeholder="Event Detail"
              placeholderTextColor="#999"
              style={styles.textInput}
              value={tempDetail}
              onChangeText={setTempDetail}
            />

            {/* Start Hour Scroll Wheel */}
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Start Hour:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={tempStartHour}
                  onValueChange={(value) => setTempStartHour(value)}
                  style={styles.fixedPicker}
                  itemStyle={styles.pickerItem}
                  mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}
                >
                  {hoursArray.map((hour) => (
                    <Picker.Item
                      key={hour}
                      label={`${hour.toString().padStart(2, '0')}:00`}
                      value={hour.toString()}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* End Hour Scroll Wheel */}
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>End Hour:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={tempEndHour}
                  onValueChange={(value) => setTempEndHour(value)}
                  style={styles.fixedPicker}
                  itemStyle={styles.pickerItem}
                  mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}
                >
                  {hoursArray.map((hour) => (
                    <Picker.Item
                      key={hour}
                      label={`${hour.toString().padStart(2, '0')}:00`}
                      value={hour.toString()}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Tag Color Selection */}
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Tag Color:</Text>
              <View style={styles.colorButtonContainer}>
                {colorOptions.map((color) => (
                  <Button
                    key={color.hex}
                    mode={tempColor === color.hex ? 'contained' : 'outlined'}
                    onPress={() => setTempColor(color.hex)}
                    style={[
                      styles.colorButton,
                      tempColor === color.hex && styles.selectedColorButton,
                    ]}
                  >
                    {color.name}
                  </Button>
                ))}
              </View>
            </View>

            {/* Repeat Selection */}
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Repeat:</Text>
              <View style={styles.repeatButtonContainer}>
                {repeatOptions.map((option) => (
                  <Button
                    key={option}
                    mode={tempRepeat === option ? 'contained' : 'outlined'}
                    onPress={() => setTempRepeat(option)}
                    style={[
                      styles.repeatButton,
                      tempRepeat === option && styles.selectedRepeatButton,
                    ]}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </View>
            </View>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              {mode === 'edit' && (
                <Button 
                  onPress={onDelete} 
                  mode="contained" 
                  color="red" 
                  style={styles.deleteButton}
                >
                  Delete
                </Button>
              )}
              <View style={styles.actionButtons}>
                <Button onPress={onClose} style={styles.cancelButton}>
                  Cancel
                </Button>
                <Button onPress={onSave} mode="contained" style={styles.saveButton}>
                  Save
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactModalContent: {
    backgroundColor: '#fff',
    padding: theme.spacing.medium,
    width: '95%',
    maxHeight: '90%',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: theme.spacing.small,
    color: '#000',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: theme.spacing.small,
    marginBottom: theme.spacing.small,
    color: '#000',
  },
  modalSection: {
    marginVertical: theme.spacing.small,
  },
  modalLabel: {
    color: '#000',
    marginBottom: theme.spacing.small / 2,
    fontWeight: '600',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  fixedPicker: {
    height: Platform.OS === 'ios' ? 120 : 50,
    width: '100%',
  },
  pickerItem: {
    color: '#000',
    fontSize: 16,
  },
  colorButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  colorButton: {
    margin: theme.spacing.small / 2,
    minWidth: 50,
    padding: theme.spacing.small / 2,
  },
  selectedColorButton: {
    backgroundColor: theme.colors.primary,
  },
  repeatButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  repeatButton: {
    margin: theme.spacing.small / 2,
    minWidth: 80,
    padding: theme.spacing.small / 2,
  },
  selectedRepeatButton: {
    backgroundColor: theme.colors.primary + '20',
  },
  modalActions: {
    marginTop: theme.spacing.medium,
    flexDirection: 'column',
    alignItems: 'center',
  },
  deleteButton: {
    marginBottom: theme.spacing.small,
    width: '100%',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    marginRight: theme.spacing.small,
  },
  saveButton: {
    flex: 1,
    marginLeft: theme.spacing.small,
  },
});

export default EventModal;