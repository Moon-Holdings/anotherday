
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header';
import DepartmentCard from '@/components/department-card';
import TaskListComponent from '@/components/task-list';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import { mockDepartmentProgress, mockOpeningTasks, mockPersonalTasks, mockTeamTasks } from '@/data/mock-data';
import { Task } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Switch } from '@/components/ui/switch';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChefHat, Users, UsersRound, Package, Wine } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showCompletedDepartmentTasks, setShowCompletedDepartmentTasks] = useState(false);

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
    console.log('Adding new task:', newTask);
    // In a real app, we would add the task to our state or database
  };
  
  return <div className="min-h-screen bg-gray-50">
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
          
          {/* Department cards carousel - updated to match design */}
          <div className="mb-6 relative">
            <Carousel className="w-full" opts={{ align: 'start' }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {mockDepartmentProgress.map(dept => (
                  <CarouselItem key={dept.department} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <div className="p-0.5">
                      <DepartmentCard 
                        department={dept.department} 
                        icon={getDepartmentIcon(dept.department)} 
                        completed={dept.completed} 
                        total={dept.total} 
                        isSelected={dept.department === selectedDepartment} 
                        onClick={() => setSelectedDepartment(dept.department)} 
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious className="-left-5" />
                <CarouselNext className="-right-5" />
              </div>
            </Carousel>
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
                tasks={mockOpeningTasks} 
                selectedDepartment={departmentToFilterMap[selectedDepartment] || 'Waiters'} 
                hideTitle={true} 
                displayForcedHorizontal={true}
                showCompleted={showCompletedDepartmentTasks}
              />
            </div>
          </div>
        </div>
        
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
      
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAddTask={handleAddTask} />
    </div>;
};
export default Dashboard;
