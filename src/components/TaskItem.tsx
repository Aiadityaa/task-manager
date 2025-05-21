import React from 'react';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { formatDate, getCategoryColor, getPriorityColor } from '../utils/helpers';
import { useTaskContext } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { toggleCompleted, deleteTask } = useTaskContext();

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3 transition-all duration-200 transform hover:shadow-md ${
        task.completed ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => toggleCompleted(task.id)}
          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 ${
            task.completed
              ? 'bg-blue-500 border-blue-500 flex items-center justify-center'
              : 'border-gray-300'
          }`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <Check size={14} className="text-white" />}
        </button>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between">
            <h3 
              className={`font-medium text-gray-800 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
            
            <div className="flex space-x-1 ml-2 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
                aria-label="Edit task"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-gray-100"
                aria-label="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mt-1 mb-2">
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
            
            {task.dueDate && (
              <span className="text-xs text-gray-500 flex items-center">
                Due: {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;