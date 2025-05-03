
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Department, ShiftType, ShiftAction, TaskRecurrence, Task } from '@/types';
import { toast } from 'sonner';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  task: Task | null;
}

const EditTaskModal = ({ isOpen, onClose, onUpdateTask, task }: EditTaskModalProps) => {
  const [taskType, setTaskType] = useState<TaskRecurrence>('repeating');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState<Department | undefined>(undefined);
  const [shift, setShift] = useState<string>('');
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([0]); // Sunday by default
  const [isQuantityTask, setIsQuantityTask] = useState(false);
  const [isPhotoTask, setIsPhotoTask] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [deadlineHour, setDeadlineHour] = useState<string>('');

  // Populate form with task data when it changes
  useEffect(() => {
    if (task) {
      setTaskType(task.recurrence || 'repeating');
      setTaskName(task.name || '');
      setDescription(task.description || '');
      setDepartment(task.department);
      setShift(task.shift && task.shiftAction ? `${task.shift} | ${task.shiftAction}` : '');
      setDaysOfWeek(task.daysOfWeek || [0]);
      setIsQuantityTask(!!task.quantityRequired);
      setIsPhotoTask(task.completionMethod?.includes('photo') || false);
      setQuantity(task.quantityOnHand || 0);
      setDeadlineHour(''); // Reset deadline hour as it's optional
    }
  }, [task]);

  const handleSubmit = () => {
    if (!task || !taskName) {
      toast.error("Task name is required");
      return;
    }
    
    const [shiftType, shiftAction] = shift.split('|').map(s => s.trim());

    const updatedTask: Partial<Task> = {
      name: taskName,
      description,
      department,
      shift: shiftType as ShiftType,
      shiftAction: shiftAction as ShiftAction,
      daysOfWeek,
      recurrence: taskType,
      completionMethod: isPhotoTask 
        ? (isQuantityTask ? 'photo-checkmark' : 'photo') 
        : (isQuantityTask ? 'quantity' : 'checkmark'),
      quantityRequired: isQuantityTask ? task.quantityRequired || 17 : undefined,
      quantityOnHand: isQuantityTask ? quantity : undefined,
    };
    
    onUpdateTask(task.id, updatedTask);
    toast.success("Task updated successfully!");
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
          <DialogTitle>Edit Task</DialogTitle>
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

            <Select 
              value={department} 
              onValueChange={(val) => setDepartment(val as Department)}
            >
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
                      id={`day-${index}`}
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
                  onCheckedChange={(checked) => setIsQuantityTask(checked === true)}
                />
                <Label htmlFor="quantity-task">Quantity task</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="photo-task" 
                  checked={isPhotoTask}
                  onCheckedChange={(checked) => setIsPhotoTask(checked === true)}
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
              <Select value={deadlineHour} onValueChange={setDeadlineHour}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={`${i}:00`}>{i}:00</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                onClick={handleSubmit}
                className="bg-rootina-teal hover:bg-rootina-lightTeal"
              >
                Update Task
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
