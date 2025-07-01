import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminPage.module.css";

export default function AdminPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Dashboard</h1>
      <p className={styles.subtext}>
        Welcome, Admin! You can manage ships, components, and jobs here.
      </p>

      <div className={styles.grid}>
        <Link to="/ships">
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Manage Ships</h2>
            <p className={styles.cardText}>View, add, edit, or delete ships.</p>
          </div>
        </Link>

        <Link to="/components">
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Manage Components</h2>
            <p className={styles.cardText}>Handle ship components and maintenance data.</p>
          </div>
        </Link>

        <Link to="/jobs">
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Manage Jobs</h2>
            <p className={styles.cardText}>Create and track maintenance jobs.</p>
          </div>
        </Link>

        <Link to="/calendar">
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Maintenance Calendar</h2>
            <p className={styles.cardText}>View scheduled jobs by date.</p>
          </div>
        </Link>

        <Link to="/notifications">
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Notifications</h2>
            <p className={styles.cardText}>See alerts for job status changes.</p>
          </div>
        </Link>

        <Link to="/kpis">
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>KPIs Dashboard</h2>
            <p className={styles.cardText}>View key statistics and performance.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
