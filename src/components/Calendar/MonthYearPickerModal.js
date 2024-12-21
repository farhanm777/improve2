import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../../theme';

const MonthYearPickerModal = ({
  visible,
  onClose,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  monthNames,
}) => {
  const years = Array.from({ length: 10 }, (_, idx) => 2020 + idx);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.modalTitle}>Select Month & Year</Text>

            <View style={styles.pickersRow}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedMonth}
                  onValueChange={(val) => setSelectedMonth(val)}
                  style={styles.fixedPicker}
                  itemStyle={{ color: '#000' }}
                  mode="dropdown"
                >
                  {monthNames.map((m, i) => (
                    <Picker.Item key={m} label={m} value={i} />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedYear}
                  onValueChange={(val) => setSelectedYear(val)}
                  style={styles.fixedPicker}
                  itemStyle={{ color: '#000' }}
                  mode="dropdown"
                >
                  {years.map((y) => (
                    <Picker.Item key={y} label={y.toString()} value={y} />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.doneButton}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '90%',
    borderRadius: 12,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: theme.spacing.medium,
    textAlign: 'center',
  },
  pickersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing.medium,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  fixedPicker: {
    height: Platform.OS === 'ios' ? 120 : 50,
    width: '100%',
  },
  doneButton: {
    marginTop: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.large,
    borderRadius: 8,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MonthYearPickerModal;