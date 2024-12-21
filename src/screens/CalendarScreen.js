// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Platform } from 'react-native';
// import { Card, FAB, Button } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';
// import { Picker } from '@react-native-picker/picker';
// import theme from '../theme';

// function getDaysInMonth(year, monthIndex) {
//   return new Date(year, monthIndex + 1, 0).getDate();
// }

// function getWeekdayName(year, monthIndex, day) {
//   const date = new Date(year, monthIndex, day);
//   return date.toLocaleDateString('en-US', { weekday: 'long' });
// }

// function shouldShowEvent(event, year, month, day) {
//   const eventDate = new Date(event.origYear, event.origMonth, event.origDay);
//   const currentDate = new Date(year, month, day);

//   if (event.repeat === 'none') {
//     return event.origYear === year && event.origMonth === month && event.origDay === day;
//   } else if (event.repeat === 'daily') {
//     return currentDate >= eventDate;
//   } else if (event.repeat === 'weekly') {
//     return currentDate.getDay() === eventDate.getDay() && currentDate >= eventDate;
//   } else if (event.repeat === 'monthly') {
//     if (day !== event.origDay) return false;
//     return currentDate >= eventDate;
//   }
//   return false;
// }

// export default function CalendarScreen({ navigation }) {
//   const now = new Date();
//   const [selectedYear, setSelectedYear] = useState(now.getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
//   const [selectedDay, setSelectedDay] = useState(now.getDate());

//   const [monthYearModalVisible, setMonthYearModalVisible] = useState(false);

//   const [events, setEvents] = useState([]);

//   const [eventModalVisible, setEventModalVisible] = useState(false);
//   const [eventModalMode, setEventModalMode] = useState('add');
//   const [editingEventId, setEditingEventId] = useState(null);

//   const [tempTitle, setTempTitle] = useState('');
//   const [tempDetail, setTempDetail] = useState('');
//   const [tempStartHour, setTempStartHour] = useState('10');
//   const [tempEndHour, setTempEndHour] = useState('11');
//   const [tempColor, setTempColor] = useState('#efefef');
//   const [tempRepeat, setTempRepeat] = useState('none');

//   const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
//   const displayedMonthName = monthNames[selectedMonth];
//   const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
//   const weekdayName = getWeekdayName(selectedYear, selectedMonth, selectedDay);

//   const hoursArray = Array.from({ length: 24 }, (_, i) => i);

//   const colorOptions = [
//     { name: 'Light Gray', hex: '#efefef' },
//     { name: 'Light Blue', hex: '#dae8fc' },
//     { name: 'Light Pink', hex: '#fde6e6' },
//     { name: 'Light Green', hex: '#e0ffe0' },
//     { name: 'Light Yellow', hex: '#fff5cc' },
//     { name: 'Lavender', hex: '#dcd0ff' }
//   ];  
//   const repeatOptions = ['none', 'daily', 'weekly', 'monthly'];

//   const hourHeight = 60; 
//   const displayedEvents = events.filter(e => shouldShowEvent(e, selectedYear, selectedMonth, selectedDay));

//   const handleSaveEvent = () => {
//     const startH = parseInt(tempStartHour, 10);
//     const endH = parseInt(tempEndHour, 10);
//     if (!tempTitle.trim()) return;

//     const newOrUpdatedEvent = {
//       id: eventModalMode === 'edit' && editingEventId ? editingEventId : Date.now().toString(),
//       origYear: selectedYear,
//       origMonth: selectedMonth,
//       origDay: selectedDay,
//       startHour: startH,
//       endHour: endH,
//       title: tempTitle.trim(),
//       detail: tempDetail.trim(),
//       color: tempColor,
//       repeat: tempRepeat
//     };

//     if (eventModalMode === 'add') {
//       setEvents(prev => [...prev, newOrUpdatedEvent]);
//     } else {
//       setEvents(prev => prev.map(e => e.id === editingEventId ? newOrUpdatedEvent : e));
//     }

//     closeEventModal();
//   };

//   const closeEventModal = () => {
//     setEventModalVisible(false);
//     setEventModalMode('add');
//     setEditingEventId(null);
//     setTempTitle('');
//     setTempDetail('');
//     setTempStartHour('10');
//     setTempEndHour('11');
//     setTempColor('#efefef');
//     setTempRepeat('none');
//   };

