
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
        bg-white border p-4 rounded-md cursor-pointer transition-all
        ${isSelected ? 'border-rootina-teal shadow-sm' : 'border-gray-200'}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm">{title}</h3>
        <span className="text-sm text-gray-600">{completed}/{total}</span>
      </div>
      <div className="w-full mt-2">
        <div className="h-2 bg-gray-100 rounded-full w-full">
          <div 
            className={`h-2 rounded-full ${progressColor}`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;
