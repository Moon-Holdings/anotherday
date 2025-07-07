
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Circle, 
  Filter,
  SortAsc,
  Search
} from 'lucide-react';
import { Task, TaskStatus } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DraggableTaskItem from './draggable-task-item';

interface MobileTaskViewProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const MobileTaskView = ({ tasks, onToggleComplete, onEditTask, onStatusChange }: MobileTaskViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'deadline' | 'department'>('priority');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'deadline':
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'department':
        return (a.department || '').localeCompare(b.department || '');
      default:
        return 0;
    }
  });

  const groupedTasks = {
    pending: sortedTasks.filter(task => task.status === 'pending'),
    'in-progress': sortedTasks.filter(task => task.status === 'in-progress'),
    completed: sortedTasks.filter(task => task.status === 'completed'),
    overdue: sortedTasks.filter(task => task.status === 'overdue'),
    blocked: sortedTasks.filter(task => task.status === 'blocked')
  };

  return (
    <div className="h-full flex flex-col">
      {/* Mobile Header with Search and Filters */}
      <div className="p-4 bg-white border-b space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Sort by Priority</SelectItem>
              <SelectItem value="deadline">Sort by Deadline</SelectItem>
              <SelectItem value="department">Sort by Department</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Task Lists */}
      <div className="flex-1">
        <Tabs defaultValue="all" className="h-full">
          <TabsList className="w-full justify-start p-1 bg-gray-100 mx-4 mt-2">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
            <TabsTrigger value="in-progress" className="flex-1">Active</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Done</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0 h-full">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {sortedTasks.map(task => (
                  <DraggableTaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditTask}
                    className="group"
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0 h-full">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {groupedTasks.pending.map(task => (
                  <DraggableTaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditTask}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-0 h-full">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {groupedTasks['in-progress'].map(task => (
                  <DraggableTaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditTask}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0 h-full">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {groupedTasks.completed.map(task => (
                  <DraggableTaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditTask}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileTaskView;
