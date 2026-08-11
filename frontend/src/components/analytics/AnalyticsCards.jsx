import React from 'react';

function AnalyticsCards({ totalEmployees = 0, activeEmployees = 0, inactiveEmployees = 0 }) {
  const activePercentage = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0;

  return (
    <div style={styles.grid}>
      {/* Total Employees Card */}
      <div style={{ ...styles.card, borderTop: '3px solid #4c6ef5' }}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>Total Employees</span>
          <span style={styles.iconBadgeBlue}>👥</span>
        </div>
        <div style={styles.metricValue}>{totalEmployees}</div>
        <div style={styles.cardSubtext}>Active workforce count in system</div>
      </div>

      {/* Active Employees Card */}
      <div style={{ ...styles.card, borderTop: '3px solid #51cf66' }}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>Active Employees</span>
          <span style={styles.iconBadgeGreen}>⚡</span>
        </div>
        <div style={{ ...styles.metricValue, color: '#51cf66' }}>{activeEmployees}</div>
        <div style={styles.cardSubtext}>{activePercentage}% of total workforce active</div>
      </div>

      {/* Inactive Employees Card */}
      <div style={{ ...styles.card, borderTop: '3px solid #ff922b' }}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>Inactive Employees</span>
          <span style={styles.iconBadgeOrange}>⏳</span>
        </div>
        <div style={{ ...styles.metricValue, color: '#ff922b' }}>{inactiveEmployees}</div>
        <div style={styles.cardSubtext}>{100 - activePercentage}% of workforce on leave/inactive</div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.25rem',
    marginBottom: '1.5rem',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    border: '1px solid #333',
    padding: '1.25rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  cardTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  iconBadgeBlue: {
    backgroundColor: 'rgba(76, 110, 245, 0.15)',
    padding: '0.35rem 0.55rem',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  iconBadgeGreen: {
    backgroundColor: 'rgba(81, 207, 102, 0.15)',
    padding: '0.35rem 0.55rem',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  iconBadgeOrange: {
    backgroundColor: 'rgba(255, 146, 43, 0.15)',
    padding: '0.35rem 0.55rem',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  metricValue: {
    fontSize: '2.1rem',
    fontWeight: '700',
    color: '#fff',
    lineHeight: '1.1',
    marginBottom: '0.4rem',
  },
  cardSubtext: {
    fontSize: '0.8rem',
    color: '#777',
  },
};

export default AnalyticsCards;
