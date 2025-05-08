
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
        bg-white border p-2.5 rounded-md cursor-pointer transition-all
        ${isSelected ? 'border-rootina-teal shadow-sm bg-[#F2FCE2]' : 'border-gray-200'}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
      <div className="flex justify-between items-center mt-1.5">
        <div className="w-3/4">
          <div className="h-2 bg-gray-100 rounded-full w-full">
            <div 
              className={`h-2 rounded-full ${progressColor}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <span className="text-xs text-gray-600 whitespace-nowrap ml-2">{completed}/{total}</span>
      </div>
    </div>
  );
};

export default TaskListCard;
