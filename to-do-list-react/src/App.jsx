import React, { useState, useEffect } from 'react';
import { Plus, Search, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import { defaultCategories } from './theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatsBar from './components/StatsBar';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';

export default function App() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = (newCat) => {
    if (!categories.includes(newCat)) setCategories([...categories, newCat]);
  };

  const handleDeleteCategory = (catToDelete) => {
    if (catToDelete === 'All') return;
    setCategories(categories.filter(c => c !== catToDelete));
    if (activeCategory === catToDelete) setActiveCategory('All');
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.85 } });
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData,
        completed: false,
        createdAt: new Date().toLocaleDateString()
      };
      setTasks([newTask, ...tasks]);
    }
    setEditingTask(null);
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        if (nextState) triggerConfetti();
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = activeCategory === 'All' || task.category === activeCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
   <div 
  className="min-h-screen text-[#40352F] dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 bg-cover bg-center bg-fixed bg-no-repeat"
  style={{ backgroundImage: `url('${isDark ? '/dark-bg.jpg' : '/bg.jpg'}')` }}
>
      <Header
        isDark={isDark}
        setIsDark={setIsDark}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1">
        {isSidebarOpen && (
          <Sidebar
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        <main className="flex-1 p-6 sm:p-8 max-w-4xl mx-auto w-full">
          <StatsBar
            total={totalTasks}
            completed={completedTasks}
            pending={pendingTasks}
            progress={progressPercentage}
          />

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-[#FAF7F2] dark:bg-slate-800 border border-stone-200/80 dark:border-slate-700/60 rounded-xl shadow-xs">
              <Search size={18} className="text-[#8D7C70] dark:text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-[#40352F] dark:text-slate-100 placeholder-[#A59487] dark:placeholder-slate-500"
              />
            </div>

            {completedTasks > 0 && (
              <button
                onClick={handleClearCompleted}
                className="px-4 py-2.5 text-xs font-semibold text-[#934B58] dark:text-rose-400 hover:bg-[#F8E8E7] dark:hover:bg-rose-950/40 border border-[#DDB8B9] dark:border-rose-900/40 rounded-xl transition cursor-pointer"
              >
                Clear Completed ({completedTasks})
              </button>
            )}
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 px-4 bg-[#FFF9F1]/60 dark:bg-slate-800/40 border border-dashed border-[#CDBDAE] dark:border-slate-700 rounded-2xl">
              <AlertCircle size={44} className="mx-auto text-[#C5B2A2] dark:text-slate-600 mb-3" />
              <p className="text-sm font-medium text-[#806F63] dark:text-slate-400">
                No tasks found. Click the floating (+) button to add your first task!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <button
        onClick={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
        className="fixed bottom-6 left-6 w-14 h-14 bg-[#934B58] dark:bg-sky-500 hover:bg-[#7D3D4A] dark:hover:bg-sky-600 text-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer z-40"
        title="Add New Task"
      >
        <Plus size={28} />
      </button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
        categories={categories}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}