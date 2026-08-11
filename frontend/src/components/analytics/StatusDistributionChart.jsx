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
import { PieChart as PieChartIcon } from 'lucide-react';

const STATUS_COLORS = {
  Active: '#10B981',
  Inactive: '#F59E0B',
};

function StatusDistributionChart({ data = [] }) {
  const { theme } = useTheme();

  if (!data || data.length === 0 || data.every((d) => d.count === 0)) {
    return (
      <div
        data-aos="fade-up"
        className="bg-white dark:bg-[#2d2d30] border border-slate-200 dark:border-[#3e3e42] rounded-2xl p-5 shadow-sm text-left"
      >
        <h4 className="text-base font-bold text-slate-900 dark:text-white m-0">
          Status Distribution
        </h4>
        <div className="h-[250px] flex items-center justify-center">
          <p className="text-sm text-slate-400">No status distribution data available.</p>
        </div>
      </div>
    );
  }

  const validData = data.filter((d) => d.count > 0);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="250"
      className="bg-white dark:bg-[#2d2d30] border border-slate-200 dark:border-[#3e3e42] rounded-2xl p-5 shadow-sm text-left"
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white m-0 flex items-center gap-2">
          <PieChartIcon className="w-4 h-4 text-[#007acc]" />
          Status Distribution
        </h4>
        <span className="bg-[#007acc] text-white font-bold px-3 py-1 rounded-full text-xs shadow-sm">
          Workforce Status
        </span>
      </div>
      <div className="w-full h-[250px]">
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
                  fill={STATUS_COLORS[entry.status] || '#007acc'}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#252526',
                borderColor: theme === 'light' ? '#E2E8F0' : '#3e3e42',
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

export default StatusDistributionChart;
