import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { TaskCategory, TaskFilter, TaskPriority } from '../types';
import { useTaskContext } from '../context/TaskContext';

interface TaskFiltersProps {
  onToggleFilters: () => void;
  showFilters: boolean;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ 
  onToggleFilters, 
  showFilters 
}) => {
  const { filter, setFilter } = useTaskContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ searchQuery: e.target.value });
  };

  const toggleCategoryFilter = (category: TaskCategory) => {
    const updatedCategories = filter.categories.includes(category)
      ? filter.categories.filter((c) => c !== category)
      : [...filter.categories, category];
    
    setFilter({ categories: updatedCategories });
  };

  const togglePriorityFilter = (priority: TaskPriority) => {
    const updatedPriorities = filter.priorities.includes(priority)
      ? filter.priorities.filter((p) => p !== priority)
      : [...filter.priorities, priority];
    
    setFilter({ priorities: updatedPriorities });
  };
  
  const toggleShowCompleted = () => {
    setFilter({ showCompleted: !filter.showCompleted });
  };

  const clearFilters = () => {
    setFilter({
      searchQuery: '',
      categories: [],
      priorities: [],
      showCompleted: true
    });
  };

  const hasActiveFilters = 
    filter.searchQuery || 
    filter.categories.length > 0 || 
    filter.priorities.length > 0 || 
    !filter.showCompleted;

  return (
    <div className="mb-6 space-y-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter.searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          onClick={onToggleFilters}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition"
        >
          <Filter size={16} />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
        
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
          >
            <X size={16} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg animate-fade-in">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {(['work', 'personal', 'shopping', 'health', 'other'] as TaskCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategoryFilter(category)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filter.categories.includes(category)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Priority</h3>
            <div className="flex flex-wrap gap-2">
              {(['low', 'medium', 'high'] as TaskPriority[]).map((priority) => (
                <button
                  key={priority}
                  onClick={() => togglePriorityFilter(priority)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filter.priorities.includes(priority)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filter.showCompleted}
                  onChange={toggleShowCompleted}
                />
                <div className={`block w-10 h-6 rounded-full transition ${
                  filter.showCompleted ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                  filter.showCompleted ? 'translate-x-4' : ''
                }`} />
              </div>
              <div className="ml-3 text-sm font-medium text-gray-700">
                Show completed tasks
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;