//   const handleDeleteEvent = () => {
//     if (editingEventId) {
//       setEvents(prev => prev.filter(e => e.id !== editingEventId));
//     }
//     closeEventModal();
//   };

//   const openAddEventModal = () => {
//     setEventModalMode('add');
//     setEventModalVisible(true);
//   };

//   const openEditEventModal = (event) => {
//     setEventModalMode('edit');
//     setEditingEventId(event.id);
//     setTempTitle(event.title);
//     setTempDetail(event.detail);
//     setTempStartHour(event.startHour.toString());
//     setTempEndHour(event.endHour.toString());
//     setTempColor(event.color);
//     setTempRepeat(event.repeat);
//     setEventModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.topSection}>
//         <View style={styles.headerRow}>
//           {/* Separate back button */}
//           <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
//             <Ionicons name="arrow-back" size={20} color="#fff" style={{ marginRight: theme.spacing.small }} />
//           </TouchableOpacity>

//           {/* Separate Month-Year selector */}
//           <TouchableOpacity onPress={() => setMonthYearModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={styles.headerTitle}>{displayedMonthName} {selectedYear} ▼</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.dayCard}>
//           <Text style={styles.meetingsCount}>{displayedEvents.length} Meeting{displayedEvents.length !== 1 ? 's' : ''}</Text>
//           <Text style={styles.weekdayTitle}>{weekdayName}</Text>
          
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScrollContainer}>
//             {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
//               const isSelected = d === selectedDay;
//               return (
//                 <TouchableOpacity 
//                   key={d} 
//                   style={[styles.dayItem, isSelected && styles.selectedDayItem]}
//                   onPress={() => setSelectedDay(d)}
//                 >
//                   <Text style={[styles.dayItemNumber, isSelected && styles.selectedDayText]}>{d}</Text>
//                   <Text style={[styles.dayItemWeekday, isSelected && styles.selectedDayText]}>
//                     {new Date(selectedYear, selectedMonth, d).toLocaleDateString('en-US', { weekday: 'short' })}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>
//       </View>

//       <View style={styles.timelineWrapper}>
//         <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.timelineContainer}>
//           {hoursArray.map((h) => (
//             <View key={h} style={styles.timelineHourBlock}>
//               <View style={styles.timeColumn}>
//                 <Text style={styles.timelineTime}>
//                   {h.toString().padStart(2, '0')}:00
//                 </Text>
//               </View>
//               <View style={styles.eventsColumn} />
//             </View>
//           ))}

//           {displayedEvents.map(ev => {
//             const top = ev.startHour * hourHeight;
//             const duration = Math.max(1, ev.endHour - ev.startHour) * hourHeight;  
//             return (
//               <TouchableOpacity 
//                 key={ev.id} 
//                 onPress={() => openEditEventModal(ev)} 
//                 style={[styles.eventAbsolute, { top, height: duration, backgroundColor: ev.color }]}
//               >
//                 <Text style={styles.eventTitle}>{ev.title}</Text>
//                 {ev.detail ? <Text style={styles.eventDetail}>{ev.detail}</Text> : null}
//                 {ev.repeat !== 'none' && (
//                   <Text style={styles.repeatLabel}>Repeats {ev.repeat}</Text>
//                 )}
//               </TouchableOpacity>
//             );
//           })}
//           <View style={{ height: hourHeight * 24 + 80 }} />
//         </ScrollView>
//       </View>

//       <FAB
//         icon="plus"
//         style={styles.fab}
//         onPress={openAddEventModal}
//         color="#fff"
//       />

