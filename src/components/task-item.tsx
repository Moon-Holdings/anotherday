
import { useState } from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  if (isHorizontal) {
    return (
      <div className="flex-shrink-0 w-[250px] bg-white rounded-lg p-3 shadow-sm border border-gray-100">
        <div className="flex items-start mb-2">
          <div className="flex-shrink-0 mt-1">
            <Checkbox checked={isCompleted} onCheckedChange={handleCheckChange} />
          </div>
          <div className="ml-3 flex-grow">
            <p className={`font-medium text-sm ${isCompleted ? 'text-gray-400 line-through' : ''}`}>
              {task.name}
            </p>
            {task.description && (
              <p className={`text-xs text-gray-500 mt-1 ${isCompleted ? 'text-gray-300 line-through' : ''}`}>
                {task.description}
              </p>
            )}
          </div>
        </div>

        {task.deadline && (
          <div className="mt-2 text-xs px-2 py-1 bg-red-100 text-red-700 rounded inline-block">
            Till {new Date(task.deadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        )}

        {task.completionMethod === 'quantity' && (
          <div className="flex items-center mt-2 space-x-1">
            <span className="text-xs text-gray-500">Stock:</span>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 rounded-full text-gray-500"
                onClick={decreaseQuantity}
              >
                -
              </Button>
              <span className="w-6 text-center text-xs">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 rounded-full text-gray-500"
                onClick={increaseQuantity}
              >
                +
              </Button>
            </div>
            {task.quantityRequired && (
              <div className="text-xs">
                <span className="text-gray-500">Need: </span>
                <span className={task.quantityRequired > quantity ? "text-red-500" : "text-green-500"}>
                  {task.quantityRequired}
                </span>
              </div>
            )}
          </div>
        )}

        {task.completionMethod === 'photo' && (
          <div className="flex items-center justify-center mt-2 bg-gray-100 rounded-md p-1 w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
          </div>
        )}
      </div>
    );
  }

  // Vertical layout (original)
  return (
    <div className="flex items-start space-x-4 py-4 border-b last:border-b-0">
      <div className="flex-shrink-0 pt-1">
        <Checkbox checked={isCompleted} onCheckedChange={handleCheckChange} />
      </div>
      
      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <p className={`font-medium ${isCompleted ? 'text-gray-400 line-through' : ''}`}>
              {task.name}
            </p>
            {task.description && (
              <p className={`text-sm text-gray-500 ${isCompleted ? 'text-gray-300 line-through' : ''}`}>
                {task.description}
              </p>
            )}
          </div>

          {task.deadline && (
            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
              Till {new Date(task.deadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          )}
        </div>

        {task.completionMethod === 'quantity' && (
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-sm text-gray-500">On stock:</span>
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full text-gray-500"
                onClick={decreaseQuantity}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full text-gray-500"
                onClick={increaseQuantity}
              >
                +
              </Button>
            </div>
            {task.quantityRequired && (
              <div className="text-sm">
                <span className="text-gray-500">Needed: </span>
                <span className={task.quantityRequired > quantity ? "text-red-500" : "text-green-500"}>
                  {task.quantityRequired}
                </span>
              </div>
            )}
          </div>
        )}

        {task.completionMethod === 'photo' && (
          <div className="flex items-center mt-2">
            <div className="flex items-center justify-center bg-gray-100 rounded-md p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-shrink-0">
        <Button variant="ghost" size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
