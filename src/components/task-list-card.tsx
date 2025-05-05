
import React from 'react';

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
  let circleColor = 'bg-rootina-green';
  
  if (progressPercent < 33) {
    circleColor = 'bg-rootina-red';
  } else if (progressPercent < 66) {
    circleColor = 'bg-rootina-yellow';
  }

  return (
    <div 
      className={`
        p-2 rounded-md cursor-pointer transition-all flex flex-col items-center
        ${isSelected ? 'scale-110' : ''}
      `}
      onClick={onClick}
    >
      <div className="relative w-12 h-12 mb-1">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-gray-100"></div>
        
        {/* Progress circle with clip path */}
        <div 
          className={`absolute inset-0 rounded-full ${circleColor}`}
          style={{ 
            clipPath: progressPercent > 0 
              ? `polygon(50% 50%, 50% 0%, ${progressPercent >= 25 ? '100% 0%' : `${50 + (progressPercent/25) * 50}% ${50 - (progressPercent/25) * 50}%`}, 
                 ${progressPercent >= 50 ? '100% 100%' : progressPercent >= 25 ? `100% ${(progressPercent-25)/25 * 100}%` : '50% 50%'}, 
                 ${progressPercent >= 75 ? '0% 100%' : progressPercent >= 50 ? `${50 - (progressPercent-50)/25 * 50}% 100%` : '50% 50%'}, 
                 ${progressPercent > 0 ? progressPercent >= 75 ? `0% ${100 - (progressPercent-75)/25 * 100}%` : '50% 50%' : '50% 50%'})`
              : 'none' 
          }}
        ></div>
        
        {/* Number indicator in the center */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {completed}/{total}
        </div>
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute -inset-1 border-2 border-rootina-teal rounded-full animate-pulse"></div>
        )}
      </div>
      
      <span className="text-xs text-center truncate w-full">{title}</span>
    </div>
  );
};

export default TaskListCard;
