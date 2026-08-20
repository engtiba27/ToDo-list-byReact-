import React from 'react';
import { CheckCircle2, Circle, Trash2, Edit3, Calendar, Tag, Bell } from 'lucide-react';
import { priorities } from '../theme';

export default function TaskCard({ task, onToggleComplete, onDelete, onEdit }) {
  const priorityInfo = priorities[task.priority] || priorities.medium;

  return (
    <div
      className={`bg-[#FAF7F2] dark:bg-slate-800 border border-stone-200/80 dark:border-slate-700/60 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all duration-200 hover:shadow-xs ${
        task.completed ? 'opacity-60 bg-stone-100/50 dark:bg-slate-800/40' : ''
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="text-stone-400 dark:text-sky-400 hover:scale-110 transition cursor-pointer flex-shrink-0"
        >
          {task.completed ? (
            <CheckCircle2 size={22} className="text-emerald-500" />
          ) : (
            <Circle size={22} />
          )}
        </button>

        <div className="flex flex-col gap-1 min-w-0">
          <span
            className={`font-semibold text-stone-800 dark:text-slate-100 truncate ${
              task.completed ? 'line-through text-stone-400 dark:text-slate-500' : ''
            }`}
          >
            {task.title}
          </span>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded-md font-bold flex items-center gap-1.5 ${priorityInfo.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dot}`} />
              {priorityInfo.label}
            </span>

            <span className="px-2 py-0.5 rounded-md bg-stone-200/60 dark:bg-slate-700 text-stone-700 dark:text-slate-300 font-medium flex items-center gap-1">
              <Tag size={12} />
              {task.category}
            </span>

            {task.dueDate && (
              <span className="text-stone-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar size={12} />
                {task.dueDate}
              </span>
            )}

            {task.reminder && (
              <Bell size={13} className="text-rose-400 dark:text-sky-400" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 text-stone-400 hover:text-stone-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-stone-200/60 dark:hover:bg-slate-700 rounded-lg transition cursor-pointer"
          title="Edit Task"
        >
          <Edit3 size={17} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition cursor-pointer"
          title="Delete Task"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}