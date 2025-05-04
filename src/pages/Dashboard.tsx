import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header';
import TaskListComponent from '@/components/task-list';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import DepartmentTasksCard from '@/components/department-tasks-card';
import { mockDepartmentProgress, mockOpeningTasks, mockPersonalTasks, mockTeamTasks } from '@/data/mock-data';
import { Task } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { ChefHat, Users, UsersRound, Package, Wine, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for department task lists
const mockDepartmentTaskLists = {
  floor: [
    { id: 'f1', title: 'Morning Opening', completed: 6, total: 12 },
    { id: 'f2', title: 'Morning Closing', completed: 2, total: 8 },
  ],
  kitchen: [
    { id: 'k1', title: 'Morning Opening', completed: 3, total: 7 },
    { id: 'k2', title: 'Morning Closing', completed: 2, total: 5 },
  ],
  bar: [
    { id: 'b1', title: 'Morning Closing', completed: 3, total: 5 },
    { id: 'b2', title: 'Morning Closing', completed: 1, total: 4 },
  ],
  takeaway: [
    { id: 't1', title: 'Afternoon Opening', completed: 1, total: 3 },
  ],
  management: [
    { id: 'm1', title: 'Morning Check', completed: 4, total: 6 },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [showCompletedDepartmentTasks, setShowCompletedDepartmentTasks] = useState(false);

  // Selected department and task list state
  const [selectedDepartment, setSelectedDepartment] = useState('floor');
  const [selectedTaskListId, setSelectedTaskListId] = useState(mockDepartmentTaskLists.floor[0].id);
  const [selectedTaskListTitle, setSelectedTaskListTitle] = useState(mockDepartmentTaskLists.floor[0].title);

  // Maps the department cards to their corresponding filter values
  const departmentToFilterMap: Record<string, string> = {
    floor: 'Waiters',
    bar: 'Bar',
    kitchen: 'Kitchen',
    takeaway: 'Waiters',
    management: 'Managers'
  };

  // Icons for departments
  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'floor':
        return <Users size={48} strokeWidth={1.5} />;
      case 'bar':
        return <Wine size={48} strokeWidth={1.5} />;
      case 'kitchen':
        return <ChefHat size={48} strokeWidth={1.5} />;
      case 'takeaway':
        return <Package size={48} strokeWidth={1.5} />;
      case 'management':
        return <UsersRound size={48} strokeWidth={1.5} />;
      default:
        return <div className="w-12 h-12" />;
    }
  };
  
  const handleAddTask = (newTask: Task) => {
    console.log('Adding new task:', newTask);
    // In a real app, we would add the task to our state or database
  };

  const handleSelectTaskList = (departmentName: string, taskListId: string, taskListTitle: string) => {
    setSelectedDepartment(departmentName);
    setSelectedTaskListId(taskListId);
    setSelectedTaskListTitle(taskListTitle);
  };

  // Filter tasks based on the selected department and task list
  const filteredTasks = mockOpeningTasks.filter(task => {
    const mappedDepartment = departmentToFilterMap[selectedDepartment];
    return task.department === mappedDepartment;
  });
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header userRole="owner" />
      
      <div className="container px-2 sm:px-4 py-4 sm:py-6">
        {/* Department Tasks Section with new design */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
          <h2 className="text-lg font-medium mb-4">Departments Tasks</h2>
          
          {/* Departments carousel with task lists */}
          <div className="mb-6">
            <ScrollArea className="w-full pb-4" orientation="horizontal">
              <div className="flex px-1 py-2">
                {Object.entries(mockDepartmentTaskLists).map(([department, taskLists]) => (
                  <DepartmentTasksCard
                    key={department}
                    department={departmentToFilterMap[department] || department}
                    icon={getDepartmentIcon(department)}
                    taskLists={taskLists}
                    onSelectTaskList={handleSelectTaskList}
                    selectedTaskListId={selectedTaskListId}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Selected task list details */}
          <div className="border-t border-gray-200 pt-4 mt-2">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">
                  {departmentToFilterMap[selectedDepartment] || selectedDepartment} | {selectedTaskListTitle}
                </h3>
                <Button variant="ghost" size="icon" className="ml-1" onClick={() => navigate(`/tasks/${selectedTaskListId}`)}>
                  <MoveRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 text-xs sm:text-sm">
                <span className="text-gray-500">Show completed tasks</span>
                <Switch 
                  checked={showCompletedDepartmentTasks} 
                  onCheckedChange={setShowCompletedDepartmentTasks}
                />
              </div>
            </div>
            
            {/* Task list for selected department - Title moved outside the TaskListComponent */}
            <div>
              <TaskListComponent 
                title=""
                tasks={filteredTasks}
                selectedDepartment={departmentToFilterMap[selectedDepartment] || selectedDepartment} 
                hideTitle={true} 
                displayForcedHorizontal={true}
                showCompleted={showCompletedDepartmentTasks}
              />
            </div>
          </div>
        </div>
        
        {/* Other sections remain unchanged */}
        <div className="space-y-4 sm:space-y-6">
          <TaskListComponent 
            title="Team Tasks" 
            tasks={mockTeamTasks} 
            description="Tasks assigned to team members under your management" 
            filter={true} 
            selectedDepartment={departmentToFilterMap[selectedDepartment] || 'Waiters'} 
          />
          
          <TaskListComponent 
            title="Personal Tasks" 
            tasks={mockPersonalTasks} 
            description="Your personal assigned tasks"
          />
        </div>
      </div>
      
      <div className="fixed bottom-20 right-4 sm:right-6">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAddTask={handleAddTask} />
    </div>
  );
};

export default Dashboard;
