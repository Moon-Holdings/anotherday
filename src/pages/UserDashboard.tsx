
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header';
import DepartmentCard from '@/components/department-card';
import TaskListComponent from '@/components/task-list';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import { mockDepartmentProgress, mockOpeningTasks, mockPersonalTasks } from '@/data/mock-data';
import { Task } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Switch } from '@/components/ui/switch';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChefHat, Users, UsersRound, Package, Wine } from 'lucide-react';
import { toast } from 'sonner';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showCompletedDepartmentTasks, setShowCompletedDepartmentTasks] = useState(false);
  const [openingTasks, setOpeningTasks] = useState<Task[]>(mockOpeningTasks);
  const [personalTasks, setPersonalTasks] = useState<Task[]>(mockPersonalTasks);

  // Selected department state - map to department names correctly
  const [selectedDepartment, setSelectedDepartment] = useState(mockDepartmentProgress[0].department);

  // Selected shift and day state
  const [selectedShift, setSelectedShift] = useState('Afternoon Shift | Opening');

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
        return <Users size={36} strokeWidth={1.5} />;
      case 'bar':
        return <Wine size={36} strokeWidth={1.5} />;
      case 'kitchen':
        return <ChefHat size={36} strokeWidth={1.5} />;
      case 'takeaway':
        return <Package size={36} strokeWidth={1.5} />;
      case 'management':
        return <UsersRound size={36} strokeWidth={1.5} />;
      default:
        return <div className="w-9 h-9" />;
    }
  };
  
  const handleAddTask = (newTask: Task) => {
    // In a real app, we would add the task to our state or database
    if (newTask.type === 'personal') {
      setPersonalTasks([...personalTasks, newTask]);
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
    
    toast.success("Task updated successfully");
  };
  
  return <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="container px-2 sm:px-4 py-4 sm:py-6">
        {/* Department Tasks Section */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
          {/* Afternoon Opening title and dropdown adjusted for mobile */}
          <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex items-center'} mb-4`}>
            <h2 className={`text-lg font-medium ${!isMobile && 'mr-4'}`}>Departments Tasks</h2>
            <Select value={selectedShift} onValueChange={setSelectedShift}>
              <SelectTrigger className={`${isMobile ? 'w-full' : 'w-64'} h-8 text-sm`}>
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning Shift | Opening">Morning Shift | Opening</SelectItem>
                <SelectItem value="Afternoon Shift | Opening">Afternoon Shift | Opening</SelectItem>
                <SelectItem value="Evening Shift | Opening">Evening Shift | Opening</SelectItem>
                <SelectItem value="Morning Shift | Closing">Morning Shift | Closing</SelectItem>
                <SelectItem value="Afternoon Shift | Closing">Afternoon Shift | Closing</SelectItem>
                <SelectItem value="Evening Shift | Closing">Evening Shift | Closing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Department cards carousel - updated for horizontal sliding */}
          <div className="mb-6">
            <ScrollArea className="w-full pb-4" orientation="horizontal">
              <div className="flex space-x-3 px-1">
                {mockDepartmentProgress.map(dept => (
                  <div key={dept.department} className="flex-shrink-0" style={{ width: "160px" }}>
                    <DepartmentCard 
                      department={dept.department} 
                      icon={getDepartmentIcon(dept.department)} 
                      completed={dept.completed} 
                      total={dept.total} 
                      isSelected={dept.department === selectedDepartment} 
                      onClick={() => setSelectedDepartment(dept.department)} 
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Added a divider and a title to make the connection clearer */}
          <div className="border-t border-gray-200 my-3 sm:my-4"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-2 sm:space-y-0">
            <h3 className="text-sm font-medium text-gray-700">{selectedShift} Department Tasks</h3>
            
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <span className="text-gray-500">Show completed tasks</span>
              <Switch 
                checked={showCompletedDepartmentTasks} 
                onCheckedChange={setShowCompletedDepartmentTasks}
              />
            </div>
          </div>
          
          {/* The horizontal task list is now clearly part of the department tasks section */}
          <div className="overflow-x-auto -mx-3 px-3 pb-2">
            <div className={`${isMobile ? 'w-[800px]' : 'w-full'}`}>
              <TaskListComponent 
                title="Afternoon Opening" 
                tasks={openingTasks} 
                selectedDepartment={departmentToFilterMap[selectedDepartment] || 'Waiters'} 
                hideTitle={true} 
                displayForcedHorizontal={true}
                showCompleted={showCompletedDepartmentTasks}
                onUpdateTask={handleUpdateTask}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6">          
          <TaskListComponent 
            title="Personal Tasks" 
            tasks={personalTasks} 
            description="Your personal assigned tasks"
            onUpdateTask={handleUpdateTask}
          />
        </div>
      </div>
      
      <div className="fixed bottom-20 right-4 sm:right-6">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAddTask={handleAddTask} />
    </div>;
};

export default UserDashboard;
