
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import QuantityControl from './quantity-control';
import PhotoControl from './photo-control';
import DeadlineDisplay from './deadline-display';
import { Badge } from '@/components/ui/badge';

interface HorizontalTaskItemProps {
  task: Task;
  isCompleted: boolean;
  onCheckChange: () => void;
  quantity: number;
  onQuantityIncrease: () => void;
  onQuantityDecrease: () => void;
  assignedUserName?: string;
}

const HorizontalTaskItem = ({
  task,
  isCompleted,
  onCheckChange,
  quantity,
  onQuantityIncrease,
  onQuantityDecrease,
  assignedUserName
}: HorizontalTaskItemProps) => {
  return (
    <div className="flex-shrink-0 w-[180px] bg-white rounded-lg p-3 shadow-sm border border-gray-100">
      <div className="flex items-start mb-2">
        <div className="flex-shrink-0 mt-1">
          <Checkbox checked={isCompleted} onCheckedChange={onCheckChange} />
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
          
          {/* Display assigned user name if provided */}
          {assignedUserName && (
            <Badge variant="outline" className="mt-2 text-xs bg-gray-50">
              {assignedUserName}
            </Badge>
          )}
        </div>
      </div>

      {task.deadline && (
        <DeadlineDisplay deadline={task.deadline} isHorizontal={true} />
      )}

      {task.completionMethod === 'quantity' && (
        <QuantityControl
          quantity={quantity}
          required={task.quantityRequired}
          onIncrease={onQuantityIncrease}
          onDecrease={onQuantityDecrease}
          isHorizontal={true}
        />
      )}

      {task.completionMethod === 'photo' && (
        <PhotoControl isHorizontal={true} />
      )}
    </div>
  );
};

export default HorizontalTaskItem;
