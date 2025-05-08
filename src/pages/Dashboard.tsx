
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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Users, UsersRound, Package, Wine, MoveRight, User, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

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
  const [openingTasks, setOpeningTasks] = useState<Task[]>(mockOpeningTasks);
  const [personalTasks, setPersonalTasks] = useState<Task[]>(mockPersonalTasks);
  const [teamTasks, setTeamTasks] = useState<Task[]>(mockTeamTasks);

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
    // In a real app, we would add the task to our state or database
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
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header userRole="owner" />
      
      <div className="container px-3 sm:px-4 py-4 sm:py-6">
        {/* Department Tasks Section with new design */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-5">
          <h2 className="text-xl font-semibold mb-4">Departments Tasks</h2>
          
          {/* Departments carousel with task lists */}
          <div className="mb-6">
            <ScrollArea className="w-full pb-4" orientation="horizontal">
              <div className="flex px-1 py-2 gap-2">
                {Object.entries(mockDepartmentTaskLists).map(([department, taskLists]) => (
                  <DepartmentTasksCard
                    key={department}
                    department={departmentToFilterMap[department] || department}
                    icon={getDepartmentIcon(department)}
                    taskLists={taskLists}
                    onSelectTaskList={(dept, listId, listTitle) => handleSelectTaskList(department, listId, listTitle)}
                    selectedTaskListId={selectedTaskListId}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Selected task list details */}
          <div className="border-t border-gray-200 pt-4 mt-2">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-gray-100 px-3 py-1.5 text-gray-800">
                    {departmentToFilterMap[selectedDepartment] || selectedDepartment}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 px-3 py-1.5 text-gray-800">
                    {selectedTaskListTitle}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="ml-1" onClick={() => navigate(`/tasks/${selectedTaskListId}`)}>
                  <MoveRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-end mb-3">
              <span className="text-sm text-gray-500 mr-2">Show completed tasks</span>
              <Switch 
                checked={showCompletedDepartmentTasks} 
                onCheckedChange={setShowCompletedDepartmentTasks}
              />
            </div>
            
            {/* Task list for selected department - Title moved outside the TaskListComponent */}
            <div>
              <TaskListComponent 
                title=""
                tasks={filteredOpeningTasks.length > 0 ? filteredOpeningTasks : openingTasks.slice(0, 2)}
                selectedDepartment={departmentToFilterMap[selectedDepartment] || selectedDepartment} 
                hideTitle={true} 
                displayForcedHorizontal={true}
                showCompleted={showCompletedDepartmentTasks}
                onUpdateTask={handleUpdateTask}
              />
            </div>
          </div>
        </div>
        
        {/* Team Tasks section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-5">
          <div className="flex items-center mb-3">
            <UsersRound className="h-5 w-5 mr-2 text-gray-700" />
            <h2 className="text-lg font-semibold">Team Tasks</h2>
          </div>
          <TaskListComponent 
            title="" 
            tasks={teamTasks}
            filter={true} 
            hideTitle={true}
            selectedDepartment={departmentToFilterMap[selectedDepartment] || 'Waiters'}
            onUpdateTask={handleUpdateTask}
          />
        </div>
        
        {/* Personal Tasks section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-3">
            <User className="h-5 w-5 mr-2 text-gray-700" />
            <h2 className="text-lg font-semibold">Personal Tasks</h2>
          </div>
          <TaskListComponent 
            title="" 
            tasks={personalTasks}
            hideTitle={true}
            description="Your personal assigned tasks"
            onUpdateTask={handleUpdateTask}
          />
        </div>
      </div>
      
      <div className="fixed bottom-24 right-4 sm:right-6">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAddTask={handleAddTask} />
    </div>
  );
};

export default Dashboard;
