
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

export type TaskPriority = 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'urgent';

export type TaskStatus = 
  | 'pending' 
  | 'in-progress' 
  | 'completed' 
  | 'overdue' 
  | 'blocked';

export interface User {
  id: string;
  name: string;
  employeeNumber: string;
  role: Role;
  department: Department;
}

export interface TaskDependency {
  id: string;
  prerequisiteTaskId: string;
  dependentTaskId: string;
  createdAt: string;
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: string; // For threaded replies
}

export interface TaskAttachment {
  id: string;
  taskId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface TaskTimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in minutes
  description?: string;
  createdAt: string;
}

export interface TaskHistoryEntry {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  action: string;
  previousValue?: any;
  newValue?: any;
  timestamp: string;
  description: string;
}

export interface TaskTemplate {
  id: string;
  name: string;
  description?: string;
  department: Department;
  shift?: ShiftType;
  shiftAction?: ShiftAction;
  estimatedDuration?: number; // in minutes
  priority: TaskPriority;
  completionMethod: TaskCompletionMethod;
  instructions?: string;
  checklistItems?: string[];
  createdBy: string;
  createdAt: string;
  isActive: boolean;
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
  // New Phase 3 properties
  priority: TaskPriority;
  status: TaskStatus;
  estimatedDuration?: number; // in minutes
  actualDuration?: number; // in minutes
  templateId?: string;
  dependencies?: string[]; // Array of prerequisite task IDs
  comments?: TaskComment[];
  attachments?: TaskAttachment[];
  timeEntries?: TaskTimeEntry[];
  history?: TaskHistoryEntry[];
  delegatedFrom?: string; // userId who delegated this task
  delegatedAt?: string;
  tags?: string[];
  isBlocked?: boolean;
  blockReason?: string;
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
