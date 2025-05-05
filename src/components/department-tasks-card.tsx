
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleDot } from 'lucide-react';

// Define the task list type
interface TaskList {
  id: string;
  title: string;
  completed: number;
  total: number;
}

interface DepartmentTasksCardProps {
  department: string;
  icon: React.ReactNode;
  taskLists: TaskList[];
  onSelectTaskList: (departmentName: string, taskListId: string, taskListTitle: string) => void;
  selectedTaskListId?: string;
}

const DepartmentTasksCard = ({
  department,
  icon,
  taskLists,
  onSelectTaskList,
  selectedTaskListId
}: DepartmentTasksCardProps) => {
  // Ensure we have exactly 6 task lists (fill with placeholders if needed)
  const displayTaskLists = [...taskLists];
  while (displayTaskLists.length < 6) {
    displayTaskLists.push({
      id: `placeholder-${displayTaskLists.length}`,
      title: `Task List ${displayTaskLists.length + 1}`,
      completed: 0,
      total: 0
    });
  }

  return (
    <div className="bg-white rounded-lg p-2 shadow-sm w-[150px] mr-3 flex-shrink-0">
      <div className="flex items-center mb-2">
        <div className="mr-1">
          {React.cloneElement(icon as React.ReactElement, { size: 20 })}
        </div>
        <h2 className="text-sm font-bold truncate w-full">{department}</h2>
      </div>
      
      <ScrollArea className="h-[120px]">
        <div className="grid grid-cols-2 gap-2 p-1">
          {displayTaskLists.map((taskList) => {
            // Calculate progress percentage
            const progressPercent = taskList.total > 0 ? (taskList.completed / taskList.total) * 100 : 0;
            
            // Determine color based on percentage
            let circleColor = 'bg-rootina-green';
            if (progressPercent < 33) {
              circleColor = 'bg-rootina-red';
            } else if (progressPercent < 66) {
              circleColor = 'bg-rootina-yellow';
            }
            
            const isSelected = taskList.id === selectedTaskListId;
            const isPlaceholder = taskList.id.startsWith('placeholder');
            
            return (
              <div 
                key={taskList.id}
                className={`
                  flex flex-col items-center justify-center p-1 cursor-pointer
                  ${isSelected ? 'scale-110' : ''}
                  ${isPlaceholder ? 'opacity-40' : ''}
                `}
                onClick={() => !isPlaceholder && onSelectTaskList(department, taskList.id, taskList.title)}
                title={taskList.title}
              >
                <div className="relative w-10 h-10 mb-1">
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
                    {taskList.completed}/{taskList.total}
                  </div>
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute -inset-1 border-2 border-rootina-teal rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <span className="text-[10px] text-center truncate w-full">{taskList.title}</span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DepartmentTasksCard;
