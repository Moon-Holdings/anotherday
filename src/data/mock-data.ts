import { Task, TaskList, ScheduleItem, DepartmentProgress, User } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Brandon',
  employeeNumber: '1001',
  role: 'manager',
  department: 'floor'
};

export const mockDepartmentProgress: DepartmentProgress[] = [
  {
    department: 'floor',
    completed: 5,
    total: 13,
    progress: (5/13) * 100
  },
  {
    department: 'takeaway',
    completed: 4,
    total: 20,
    progress: (4/20) * 100
  },
  {
    department: 'bar',
    completed: 9,
    total: 18,
    progress: (9/18) * 100
  },
  {
    department: 'kitchen',
    completed: 17,
    total: 18,
    progress: (17/18) * 100
  }
];

export const mockOpeningTasks: Task[] = [
  {
    id: '1',
    name: 'Taking all chairs down',
    description: 'Remove covers and position properly',
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'repeating',
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Clean all tables',
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'repeating',
    deadline: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
    isCompleted: false,
    priority: 'high',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Clean windows and doors',
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'photo',
    type: 'role',
    recurrence: 'repeating',
    isCompleted: false,
    priority: 'low',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Fill-up waiters stations',
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'repeating',
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: '5',
    name: 'Setting up linens, silverware and glasses',
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'repeating',
    isCompleted: false,
    priority: 'high',
    status: 'pending'
  },
  {
    id: '6',
    name: 'Packing chili sauce',
    department: 'kitchen',
    assignmentType: 'role',
    completionMethod: 'quantity',
    type: 'role',
    recurrence: 'repeating',
    quantityRequired: 17,
    quantityOnHand: 13,
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: '7',
    name: 'Clean all bar shelves',
    department: 'bar',
    assignmentType: 'role',
    completionMethod: 'photo',
    type: 'role',
    recurrence: 'repeating',
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  }
];

export const mockManagerTasks: Task[] = [
  {
    id: 'm1',
    name: 'Count the counter',
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'repeating',
    isCompleted: false,
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'm2',
    name: 'Place waiters in designated areas',
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'repeating',
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'm3',
    name: "Update today's specials",
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'repeating',
    isCompleted: false,
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'm4',
    name: 'Open sunshades',
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'repeating',
    isCompleted: false,
    priority: 'low',
    status: 'pending'
  }
];

export const mockPersonalTasks: Task[] = [
  {
    id: 'p1',
    name: 'Decide on valentines dessert',
    assignmentType: 'user',
    assignedTo: '1',
    completionMethod: 'checkmark',
    type: 'personal',
    recurrence: 'one-time',
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'p2',
    name: 'Get toilet paper',
    assignmentType: 'user',
    assignedTo: '1',
    completionMethod: 'checkmark',
    type: 'personal',
    recurrence: 'one-time',
    isCompleted: false,
    priority: 'low',
    status: 'pending'
  },
  {
    id: 'p3',
    name: 'Advertise on Google',
    assignmentType: 'user',
    assignedTo: '1',
    completionMethod: 'checkmark',
    type: 'personal',
    recurrence: 'one-time',
    isCompleted: false,
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'p4',
    name: 'Book a photographer for new menu',
    assignmentType: 'user',
    assignedTo: '1',
    completionMethod: 'checkmark',
    type: 'personal',
    recurrence: 'one-time',
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  }
];

export const mockTeamTasks: Task[] = [
  {
    id: 't1',
    name: 'Buy milk',
    assignmentType: 'user',
    assignedTo: 'john',
    completionMethod: 'checkmark',
    type: 'personal',
    recurrence: 'one-time',
    isCompleted: true,
    priority: 'low',
    status: 'completed'
  },
  {
    id: 't2',
    name: 'Update website menu',
    assignmentType: 'user',
    assignedTo: 'shirley',
    completionMethod: 'checkmark',
    type: 'personal',
    recurrence: 'one-time',
    isCompleted: false,
    priority: 'high',
    status: 'pending'
  },
  {
    id: 't3',
    name: 'Updating evening playlist',
    assignmentType: 'user',
    assignedTo: 'owen',
    completionMethod: 'checkmark',
    type: 'personal',
    recurrence: 'one-time',
    isCompleted: false,
    priority: 'low',
    status: 'pending'
  },
  {
    id: 't4',
    name: 'Fing a new cutlery supplier',
    assignmentType: 'user',
    assignedTo: 'branda',
    completionMethod: 'checkmark',
    type: 'personal',
    recurrence: 'one-time',
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  }
];

