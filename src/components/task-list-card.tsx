
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
  
  if (progressPercent < 33) {
    progressColor = 'bg-rootina-red';
  } else if (progressPercent < 66) {
    progressColor = 'bg-rootina-yellow';
  }

  return (
    <div 
      className={`
        bg-gray-50 rounded-lg p-3 cursor-pointer
        ${isSelected ? 'border border-rootina-teal' : ''}
      `}
      onClick={onClick}
    >
      <div className="text-base font-medium mb-2">
        {title}
      </div>
      <div className="flex items-center justify-between">
        <div className="w-3/4">
          <div className="h-2 bg-gray-100 rounded-full w-full">
            <div 
              className={`h-2 rounded-full ${progressColor}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <span className="text-gray-600 text-base ml-2">{completed}/{total}</span>
      </div>
    </div>
  );
};

export default TaskListCard;
