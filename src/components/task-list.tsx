
import { useState } from 'react';
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
}

const TaskListComponent = ({ 
  title, 
  tasks, 
  showCompleted = false,
  onAddTask,
  filter = false
}: TaskListProps) => {
  const [displayCompleted, setDisplayCompleted] = useState(showCompleted);
  const [selectedDay, setSelectedDay] = useState('Sunday');
  const [selectedShift, setSelectedShift] = useState('Afternoon Shift | Opening');
  const [selectedDepartment, setSelectedDepartment] = useState('Waiters');

  const filteredTasks = displayCompleted 
    ? tasks 
    : tasks.filter(task => !task.isCompleted);

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
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
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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
          <div>
            {filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} />
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
