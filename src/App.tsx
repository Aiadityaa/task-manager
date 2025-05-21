import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { Task } from './types';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskItem from './components/TaskItem';
import EmptyState from './components/EmptyState';
import TaskStats from './components/TaskStats';
import { useTaskContext } from './context/TaskContext';

function TaskManager() {
  const { filteredTasks, taskStats } = useTaskContext();
  const [showFilters, setShowFilters] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleAddNewTask = () => {
    setEditingTask(undefined);
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddNewTask={handleAddNewTask} />
      
      <main className="flex-grow py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TaskStats stats={taskStats} />
          
          <TaskFilters 
            onToggleFilters={() => setShowFilters(!showFilters)} 
            showFilters={showFilters} 
          />
          
          <div className="space-y-1">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onEdit={handleEditTask} 
                />
              ))
            ) : (
              <EmptyState 
                filtered={showFilters || taskStats.total > 0} 
                onAddNewTask={handleAddNewTask} 
              />
            )}
          </div>
        </div>
      </main>
      
      {showTaskForm && (
        <TaskForm 
          task={editingTask} 
          onClose={handleCloseTaskForm} 
        />
      )}
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  );
}

export default App;