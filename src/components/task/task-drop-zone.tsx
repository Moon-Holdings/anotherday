
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TaskStatus } from '@/types';
import { useDragDrop } from '@/contexts/drag-drop-context';
import { cn } from '@/lib/utils';

interface TaskDropZoneProps {
  status: TaskStatus;
  title: string;
  description?: string;
  onDrop: (taskId: string, newStatus: TaskStatus) => void;
  children: React.ReactNode;
  className?: string;
}

const TaskDropZone = ({ status, title, description, onDrop, children, className }: TaskDropZoneProps) => {
  const { draggedTask, isDragging } = useDragDrop();
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    
    if (draggedTask && draggedTask.status !== status) {
      onDrop(draggedTask.id, status);
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'pending': return 'border-gray-300 bg-gray-50';
      case 'in-progress': return 'border-blue-300 bg-blue-50';
      case 'completed': return 'border-green-300 bg-green-50';
      case 'overdue': return 'border-red-300 bg-red-50';
      case 'blocked': return 'border-orange-300 bg-orange-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <Card
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'transition-all duration-200 min-h-[200px]',
        getStatusColor(status),
        isOver && isDragging ? 'border-2 border-dashed shadow-lg scale-105' : '',
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge variant="outline">{status}</Badge>
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        
        {isOver && isDragging && (
          <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 mb-4 bg-blue-50">
            <p className="text-center text-blue-600 font-medium">
              Drop task here to change status to {status}
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          {children}
        </div>
      </div>
    </Card>
  );
};

export default TaskDropZone;
