// src/utils/dateUtils.js

export function getDaysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }
  
  export function getWeekdayName(year, monthIndex, day) {
    const date = new Date(year, monthIndex, day);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
  
  export function shouldShowEvent(event, year, month, day) {
    const eventDate = new Date(event.origYear, event.origMonth, event.origDay);
    const currentDate = new Date(year, month, day);
  
    if (event.repeat === 'none') {
      return (
        event.origYear === year &&
        event.origMonth === month &&
        event.origDay === day
      );
    } else if (event.repeat === 'daily') {
      return currentDate >= eventDate;
    } else if (event.repeat === 'weekly') {
      return (
        currentDate.getDay() === eventDate.getDay() &&
        currentDate >= eventDate
      );
    } else if (event.repeat === 'monthly') {
      if (day !== event.origDay) return false;
      return currentDate >= eventDate;
    }
    return false;
  }