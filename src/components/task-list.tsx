
import { useState, useEffect } from 'react';
import { Task, TaskList } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import TaskItem from './task-item';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskListProps {
  title: string;
  tasks: Task[];
  showCompleted?: boolean;
  onAddTask?: () => void;
  filter?: boolean;
  selectedDepartment?: string;
  hideTitle?: boolean;
  displayForcedHorizontal?: boolean; // New prop to force horizontal display
}

const TaskListComponent = ({ 
  title, 
  tasks, 
  showCompleted = false,
  onAddTask,
  filter = false,
  selectedDepartment = 'floor',
  hideTitle = false,
  displayForcedHorizontal = false, // Default is false
}: TaskListProps) => {
  const [displayCompleted, setDisplayCompleted] = useState(showCompleted);
  const [selectedDay, setSelectedDay] = useState('Sunday');
  const [selectedShift, setSelectedShift] = useState('Afternoon Shift | Opening');
  const [localSelectedDepartment, setLocalSelectedDepartment] = useState(selectedDepartment);

  // Update local state when prop changes
  useEffect(() => {
    setLocalSelectedDepartment(selectedDepartment);
  }, [selectedDepartment]);

  // Filter tasks by completion status
  const tasksFilteredByCompletion = displayCompleted 
    ? tasks 
    : tasks.filter(task => !task.isCompleted);
    
  // Filter logic modified to always show some tasks for each department
  let filteredTasks = tasksFilteredByCompletion;
  
  // If this is the "Afternoon Opening" section (horizontal layout)
  if (title === 'Afternoon Opening' || displayForcedHorizontal) {
    // For demo purposes, ensure we always show at least some tasks
    // First try to filter by department
    const departmentTasks = tasksFilteredByCompletion.filter(task => 
      !task.department || 
      task.department === localSelectedDepartment || 
      localSelectedDepartment === 'Everyone'
    );
    
    // If no tasks for this department, show at least 2 tasks as examples
    filteredTasks = departmentTasks.length > 0 ? departmentTasks : tasksFilteredByCompletion.slice(0, 2);
  } else if (title === 'Team Tasks') {
    // For Team Tasks, ensure we show at least one example task
    const departmentTasks = tasksFilteredByCompletion.filter(task => 
      !task.department || 
      task.department === localSelectedDepartment || 
      localSelectedDepartment === 'Everyone'
    );
    
    filteredTasks = departmentTasks.length > 0 ? departmentTasks : tasksFilteredByCompletion.slice(0, 1);
  }

  // Determine if we should display the tasks horizontally based on title or forced prop
  const isHorizontalLayout = title === 'Afternoon Opening' || displayForcedHorizontal;

  return (
    <div className="mb-6">
      {/* Title section displayed outside the card, like in the design */}
      {!hideTitle && (
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium">{title}</h2>
          
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
        </div>
      )}
      
      <Card>
        <CardContent className="pt-4">
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
    </div>
  );
};

export default TaskListComponent;
