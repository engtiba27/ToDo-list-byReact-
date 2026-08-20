import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, editingTask, categories, onAddCategory }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState(categories[1] || 'Study');
  const [customCategory, setCustomCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
      setDueDate(editingTask.dueDate || '');
      setReminder(editingTask.reminder || false);
    } else {
      setTitle('');
      setPriority('medium');
      setCategory(categories[1] || 'Study');
      setDueDate('');
      setReminder(false);
    }
    setIsAddingCategory(false);
  }, [editingTask, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    let finalCategory = category;
    if (isAddingCategory && customCategory.trim()) {
      finalCategory = customCategory.trim();
      onAddCategory(finalCategory);
    }

    onSave({
      title: title.trim(),
      priority,
      category: finalCategory,
      dueDate,
      reminder
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-xl transition-all">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-[#40352F] dark:text-slate-100">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-slate-200 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-1">
              Task Title
            </label>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[#884252]/40 text-sm"
              autoFocus
            />
          </div>

          {/* Priority & Category Pickers */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-800 dark:text-slate-100 outline-none text-sm"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-500 dark:text-slate-400">
                  Category
                </label>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(!isAddingCategory)}
                  className="text-xs text-[#884252] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <Plus size={12} />
                  {isAddingCategory ? 'Select Existing' : 'New'}
                </button>
              </div>

              {isAddingCategory ? (
                <input
                  type="text"
                  placeholder="Category Name"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-800 dark:text-slate-100 outline-none text-sm"
                />
              ) : (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-800 dark:text-slate-100 outline-none text-sm"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Due Date & Time */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-1">
              Due Date & Time
            </label>
            <input
              type="datetime-local"
              lang="en-US"
              translate="no"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-800 dark:text-slate-100 outline-none text-sm notranslate"
            />
          </div>

          {/* Reminder Toggle */}
          <label className="flex items-center gap-2.5 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
              className="w-4 h-4 rounded text-[#884252] focus:ring-[#884252] border-stone-300"
            />
            <span className="text-sm text-stone-700 dark:text-slate-300 font-medium">
              Enable Reminder Notification
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex gap-2.5 mt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#884252] hover:bg-[#733644] text-white rounded-xl text-sm font-semibold transition cursor-pointer shadow-xs"
            >
              Save Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}