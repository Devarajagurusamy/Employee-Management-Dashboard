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

const COLORS = ['#4c6ef5', '#15aabf', '#12b886', '#fab005', '#fd7e14', '#fa5252', '#7950f2'];

function DepartmentChart({ data = [] }) {
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
      <h4 style={styles.chartTitle}>Department-wise Employee Count</h4>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c2e33" vertical={false} />
            <XAxis
              dataKey="department"
              stroke="#888"
              fontSize={12}
              tickLine={false}
              interval={0}
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
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Bar dataKey="count" name="Employees" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

export default DepartmentChart;
