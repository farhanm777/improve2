// src/components/Calendar/CalendarScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import { FAB } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import HeaderRow from './HeaderRow';
import DayCard from './DayCard';
import Timeline from './Timeline';
import EventModal from './EventModal';
import MonthYearPickerModal from './MonthYearPickerModal';

import { getDaysInMonth, getWeekdayName, shouldShowEvent } from '../../utils/dateUtils';
import theme from '../../theme';

const CalendarScreen = ({ navigation }) => {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [monthYearModalVisible, setMonthYearModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [eventModalMode, setEventModalMode] = useState('add');
  const [editingEventId, setEditingEventId] = useState(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempDetail, setTempDetail] = useState('');
  const [tempStartHour, setTempStartHour] = useState('10');
  const [tempEndHour, setTempEndHour] = useState('11');
  const [tempColor, setTempColor] = useState('#efefef');
  const [tempRepeat, setTempRepeat] = useState('none');

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

  const displayedMonthName = monthNames[selectedMonth];
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const weekdayName = getWeekdayName(selectedYear, selectedMonth, selectedDay);

  const displayedEvents = events.filter((e) =>
    shouldShowEvent(e, selectedYear, selectedMonth, selectedDay)
  );

  useEffect(() => {
    // Load events from storage or other initialization logic
  }, []);

  const handleSaveEvent = () => {
    const startH = parseInt(tempStartHour, 10);
    const endH = parseInt(tempEndHour, 10);
    if (!tempTitle.trim()) return;

    if (endH <= startH) {
      alert('End hour must be after start hour.');
      return;
    }

    const newOrUpdatedEvent = {
      id: eventModalMode === 'edit' && editingEventId ? editingEventId : Date.now().toString(),
      origYear: selectedYear,
      origMonth: selectedMonth,
      origDay: selectedDay,
      startHour: startH,
      endHour: endH,
      title: tempTitle.trim(),
      detail: tempDetail.trim(),
      color: tempColor,
      repeat: tempRepeat,
    };

    if (eventModalMode === 'add') {
      setEvents((prev) => [...prev, newOrUpdatedEvent]);
    } else {
      setEvents((prev) =>
        prev.map((e) => (e.id === editingEventId ? newOrUpdatedEvent : e))
      );
    }

    closeEventModal();
  };

  const closeEventModal = () => {
    setEventModalVisible(false);
    setEventModalMode('add');
    setEditingEventId(null);
    setTempTitle('');
    setTempDetail('');
    setTempStartHour('10');
    setTempEndHour('11');
    setTempColor('#efefef');
    setTempRepeat('none');
  };

  const openAddEventModal = () => {
    setEventModalMode('add');
    setEventModalVisible(true);
  };

  const openEditEventModal = (event) => {
    setEventModalMode('edit');
    setEditingEventId(event.id);
    setTempTitle(event.title);
    setTempDetail(event.detail);
    setTempStartHour(event.startHour.toString());
    setTempEndHour(event.endHour.toString());
    setTempColor(event.color);
    setTempRepeat(event.repeat);
    setEventModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={styles.container}>
        {/* Header Row */}
        <HeaderRow
          navigation={navigation}
          displayedMonthName={displayedMonthName}
          selectedYear={selectedYear}
          onPress={() => setMonthYearModalVisible(true)}
        />

        {/* Day Card */}
        <DayCard
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          daysInMonth={daysInMonth}
          weekdayName={weekdayName}
          displayedEvents={displayedEvents}
        />

        {/* Timeline */}
        <View style={styles.timelineWrapper}>
          <Timeline
            events={displayedEvents}
            hourHeight={60}
            openEditEventModal={openEditEventModal}
          />
        </View>

        {/* Floating Action Button */}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={openAddEventModal}
          color="#fff"
        />

        {/* Month-Year Picker Modal */}
        <MonthYearPickerModal
          visible={monthYearModalVisible}
          onClose={() => setMonthYearModalVisible(false)}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          monthNames={monthNames}
        />

        {/* Add/Edit Event Modal */}
        <EventModal
          visible={eventModalVisible}
          onClose={closeEventModal}
          onSave={handleSaveEvent}
          onDelete={() => {
            setEvents((prev) => prev.filter((e) => e.id !== editingEventId));
            closeEventModal();
          }}
          mode={eventModalMode}
          tempTitle={tempTitle}
          setTempTitle={setTempTitle}
          tempDetail={tempDetail}
          setTempDetail={setTempDetail}
          tempStartHour={tempStartHour}
          setTempStartHour={setTempStartHour}
          tempEndHour={tempEndHour}
          setTempEndHour={setTempEndHour}
          tempColor={tempColor}
          setTempColor={setTempColor}
          tempRepeat={tempRepeat}
          setTempRepeat={setTempRepeat}
          colorOptions={[
            { name: 'Light Gray', hex: '#efefef' },
            { name: 'Light Blue', hex: '#dae8fc' },
            { name: 'Light Pink', hex: '#fde6e6' },
            { name: 'Light Green', hex: '#e0ffe0' },
            { name: 'Light Yellow', hex: '#fff5cc' },
            { name: 'Lavender', hex: '#dcd0ff' },
          ]}
          repeatOptions={['none', 'daily', 'weekly', 'monthly']}
          hoursArray={Array.from({ length: 24 }, (_, i) => i)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Match the top section background color
  },
  container: {
    flex: 1,
  },
  timelineWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: theme.spacing.medium,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.medium,
    bottom: theme.spacing.medium,
    backgroundColor: theme.colors.primary,
  },
});

export default CalendarScreen;