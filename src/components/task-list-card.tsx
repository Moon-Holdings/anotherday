
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface TaskListCardProps {
  title: string;
  completed: number;
  total: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const TaskListCard = ({ 
  title, 
  completed, 
  total,
  isSelected = false,
  onClick 
}: TaskListCardProps) => {
  // Calculate progress percentage
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;
  
  // Determine progress color based on percentage
  let progressColor = 'bg-rootina-green';
  let textColor = 'text-green-700';
  
  if (progressPercent < 33) {
    progressColor = 'bg-rootina-red';
    textColor = 'text-red-700';
  } else if (progressPercent < 66) {
    progressColor = 'bg-rootina-yellow';
    textColor = 'text-yellow-700';
  }

  return (
    <div 
      className={`
        bg-white border rounded-md cursor-pointer transition-all hover:shadow-sm
        ${isSelected ? 'border-rootina-teal shadow-sm' : 'border-gray-100'}
      `}
      onClick={onClick}
    >
      <div className="p-2">
        <div className="flex justify-between items-center mb-1.5">
          <h3 className="font-medium text-xs truncate max-w-[70%] pr-1">{title}</h3>
          <span className={`text-xs ${textColor} font-medium`}>{completed}/{total}</span>
        </div>
        
        <Progress value={progressPercent} className="h-1.5 bg-gray-100">
          <div 
            className={`h-1.5 rounded-full ${progressColor}`}
            style={{ width: `${progressPercent}%` }}
          />
        </Progress>
      </div>
    </div>
  );
};

export default TaskListCard;
