
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import QuantityControl from './quantity-control';
import PhotoControl from './photo-control';
import DeadlineDisplay from './deadline-display';

interface VerticalTaskItemProps {
  task: Task;
  isCompleted: boolean;
  onCheckChange: () => void;
  quantity: number;
  onQuantityIncrease: () => void;
  onQuantityDecrease: () => void;
}

const VerticalTaskItem = ({
  task,
  isCompleted,
  onCheckChange,
  quantity,
  onQuantityIncrease,
  onQuantityDecrease
}: VerticalTaskItemProps) => {
  return (
    <div className="flex items-start space-x-4 py-4 border-b last:border-b-0">
      <div className="flex-shrink-0 pt-1">
        <Checkbox checked={isCompleted} onCheckedChange={onCheckChange} />
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
            <DeadlineDisplay deadline={task.deadline} />
          )}
        </div>

        {task.completionMethod === 'quantity' && (
          <QuantityControl
            quantity={quantity}
            required={task.quantityRequired}
            onIncrease={onQuantityIncrease}
            onDecrease={onQuantityDecrease}
          />
        )}

        {task.completionMethod === 'photo' && (
          <PhotoControl />
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

export default VerticalTaskItem;
