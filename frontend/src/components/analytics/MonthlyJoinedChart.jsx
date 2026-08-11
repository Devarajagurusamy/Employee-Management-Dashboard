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
import { Calendar } from 'lucide-react';

function MonthlyJoinedChart({ data = [] }) {
  const { theme } = useTheme();

  if (!data || data.length === 0) {
    return (
      <div
        data-aos="fade-up"
        className="bg-white dark:bg-[#2d2d30] border border-slate-200 dark:border-[#3e3e42] rounded-2xl p-5 shadow-sm text-left"
      >
        <h4 className="text-base font-bold text-slate-900 dark:text-white m-0">
          Monthly Joined Overview
        </h4>
        <div className="h-[250px] flex items-center justify-center">
          <p className="text-sm text-slate-400">No monthly joining data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="200"
      className="bg-white dark:bg-[#2d2d30] border border-slate-200 dark:border-[#3e3e42] rounded-2xl p-5 shadow-sm text-left"
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white m-0 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#007acc]" />
          Monthly Joined Overview
        </h4>
        <span className="bg-[#007acc] text-white font-bold px-3 py-1 rounded-full text-xs shadow-sm">
          Joining Trends
        </span>
      </div>
      <div className="w-full h-[250px]">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <defs>
              <linearGradient id="blueGradientSolid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007acc" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#007acc" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === 'light' ? '#E2E8F0' : '#3e3e42'}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke={theme === 'light' ? '#64748B' : '#9CA3AF'}
              fontSize={12}
              tickLine={false}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              stroke={theme === 'light' ? '#64748B' : '#9CA3AF'}
              fontSize={12}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#252526',
                borderColor: theme === 'light' ? '#E2E8F0' : '#3e3e42',
                borderRadius: '12px',
                color: theme === 'light' ? '#0F172A' : '#F8FAFC',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              name="Joined Employees"
              stroke="#007acc"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#blueGradientSolid)"
              dot={{ fill: '#007acc', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyJoinedChart;
