
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '@/types';

interface DragDropContextType {
  draggedTask: Task | null;
  setDraggedTask: (task: Task | null) => void;
  isDragging: boolean;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
};

interface DragDropProviderProps {
  children: ReactNode;
}

export const DragDropProvider = ({ children }: DragDropProviderProps) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const isDragging = draggedTask !== null;

  return (
    <DragDropContext.Provider value={{ draggedTask, setDraggedTask, isDragging }}>
      {children}
    </DragDropContext.Provider>
  );
};
