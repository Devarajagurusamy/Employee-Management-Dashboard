import React from 'react';

function AnalyticsCards({ totalEmployees = 0, activeEmployees = 0, inactiveEmployees = 0 }) {
  const activePercentage = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0;

  return (
    <div style={styles.grid}>
      {/* Total Employees Card (Vibrant Blue Card from reference image) */}
      <div style={styles.cardBluePrimary}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitleWhite}>Total Employees</span>
          <span style={styles.arrowBadgeWhite}>↗</span>
        </div>
        <div style={styles.cardBodyRow}>
          <div style={styles.metricValueWhite}>{totalEmployees}</div>
          <span style={styles.cardIconWhite}>👥</span>
        </div>
        <div style={styles.cardSubtextWhite}>System active workforce</div>
      </div>

      {/* Active Employees Card (Darker Blue Card from reference image) */}
      <div style={styles.cardBlueSecondary}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitleWhite}>Active Employees</span>
          <span style={styles.arrowBadgeWhite}>↗</span>
        </div>
        <div style={styles.cardBodyRow}>
          <div style={styles.metricValueWhite}>{activeEmployees}</div>
          <span style={styles.cardIconWhite}>⚡</span>
        </div>
        <div style={styles.cardSubtextWhite}>{activePercentage}% active status</div>
      </div>

      {/* Inactive Employees Card (Glass/Neutral Card) */}
      <div style={styles.cardGlass}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>Inactive Employees</span>
          <span style={styles.arrowBadge}>⏳</span>
        </div>
        <div style={styles.cardBodyRow}>
          <div style={styles.metricValueOrange}>{inactiveEmployees}</div>
          <span style={styles.cardIcon}>💤</span>
        </div>
        <div style={styles.cardSubtext}>{100 - activePercentage}% inactive status</div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
    marginBottom: '1.5rem',
  },
  // Vibrant Blue Primary Card (Matching top right blue card in reference image)
  cardBluePrimary: {
    background: 'linear-gradient(135deg, #155EEF 0%, #1D4ED8 100%)',
    borderRadius: '18px',
    padding: '1.35rem',
    color: '#FFFFFF',
    boxShadow: '0 8px 20px rgba(21, 94, 239, 0.28)',
    textAlign: 'left',
    position: 'relative',
    overflow: 'hidden',
  },
  // Darker Blue Secondary Card (Matching second blue card in reference image)
  cardBlueSecondary: {
    background: 'linear-gradient(135deg, #0F4FD8 0%, #1E40AF 100%)',
    borderRadius: '18px',
    padding: '1.35rem',
    color: '#FFFFFF',
    boxShadow: '0 8px 20px rgba(15, 79, 216, 0.25)',
    textAlign: 'left',
    position: 'relative',
    overflow: 'hidden',
  },
  // Soft Glass Card
  cardGlass: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '18px',
    border: '1px solid var(--border-color)',
    padding: '1.35rem',
    boxShadow: 'var(--card-shadow)',
    textAlign: 'left',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  cardTitleWhite: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  arrowBadgeWhite: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.9rem',
    color: '#FFFFFF',
  },
  arrowBadge: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-soft)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
  },
  cardBodyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '0.25rem',
  },
  metricValueWhite: {
    fontSize: '2.4rem',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: '1.1',
  },
  metricValueOrange: {
    fontSize: '2.4rem',
    fontWeight: '800',
    color: 'var(--accent-orange)',
    lineHeight: '1.1',
  },
  cardIconWhite: {
    fontSize: '1.5rem',
    opacity: 0.85,
  },
  cardIcon: {
    fontSize: '1.5rem',
  },
  cardSubtextWhite: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.75)',
  },
  cardSubtext: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
};

export default AnalyticsCards;
