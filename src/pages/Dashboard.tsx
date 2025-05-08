
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header';
import TaskListComponent from '@/components/task-list';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import DepartmentTasksCard from '@/components/department-tasks-card';
import { mockDepartmentProgress, mockOpeningTasks, mockPersonalTasks, mockTeamTasks } from '@/data/mock-data';
import { Task, Department } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Users, UsersRound, Package, Wine, MoveRight, User, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Simplified mock data for department task lists
const mockDepartmentTaskLists = {
  floor: [
    { id: 'f1', title: 'Morning Opening', completed: 6, total: 12 },
  ],
  kitchen: [
    { id: 'k1', title: 'Morning Cleaning', completed: 2, total: 5 },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [showCompletedDepartmentTasks, setShowCompletedDepartmentTasks] = useState(false);
  const [showCompletedTeamTasks, setShowCompletedTeamTasks] = useState(false);
  const [openingTasks, setOpeningTasks] = useState<Task[]>(mockOpeningTasks);
  const [personalTasks, setPersonalTasks] = useState<Task[]>(mockPersonalTasks);
  const [teamTasks, setTeamTasks] = useState<Task[]>(mockTeamTasks);

  // Selected department and task list state
  const [selectedDepartment, setSelectedDepartment] = useState('floor');
  const [selectedTaskListId, setSelectedTaskListId] = useState(mockDepartmentTaskLists.floor[0].id);
  const [selectedTaskListTitle, setSelectedTaskListTitle] = useState(mockDepartmentTaskLists.floor[0].title);

  // Maps the department cards to their corresponding filter values
  const departmentToFilterMap: Record<string, Department> = {
    floor: 'floor',
    kitchen: 'kitchen',
  };

  // Icons for departments
  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'floor':
        return <Users size={20} />;
      case 'kitchen':
        return <ChefHat size={20} />;
      default:
        return <div className="w-5 h-5" />;
    }
  };
  
  const handleAddTask = (newTask: Task) => {
    if (newTask.type === 'personal') {
      setPersonalTasks([...personalTasks, newTask]);
    } else if (newTask.type === 'role') {
      setTeamTasks([...teamTasks, newTask]);
    } else {
      setOpeningTasks([...openingTasks, newTask]);
    }
    toast.success("Task added successfully");
  };

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    // Update personal tasks
    setPersonalTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    
    // Update opening tasks
    setOpeningTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    
    // Update team tasks
    setTeamTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    
    toast.success("Task updated successfully");
  };

  const handleSelectTaskList = (departmentName: string, taskListId: string, taskListTitle: string) => {
    setSelectedDepartment(departmentName);
    setSelectedTaskListId(taskListId);
    setSelectedTaskListTitle(taskListTitle);
  };

  // Filter tasks based on the selected department
  const filteredOpeningTasks = openingTasks.filter(task => {
    const mappedDepartment = departmentToFilterMap[selectedDepartment];
    return task.department === mappedDepartment;
  });
  
  // Sample task for the UI matching the design - Fixed to include all required Task properties
  const sampleTask: Task = {
    id: 'sample-1',
    name: 'Taking all chairs down',
    description: 'Remove covers and position properly',
    department: departmentToFilterMap[selectedDepartment], // Now correctly typed as Department
    type: 'role', 
    isCompleted: false,
    assignmentType: 'role',
    completionMethod: 'checkmark',
    recurrence: 'daily-schedule'
  };
  
  // Sample team tasks matching the design - Fixed to include all required Task properties
  const sampleTeamTasks: Task[] = [
    {
      id: 'team-1',
      name: 'Update website menu',
      description: '',
      department: 'kitchen', // Changed from "Management" to a valid Department type
      type: 'role',
      isCompleted: false,
      assignedTo: 'unknown',
      assignmentType: 'user',
      completionMethod: 'checkmark',
      recurrence: 'one-time'
    },
    {
      id: 'team-2',
      name: 'Updating evening playlist',
      description: '',
      department: 'floor', // Changed from "Management" to a valid Department type
      type: 'role',
      isCompleted: false,
      assignedTo: 'you',
      assignmentType: 'user',
      completionMethod: 'checkmark',
      recurrence: 'one-time'
    }
  ];
  
  // Sample personal task matching the design - Fixed to include all required Task properties
  const samplePersonalTask: Task = {
    id: 'personal-1',
    name: 'Decide on valentines dessert',
    description: '',
    type: 'personal',
    isCompleted: false,
    assignmentType: 'user',
    completionMethod: 'checkmark',
    recurrence: 'one-time'
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header userRole="owner" />
      
      <div className="container px-3 py-4">
        {/* Departments Tasks Section - Card with distinct border */}
        <Card className="mb-4 rounded-lg overflow-hidden shadow-sm">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-3">Departments Tasks</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <DepartmentTasksCard
                key="floor"
                department="Waiters"
                icon={getDepartmentIcon('floor')}
                taskLists={mockDepartmentTaskLists.floor}
                onSelectTaskList={(dept, listId, listTitle) => handleSelectTaskList('floor', listId, listTitle)}
                selectedTaskListId={selectedTaskListId}
              />
              
              <DepartmentTasksCard
                key="kitchen"
                department="Kitchen"
                icon={getDepartmentIcon('kitchen')}
                taskLists={mockDepartmentTaskLists.kitchen}
                onSelectTaskList={(dept, listId, listTitle) => handleSelectTaskList('kitchen', listId, listTitle)}
                selectedTaskListId={selectedTaskListId}
              />
            </div>
          </div>
          
          {/* Divider line */}
          <div className="h-px w-full bg-gray-200"></div>
          
          {/* Selected task list details */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1.5">
                <Badge variant="outline" className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
                  {departmentToFilterMap[selectedDepartment] === 'floor' ? 'Waiters' : 'Kitchen'}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
                  {selectedTaskListTitle || 'Morning Opening'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-600">Show completed</span>
                <Switch 
                  checked={showCompletedDepartmentTasks} 
                  onCheckedChange={setShowCompletedDepartmentTasks}
                  className="scale-75"
                />
              </div>
            </div>
            
            <div className="mt-3">
              {/* Single task item based on mockup */}
              <div className="py-2 px-3 flex items-start">
                <div className="h-5 w-5 rounded-sm border border-gray-300 flex-shrink-0 mt-0.5"></div>
                <div className="ml-3">
                  <h3 className="text-base font-medium">Taking all chairs down</h3>
                  <p className="text-xs text-gray-600">Remove covers and position properly</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Team Tasks section - Card with distinct border */}
        <Card className="mb-4 rounded-lg overflow-hidden shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <UsersRound className="h-4 w-4 mr-2" />
                <h2 className="text-lg font-bold">Team Tasks</h2>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-600">Show completed</span>
                <Switch 
                  checked={showCompletedTeamTasks} 
                  onCheckedChange={setShowCompletedTeamTasks}
                  className="scale-75"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              {/* Team task items based on mockup */}
              <div className="py-2 px-3 flex items-start">
                <div className="h-5 w-5 rounded-sm border border-gray-300 flex-shrink-0 mt-0.5"></div>
                <div className="ml-3">
                  <h3 className="text-base font-medium">Update website menu</h3>
                  <p className="text-xs text-gray-600">Unknown User</p>
                </div>
              </div>
              
              <div className="py-2 px-3 flex items-start">
                <div className="h-5 w-5 rounded-sm border border-gray-300 flex-shrink-0 mt-0.5"></div>
                <div className="ml-3">
                  <h3 className="text-base font-medium">Updating evening playlist</h3>
                  <p className="text-xs text-gray-600">Assigned to you</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Personal Tasks section - Card with distinct border */}
        <Card className="rounded-lg overflow-hidden shadow-sm">
          <div className="p-4">
            <div className="flex items-center mb-3">
              <User className="h-4 w-4 mr-2" />
              <h2 className="text-lg font-bold">Personal Tasks</h2>
            </div>
            
            <div className="space-y-2">
              {/* Personal task item based on mockup */}
              <div className="py-2 px-3 flex items-start">
                <div className="h-5 w-5 rounded-sm border border-gray-300 flex-shrink-0 mt-0.5"></div>
                <div className="ml-3">
                  <h3 className="text-base font-medium">Decide on valentines dessert</h3>
                </div>
              </div>
              
              <div className="py-2 px-3 flex items-start">
                <div className="h-5 w-5 rounded-sm border border-gray-300 flex-shrink-0 mt-0.5"></div>
                <div className="ml-3">
                  <h3 className="text-base font-medium">Get toilet paper</h3>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="fixed bottom-20 right-4">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAddTask={handleAddTask} />
    </div>
  );
};

export default Dashboard;
