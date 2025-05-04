
import React, { useState } from 'react';
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
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm w-[300px] mr-4 flex-shrink-0">
      <div className="flex flex-col items-center mb-4">
        <div className="mb-2">
          {icon}
        </div>
        <h2 className="text-xl font-bold">{department}</h2>
      </div>
      
      <div className="space-y-3">
        {taskLists.map((taskList) => (
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
