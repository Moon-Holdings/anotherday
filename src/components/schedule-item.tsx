
import { ScheduleItem } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface ScheduleItemProps {
  item: ScheduleItem;
  onComplete?: (itemId: string, completed: boolean) => void;
}

const ScheduleItemComponent = ({ item, onComplete }: ScheduleItemProps) => {
  const time = new Date(item.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  const handleCheckChange = (checked: boolean) => {
    if (onComplete) {
      onComplete(item.id, checked);
    }
  };

  return (
    <div className={`
      mb-4 rounded-lg overflow-hidden
      ${item.isCompleted ? 'bg-rootina-teal text-white' : 'bg-white'} 
    `}>
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col">
          <h3 className="font-medium">{item.title}</h3>
          {item.description && (
            <p className="text-sm opacity-80">{item.description}</p>
          )}
        </div>
        <div className="text-lg font-medium">
          {time}
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-2 bg-opacity-10 bg-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`p-1 ${item.isCompleted ? 'text-white' : 'text-gray-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </Button>
        <div>
          <Checkbox 
            checked={item.isCompleted} 
            onCheckedChange={handleCheckChange}
            className={item.isCompleted ? "border-white" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleItemComponent;
