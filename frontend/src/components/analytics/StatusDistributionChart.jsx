import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const STATUS_COLORS = {
  Active: '#10B981',
  Inactive: '#F59E0B',
};

function StatusDistributionChart({ data = [] }) {
  const { theme } = useTheme();

  if (!data || data.length === 0 || data.every((d) => d.count === 0)) {
    return (
      <div style={styles.chartContainer}>
        <h4 style={styles.chartTitle}>Status Distribution</h4>
        <div style={styles.emptyContainer}>
          <p style={styles.emptyText}>No status distribution data available.</p>
        </div>
      </div>
    );
  }

  const validData = data.filter((d) => d.count > 0);

  return (
    <div style={styles.chartContainer}>
      <div style={styles.headerRow}>
        <h4 style={styles.chartTitle}>Status Distribution</h4>
        <span style={styles.subBadge}>Workforce Status</span>
      </div>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={validData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="count"
              nameKey="status"
              label={({ status, count }) => `${status}: ${count}`}
            >
              {validData.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_COLORS[entry.status] || '#155EEF'}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#1E293B',
                borderColor: theme === 'light' ? '#E2E8F0' : '#334155',
                borderRadius: '12px',
                color: theme === 'light' ? '#0F172A' : '#F8FAFC',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const styles = {
  chartContainer: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '18px',
    border: '1px solid var(--border-color)',
    padding: '1.35rem',
    boxShadow: 'var(--card-shadow)',
    textAlign: 'left',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  chartTitle: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  subBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--primary)',
    backgroundColor: 'var(--primary-soft)',
    padding: '0.25rem 0.6rem',
    borderRadius: '12px',
  },
  emptyContainer: {
    height: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  },
};

export default StatusDistributionChart;
