
import { useState } from 'react';
import { Task } from '@/types';
import HorizontalTaskItem from './task/horizontal-task-item';
import VerticalTaskItem from './task/vertical-task-item';
import EditTaskModal from './edit-task-modal';
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';

interface TaskItemProps {
  task: Task;
  isHorizontal?: boolean;
  onComplete?: (taskId: string, completed: boolean) => void;
  onQuantityChange?: (taskId: string, quantity: number) => void;
  onUpdateTask?: (taskId: string, updatedTask: Partial<Task>) => void;
  assignedUserName?: string;
}

const TaskItem = ({ 
  task, 
  isHorizontal = false,
  onComplete,
  onQuantityChange,
  onUpdateTask,
  assignedUserName
}: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [quantity, setQuantity] = useState(task.quantityOnHand || 0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCheckChange = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    if (onComplete) {
      onComplete(task.id, newState);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(task.id, newQuantity);
    }
  };

  const increaseQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      handleQuantityChange(quantity - 1);
    }
  };

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    if (onUpdateTask) {
      onUpdateTask(taskId, updatedTask);
    }
  };

  const openEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  // Render the appropriate layout based on isHorizontal prop
  return (
    <>
      {isHorizontal ? (
        <div className="relative">
          <HorizontalTaskItem
            task={task}
            isCompleted={isCompleted}
            onCheckChange={handleCheckChange}
            quantity={quantity}
            onQuantityIncrease={increaseQuantity}
            onQuantityDecrease={decreaseQuantity}
            assignedUserName={assignedUserName}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1 right-1 h-7 w-7"
            onClick={openEditModal}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="relative">
          <VerticalTaskItem
            task={task}
            isCompleted={isCompleted}
            onCheckChange={handleCheckChange}
            quantity={quantity}
            onQuantityIncrease={increaseQuantity}
            onQuantityDecrease={decreaseQuantity}
            assignedUserName={assignedUserName}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2"
            onClick={openEditModal}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      )}

      <EditTaskModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateTask={handleUpdateTask}
        task={task}
      />
    </>
  );
};

export default TaskItem;
