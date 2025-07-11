
import React from 'react';
import TaskListCard from './task-list-card';
import { Users, ChefHat, Wine } from 'lucide-react';

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
  return <div className="bg-white rounded-lg p-3 shadow-sm w-[200px] mr-4 flex-shrink-0">
      <div className="flex items-center mb-3">
        <div className="mr-2">
          {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
        <h2 className="text-base font-bold truncate w-full">{department}</h2>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {taskLists.map(taskList => <TaskListCard key={taskList.id} title={taskList.title} completed={taskList.completed} total={taskList.total} isSelected={taskList.id === selectedTaskListId} onClick={() => onSelectTaskList(department, taskList.id, taskList.title)} />)}
      </div>
    </div>;
};
export default DepartmentTasksCard;
