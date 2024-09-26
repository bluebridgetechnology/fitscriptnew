"use client"
import WeeklyCallsCalendar from './WeeklyCallsCalendar';
import DashboardLayout from '../dashboard/layout';
import styles from './WeeklyCallsCalendar.module.css';
import '../globals.css';

export default function WeeklyCalls() {
  return (
    <DashboardLayout>
      <div className={styles.pageBackground}>
        <h1 className={styles.pageTitle}>Weekly Calls</h1>
        <p className={styles.pageDescription}>Schedule and manage your appointments with health coaches</p>
        <WeeklyCallsCalendar />
      </div>
    </DashboardLayout>
  );
}