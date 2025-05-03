
import { useState } from 'react';
import Header from '@/components/header';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import TaskItem from '@/components/task-item';
import { mockOpeningTasks } from '@/data/mock-data';
import { Task } from '@/types';

const RestrictedTasks = () => {
  const [selectedDay, setSelectedDay] = useState('Sunday');
  const [selectedShift, setSelectedShift] = useState('Afternoon Shift | Opening');
  const [showCompleted, setShowCompleted] = useState(true);
  const [tasks, setTasks] = useState<Task[]>(mockOpeningTasks);

  // The restricted user role (e.g., 'cook', 'chef')
  const restrictedUserRole = 'cook';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header userRole={restrictedUserRole} />
      
      <div className="container px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-32">
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
            <SelectTrigger className="w-60">
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

        <div className="flex items-center justify-end mb-4">
          <span className="text-sm text-gray-500 mr-2">Show completed tasks</span>
          <Switch 
            checked={showCompleted} 
            onCheckedChange={setShowCompleted}
          />
        </div>
        
        <Card className="shadow-sm">
          <div className="p-4">
            {tasks.filter(task => showCompleted || !task.isCompleted).map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                assignedUserName={task.assignedTo ? "You" : undefined}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RestrictedTasks;
