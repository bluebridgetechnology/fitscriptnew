import React, { useState, useEffect } from 'react';
import styles from './WeeklyCallsCalendar.module.css';

const AppointmentModal = ({ date, onClose, onBook, booking }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCoach, setSelectedCoach] = useState('');
  const [availableCoaches, setAvailableCoaches] = useState([]);

  const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  useEffect(() => {
    fetchAvailableCoaches();
  }, []);

  const fetchAvailableCoaches = async () => {
    try {
      const response = await fetchWithAuth('/coaches');
      if (response && response.data) {
        setAvailableCoaches(response.data);
      }
    } catch (error) {
      console.error('Error fetching available coaches:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(date, selectedTime, selectedCoach);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {booking ? (
          <>
            <h2 className={styles.modalTitle}>Your Upcoming Call</h2>
            <div className={styles.bookingDetails}>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Coach:</strong> {booking.coach}</p>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={() => onBook(booking, 'cancel')} className={styles.cancelButton}>
                Cancel Call
              </button>
              <button onClick={() => onBook(booking, 'reschedule')} className={styles.rescheduleButton}>
                Reschedule Call
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.modalTitle}>Book Appointment</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="date">Date:</label>
                <input type="text" id="date" value={date.toDateString()} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="time">Available Times:</label>
                <select
                  id="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">Select a time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="coach">Health Coach:</label>
                <select
                  id="coach"
                  value={selectedCoach}
                  onChange={(e) => setSelectedCoach(e.target.value)}
                  required
                >
                  <option value="">Select a coach</option>
                  {availableCoaches.map((coach) => (
                    <option key={coach.id} value={coach.id}>
                      {coach.first_name} {coach.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitButton}>
                  Book Appointment
                </button>
                <button type="button" onClick={onClose} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;