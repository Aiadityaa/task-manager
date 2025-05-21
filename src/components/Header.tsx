import React from 'react';
import { CheckSquare, PlusCircle } from 'lucide-react';

interface HeaderProps {
  onAddNewTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddNewTask }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <CheckSquare size={24} className="text-blue-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          
          <button
            onClick={onAddNewTask}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <PlusCircle size={18} className="mr-1" />
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;