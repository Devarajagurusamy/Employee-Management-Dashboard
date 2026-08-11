import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function MonthlyJoinedChart({ data = [] }) {
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
      <h4 style={styles.chartTitle}>Monthly Joined Employees</h4>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c2e33" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#888"
              fontSize={12}
              tickLine={false}
              angle={-20}
              textAnchor="end"
            />
            <YAxis stroke="#888" fontSize={12} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#25262b',
                borderColor: '#333',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              name="Joined Employees"
              stroke="#15aabf"
              strokeWidth={3}
              dot={{ fill: '#15aabf', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
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

export default MonthlyJoinedChart;
