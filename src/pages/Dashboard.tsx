
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
import { Card } from '@/components/ui/card';

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
        return <Users size={24} />;
      case 'kitchen':
        return <ChefHat size={24} />;
      default:
        return <div className="w-6 h-6" />;
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
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header userRole="owner" />
      
      <div className="container px-4 py-6">
        {/* Departments Tasks Section - Card with distinct border */}
        <Card className="mb-6 rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Departments Tasks</h2>
            
            <div className="grid grid-cols-2 gap-4">
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
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-gray-100 rounded-full px-4 py-2 text-base font-medium">
                  {departmentToFilterMap[selectedDepartment] === 'floor' ? 'Waiters' : 'Kitchen'}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 rounded-full px-4 py-2 text-base font-medium">
                  {selectedTaskListTitle || 'Morning Opening'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Show completed</span>
                <Switch 
                  checked={showCompletedDepartmentTasks} 
                  onCheckedChange={setShowCompletedDepartmentTasks}
                />
              </div>
            </div>
            
            <div className="mt-4">
              {/* Single task item based on mockup */}
              <div className="p-4 flex items-start">
                <div className="h-6 w-6 rounded-sm border border-gray-300 flex-shrink-0 mt-1"></div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Taking all chairs down</h3>
                  <p className="text-gray-600">Remove covers and position properly</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Team Tasks section - Card with distinct border */}
        <Card className="mb-6 rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <UsersRound className="h-6 w-6 mr-3" />
                <h2 className="text-2xl font-bold">Team Tasks</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Show completed</span>
                <Switch 
                  checked={showCompletedTeamTasks} 
                  onCheckedChange={setShowCompletedTeamTasks}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Team task items based on mockup */}
              <div className="p-4 flex items-start">
                <div className="h-6 w-6 rounded-sm border border-gray-300 flex-shrink-0 mt-1"></div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Update website menu</h3>
                  <p className="text-gray-600">Unknown User</p>
                </div>
              </div>
              
              <div className="p-4 flex items-start">
                <div className="h-6 w-6 rounded-sm border border-gray-300 flex-shrink-0 mt-1"></div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Updating evening playlist</h3>
                  <p className="text-gray-600">Assigned to you</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Personal Tasks section - Card with distinct border */}
        <Card className="rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 mr-3" />
              <h2 className="text-2xl font-bold">Personal Tasks</h2>
            </div>
            
            <div className="space-y-4">
              {/* Personal task item based on mockup */}
              <div className="p-4 flex items-start">
                <div className="h-6 w-6 rounded-sm border border-gray-300 flex-shrink-0 mt-1"></div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Decide on valentines dessert</h3>
                </div>
              </div>
              
              <div className="p-4 flex items-start">
                <div className="h-6 w-6 rounded-sm border border-gray-300 flex-shrink-0 mt-1"></div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Get toilet paper</h3>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="fixed bottom-24 right-6">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAddTask={handleAddTask} />
    </div>
  );
};

export default Dashboard;
