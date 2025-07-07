
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, CheckCircle2, Circle } from 'lucide-react';
import { Task } from '@/types';
import { useDragDrop } from '@/contexts/drag-drop-context';
import { cn } from '@/lib/utils';

interface DraggableTaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  className?: string;
}

const DraggableTaskItem = ({ task, onToggleComplete, onEdit, className }: DraggableTaskItemProps) => {
  const { setDraggedTask, isDragging } = useDragDrop();

  const handleDragStart = (e: React.DragEvent) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-gray-500 bg-gray-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  const getStatusIcon = () => {
    if (task.isCompleted) return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    if (task.status === 'overdue') return <AlertTriangle className="h-4 w-4 text-red-600" />;
    if (task.status === 'in-progress') return <Clock className="h-4 w-4 text-blue-600" />;
    return <Circle className="h-4 w-4 text-gray-400" />;
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        'cursor-move transition-all duration-200 hover:shadow-md',
        getPriorityColor(task.priority),
        isDragging ? 'opacity-50' : '',
        task.isCompleted ? 'opacity-75' : '',
        className
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between space-x-3">
          <div className="flex items-start space-x-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleComplete(task.id)}
              className="p-0 h-auto hover:bg-transparent"
            >
              {getStatusIcon()}
            </Button>
            
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                "font-medium text-sm",
                task.isCompleted ? "line-through text-gray-500" : "text-gray-900"
              )}>
                {task.name}
              </h4>
              
              {task.description && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {task.priority}
                </Badge>
                
                {task.estimatedDuration && (
                  <Badge variant="secondary" className="text-xs">
                    {task.estimatedDuration}min
                  </Badge>
                )}
                
                {task.department && (
                  <Badge variant="outline" className="text-xs">
                    {task.department}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DraggableTaskItem;
