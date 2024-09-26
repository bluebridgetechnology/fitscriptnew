"use client"
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './WeeklyCallsCalendar.module.css';
import AppointmentModal from './AppointmentModal';

const API_BASE_URL = 'http://localhost:3001/api';

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };
  const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const CallsTable = ({ calls, filter, onFilterChange, onCancel, onReschedule }) => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleViewNote = (call) => {
    setSelectedNote(call.notes || 'No notes available for this appointment.');
    setShowNoteModal(true);
  };

  const filteredCalls = calls.filter(call => {
    const callDate = new Date(call.date + 'T' + call.time);
    const now = new Date();
    if (filter === 'upcoming') return callDate >= now;
    if (filter === 'past') return callDate < now;
    return true;
  });

  return (
    <div className={styles.callsTableContainer}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>Scheduled Calls</h3>
        <div className={styles.filterContainer}>
          <label htmlFor="filter">Filter: </label>
          <select id="filter" value={filter} onChange={(e) => onFilterChange(e.target.value)}>
            <option value="all">All Calls</option>
            <option value="upcoming">Upcoming Calls</option>
            <option value="past">Past Calls</option>
          </select>
        </div>
      </div>
      <table className={styles.callsTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Health Coach</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCalls.map((call, index) => {
            const callDate = new Date(call.date + 'T' + call.time);
            const now = new Date();
            const isPast = callDate < now;
            return (
              <tr key={index}>
                <td>{call.date}</td>
                <td>{call.time}</td>
                <td>{call.coach.first_name} {call.coach.last_name}</td>
                <td>{call.status}</td>
                <td>
                  {isPast ? (
                    <button className={styles.viewNoteButton} onClick={() => handleViewNote(call)}>
                      View Meeting Note
                    </button>
                  ) : (
                    <>
                      <span className={styles.countdown}>
                        {getCountdown(callDate)}
                      </span>
                      <button className={styles.cancelButton} onClick={() => onCancel(call)}>Cancel</button>
                      <button className={styles.rescheduleButton} onClick={() => onReschedule(call)}>Reschedule</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showNoteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Meeting Note</h2>
            <pre className={styles.noteText}>{selectedNote}</pre>
            <button className={styles.closeButton} onClick={() => setShowNoteModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const getCountdown = (date) => {
  const now = new Date();
  const diff = date - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${days}d ${hours}h ${minutes}m`;
};

export default function WeeklyCallsCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await fetchWithAuth('/appointments');
      if (data && data.data) {
        setAppointments(data.data);
      } else {
        console.error('Invalid data structure received from the server');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // You might want to set an error state here to display to the user
    }
  };

  const handleBookAppointment = async (date, time, coachId, action) => {
    try {
      if (action === 'cancel') {
        await cancelAppointment(selectedBooking.id);
      } else if (action === 'reschedule') {
        await cancelAppointment(selectedBooking.id);
        await createAppointment(date, time, coachId);
      } else {
        await createAppointment(date, time, coachId);
      }
      setShowModal(false);
      await fetchAppointments();
    } catch (error) {
      console.error('Error handling appointment action:', error);
      // You might want to show an error message to the user here
    }
  };

  const createAppointment = async (date, time, coachId) => {
    try {
      const response = await fetchWithAuth('/appointments', {
        method: 'POST',
        body: JSON.stringify({ date: date.toISOString().split('T')[0], time, coachId }),
      });
      if (response && response.data) {
        console.log('Appointment created successfully:', response.data);
        return response.data;
      } else {
        throw new Error('Invalid response from server when creating appointment');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await fetchWithAuth(`/appointments/${appointmentId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'cancelled' }),
      });
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleCancel = async (appointment) => {
    await cancelAppointment(appointment.id);
    fetchAppointments();
  };

  const handleReschedule = (appointment) => {
    setSelectedBooking(appointment);
    setShowModal(true);
  };

  const isDateAvailable = (date) => {
    // Implement your logic to check if the date is available
    return true; // For now, all dates are available
  };

  const isDateBooked = (date) => {
    return appointments.some(call => new Date(call.date).toDateString() === date.toDateString());
  };

  const times = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const days = ['Mon 1', 'Tue 2', 'Wed 3', 'Thu 4', 'Fri 5', 'Sat 6', 'Sun 7'];

  const getSlotStatus = (day, time) => {
    const booking = appointments.find(call => 
      new Date(call.date).toDateString() === day.toDateString() &&
      call.time === time
    );
    if (booking) {
      console.log('Found booking:', booking);
      return styles.booked;
    }
    const dayOfWeek = day.getDay();
    const hour = parseInt(time.split(':')[0]);
    if ((dayOfWeek + hour) % 3 === 1) return styles.available;
    return styles.notAvailable;
  };

  const getSlotContent = (day, time) => {
    const status = getSlotStatus(day, time);
    if (status === styles.booked) return 'Booked';
    if (status === styles.available) return 'Available';
    return 'Not Available';
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('weekly');

  const handlePrevious = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - (viewMode === 'weekly' ? 7 : 30));
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + (viewMode === 'weekly' ? 7 : 30));
      return newDate;
    });
  };

  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
  };

  const getWeekDates = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const formatWeekRange = (days) => {
    const start = days[0];
    const end = days[6];
    return `${formatMonthYear(start)} / Week ${Math.ceil(start.getDate() / 7)}`;
  };

  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add days from previous month to fill the first week
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevMonthDay = new Date(year, month, -i);
      days.unshift(prevMonthDay);
    }

    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from next month to fill the last week
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }

    return days;
  };

  const handleDateChange = (newDate, status) => {
    if (status === styles.booked) {
      const booking = appointments.find(call => 
        new Date(call.date).toDateString() === newDate.toDateString() &&
        call.time === newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      
      if (booking) {
        setSelectedDate(newDate);
        setSelectedBooking(booking);
        setShowModal(true);
      }
    } else if (status === styles.available) {
      setSelectedDate(newDate);
      setSelectedBooking(null);
      setShowModal(true);
    }
  };

  return (
    <div className={styles.weeklyCallsContainer}>
      <div className={styles.calendarHeader}>
        <button className={styles.navButton} onClick={handlePrevious}>&lt;</button>
        <h2>{viewMode === 'weekly' ? formatWeekRange(getWeekDates(currentDate)) : formatMonthYear(currentDate)}</h2>
        <button className={styles.navButton} onClick={handleNext}>&gt;</button>
        <select className={styles.viewSelect} value={viewMode} onChange={handleViewModeChange}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className={styles.calendarGrid}>
        {viewMode === 'weekly' ? (
          <>
            <div className={styles.timeColumn}></div>
            {getWeekDates(currentDate).map(day => (
              <div key={day.toISOString()} className={styles.dayColumn}>
                {day.toLocaleDateString('default', { weekday: 'short', day: 'numeric' })}
              </div>
            ))}
            {times.map(time => (
              <React.Fragment key={time}>
                <div className={styles.timeColumn}>{time}</div>
                {getWeekDates(currentDate).map(day => (
                  <div
                    key={`${day.toISOString()}-${time}`}
                    className={`${styles.timeSlot} ${getSlotStatus(day, time)}`}
                    onClick={() => handleDateChange(new Date(day.setHours(parseInt(time))), getSlotStatus(day, time))}
                  >
                    {getSlotContent(day, time)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={styles.dayColumn}>
                {day}
              </div>
            ))}
            {getMonthDates(currentDate).map(day => (
              <div
                key={day.toISOString()}
                className={`${styles.monthlyTimeSlot} ${
                  day.getMonth() === currentDate.getMonth() ? styles.currentMonth : styles.otherMonth
                }`}
                onClick={() => handleDateChange(day)}
              >
                {day.getDate()}
              </div>
            ))}
          </>
        )}
      </div>
      {showModal && (
        <AppointmentModal
          date={selectedDate}
          onClose={() => setShowModal(false)}
          onBook={handleBookAppointment}
          booking={selectedBooking}
        />
      )}
      <CallsTable 
        calls={appointments} 
        filter={filter} 
        onFilterChange={setFilter}
        onCancel={handleCancel}
        onReschedule={handleReschedule}
      />
    </div>
  );
}
