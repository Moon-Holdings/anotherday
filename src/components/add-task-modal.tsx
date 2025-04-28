
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Department, ShiftType, ShiftAction, TaskRecurrence } from '@/types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskData: any) => void;
}

const AddTaskModal = ({ isOpen, onClose, onAddTask }: AddTaskModalProps) => {
  const [taskType, setTaskType] = useState<TaskRecurrence>('repeating');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState<Department | ''>('');
  const [shift, setShift] = useState<string>('');
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([0]); // Sunday by default
  const [isQuantityTask, setIsQuantityTask] = useState(false);
  const [isPhotoTask, setIsPhotoTask] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const resetForm = () => {
    setTaskType('repeating');
    setTaskName('');
    setDescription('');
    setDepartment('');
    setShift('');
    setDaysOfWeek([0]);
    setIsQuantityTask(false);
    setIsPhotoTask(false);
    setQuantity(0);
  };

  const handleSubmit = () => {
    // Simple validation
    if (!taskName) return;
    
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      name: taskName,
      description,
      department,
      shift: shift.split('|')[0].trim() as ShiftType,
      shiftAction: shift.split('|')[1].trim() as ShiftAction,
      daysOfWeek,
      isQuantityTask,
      isPhotoTask,
      completionMethod: isPhotoTask 
        ? (isQuantityTask ? 'photo-checkmark' : 'photo') 
        : (isQuantityTask ? 'quantity' : 'checkmark'),
      type: 'role',
      recurrence: taskType,
      quantityRequired: isQuantityTask ? 17 : undefined,
      quantityOnHand: isQuantityTask ? quantity : undefined,
      isCompleted: false,
    };
    
    onAddTask(newTask);
    resetForm();
    onClose();
  };

  const handleDayToggle = (day: number) => {
    setDaysOfWeek(current =>
      current.includes(day)
        ? current.filter(d => d !== day)
        : [...current, day]
    );
  };

  const handlePresetDays = (preset: 'everyday' | 'weekdays' | 'weekend') => {
    switch (preset) {
      case 'everyday':
        setDaysOfWeek([0, 1, 2, 3, 4, 5, 6]);
        break;
      case 'weekdays':
        setDaysOfWeek([1, 2, 3, 4, 5]);
        break;
      case 'weekend':
        setDaysOfWeek([0, 6]);
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <RadioGroup
            value={taskType}
            onValueChange={(value) => setTaskType(value as TaskRecurrence)}
            className="flex space-x-4 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily-schedule" id="option-schedule" />
              <Label htmlFor="option-schedule">Daily Schedule</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-time" id="option-one-time" />
              <Label htmlFor="option-one-time">One-time Task</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="repeating" id="option-repeating" />
              <Label htmlFor="option-repeating">Repeating Task</Label>
            </div>
          </RadioGroup>

          <div className="space-y-4 mt-6">
            <Input
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24"
            />

            <Select value={department} onValueChange={setDepartment as any}>
              <SelectTrigger>
                <SelectValue placeholder="Choose department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="floor">Floor</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="service-kitchen">Service Kitchen</SelectItem>
                <SelectItem value="prep-kitchen">Prep Kitchen</SelectItem>
                <SelectItem value="bakery">Bakery</SelectItem>
                <SelectItem value="takeaway">Takeaway</SelectItem>
              </SelectContent>
            </Select>

            <Select value={shift} onValueChange={setShift}>
              <SelectTrigger>
                <SelectValue placeholder="Shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning | opening">Morning | Opening</SelectItem>
                <SelectItem value="morning | closing">Morning | Closing</SelectItem>
                <SelectItem value="lunch | opening">Lunch | Opening</SelectItem>
                <SelectItem value="lunch | closing">Lunch | Closing</SelectItem>
                <SelectItem value="afternoon | opening">Afternoon | Opening</SelectItem>
                <SelectItem value="afternoon | closing">Afternoon | Closing</SelectItem>
                <SelectItem value="evening | opening">Evening | Opening</SelectItem>
                <SelectItem value="evening | closing">Evening | Closing</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <Label>Days of the week</Label>
              <div className="flex justify-between">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div key={day} className="flex flex-col items-center">
                    <span className="text-xs mb-1">{day}</span>
                    <Checkbox 
                      checked={daysOfWeek.includes(index)}
                      onCheckedChange={() => handleDayToggle(index)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="everyday" 
                    checked={daysOfWeek.length === 7}
                    onCheckedChange={() => handlePresetDays('everyday')}
                  />
                  <Label htmlFor="everyday" className="text-xs">Everyday</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="weekdays" 
                    checked={daysOfWeek.length === 5 && !daysOfWeek.includes(0) && !daysOfWeek.includes(6)}
                    onCheckedChange={() => handlePresetDays('weekdays')}
                  />
                  <Label htmlFor="weekdays" className="text-xs">Sun-Thu</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="weekend" 
                    checked={daysOfWeek.length === 2 && daysOfWeek.includes(0) && daysOfWeek.includes(6)}
                    onCheckedChange={() => handlePresetDays('weekend')}
                  />
                  <Label htmlFor="weekend" className="text-xs">Every Weekend</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="quantity-task" 
                  checked={isQuantityTask}
                  onCheckedChange={(checked) => setIsQuantityTask(checked as boolean)}
                />
                <Label htmlFor="quantity-task">Quantity task</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="photo-task" 
                  checked={isPhotoTask}
                  onCheckedChange={(checked) => setIsPhotoTask(checked as boolean)}
                />
                <Label htmlFor="photo-task">Taking a pictures</Label>
              </div>
            </div>

            {isQuantityTask && (
              <div className="space-y-2">
                <Label>Amount:</Label>
                <div className="flex items-center space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  >
                    -
                  </Button>
                  <div className="w-12 text-center">{quantity}</div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Deadline Hour (optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8:00">8:00</SelectItem>
                  <SelectItem value="9:00">9:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="13:00">13:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                  <SelectItem value="17:00">17:00</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                  <SelectItem value="19:00">19:00</SelectItem>
                  <SelectItem value="20:00">20:00</SelectItem>
                  <SelectItem value="21:00">21:00</SelectItem>
                  <SelectItem value="22:00">22:00</SelectItem>
                  <SelectItem value="23:00">23:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => {
                  // Add picture/video attachment functionality
                }}
                className="flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span>Add picture/video</span>
              </Button>
              <Button 
                type="button"
                onClick={handleSubmit}
                className="bg-rootina-teal hover:bg-rootina-lightTeal"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
