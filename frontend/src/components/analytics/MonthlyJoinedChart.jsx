import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

function MonthlyJoinedChart({ data = [] }) {
  const { theme } = useTheme();

  if (!data || data.length === 0) {
    return (
      <div style={styles.chartContainer}>
        <h4 style={styles.chartTitle}>Monthly Joined Employees</h4>
        <div style={styles.emptyContainer}>
          <p style={styles.emptyText}>No monthly joining data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.chartContainer}>
      <div style={styles.headerRow}>
        <h4 style={styles.chartTitle}>Monthly Joined Overview</h4>
        <span style={styles.subBadge}>Joining Trends</span>
      </div>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#155EEF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#155EEF" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === 'light' ? '#E2E8F0' : '#334155'}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke={theme === 'light' ? '#64748B' : '#94A3B8'}
              fontSize={12}
              tickLine={false}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              stroke={theme === 'light' ? '#64748B' : '#94A3B8'}
              fontSize={12}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#1E293B',
                borderColor: theme === 'light' ? '#E2E8F0' : '#334155',
                borderRadius: '12px',
                color: theme === 'light' ? '#0F172A' : '#F8FAFC',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              name="Joined Employees"
              stroke="#155EEF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#blueGradient)"
              dot={{ fill: '#155EEF', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
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

export default MonthlyJoinedChart;
