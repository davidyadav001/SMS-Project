// Shared utilities for SMS

import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'PPp');
};

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: 'yellow',
    paid: 'green',
    overdue: 'red',
    present: 'green',
    absent: 'red',
    late: 'orange',
    accepted: 'green',
    shortlisted: 'blue',
    rejected: 'red',
    submitted: 'blue',
    graded: 'green',
  };
  return colors[status] || 'gray';
};

