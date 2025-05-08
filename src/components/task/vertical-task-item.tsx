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
    <div className={`flex items-center justify-between p-3 border-b last:border-b-0 
      ${isExample ? 'border-dashed bg-gray-50' : ''}`}>
      <div className="flex items-center flex-1">
        <Checkbox
          id={`task-${task.id}`}
          checked={isCompleted}
          onCheckedChange={handleCheckboxChange}
          disabled={isExample}
        />
        
        <div className="ml-3 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-medium text-gray-900">
                {task.name}
                {isExample && <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Example</span>}
              </span>
              {task.isHighPriority && (
                <span className="ml-2 text-xs text-red-500 font-semibold">High Priority</span>
              )}
            </div>
            {deadline && (
              <div className="text-xs text-gray-500 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {timeAgo}
              </div>
            )}
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
          )}
          {assignedUserName && (
            <p className="text-sm text-gray-500">Assigned to: {assignedUserName}</p>
          )}
        </div>
      </div>
      
      {task.completionMethod === 'quantity' && (
        <div>
          <div className="flex items-center space-x-2">
            <label htmlFor={`quantity-${task.id}`} className="text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              id={`quantity-${task.id}`}
              className="w-20 px-3 py-2 border rounded-md text-sm text-gray-900"
              value={quantityOnHand}
              onChange={handleQuantityChange}
              disabled={isExample}
            />
            <span className="text-sm text-gray-500">/{task.quantityRequired}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalTaskItem;
