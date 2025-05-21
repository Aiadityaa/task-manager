import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, TaskCategory, TaskFilter, TaskPriority } from '../types';
import { generateId } from '../utils/helpers';

interface TaskContextType {
  tasks: Task[];
  filter: TaskFilter;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleCompleted: (id: string) => void;
  setFilter: (filter: Partial<TaskFilter>) => void;
  filteredTasks: Task[];
  taskStats: {
    total: number;
    completed: number;
    highPriority: number;
  };
}

const defaultFilter: TaskFilter = {
  searchQuery: '',
  categories: [],
  priorities: [],
  showCompleted: true,
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        // Parse the tasks and convert string dates back to Date objects
        return JSON.parse(savedTasks, (key, value) => {
          if (key === 'createdAt' || key === 'dueDate') {
            return value ? new Date(value) : undefined;
          }
          return value;
        });
      } catch (error) {
        console.error('Failed to parse saved tasks:', error);
        return [];
      }
    }
    return [];
  });

  const [filter, setFilterState] = useState<TaskFilter>(defaultFilter);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const setFilter = (newFilter: Partial<TaskFilter>) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  };

  // Apply filters to get the filtered tasks
  const filteredTasks = tasks.filter((task) => {
    // Search query filter
    if (
      filter.searchQuery &&
      !task.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) &&
      !task.description?.toLowerCase().includes(filter.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Category filter
    if (filter.categories.length > 0 && !filter.categories.includes(task.category)) {
      return false;
    }

    // Priority filter
    if (filter.priorities.length > 0 && !filter.priorities.includes(task.priority)) {
      return false;
    }

    // Completed filter
    if (!filter.showCompleted && task.completed) {
      return false;
    }

    return true;
  });

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    highPriority: tasks.filter((task) => task.priority === 'high' && !task.completed).length,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        addTask,
        updateTask,
        deleteTask,
        toggleCompleted,
        setFilter,
        filteredTasks,
        taskStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};