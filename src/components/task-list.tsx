
import { useState, useEffect } from 'react';
import { Task, TaskList } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import TaskItem from './task-item';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface TaskListProps {
  title: string;
  tasks: Task[];
  showCompleted?: boolean;
  onAddTask?: () => void;
  filter?: boolean;
  selectedDepartment?: string;
}

const TaskListComponent = ({ 
  title, 
  tasks, 
  showCompleted = false,
  onAddTask,
  filter = false,
  selectedDepartment = 'floor'
}: TaskListProps) => {
  const [displayCompleted, setDisplayCompleted] = useState(showCompleted);
  const [selectedDay, setSelectedDay] = useState('Sunday');
  const [selectedShift, setSelectedShift] = useState('Afternoon Shift | Opening');
  const [localSelectedDepartment, setLocalSelectedDepartment] = useState(selectedDepartment);
  const [selectedTitle, setSelectedTitle] = useState(title);

  // Update local state when prop changes
  useEffect(() => {
    setLocalSelectedDepartment(selectedDepartment);
  }, [selectedDepartment]);

  const listOptions = [
    'Afternoon Opening',
    'Morning Opening',
    'Evening Opening',
    'Afternoon Closing',
    'Morning Closing',
    'Evening Closing'
  ];

  // Filter tasks by completion status
  const tasksFilteredByCompletion = displayCompleted 
    ? tasks 
    : tasks.filter(task => !task.isCompleted);
    
  // Further filter by department if this is a horizontal layout
  const filteredTasks = selectedTitle === 'Afternoon Opening'
    ? tasksFilteredByCompletion.filter(task => 
        !task.department || task.department === localSelectedDepartment || localSelectedDepartment === 'Everyone'
      )
    : tasksFilteredByCompletion;

  // Determine if we should display the tasks horizontally based on the title
  const isHorizontalLayout = selectedTitle === 'Afternoon Opening';

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="pl-0 font-medium text-lg flex items-center gap-1 hover:bg-transparent focus:bg-transparent">
                {selectedTitle}
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white w-48">
              {listOptions.map((option) => (
                <DropdownMenuItem 
                  key={option}
                  onClick={() => setSelectedTitle(option)}
                  className="cursor-pointer"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {filter && (
          <div className="flex items-center space-x-2">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sunday">Sunday</SelectItem>
                <SelectItem value="Monday">Monday</SelectItem>
                <SelectItem value="Tuesday">Tuesday</SelectItem>
                <SelectItem value="Wednesday">Wednesday</SelectItem>
                <SelectItem value="Thursday">Thursday</SelectItem>
                <SelectItem value="Friday">Friday</SelectItem>
                <SelectItem value="Saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedShift} onValueChange={setSelectedShift}>
              <SelectTrigger className="w-60 h-8 text-sm">
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

            {title === "Team Tasks" && (
              <Select value={localSelectedDepartment} onValueChange={setLocalSelectedDepartment}>
                <SelectTrigger className="w-32 h-8 text-sm">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Everyone">Everyone</SelectItem>
                  <SelectItem value="Waiters">Waiters</SelectItem>
                  <SelectItem value="Bar">Bar</SelectItem>
                  <SelectItem value="Kitchen">Kitchen</SelectItem>
                  <SelectItem value="Managers">Managers</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Show completed tasks</span>
          <Switch 
            checked={displayCompleted} 
            onCheckedChange={setDisplayCompleted}
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks to display</p>
        ) : (
          <div className={isHorizontalLayout ? "flex flex-wrap gap-3" : ""}>
            {filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} isHorizontal={isHorizontalLayout} />
            ))}
          </div>
        )}
        
        {onAddTask && (
          <Button 
            onClick={onAddTask}
            className="w-full mt-4 bg-rootina-teal hover:bg-rootina-lightTeal"
          >
            Add New Task
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskListComponent;
