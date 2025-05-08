
import React, { useState, useEffect } from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface VerticalTaskItemProps {
  task: Task;
  assignedUserName?: string;
  onTaskStatusChange?: (isCompleted: boolean) => void;
  onQuantityUpdate?: (quantity: number) => void;
  isExample?: boolean;
}

const VerticalTaskItem = ({ 
  task, 
  assignedUserName,
  onTaskStatusChange,
  onQuantityUpdate,
  isExample = false
}: VerticalTaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [quantityOnHand, setQuantityOnHand] = useState(task.quantityOnHand || 0);

  useEffect(() => {
    setIsCompleted(task.isCompleted);
    setQuantityOnHand(task.quantityOnHand || 0);
  }, [task.isCompleted, task.quantityOnHand]);

  const handleCheckboxChange = (checked: boolean) => {
    setIsCompleted(checked);
    onTaskStatusChange?.(checked);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantityOnHand(newQuantity);
    onQuantityUpdate?.(newQuantity);
  };

  const deadline = task.deadline ? new Date(task.deadline) : undefined;
  const timeAgo = deadline ? formatDistanceToNow(deadline, { addSuffix: true }) : undefined;

  return (
    <div className="p-4 flex items-start">
      <div className="h-6 w-6 rounded-sm border border-gray-300 flex-shrink-0 mt-1">
        <Checkbox
          id={`task-${task.id}`}
          checked={isCompleted}
          onCheckedChange={handleCheckboxChange}
          disabled={isExample}
          className="h-full w-full"
        />
      </div>
      
      <div className="ml-4">
        <h3 className="text-xl font-semibold">{task.name}</h3>
        {task.description && (
          <p className="text-gray-600">{task.description}</p>
        )}
        {assignedUserName && (
          <p className="text-gray-600">{
            assignedUserName === 'you' ? 'Assigned to you' : assignedUserName
          }</p>
        )}
        {deadline && (
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            {timeAgo}
          </div>
        )}
      </div>
      
      {task.completionMethod === 'quantity' && (
        <div className="ml-auto">
          <div className="flex items-center">
            <input
              type="number"
              id={`quantity-${task.id}`}
              className="w-16 p-2 border rounded"
              value={quantityOnHand}
              onChange={handleQuantityChange}
              disabled={isExample}
            />
            <span className="ml-1 text-gray-600">/{task.quantityRequired}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalTaskItem;
