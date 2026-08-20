import React from 'react';
import { CheckCircle2, ListTodo, Clock } from 'lucide-react';

export default function StatsBar({ total, completed, pending, progress }) {
  return (
    <div className="bg-[#FAF7F2] dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700/60 rounded-2xl p-5 mb-6 shadow-xs transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <span className="text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase tracking-wider">
            Daily Progress
          </span>
          <div className="text-3xl font-extrabold text-stone-800 dark:text-sky-400 mt-1">
            {progress}%
          </div>
        </div>

        {/* بطاقات أرقام الإحصائيات */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <ListTodo className="text-stone-400 dark:text-slate-400" size={18} />
            <div>
              <div className="text-xs text-stone-500 dark:text-slate-400">Total</div>
              <div className="text-sm font-bold text-stone-800 dark:text-slate-100">{total}</div>
            </div>
          </div>

          <div className="h-8 w-px bg-stone-200 dark:bg-slate-700" />

          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={18} />
            <div>
              <div className="text-xs text-stone-500 dark:text-slate-400">Done</div>
              <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{completed}</div>
            </div>
          </div>

          <div className="h-8 w-px bg-stone-200 dark:bg-slate-700" />

          <div className="flex items-center gap-2">
            <Clock className="text-stone-400" size={18} />
            <div>
              <div className="text-xs text-stone-500 dark:text-slate-400">Pending</div>
              <div className="text-sm font-bold text-stone-700 dark:text-stone-300">{pending}</div>
            </div>
          </div>
        </div>
      </div>

      {/* شريط التقدم */}
      <div className="w-full bg-stone-200/70 dark:bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-rose-400 dark:bg-sky-400 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}