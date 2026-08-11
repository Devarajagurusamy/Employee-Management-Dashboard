import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const STATUS_COLORS = {
  Active: '#51cf66',
  Inactive: '#ff922b',
};

function StatusDistributionChart({ data = [] }) {
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
      <h4 style={styles.chartTitle}>Employee Status Distribution</h4>
      <div style={{ width: '100%', height: 260 }}>
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
                  fill={STATUS_COLORS[entry.status] || '#4c6ef5'}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#25262b',
                borderColor: '#333',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ color: '#aaa', fontSize: '0.85rem' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const styles = {
  chartContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    border: '1px solid #333',
    padding: '1.25rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
  },
  chartTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
  },
  emptyContainer: {
    height: 260,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: '0.9rem',
  },
};

export default StatusDistributionChart;
