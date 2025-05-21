import React from 'react';
import { ClipboardList } from 'lucide-react';

interface EmptyStateProps {
  filtered?: boolean;
  onAddNewTask: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filtered = false, onAddNewTask }) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        <ClipboardList size={24} className="text-blue-600" />
      </div>
      
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        {filtered ? 'No matching tasks found' : 'No tasks yet'}
      </h3>
      
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        {filtered 
          ? 'Try adjusting your filters or search terms to find what you\'re looking for.'
          : 'Get started by creating your first task to stay organized and productive.'}
      </p>
      
      {!filtered && (
        <button
          onClick={onAddNewTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Your First Task
        </button>
      )}
    </div>
  );
};

export default EmptyState;