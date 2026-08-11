import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const LIGHT_COLORS = ['#155EEF', '#0284C7', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];
const DARK_COLORS = ['#3B82F6', '#38BDF8', '#34D399', '#FBBF24', '#818CF8', '#F472B6', '#A78BFA'];

function DepartmentChart({ data = [] }) {
  const { theme } = useTheme();
  const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  if (!data || data.length === 0) {
    return (
      <div style={styles.chartContainer}>
        <h4 style={styles.chartTitle}>Department Distribution</h4>
        <div style={styles.emptyContainer}>
          <p style={styles.emptyText}>No department data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.chartContainer}>
      <div style={styles.headerRow}>
        <h4 style={styles.chartTitle}>Department-wise Count</h4>
        <span style={styles.subBadge}>Department Map</span>
      </div>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === 'light' ? '#E2E8F0' : '#334155'}
              vertical={false}
            />
            <XAxis
              dataKey="department"
              stroke={theme === 'light' ? '#64748B' : '#94A3B8'}
              fontSize={12}
              tickLine={false}
              interval={0}
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
              cursor={{ fill: 'rgba(21, 94, 239, 0.05)' }}
            />
            <Bar dataKey="count" name="Employees" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
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

export default DepartmentChart;
