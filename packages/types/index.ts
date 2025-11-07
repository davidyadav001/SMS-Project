// Shared TypeScript types for SMS

export interface User {
  id: string;
  email: string;
  role: 'student' | 'staff' | 'admin' | 'lms_student';
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  className: string;
  rollNumber: number;
  phone?: string;
  address?: string;
  dob?: string;
}

export interface Staff {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  department?: string;
  position?: string;
  salary?: number;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  description?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  marks: number;
  maxMarks: number;
  examType: string;
  examDate?: string;
  remarks?: string;
}

export interface Material {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  fileName?: string;
  fileSize?: number;
}

export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  dueDate: string;
  maxMarks: number;
}

export interface AdmissionForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  className: string;
  documents?: any[];
  status: 'pending' | 'shortlisted' | 'rejected' | 'accepted';
  remarks?: string;
  submittedAt: string;
  reviewedAt?: string;
}

