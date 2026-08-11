import React from 'react';
import { Users, UserCheck, UserX, ArrowUpRight } from 'lucide-react';

function AnalyticsCards({ totalEmployees = 0, activeEmployees = 0, inactiveEmployees = 0 }) {
  const activePercentage = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      {/* Total Employees Card (Solid Crisp Blue #007acc) */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="bg-[#007acc] text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold uppercase tracking-wider opacity-90">
            Total Employees
          </span>
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex justify-between items-baseline my-1">
          <span className="text-4xl font-extrabold tracking-tight">{totalEmployees}</span>
          <Users className="w-7 h-7 opacity-80" />
        </div>
        <span className="text-xs opacity-80 mt-1">Total workforce records</span>
      </div>

      {/* Active Employees Card (Solid Darker Blue #005fb8) */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="bg-[#005fb8] text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold uppercase tracking-wider opacity-90">
            Active Employees
          </span>
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex justify-between items-baseline my-1">
          <span className="text-4xl font-extrabold tracking-tight">{activeEmployees}</span>
          <UserCheck className="w-7 h-7 opacity-80" />
        </div>
        <span className="text-xs opacity-80 mt-1">{activePercentage}% active status</span>
      </div>

      {/* Inactive Employees Card (Crisp High-Contrast Dual Color) */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="bg-white dark:bg-[#2d2d30] border border-slate-200 dark:border-[#3e3e42] rounded-2xl p-5 shadow-sm flex flex-col justify-between text-slate-900 dark:text-white"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Inactive Employees
          </span>
          <div className="w-7 h-7 rounded-full bg-[#007acc] flex items-center justify-center">
            <UserX className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex justify-between items-baseline my-1">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {inactiveEmployees}
          </span>
          <UserX className="w-7 h-7 text-[#007acc]" />
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {100 - activePercentage}% inactive status
        </span>
      </div>
    </div>
  );
}

export default AnalyticsCards;