//       {/* Month-Year Picker Modal */}
//       <Modal
//         visible={monthYearModalVisible}
//         transparent
//         animationType="slide"
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContentWide}>
//             <Text style={styles.modalTitle}>Select Month & Year</Text>
//             <View style={styles.pickersRowWide}>
//               <View style={styles.pickerWrapper}>
//                 <Picker
//                   selectedValue={selectedMonth}
//                   onValueChange={(val) => setSelectedMonth(val)}
//                   style={styles.pickerWide}
//                 >
//                   {monthNames.map((m, i) => (
//                     <Picker.Item key={m} label={m} value={i} />
//                   ))}
//                 </Picker>
//               </View>
//               <View style={styles.pickerWrapper}>
//                 <Picker
//                   selectedValue={selectedYear}
//                   onValueChange={(val) => setSelectedYear(val)}
//                   style={styles.pickerWide}
//                 >
//                   {Array.from({ length: 10 }, (_, idx) => 2020 + idx).map((y) => (
//                     <Picker.Item key={y} label={y.toString()} value={y} />
//                   ))}
//                 </Picker>
//               </View>
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
//               <Button textColor={theme.colors.primary} onPress={() => setMonthYearModalVisible(false)}>
//                 Done
//               </Button>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Add/Edit Event Modal */}
//       <Modal
//         visible={eventModalVisible}
//         transparent
//         animationType="slide"
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.compactModalContent}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//               <Text style={styles.modalTitle}>
//                 {eventModalMode === 'add' ? 'Add Event' : 'Edit Event'}
//               </Text>

//               <TextInput
//                 placeholder="Event Title"
//                 placeholderTextColor="#999"
//                 style={styles.textInput}
//                 value={tempTitle}
//                 onChangeText={setTempTitle}
//               />

//               <TextInput
//                 placeholder="Event Detail"
//                 placeholderTextColor="#999"
//                 style={styles.textInput}
//                 value={tempDetail}
//                 onChangeText={setTempDetail}
//               />

//               <View style={styles.modalSection}>
//                 <Text style={styles.modalLabel}>Start Hour:</Text>
//                 <View style={styles.pickerContainer}>
//                   <Picker
//                     selectedValue={tempStartHour}
//                     onValueChange={(val) => setTempStartHour(val)}
//                     style={styles.fixedPicker}
//                     itemStyle={{ color: '#000' }}
//                   >
//                     {hoursArray.map(h => (
//                       <Picker.Item
//                         key={h}
//                         label={`${h.toString().padStart(2, '0')}:00`}
//                         value={h.toString()}
//                       />
//                     ))}
//                   </Picker>
//                 </View>
//               </View>

//               <View style={styles.modalSection}>
//                 <Text style={styles.modalLabel}>End Hour:</Text>
//                 <View style={styles.pickerContainer}>
//                   <Picker
//                     selectedValue={tempEndHour}
//                     onValueChange={(val) => setTempEndHour(val)}
//                     style={styles.fixedPicker}
//                     itemStyle={{ color: '#000' }}
//                   >
//                     {hoursArray.map(h => (
//                       <Picker.Item
//                         key={h}
//                         label={`${h.toString().padStart(2, '0')}:00`}
//                         value={h.toString()}
//                       />
//                     ))}
//                   </Picker>
//                 </View>
//               </View>

//               <View style={styles.modalSection}>
//                 <Text style={styles.modalLabel}>Tag Color:</Text>
//                 <View style={styles.pickerContainer}>
//                   <Picker
//                     selectedValue={tempColor}
//                     onValueChange={(val) => setTempColor(val)}
//                     style={styles.fixedPicker}
//                     itemStyle={{ color: '#000' }}
//                   >
//                     {colorOptions.map((c) => (
//                       <Picker.Item 
//                         key={c.hex} 
//                         label={c.name} 
//                         value={c.hex}
//                       />
//                     ))}
//                   </Picker>
//                 </View>
//               </View>

//               <View style={styles.modalSection}>
//                 <Text style={styles.modalLabel}>Repeat:</Text>
//                 <View style={styles.pickerContainer}>
//                   <Picker
//                     selectedValue={tempRepeat}
//                     onValueChange={(val) => setTempRepeat(val)}
//                     style={styles.fixedPicker}
//                     itemStyle={{ color: '#000' }}
//                   >
//                     {repeatOptions.map(opt => (
//                       <Picker.Item key={opt} label={opt} value={opt} />
//                     ))}
//                   </Picker>
//                 </View>
//               </View>

