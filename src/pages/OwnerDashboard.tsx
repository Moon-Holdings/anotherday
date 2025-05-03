
import { useState } from 'react';
import Header from '@/components/header';
import DepartmentCard from '@/components/department-card';
import TaskListComponent from '@/components/task-list';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import { mockDepartmentProgress, mockOpeningTasks, mockTeamTasks } from '@/data/mock-data';
import { Task } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ChefHat, Users, UsersRound, Package, Wine } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const OwnerDashboard = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showCompletedDepartmentTasks, setShowCompletedDepartmentTasks] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(mockDepartmentProgress[0].department);
  const [selectedShift, setSelectedShift] = useState('Afternoon Shift | Opening');
  const [activeTab, setActiveTab] = useState('team-tasks');

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
  
  // Mock statistics for owner dashboard
  const teamStats = {
    totalEmployees: 12,
    tasksCompleted: 78,
    tasksInProgress: 23,
    completionRate: "77%"
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <Header />
      
      <div className="container px-2 sm:px-4 py-4 sm:py-6">
        <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
        
        <Tabs 
          defaultValue="team-tasks" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-6"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="team-tasks">Team Tasks</TabsTrigger>
            <TabsTrigger value="department-tasks">Department Tasks</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          {/* Team Tasks Tab */}
          <TabsContent value="team-tasks">
            <TaskListComponent 
              title="Team Tasks" 
              tasks={mockTeamTasks} 
              description="Tasks assigned to team members under your management" 
              filter={true} 
              selectedDepartment={departmentToFilterMap[selectedDepartment] || 'Waiters'} 
            />
          </TabsContent>

          {/* Department Tasks Tab */}
          <TabsContent value="department-tasks">
            {/* Department cards carousel */}
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
            
            {/* The horizontal task list */}
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
          </TabsContent>
          
          {/* Statistics Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Team Overview Stats */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Team Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Total Employees</p>
                    <p className="text-2xl font-semibold">{teamStats.totalEmployees}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-2xl font-semibold">{teamStats.completionRate}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Tasks Completed</p>
                    <p className="text-2xl font-semibold">{teamStats.tasksCompleted}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Tasks In Progress</p>
                    <p className="text-2xl font-semibold">{teamStats.tasksInProgress}</p>
                  </div>
                </div>
              </div>
              
              {/* Department Performance */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-4">Department Performance</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Tasks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDepartmentProgress.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell className="font-medium capitalize">{dept.department}</TableCell>
                        <TableCell>{Math.round((dept.completed / dept.total) * 100)}%</TableCell>
                        <TableCell>{`${dept.completed}/${dept.total}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="fixed bottom-40 right-4 sm:right-6">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAddTask={handleAddTask} />
    </div>
  );
};

export default OwnerDashboard;
