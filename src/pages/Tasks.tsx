
import { useState } from 'react';
import Header from '@/components/header';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import TaskItem from '@/components/task-item';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import { mockOpeningTasks } from '@/data/mock-data';
import { Task } from '@/types';

const Tasks = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Sunday');
  const [selectedShift, setSelectedShift] = useState('Afternoon Shift | Opening');
  const [selectedDepartment, setSelectedDepartment] = useState('Waiters');
  const [showCompleted, setShowCompleted] = useState(true);
  const [tasks, setTasks] = useState<Task[]>(mockOpeningTasks);

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  // Filter tasks based on showCompleted state
  const filteredTasks = showCompleted 
    ? tasks 
    : tasks.filter(task => !task.isCompleted);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
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

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Waiters">Waiters</SelectItem>
              <SelectItem value="Bar">Bar</SelectItem>
              <SelectItem value="Kitchen">Kitchen</SelectItem>
              <SelectItem value="Managers">Managers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <Button 
            variant="default" 
            className="bg-rootina-teal hover:bg-rootina-lightTeal"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            Add New Task
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Button>
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
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </Card>
      </div>
      
      <div className="fixed bottom-6 right-6">
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
