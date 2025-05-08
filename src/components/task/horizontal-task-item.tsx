
import React from 'react';
import { Task } from '@/types';
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "lucide-react"

interface HorizontalTaskItemProps {
  task: Task;
  assignedUserName?: string;
  onTaskStatusChange?: (isCompleted: boolean) => void;
  onQuantityUpdate?: (quantity: number) => void;
  isExample?: boolean;
}

const HorizontalTaskItem = ({ 
  task, 
  assignedUserName,
  onTaskStatusChange,
  onQuantityUpdate,
  isExample = false
}: HorizontalTaskItemProps) => {
  const handleCheckboxChange = (checked: boolean) => {
    onTaskStatusChange?.(checked);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    onQuantityUpdate?.(newQuantity);
  };

  return (
    <div className="p-4 flex items-start">
      <div className="h-6 w-6 rounded-sm border border-gray-300 flex-shrink-0 mt-1">
        <Checkbox 
          id={`task-${task.id}`}
          checked={task.isCompleted}
          onCheckedChange={handleCheckboxChange}
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
        {task.deadline && (
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
              value={task.quantityOnHand || 0}
              onChange={handleQuantityChange}
            />
            <span className="ml-1 text-gray-600">/{task.quantityRequired}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HorizontalTaskItem;
