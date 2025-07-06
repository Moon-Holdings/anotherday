
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, AreaChart, Area } from 'recharts';
import { format, eachDayOfInterval, startOfDay } from 'date-fns';
import { Task } from '@/types';

interface TaskTrendAnalysisProps {
  tasks: Task[];
  dateRange: { from: Date; to: Date };
}

const TaskTrendAnalysis = ({ tasks, dateRange }: TaskTrendAnalysisProps) => {
  // Generate daily data for the date range
  const days = eachDayOfInterval({ start: dateRange.from, end: dateRange.to });
  
  const dailyData = days.map(day => {
    const dayStart = startOfDay(day);
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000 - 1);
    
    const dayTasks = tasks.filter(task => {
      if (task.completedAt) {
        const completedDate = new Date(task.completedAt);
        return completedDate >= dayStart && completedDate <= dayEnd;
      }
      return false;
    });
    
    const allDayTasks = tasks.filter(task => {
      // For this example, we'll count all tasks that could have been worked on this day
      const taskDate = task.completedAt ? new Date(task.completedAt) : day;
      return taskDate >= dayStart && taskDate <= dayEnd;
    });
    
    return {
      date: format(day, 'MMM dd'),
      fullDate: day,
      completed: dayTasks.length,
      created: allDayTasks.length,
      completionRate: allDayTasks.length > 0 ? (dayTasks.length / allDayTasks.length) * 100 : 0
    };
  });

  // Priority distribution over time
  const priorityData = days.map(day => {
    const dayStart = startOfDay(day);
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000 - 1);
    
    const dayTasks = tasks.filter(task => {
      const completedDate = task.completedAt ? new Date(task.completedAt) : day;
      return completedDate >= dayStart && completedDate <= dayEnd;
    });
    
    return {
      date: format(day, 'MMM dd'),
      urgent: dayTasks.filter(t => t.priority === 'urgent').length,
      high: dayTasks.filter(t => t.priority === 'high').length,
      medium: dayTasks.filter(t => t.priority === 'medium').length,
      low: dayTasks.filter(t => t.priority === 'low').length
    };
  });

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "#22c55e",
    },
    created: {
      label: "Created",
      color: "#3b82f6",
    },
    completionRate: {
      label: "Completion Rate",
      color: "#8b5cf6",
    },
  };

  const priorityConfig = {
    urgent: {
      label: "Urgent",
      color: "#ef4444",
    },
    high: {
      label: "High",
      color: "#f97316",
    },
    medium: {
      label: "Medium",
      color: "#eab308",
    },
    low: {
      label: "Low",
      color: "#22c55e",
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={dailyData}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="var(--color-completed)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-completed)" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="created" 
                  stroke="var(--color-created)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-created)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Completion Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={dailyData}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip 
                  content={<ChartTooltipContent formatter={(value) => [`${value}%`, "Completion Rate"]} />} 
                />
                <Area 
                  type="monotone" 
                  dataKey="completionRate" 
                  stroke="var(--color-completionRate)" 
                  fill="var(--color-completionRate)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Priority Distribution Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Task Priority Distribution Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={priorityConfig} className="h-[300px]">
            <AreaChart data={priorityData}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="urgent" 
                stackId="1" 
                stroke="var(--color-urgent)" 
                fill="var(--color-urgent)"
              />
              <Area 
                type="monotone" 
                dataKey="high" 
                stackId="1" 
                stroke="var(--color-high)" 
                fill="var(--color-high)"
              />
              <Area 
                type="monotone" 
                dataKey="medium" 
                stackId="1" 
                stroke="var(--color-medium)" 
                fill="var(--color-medium)"
              />
              <Area 
                type="monotone" 
                dataKey="low" 
                stackId="1" 
                stroke="var(--color-low)" 
                fill="var(--color-low)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskTrendAnalysis;
