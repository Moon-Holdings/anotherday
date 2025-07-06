
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ScatterChart, Scatter } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { Task } from '@/types';

interface TimeTrackingAnalyticsProps {
  tasks: Task[];
}

const TimeTrackingAnalytics = ({ tasks }: TimeTrackingAnalyticsProps) => {
  // Filter tasks with time entries
  const tasksWithTime = tasks.filter(task => 
    task.timeEntries && task.timeEntries.length > 0
  );

  // Calculate time statistics by department
  const departmentTimeStats = tasksWithTime.reduce((acc, task) => {
    const dept = task.department || 'unassigned';
    const totalTime = task.timeEntries?.reduce((time, entry) => time + (entry.duration || 0), 0) || 0;
    
    if (!acc[dept]) {
      acc[dept] = { totalTime: 0, taskCount: 0, avgTime: 0 };
    }
    
    acc[dept].totalTime += totalTime;
    acc[dept].taskCount++;
    acc[dept].avgTime = acc[dept].totalTime / acc[dept].taskCount;
    
    return acc;
  }, {} as Record<string, { totalTime: number; taskCount: number; avgTime: number }>);

  // Prepare data for department time chart
  const departmentTimeData = Object.entries(departmentTimeStats).map(([dept, stats]) => ({
    department: dept.charAt(0).toUpperCase() + dept.slice(1),
    avgTime: Math.round(stats.avgTime),
    totalTime: stats.totalTime,
    taskCount: stats.taskCount
  }));

  // Time efficiency analysis (estimated vs actual)
  const efficiencyData = tasksWithTime
    .filter(task => task.estimatedDuration)
    .map(task => {
      const actualTime = task.timeEntries?.reduce((time, entry) => time + (entry.duration || 0), 0) || 0;
      const estimated = task.estimatedDuration || 0;
      return {
        taskName: task.name.substring(0, 20) + (task.name.length > 20 ? '...' : ''),
        estimated,
        actual: actualTime,
        efficiency: estimated > 0 ? ((estimated - actualTime) / estimated) * 100 : 0
      };
    })
    .slice(0, 10); // Show top 10 tasks

  // Calculate overall efficiency metrics
  const totalEstimated = efficiencyData.reduce((sum, item) => sum + item.estimated, 0);
  const totalActual = efficiencyData.reduce((sum, item) => sum + item.actual, 0);
  const overallEfficiency = totalEstimated > 0 ? ((totalEstimated - totalActual) / totalEstimated) * 100 : 0;

  // Top time-consuming tasks
  const topTimeConsumingTasks = tasksWithTime
    .map(task => ({
      name: task.name,
      totalTime: task.timeEntries?.reduce((time, entry) => time + (entry.duration || 0), 0) || 0,
      department: task.department,
      priority: task.priority
    }))
    .sort((a, b) => b.totalTime - a.totalTime)
    .slice(0, 5);

  const chartConfig = {
    avgTime: {
      label: "Average Time (min)",
      color: "#3b82f6",
    },
    estimated: {
      label: "Estimated (min)",
      color: "#10b981",
    },
    actual: {
      label: "Actual (min)",
      color: "#f59e0b",
    },
  };

  return (
    <div className="space-y-6">
      {/* Time Efficiency Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Overall Efficiency</span>
              </div>
              <div className="flex items-center space-x-1">
                {overallEfficiency > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`font-bold ${overallEfficiency > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(overallEfficiency).toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {overallEfficiency > 0 ? 'Under estimated time' : 'Over estimated time'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Tracked Time</span>
              <span className="font-bold text-2xl">{Math.round(totalActual)}m</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Across {tasksWithTime.length} tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Avg Task Duration</span>
              <span className="font-bold text-2xl">
                {tasksWithTime.length > 0 ? Math.round(totalActual / tasksWithTime.length) : 0}m
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Per completed task
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Time by Department */}
        <Card>
          <CardHeader>
            <CardTitle>Average Task Duration by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={departmentTimeData}>
                <XAxis dataKey="department" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="avgTime" fill="var(--color-avgTime)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Estimated vs Actual Time */}
        <Card>
          <CardHeader>
            <CardTitle>Estimated vs Actual Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={efficiencyData}>
                <XAxis dataKey="taskName" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="estimated" fill="var(--color-estimated)" />
                <Bar dataKey="actual" fill="var(--color-actual)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Time-Consuming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Top Time-Consuming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topTimeConsumingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{task.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {task.department}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        task.priority === 'urgent' ? 'border-red-500 text-red-700' :
                        task.priority === 'high' ? 'border-orange-500 text-orange-700' :
                        task.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                        'border-green-500 text-green-700'
                      }`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{task.totalTime}m</p>
                  <p className="text-xs text-gray-500">Total time</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTrackingAnalytics;
