/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Format a date to a readable string
 */
export const formatDate = (date: Date | undefined): string => {
  if (!date) return '';
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const isToday = 
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
    
  const isTomorrow = 
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();
  
  if (isToday) return 'Today';
  if (isTomorrow) return 'Tomorrow';
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  });
};

/**
 * Get the color for a priority level
 */
export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'low':
      return 'bg-blue-100 text-blue-800';
    case 'medium':
      return 'bg-amber-100 text-amber-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Get the color for a category
 */
export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'work':
      return 'bg-indigo-100 text-indigo-800';
    case 'personal':
      return 'bg-purple-100 text-purple-800';
    case 'shopping':
      return 'bg-green-100 text-green-800';
    case 'health':
      return 'bg-cyan-100 text-cyan-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
};