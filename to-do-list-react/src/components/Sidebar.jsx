import React, { useState } from 'react';
import { Folder, Plus, Trash2 } from 'lucide-react';

export default function Sidebar({ categories, activeCategory, setActiveCategory, onAddCategory, onDeleteCategory }) {
  const [newCategory, setNewCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setActiveCategory(newCategory.trim());
      setNewCategory('');
      setIsAdding(false);
    }
  };

  return (
    <aside className="w-64 bg-[#EDE3D5] dark:bg-slate-900/60 border-r border-[#D8C9B8] dark:border-slate-800 p-5 flex flex-col gap-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#806F63] dark:text-slate-400 tracking-wider uppercase">
          Categories
        </span>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-1 rounded-lg text-[#934B58] dark:text-sky-400 hover:bg-[#E2D4C4] dark:hover:bg-slate-800 transition cursor-pointer"
          title="Add Custom Category"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* حقل إضافة تصنيف جديد */}
      {isAdding && (
        <form onSubmit={handleAddCategory} className="flex gap-2">
          <input
            type="text"
            placeholder="New Category..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full text-sm px-3 py-1.5 rounded-lg border border-[#CDBDAE] dark:border-slate-700 bg-[#FFF9F1] dark:bg-slate-800 text-[#40352F] dark:text-slate-100 outline-none focus:ring-2 focus:ring-[#D5A8AD] dark:focus:ring-sky-500"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-[#934B58] dark:bg-sky-500 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            Add
          </button>
        </form>
      )}

      {/* قائمة التصنيفات */}
      <div className="flex flex-col gap-1.5">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`group flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${activeCategory === cat
                ? 'bg-[#934B58] dark:bg-sky-500 text-white shadow-xs'
                : 'text-[#5F5148] dark:text-slate-300 hover:bg-[#E2D4C4] dark:hover:bg-slate-800'
              }`}
            onClick={() => setActiveCategory(cat)}
          >
            <div className="flex items-center gap-2.5 truncate">
              <Folder size={16} />
              <span className="truncate">{cat}</span>
            </div>

            {cat !== 'All' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCategory(cat);
                }}
                className={`p-1 rounded-md opacity-0 group-hover:opacity-100 transition cursor-pointer ${activeCategory === cat
                    ? 'hover:bg-[#7D3D4A] dark:hover:bg-sky-600 text-white'
                    : 'hover:bg-[#F8E8E7] dark:hover:bg-rose-950/50 text-[#934B58]'
                  }`}
                title="Delete Category"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}