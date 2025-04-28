
export type Role = 
  | 'owner' 
  | 'manager' 
  | 'chef' 
  | 'waiter' 
  | 'bartender' 
  | 'kitchen-staff';

export type Department = 
  | 'floor' 
  | 'bar' 
  | 'kitchen' 
  | 'service-kitchen'
  | 'prep-kitchen' 
  | 'bakery'
  | 'takeaway';

export type ShiftType = 
  | 'morning' 
  | 'lunch' 
  | 'afternoon' 
  | 'evening';

export type ShiftAction =
  | 'opening'
  | 'closing'
  | 'prep';

export type TaskCompletionMethod = 
  | 'checkmark' 
  | 'photo' 
  | 'quantity' 
  | 'photo-checkmark';

export type TaskType = 
  | 'personal' 
  | 'role' 
  | 'schedule';

export type TaskRecurrence = 
  | 'one-time' 
  | 'repeating' 
  | 'daily-schedule';

export interface User {
  id: string;
  name: string;
  employeeNumber: string;
  role: Role;
  department: Department;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  department?: Department;
  shift?: ShiftType;
  shiftAction?: ShiftAction;
  assignedTo?: string; // userId or role
  assignmentType: 'user' | 'role';
  completionMethod: TaskCompletionMethod;
  type: TaskType;
  recurrence: TaskRecurrence;
  daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  deadline?: string; // ISO date string
  isCompleted: boolean;
  completedAt?: string;
  completedBy?: string;
  completionPhoto?: string;
  quantityRequired?: number;
  quantityOnHand?: number;
  isHighPriority?: boolean;
  taskListId?: string;
}

export interface TaskList {
  id: string;
  name: string;
  description?: string;
  department: Department;
  shift?: ShiftType;
  shiftAction?: ShiftAction;
  tasks: Task[];
  progress: number; // Percentage of completed tasks
  isCompleted: boolean;
  deadline?: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  description?: string;
  time: string; // ISO time string
  isCompleted: boolean;
}

export interface DepartmentProgress {
  department: Department;
  completed: number;
  total: number;
  progress: number; // Percentage
}