//               <View style={styles.modalActions}>
//                 {eventModalMode === 'edit' && (
//                   <Button textColor="red" onPress={handleDeleteEvent}>Delete</Button>
//                 )}
//                 <View style={{ flexDirection: 'row' }}>
//                   <Button onPress={closeEventModal}>Cancel</Button>
//                   <Button onPress={handleSaveEvent}>Save</Button>
//                 </View>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000', 
//   },
//   topSection: {
//     backgroundColor: '#000',
//     paddingBottom: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: theme.spacing.medium,
//     paddingTop: theme.spacing.large,
//     paddingBottom: theme.spacing.small,
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: '700',
//   },
//   dayCard: {
//     backgroundColor: '#fff',
//     marginHorizontal: theme.spacing.medium,
//     borderRadius: 20,
//     padding: theme.spacing.medium,
//     marginTop: theme.spacing.small,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   meetingsCount: {
//     fontSize: 14,
//     color: '#999',
//     marginBottom: 8,
//   },
//   weekdayTitle: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#000',
//     marginBottom: 12,
//   },
//   dayScrollContainer: {
//     marginBottom: -10,
//   },
//   dayItem: {
//     width: 60,
//     alignItems: 'center',
//     marginRight: 10,
//     paddingVertical: 10,
//     borderRadius: 12,
//     backgroundColor: '#f2f2f2',
//   },
//   selectedDayItem: {
//     backgroundColor: theme.colors.primary + '20',
//   },
//   dayItemNumber: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#000',
//   },
//   dayItemWeekday: {
//     fontSize: 14,
//     color: '#666',
//   },
//   selectedDayText: {
//     color: theme.colors.primary,
//   },
//   timelineWrapper: {
//     flex: 1,
//     backgroundColor: '#fff',
//     marginTop: -10,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     overflow: 'hidden',
//   },
//   timelineContainer: {
//     position: 'relative',
//     paddingHorizontal: theme.spacing.medium,
//   },
//   timelineHourBlock: {
//     flexDirection: 'row',
//     height: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   timeColumn: {
//     width: 50,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     paddingTop: theme.spacing.small,
//   },
//   timelineTime: {
//     fontSize: 12,
//     color: '#999',
//   },
//   eventsColumn: {
//     flex: 1,
//     position: 'relative',
//   },
//   eventAbsolute: {
//     position: 'absolute',
//     left: 50,
//     right: theme.spacing.small,
//     borderRadius: 8,
//     padding: theme.spacing.small,
//     marginHorizontal: theme.spacing.small,
//   },
//   eventTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 4,
//     color: '#000',
//   },
//   eventDetail: {
//     fontSize: 14,
//     color: '#000',
//   },
//   repeatLabel: {
//     fontSize: 12,
//     color: '#000',
//   },
//   fab: {
//     position: 'absolute',
//     right: theme.spacing.medium,
//     bottom: theme.spacing.medium,
//     backgroundColor: theme.colors.primary,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: '#00000055',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContentWide: {
//     backgroundColor: '#fff',
//     padding: theme.spacing.medium,
//     width: '85%',
//     borderRadius: 12,
//     paddingBottom: theme.spacing.large,
//     marginBottom: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: theme.spacing.small,
//     color: '#000',
//   },
//   pickersRowWide: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: theme.spacing.medium,
//   },
//   pickerWrapper: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//     borderRadius: 8,
//     marginHorizontal: 5,
//   },
//   pickerWide: {
//     width: '100%',
//     height: Platform.OS === 'ios' ? 150 : 70,
//   },
//   compactModalContent: {
//     backgroundColor: '#fff',
//     padding: theme.spacing.medium,
//     width: '95%',
//     maxHeight: '90%',
//     borderRadius: 8,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: theme.spacing.small,
//     marginBottom: theme.spacing.small,
//     color: '#000',
//   },
//   modalSection: {
//     marginVertical: theme.spacing.small,
//   },
//   modalLabel: {
//     color: '#000',
//     marginTop: theme.spacing.small,
//     marginBottom: theme.spacing.small / 2,
//     fontWeight: '600',
//   },
//   pickerContainer: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#f9f9f9',
//   },
//   fixedPicker: {
//     height: Platform.OS === 'ios' ? 120 : 50,
//     width: '100%',
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: theme.spacing.medium,
//   },
// });