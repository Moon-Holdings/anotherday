
import React from 'react';
import TaskListCard from './task-list-card';
import { Users, ChefHat, Wine } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

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
  return (
    <div className="bg-white rounded-lg shadow-sm w-[160px] mr-3 flex-shrink-0 overflow-hidden border border-gray-100 hover:border-rootina-teal transition-all duration-200">
      <div className="p-3 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center mb-2">
          <div className="p-1.5 rounded-md bg-rootina-lightBlue mr-2 text-rootina-blue">
            {React.cloneElement(icon as React.ReactElement, { size: 18 })}
          </div>
          <h2 className="text-sm font-bold truncate w-full">{department}</h2>
        </div>
      
        <ScrollArea className="h-[130px] pr-2">
          <div className="space-y-2">
            {taskLists.map(taskList => (
              <TaskListCard 
                key={taskList.id} 
                title={taskList.title} 
                completed={taskList.completed} 
                total={taskList.total} 
                isSelected={taskList.id === selectedTaskListId} 
                onClick={() => onSelectTaskList(department, taskList.id, taskList.title)} 
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DepartmentTasksCard;
