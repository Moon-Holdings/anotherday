
import { useState } from 'react';
import { Task } from '@/types';
import HorizontalTaskItem from './task/horizontal-task-item';
import VerticalTaskItem from './task/vertical-task-item';

interface TaskItemProps {
  task: Task;
  isHorizontal?: boolean;
  onComplete?: (taskId: string, completed: boolean) => void;
  onQuantityChange?: (taskId: string, quantity: number) => void;
}

const TaskItem = ({ 
  task, 
  isHorizontal = false,
  onComplete,
  onQuantityChange
}: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [quantity, setQuantity] = useState(task.quantityOnHand || 0);

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

  // Render the appropriate layout based on isHorizontal prop
  return isHorizontal ? (
    <HorizontalTaskItem
      task={task}
      isCompleted={isCompleted}
      onCheckChange={handleCheckChange}
      quantity={quantity}
      onQuantityIncrease={increaseQuantity}
      onQuantityDecrease={decreaseQuantity}
    />
  ) : (
    <VerticalTaskItem
      task={task}
      isCompleted={isCompleted}
      onCheckChange={handleCheckChange}
      quantity={quantity}
      onQuantityIncrease={increaseQuantity}
      onQuantityDecrease={decreaseQuantity}
    />
  );
};

export default TaskItem;
