export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: TaskPriority;
  category: TaskCategory;
}

export interface TaskFilter {
  searchQuery: string;
  categories: TaskCategory[];
  priorities: TaskPriority[];
  showCompleted: boolean;
}