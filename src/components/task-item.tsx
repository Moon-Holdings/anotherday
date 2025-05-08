
import React from 'react';
import { Task } from '@/types';
import HorizontalTaskItem from './task/horizontal-task-item';
import VerticalTaskItem from './task/vertical-task-item';

interface TaskItemProps {
  task: Task;
  isHorizontal?: boolean;
  assignedUserName?: string;
  onUpdateTask?: (taskId: string, updatedTask: Partial<Task>) => void;
  isExample?: boolean;
}

const TaskItem = ({ 
  task, 
  isHorizontal = false, 
  assignedUserName,
  onUpdateTask,
  isExample = false
}: TaskItemProps) => {
  const handleTaskStatusChange = (isCompleted: boolean) => {
    if (onUpdateTask && task.id) {
      onUpdateTask(task.id, { isCompleted });
    }
  };

  const handleQuantityUpdate = (quantity: number) => {
    if (onUpdateTask && task.id) {
      onUpdateTask(task.id, { quantityOnHand: quantity });
    }
  };

  return isHorizontal ? (
    <HorizontalTaskItem 
      task={task} 
      assignedUserName={assignedUserName}
      onTaskStatusChange={handleTaskStatusChange}
      onQuantityUpdate={handleQuantityUpdate}
      isExample={isExample}
    />
  ) : (
    <VerticalTaskItem 
      task={task} 
      assignedUserName={assignedUserName}
      onTaskStatusChange={handleTaskStatusChange}
      onQuantityUpdate={handleQuantityUpdate}
      isExample={isExample}
    />
  );
};

export default TaskItem;
