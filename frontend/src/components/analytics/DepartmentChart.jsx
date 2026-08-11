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
import { Building2 } from 'lucide-react';

const SOLID_COLORS = ['#007acc', '#0284C7', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

function DepartmentChart({ data = [] }) {
  const { theme } = useTheme();

  if (!data || data.length === 0) {
    return (
      <div
        data-aos="fade-up"
        className="bg-white dark:bg-[#2d2d30] border border-slate-200 dark:border-[#3e3e42] rounded-2xl p-5 shadow-sm text-left"
      >
        <h4 className="text-base font-bold text-slate-900 dark:text-white m-0">
          Department-wise Count
        </h4>
        <div className="h-[250px] flex items-center justify-center">
          <p className="text-sm text-slate-400">No department data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="150"
      className="bg-white dark:bg-[#2d2d30] border border-slate-200 dark:border-[#3e3e42] rounded-2xl p-5 shadow-sm text-left"
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white m-0 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#007acc]" />
          Department-wise Count
        </h4>
        <span className="bg-[#007acc] text-white font-bold px-3 py-1 rounded-full text-xs shadow-sm">
          Department Map
        </span>
      </div>
      <div className="w-full h-[250px]">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === 'light' ? '#E2E8F0' : '#3e3e42'}
              vertical={false}
            />
            <XAxis
              dataKey="department"
              stroke={theme === 'light' ? '#64748B' : '#9CA3AF'}
              fontSize={12}
              tickLine={false}
              interval={0}
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
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#1e1e1e',
                borderColor: theme === 'light' ? '#E2E8F0' : '#3e3e42',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              }}
              itemStyle={{
                color: theme === 'light' ? '#0F172A' : '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
              }}
              labelStyle={{
                color: theme === 'light' ? '#0F172A' : '#FFFFFF',
                fontWeight: '700',
                marginBottom: '2px',
              }}
              cursor={{ fill: 'rgba(0, 122, 204, 0.1)' }}
            />
            <Bar dataKey="count" name="Employees" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={SOLID_COLORS[index % SOLID_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DepartmentChart;