export const mockDepartmentTaskLists = [
  {
    department: 'Floor',
    taskLists: [
      { id: '1', title: 'Opening Checklist', completed: 8, total: 12 },
      { id: '2', title: 'Table Setup', completed: 15, total: 20 },
      { id: '3', title: 'Cleaning Protocol', completed: 5, total: 8 },
      { id: '4', title: 'Safety Checks', completed: 3, total: 6 },
      { id: '5', title: 'Equipment Setup', completed: 7, total: 10 },
      { id: '6', title: 'Inventory Count', completed: 2, total: 4 },
      { id: '7', title: 'Customer Service Prep', completed: 6, total: 8 },
      { id: '8', title: 'Daily Maintenance', completed: 1, total: 3 }
    ]
  },
  {
    department: 'Bar',
    taskLists: [
      { id: '9', title: 'Bar Opening', completed: 12, total: 15 },
      { id: '10', title: 'Drink Prep', completed: 8, total: 10 },
      { id: '11', title: 'Glass Cleaning', completed: 20, total: 25 },
      { id: '12', title: 'Inventory Check', completed: 5, total: 8 },
      { id: '13', title: 'Equipment Test', completed: 4, total: 6 },
      { id: '14', title: 'Ice Station Setup', completed: 3, total: 4 },
      { id: '15', title: 'Garnish Prep', completed: 7, total: 9 },
      { id: '16', title: 'Register Setup', completed: 2, total: 3 }
    ]
  },
  {
    department: 'Kitchen',
    taskLists: [
      { id: '17', title: 'Prep Station Setup', completed: 15, total: 18 },
      { id: '18', title: 'Food Safety Check', completed: 8, total: 10 },
      { id: '19', title: 'Equipment Cleaning', completed: 12, total: 16 },
      { id: '20', title: 'Inventory Review', completed: 6, total: 8 },
      { id: '21', title: 'Storage Organization', completed: 4, total: 7 },
      { id: '22', title: 'Sauce Preparation', completed: 9, total: 12 },
      { id: '23', title: 'Grill Setup', completed: 5, total: 6 },
      { id: '24', title: 'Temperature Checks', completed: 3, total: 4 }
    ]
  },
  {
    department: 'Takeaway',
    taskLists: [
      { id: '25', title: 'Packaging Station', completed: 7, total: 10 },
      { id: '26', title: 'Order System Check', completed: 3, total: 4 },
      { id: '27', title: 'Delivery Prep', completed: 5, total: 8 },
      { id: '28', title: 'Menu Updates', completed: 2, total: 3 },
      { id: '29', title: 'Phone System Test', completed: 1, total: 2 },
      { id: '30', title: 'Bag Inventory', completed: 8, total: 12 },
      { id: '31', title: 'Receipt Setup', completed: 4, total: 5 },
      { id: '32', title: 'Quality Control', completed: 6, total: 9 }
    ]
  }
];

export const mockScheduleItems: ScheduleItem[] = [
  {
    id: 's1',
    title: 'Starting morning managers opening',
    description: 'Mark everything, finish by 10:00',
    time: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    isCompleted: true
  },
  {
    id: 's2',
    title: 'Finish morning managers opening',
    description: 'Make sure to complete everything',
    time: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
    isCompleted: true
  },
  {
    id: 's3',
    title: 'Start morning bar and waiters opening',
    description: 'Mark everything, finish by 11:50',
    time: new Date(new Date().setHours(11, 15, 0, 0)).toISOString(),
    isCompleted: true
  },
  {
    id: 's4',
    title: 'Staff brief',
    description: 'Bring aprons and tablets',
    time: new Date(new Date().setHours(11, 50, 0, 0)).toISOString(),
    isCompleted: false
  },
  {
    id: 's5',
    title: 'Turn on music',
    description: '"Calm Afternoon" Playlist',
    time: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
    isCompleted: false
  },
  {
    id: 's6',
    title: 'Change to evening menus',
    time: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
    isCompleted: false
  },
  {
    id: 's7',
    title: 'Evening shift brief',
    description: 'Bring aprons and tablets',
    time: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
    isCompleted: false
  },
  {
    id: 's8',
    title: 'Change to evening playlist',
    description: '"night party" playlist',
    time: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
    isCompleted: false
  },
  {
    id: 's9',
    title: 'Close kitchen',
    description: 'pass throgh all tables and say: "hey, we are closing the kitchen, would you like anything else? (desserts and hot drinks are stil open)',
    time: new Date(new Date().setHours(23, 0, 0, 0)).toISOString(),
    isCompleted: false
  }
];
