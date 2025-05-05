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
    <div className={`relative rounded-lg border p-3 shadow-sm ${isExample ? 'border-dashed border-gray-300 bg-gray-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Checkbox 
              id={`task-${task.id}`}
              checked={task.isCompleted}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor={`task-${task.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {task.name}
            </label>
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-500">{task.description}</p>
          )}
          
          {assignedUserName && (
            <p className="text-xs text-gray-500">Assigned to: {assignedUserName}</p>
          )}
          
          {task.deadline && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="mr-1.5 h-4 w-4" />
              <span>Deadline: {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          )}
        </div>

        {task.completionMethod === 'quantity' && (
          <div>
            <label htmlFor={`quantity-${task.id}`} className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="mt-1">
              <input
                type="number"
                id={`quantity-${task.id}`}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={task.quantityOnHand || 0}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Example badge if this is an example task */}
      {isExample && (
        <div className="absolute top-2 right-2">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Example</span>
        </div>
      )}
    </div>
  );
};

export default HorizontalTaskItem;
