import { useState, useEffect } from 'react';
import { Task, TaskList, Department, TaskRecurrence } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import TaskItem from './task-item';
import { Button } from '@/components/ui/button';
import { Plus, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Define the TaskListProps interface
interface TaskListProps {
  title: string;
  tasks: Task[];
  showCompleted?: boolean;
  onAddTask?: () => void;
  filter?: boolean;
  selectedDepartment?: string;
  hideTitle?: boolean;
  displayForcedHorizontal?: boolean;
  description?: string;
  onUpdateTask?: (taskId: string, updatedTask: Partial<Task>) => void;
}

// Mock user data - in a real app this would come from an API/context
const mockUsers = [{
  id: '1',
  name: 'John Smith',
  role: 'waiter'
}, {
  id: '2',
  name: 'Sarah Johnson',
  role: 'bartender'
}, {
  id: '3',
  name: 'Michael Brown',
  role: 'chef'
}, {
  id: '4',
  name: 'Emily Davis',
  role: 'waiter'
}, {
  id: '5',
  name: 'Robert Wilson',
  role: 'kitchen-staff'
}];

// Example tasks to display when no tasks are available
const exampleTasks: Task[] = [
  {
    id: 'example-1',
    name: 'Check inventory levels',
    description: 'Make sure stock is sufficient for service',
    department: 'bar',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'daily-schedule',
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'example-2',
    name: 'Prepare mise en place',
    description: 'Prepare all ingredients before service',
    department: 'kitchen',
    assignmentType: 'role',
    completionMethod: 'checkmark',
    type: 'role',
    recurrence: 'daily-schedule',
    isCompleted: false,
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'example-3',
    name: 'Set up tables and chairs',
    description: 'Arrange according to reservation plan',
    department: 'floor',
    assignmentType: 'role',
    completionMethod: 'photo',
    type: 'role',
    recurrence: 'daily-schedule',
    isCompleted: false,
    priority: 'medium',
    status: 'pending'
  }
];

const TaskListComponent = ({
  title,
  tasks,
  showCompleted = false,
  onAddTask,
  filter = false,
  selectedDepartment = 'floor',
  hideTitle = false,
  displayForcedHorizontal = false,
  description,
  onUpdateTask
}: TaskListProps) => {
  const [displayCompleted, setDisplayCompleted] = useState(showCompleted);
  const [localSelectedDepartment, setLocalSelectedDepartment] = useState(selectedDepartment);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(['everyone']);

  // Update local state when prop changes
  useEffect(() => {
    setLocalSelectedDepartment(selectedDepartment);
  }, [selectedDepartment]);

  // Filter tasks by completion status
  const tasksFilteredByCompletion = displayCompleted ? tasks : tasks.filter(task => !task.isCompleted);

  // Filter tasks by department or user
  let filteredTasks = tasksFilteredByCompletion;
  if (title === "Team Tasks" && !selectedUsers.includes('everyone') && selectedUsers.length > 0) {
    // This is just a simple mock filter - in a real app, tasks would have assignedTo IDs
    // For demo, we'll just show some tasks based on selection
    filteredTasks = tasksFilteredByCompletion.slice(0, selectedUsers.length * 2);
  } else if (localSelectedDepartment && localSelectedDepartment !== 'Everyone') {
    // First try to filter by exact department match
    const departmentTasks = tasksFilteredByCompletion.filter(task => task.department === localSelectedDepartment.toLowerCase());

    // If we found tasks for this department, use them
    if (departmentTasks.length > 0) {
      filteredTasks = departmentTasks;
    } else {
      // Otherwise, for demo purposes, show at least 2 random tasks
      filteredTasks = tasksFilteredByCompletion.slice(0, Math.min(2, tasksFilteredByCompletion.length));
    }
  }

  // Get user name by ID - helper function
  const getUserNameById = (userId?: string): string => {
    if (!userId) return "Unassigned";
    const user = mockUsers.find(user => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  // Handle toggling user selection
  const toggleUserSelection = (userId: string) => {
    // Special handling for 'everyone'
    if (userId === 'everyone') {
      // If 'everyone' is being selected, clear other selections
      if (!selectedUsers.includes('everyone')) {
        setSelectedUsers(['everyone']);
      } else {
        // If 'everyone' is being unselected, don't allow empty selection - select first user
        setSelectedUsers([mockUsers[0].id]);
      }
      return;
    }

    // Remove 'everyone' from selection when selecting specific users
    let newSelection = selectedUsers.filter(id => id !== 'everyone');

    // Toggle the selected user
    if (newSelection.includes(userId)) {
      newSelection = newSelection.filter(id => id !== userId);
      // If empty selection, default to 'everyone'
      if (newSelection.length === 0) {
        newSelection = ['everyone'];
      }
    } else {
      newSelection.push(userId);
    }
    setSelectedUsers(newSelection);
  };

  // Determine if we should display the tasks horizontally based on title or forced prop
  const isHorizontalLayout = displayForcedHorizontal;

  // For each task in Team Tasks section, assign a random user if not assigned
  // In a real app, this would come from the database
  const tasksWithUsers = filteredTasks.map(task => {
    if (title === "Team Tasks" && !task.assignedTo) {
      // Assign a random user for demo purposes
      const randomUserId = mockUsers[Math.floor(Math.random() * mockUsers.length)].id;
      return {
        ...task,
        assignedTo: randomUserId
      };
    }
    return task;
  });

  // Get department-specific example tasks
  const getDepartmentExampleTasks = () => {
    const deptExamples = exampleTasks.filter(task => 
      task.department === localSelectedDepartment.toLowerCase() || 
      (localSelectedDepartment === 'Waiters' && task.department === 'floor')
    );
    
    // If no examples for this specific department, return the first example
    return deptExamples.length > 0 ? deptExamples : [exampleTasks[0]];
  };

  return <div className="mb-6">
      {/* Title section displayed outside the card, like in the design */}
      {!hideTitle && <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            {description}
          </div>
          
          {filter && title === "Team Tasks" && <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-8 px-3 text-sm">
                    {selectedUsers.includes('everyone') ? 'Everyone' : `${selectedUsers.length} users selected`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <div className="p-2 border-b">
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                      <Checkbox id="everyone" checked={selectedUsers.includes('everyone')} onCheckedChange={() => toggleUserSelection('everyone')} />
                      <label htmlFor="everyone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">
                        Everyone
                      </label>
                    </div>
                  </div>
                  
                  <div className="py-2 max-h-60 overflow-auto">
                    {mockUsers.map(user => <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                        <Checkbox id={`user-${user.id}`} checked={selectedUsers.includes(user.id) || selectedUsers.includes('everyone')} disabled={selectedUsers.includes('everyone')} onCheckedChange={() => toggleUserSelection(user.id)} />
                        <label htmlFor={`user-${user.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">
                          {user.name}
                        </label>
                      </div>)}
                  </div>
                </PopoverContent>
              </Popover>
            </div>}
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Show completed tasks</span>
            <Switch checked={displayCompleted} onCheckedChange={setDisplayCompleted} />
          </div>
        </div>}
      
      <Card>
        <CardContent className="pt-4 py-0">
          {tasksWithUsers.length === 0 ? (
            <div className="py-4">
              <div className="text-gray-500 text-center mb-4">
                <p className="font-medium">Example tasks for {localSelectedDepartment}</p>
                <p className="text-xs text-gray-400">These are examples of tasks you might create</p>
              </div>
              <div className={isHorizontalLayout ? "space-y-0" : "space-y-3"}>
                {isHorizontalLayout ? (
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {getDepartmentExampleTasks().map(task => (
                        <CarouselItem key={task.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                          <TaskItem task={task} isHorizontal={true} isExample={true} onUpdateTask={onUpdateTask} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-end mt-2">
                      <CarouselPrevious className="relative static mr-2 translate-y-0" />
                      <CarouselNext className="relative static translate-y-0" />
                    </div>
                  </Carousel>
                ) : (
                  getDepartmentExampleTasks().map(task => (
                    <TaskItem key={task.id} task={task} isHorizontal={false} isExample={true} onUpdateTask={onUpdateTask} />
                  ))
                )}
              </div>
            </div>
          ) : isHorizontalLayout ? <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {tasksWithUsers.map(task => <CarouselItem key={task.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                    <TaskItem task={task} isHorizontal={true} assignedUserName={title === "Team Tasks" ? getUserNameById(task.assignedTo) : undefined} onUpdateTask={onUpdateTask} />
                  </CarouselItem>)}
              </CarouselContent>
              <div className="flex justify-end mt-2">
                <CarouselPrevious className="relative static mr-2 translate-y-0" />
                <CarouselNext className="relative static translate-y-0" />
              </div>
            </Carousel> : <div>
              {tasksWithUsers.map(task => <TaskItem key={task.id} task={task} isHorizontal={false} assignedUserName={title === "Team Tasks" ? getUserNameById(task.assignedTo) : undefined} onUpdateTask={onUpdateTask} />)}
            </div>}
        </CardContent>
      </Card>
    </div>;
};
export default TaskListComponent;
