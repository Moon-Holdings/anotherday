
import React from 'react';
import TaskListCard from './task-list-card';
import { Users, ChefHat, Wine } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  // Ensure we show up to 6 task lists per department
  const displayTaskLists = taskLists.slice(0, 6);
  
  // If we have fewer than 6 task lists, create placeholder empty ones to show 6 total
  const emptyTaskLists = Array(Math.max(0, 6 - displayTaskLists.length))
    .fill(null)
    .map((_, index) => ({
      id: `empty-${index}`,
      title: "No task list",
      completed: 0,
      total: 0
    }));
  
  // Combine actual task lists with empty placeholders to always show 6
  const allTaskLists = [...displayTaskLists, ...emptyTaskLists];
  
  return <div className="bg-white rounded-lg p-2 shadow-sm w-[150px] mr-3 flex-shrink-0 py-[3px]">
      <div className="flex items-center mb-2">
        <div className="mr-1">
          {React.cloneElement(icon as React.ReactElement, { size: 20 })}
        </div>
        <h2 className="text-sm font-bold truncate w-full">{department}</h2>
      </div>
      
      <div className="h-[132px]"> {/* Fixed height to show 3 task cards (~44px each) */}
        <ScrollArea className="h-full" orientation="vertical">
          <div className="space-y-2 pr-2">
            {allTaskLists.map(taskList => 
              <TaskListCard 
                key={taskList.id} 
                title={taskList.title} 
                completed={taskList.completed} 
                total={taskList.total} 
                isSelected={taskList.id === selectedTaskListId} 
                onClick={() => onSelectTaskList(department, taskList.id, taskList.title)} 
              />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>;
};
export default DepartmentTasksCard;
