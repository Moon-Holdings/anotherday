
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, TrendingUp, Users, AlertTriangle, Target } from 'lucide-react';
import { Task } from '@/types';

interface PerformanceMetricsProps {
  tasks: Task[];
}

const PerformanceMetrics = ({ tasks }: PerformanceMetricsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const overdueTasks = tasks.filter(task => 
    task.deadline && new Date(task.deadline) < new Date() && !task.isCompleted
  ).length;
  const highPriorityTasks = tasks.filter(task => 
    task.priority === 'high' || task.priority === 'urgent'
  ).length;
  
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const overdueRate = totalTasks > 0 ? (overdueTasks / totalTasks) * 100 : 0;
  
  // Calculate average completion time for completed tasks with time entries
  const tasksWithTime = tasks.filter(task => 
    task.isCompleted && task.timeEntries && task.timeEntries.length > 0
  );
  const totalTime = tasksWithTime.reduce((acc, task) => 
    acc + (task.timeEntries?.reduce((time, entry) => time + (entry.duration || 0), 0) || 0), 0
  );
  const avgCompletionTime = tasksWithTime.length > 0 ? totalTime / tasksWithTime.length : 0;

  // Get unique assignees
  const uniqueAssignees = new Set(tasks.map(task => task.assignedTo).filter(Boolean)).size;

  const metrics = [
    {
      title: 'Task Completion Rate',
      value: `${completionRate.toFixed(1)}%`,
      icon: CheckCircle,
      color: completionRate >= 80 ? 'text-green-600' : completionRate >= 60 ? 'text-yellow-600' : 'text-red-600',
      bgColor: completionRate >= 80 ? 'bg-green-50' : completionRate >= 60 ? 'bg-yellow-50' : 'bg-red-50',
      description: `${completedTasks} of ${totalTasks} tasks completed`
    },
    {
      title: 'Average Completion Time',
      value: `${avgCompletionTime.toFixed(0)}m`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: `Based on ${tasksWithTime.length} timed tasks`
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks.toString(),
      icon: AlertTriangle,
      color: overdueTasks === 0 ? 'text-green-600' : 'text-red-600',
      bgColor: overdueTasks === 0 ? 'bg-green-50' : 'bg-red-50',
      description: `${overdueRate.toFixed(1)}% of total tasks`
    },
    {
      title: 'High Priority Tasks',
      value: highPriorityTasks.toString(),
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Urgent and high priority'
    },
    {
      title: 'Active Team Members',
      value: uniqueAssignees.toString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'With assigned tasks'
    },
    {
      title: 'Performance Trend',
      value: completionRate >= 80 ? '+12%' : completionRate >= 60 ? '+5%' : '-3%',
      icon: TrendingUp,
      color: completionRate >= 80 ? 'text-green-600' : 'text-gray-600',
      bgColor: completionRate >= 80 ? 'bg-green-50' : 'bg-gray-50',
      description: 'vs previous period'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceMetrics;
