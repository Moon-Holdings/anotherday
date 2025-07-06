
import { useState, useEffect } from 'react';
import Header from '@/components/header';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import TaskItem from '@/components/task-item';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import SearchInput from '@/components/search-input';
import LoadingSpinner from '@/components/loading-spinner';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { mockOpeningTasks } from '@/data/mock-data';
import { Task } from '@/types';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import useKeyboardShortcuts from '@/hooks/use-keyboard-shortcuts';

// Mock user data - in a real app this would come from an API/context
const mockUserRoles = {
  // User has 'manager' role and manages 'Waiters' and 'Bar' departments
  roles: ['manager'],
  managedDepartments: ['Waiters', 'Bar']
};

// Mock departments data - in a real app this would come from an API/context
const mockDepartments = [
  { id: '1', name: 'Waiters', managedBy: ['manager'] },
  { id: '2', name: 'Bar', managedBy: ['manager', 'bartender'] },
  { id: '3', name: 'Kitchen', managedBy: ['chef', 'kitchen-manager'] },
  { id: '4', name: 'Managers', managedBy: ['admin'] }
];

const Tasks = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedShift, setSelectedShift] = useState('Afternoon Shift | Opening');
  const [selectedDepartment, setSelectedDepartment] = useState('Waiters');
  const [showCompleted, setShowCompleted] = useState(true);
  const [tasks, setTasks] = useState<Task[]>(mockOpeningTasks);
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    shortcuts: [
      {
        key: 'n',
        ctrlKey: true,
        action: () => setIsAddTaskModalOpen(true),
        description: 'Create new task'
      },
      {
        key: 'f',
        ctrlKey: true,
        action: () => document.getElementById('search-input')?.focus(),
        description: 'Focus search'
      },
      {
        key: 'a',
        ctrlKey: true,
        action: () => {
          const allTaskIds = filteredTasks.map(task => task.id);
          setSelectedTasks(selectedTasks.length === allTaskIds.length ? [] : allTaskIds);
        },
        description: 'Select all tasks'
      }
    ]
  });

  // Calculate available departments based on user roles
  useEffect(() => {
    // Filter departments that the user has access to
    const userDepartments = mockDepartments.filter(dept => 
      // User is in department management role
      dept.managedBy.some(role => mockUserRoles.roles.includes(role)) ||
      // Department is explicitly managed by user
      mockUserRoles.managedDepartments.includes(dept.name)
    ).map(dept => dept.name);

    setAvailableDepartments(userDepartments);
    
    // If current selected department is not in available departments,
    // select the first available one
    if (userDepartments.length > 0 && !userDepartments.includes(selectedDepartment)) {
      setSelectedDepartment(userDepartments[0]);
    }
  }, [selectedDepartment]);

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully");
  };
  
  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    toast.success("Task updated successfully");
  };

  const handleBulkComplete = () => {
    if (selectedTasks.length === 0) {
      toast.error("No tasks selected");
      return;
    }
    
    setTasks(prevTasks =>
      prevTasks.map(task =>
        selectedTasks.includes(task.id) ? { ...task, isCompleted: true } : task
      )
    );
    setSelectedTasks([]);
    toast.success(`${selectedTasks.length} tasks marked as completed`);
  };

  const handleExportTasks = () => {
    toast.success("Task export functionality coming soon!");
  };

  // Filter tasks based on showCompleted state and search term
  const filteredTasks = tasks.filter(task => {
    const matchesCompletion = showCompleted || !task.isCompleted;
    const matchesSearch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCompletion && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="container px-4 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tasks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Enhanced Filters Section */}
        <div className="space-y-4 mb-6">
          {/* Search */}
          <SearchInput
            id="search-input"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            className="max-w-md"
          />

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                {availableDepartments.map(department => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedShift} onValueChange={setSelectedShift}>
              <SelectTrigger className="w-60 bg-white">
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                <SelectItem value="Morning Shift | Opening">Morning Shift | Opening</SelectItem>
                <SelectItem value="Afternoon Shift | Opening">Afternoon Shift | Opening</SelectItem>
                <SelectItem value="Evening Shift | Opening">Evening Shift | Opening</SelectItem>
                <SelectItem value="Morning Shift | Closing">Morning Shift | Closing</SelectItem>
                <SelectItem value="Afternoon Shift | Closing">Afternoon Shift | Closing</SelectItem>
                <SelectItem value="Evening Shift | Closing">Evening Shift | Closing</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal bg-white",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "EEEE, MMM d, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border shadow-lg z-50" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant="default" 
            className="bg-anotherday-mint hover:bg-anotherday-lightMint text-anotherday-dark font-medium transition-colors"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            Add New Task
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Button>

          {selectedTasks.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleBulkComplete}
              className="hover:bg-anotherday-mint/10 transition-colors"
            >
              Mark {selectedTasks.length} Complete
            </Button>
          )}

          <Button 
            variant="outline" 
            onClick={handleExportTasks}
            className="hover:bg-anotherday-mint/10 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Show/Hide Completed Toggle */}
        <div className="flex items-center justify-end mb-4">
          <span className="text-sm text-gray-500 mr-2">Show completed tasks</span>
          <Switch 
            checked={showCompleted} 
            onCheckedChange={setShowCompleted}
          />
        </div>
        
        {/* Tasks List */}
        <Card className="shadow-sm">
          <div className="p-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No tasks match your search.' : 'No tasks available.'}
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task.id} className="hover:bg-gray-50 transition-colors rounded-lg">
                  <TaskItem 
                    task={task} 
                    onUpdateTask={handleUpdateTask}
                  />
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-4 text-xs text-gray-500">
          <p>Keyboard shortcuts: Ctrl+N (New task), Ctrl+F (Search), Ctrl+A (Select all)</p>
        </div>
      </div>
      
      <div className="fixed bottom-20 right-6">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal 
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Tasks;
