import React from 'react';
import { Sparkles, Sun, Moon, Menu, X } from 'lucide-react';

export default function Header({ isDark, setIsDark, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <header className="bg-[#FFF9F1] dark:bg-slate-900 border-b border-[#D8C9B8] dark:border-slate-800 px-6 py-4 flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-xl text-[#5F5148] dark:text-slate-200 hover:bg-[#E9DDCF] dark:hover:bg-slate-800 transition"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <h1 className="text-xl font-bold text-[#40352F] dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="text-[#934B58] dark:text-sky-400" size={24} />
          To-Do List
        </h1>
      </div>

      <button
        onClick={() => setIsDark(!isDark)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9DDCF] dark:bg-slate-800 text-[#5F5148] dark:text-slate-200 text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
      >
        {isDark ? (
          <>
            <Sun size={18} className="text-amber-300" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={18} className="text-[#5B5A82]" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    </header>
  );
}