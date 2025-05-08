
import React from 'react';
import TaskListCard from './task-list-card';
import { Users, ChefHat, Wine, Package, UsersRound } from 'lucide-react';

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
    <div className="bg-white rounded-lg p-3 shadow-md w-[170px] mr-4 flex-shrink-0 border border-gray-100">
      <div className="flex items-center mb-3">
        <div className="mr-2 text-gray-700">
          {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
        <h2 className="text-sm font-bold truncate w-full">{department}</h2>
      </div>
      
      <div className="space-y-2.5">
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
    </div>
  );
};
export default DepartmentTasksCard;
