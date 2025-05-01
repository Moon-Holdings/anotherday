import { useState, useEffect } from 'react';
import { Task, TaskList } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import TaskItem from './task-item';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskListProps {
  title: string;
  tasks: Task[];
  showCompleted?: boolean;
  onAddTask?: () => void;
  filter?: boolean;
  selectedDepartment?: string;
  hideTitle?: boolean;
  displayForcedHorizontal?: boolean; 
  description?: string;
}

const TaskListComponent = ({ 
  title, 
  tasks, 
  showCompleted = false,
  onAddTask,
  filter = false,
  selectedDepartment = 'floor',
  hideTitle = false,
  displayForcedHorizontal = false,
  description,
}: TaskListProps) => {
  const [displayCompleted, setDisplayCompleted] = useState(showCompleted);
  const [localSelectedDepartment, setLocalSelectedDepartment] = useState(selectedDepartment);

  // Update local state when prop changes
  useEffect(() => {
    setLocalSelectedDepartment(selectedDepartment);
  }, [selectedDepartment]);

  // Filter tasks by completion status
  const tasksFilteredByCompletion = displayCompleted 
    ? tasks 
    : tasks.filter(task => !task.isCompleted);
    
  // Filter tasks by department
  let filteredTasks = tasksFilteredByCompletion;
  
  if (localSelectedDepartment && localSelectedDepartment !== 'Everyone') {
    // First try to filter by exact department match
    const departmentTasks = tasksFilteredByCompletion.filter(task => 
      task.department === localSelectedDepartment
    );
    
    // If we found tasks for this department, use them
    if (departmentTasks.length > 0) {
      filteredTasks = departmentTasks;
    } else {
      // Otherwise, for demo purposes, show at least 2 random tasks
      filteredTasks = tasksFilteredByCompletion.slice(0, Math.min(2, tasksFilteredByCompletion.length));
    }
  }

  // Determine if we should display the tasks horizontally based on title or forced prop
  const isHorizontalLayout = displayForcedHorizontal;

  return (
    <div className="mb-6">
      {/* Title section displayed outside the card, like in the design */}
      {!hideTitle && (
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
          
          {filter && title === "Team Tasks" && (
            <div className="flex items-center space-x-2">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskListComponent;
