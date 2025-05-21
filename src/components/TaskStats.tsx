import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    highPriority: number;
  };
}

const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  // Calculate completion percentage (avoid division by zero)
  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center">
        <div className="rounded-full bg-blue-100 p-3 mr-4">
          <Clock size={20} className="text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Tasks</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center">
        <div className="rounded-full bg-green-100 p-3 mr-4">
          <CheckCircle size={20} className="text-green-600" />
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium text-gray-500">Completed</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
            <span className="text-sm text-green-600 font-medium">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center">
        <div className="rounded-full bg-red-100 p-3 mr-4">
          <AlertCircle size={20} className="text-red-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">High Priority</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.highPriority}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;