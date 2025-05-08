
import React from 'react';
import { Progress } from "@/components/ui/progress";
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
  // Take the first task list for simplified display
  const mainTaskList = taskLists[0] || { id: '', title: '', completed: 0, total: 0 };
  
  // Determine progress color based on percentage
  const progressPercent = mainTaskList.total > 0 ? (mainTaskList.completed / mainTaskList.total) * 100 : 0;
  let progressColor = 'bg-rootina-green';
  
  if (progressPercent < 33) {
    progressColor = 'bg-rootina-red';
  } else if (progressPercent < 66) {
    progressColor = 'bg-rootina-yellow';
  }

  return (
    <div 
      className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 w-full"
      onClick={() => onSelectTaskList(department, mainTaskList.id, mainTaskList.title)}
    >
      <div className="flex items-center mb-3">
        <div className="mr-3 text-gray-800">
          {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
        <h2 className="text-lg font-semibold">{department}</h2>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 mb-2">
        <div className="text-base font-medium">{mainTaskList.title}</div>
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
        <span className="text-gray-600 text-base ml-2">{mainTaskList.completed}/{mainTaskList.total}</span>
      </div>
    </div>
  );
};

export default DepartmentTasksCard;
