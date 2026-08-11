import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Sun,
  Moon,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

function TopNavbar({ activeTab = 'Dashboard', onTabChange }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex flex-wrap justify-between items-center px-6 py-4 mb-6  rounded-2xl transition-colors duration-200">
      {/* Brand Logo */}
      <div className="flex items-center">
        <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-[#2d2d30] px-4 py-2 rounded-full border border-slate-200 dark:border-[#3e3e42]">
          <div className="w-5 h-5 rounded-full bg-[#007acc] flex items-center justify-center text-white text-xs font-black">
            E
          </div>
          <span className="font-extrabold text-base tracking-wide text-slate-900 dark:text-white">
            EMD
          </span>
        </div>
      </div>

      {/* Navigation Tabs (Lucide Icons) */}
      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#2d2d30] p-1.5 rounded-full border border-slate-200 dark:border-[#3e3e42]">
        <button
          onClick={() => onTabChange && onTabChange('Dashboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            activeTab === 'Dashboard'
              ? 'bg-[#007acc] text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
          type="button"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>

        <button
          onClick={() => onTabChange && onTabChange('Employees')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            activeTab === 'Employees'
              ? 'bg-[#007acc] text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
          type="button"
        >
          <Users className="w-4 h-4" />
          Employees
        </button>

        <button
          onClick={() => onTabChange && onTabChange('Analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            activeTab === 'Analytics'
              ? 'bg-[#007acc] text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
          type="button"
        >
          <BarChart3 className="w-4 h-4" />
          Analytics
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#3e3e42] bg-slate-50 dark:bg-[#2d2d30] text-slate-800 dark:text-slate-100 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-[#3e3e42] transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          type="button"
        >
          {theme === 'light' ? (
            <>
              <Moon className="w-4 h-4 text-slate-700" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Light</span>
            </>
          )}
        </button>

        {/* User Profile Info & Logout */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#2d2d30] px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-[#3e3e42]">
          <div className="w-8 h-8 rounded-full bg-[#007acc] text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {user?.name || 'Admin User'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#007acc]" /> Administrator
            </span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1 ml-1 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
            title="Logout"
            type="button"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TopNavbar;
