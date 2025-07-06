
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import PerformanceMetrics from './performance-metrics';
import DepartmentAnalytics from './department-analytics';
import TaskTrendAnalysis from './task-trend-analysis';
import TimeTrackingAnalytics from './time-tracking-analytics';
import { Task } from '@/types';

interface AnalyticsDashboardProps {
  tasks: Task[];
}

const AnalyticsDashboard = ({ tasks }: AnalyticsDashboardProps) => {
  const [dateRange, setDateRange] = useState({
    from: startOfDay(subDays(new Date(), 7)),
    to: endOfDay(new Date())
  });
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('7d');

  // Filter tasks based on date range and department
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const taskDate = task.completedAt ? new Date(task.completedAt) : new Date();
      const dateInRange = taskDate >= dateRange.from && taskDate <= dateRange.to;
      const departmentMatch = selectedDepartment === 'all' || task.department === selectedDepartment;
      return dateInRange && departmentMatch;
    });
  }, [tasks, dateRange, selectedDepartment]);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const now = new Date();
    let from: Date;
    
    switch (period) {
      case '1d':
        from = startOfDay(now);
        break;
      case '7d':
        from = startOfDay(subDays(now, 7));
        break;
      case '30d':
        from = startOfDay(subDays(now, 30));
        break;
      case '90d':
        from = startOfDay(subDays(now, 90));
        break;
      default:
        from = startOfDay(subDays(now, 7));
    }
    
    setDateRange({ from, to: endOfDay(now) });
  };

  const handleExport = () => {
    // In a real app, this would generate and download a report
    console.log('Exporting analytics report...', { dateRange, selectedDepartment, tasks: filteredTasks });
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600">Performance insights and reporting</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Today</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="floor">Floor</SelectItem>
              <SelectItem value="kitchen">Kitchen</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
              <SelectItem value="takeaway">Takeaway</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-60">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: startOfDay(range.from), to: endOfDay(range.to) });
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <PerformanceMetrics tasks={filteredTasks} />

      {/* Analytics Tabs */}
      <Tabs defaultValue="departments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <DepartmentAnalytics tasks={filteredTasks} />
        </TabsContent>

        <TabsContent value="trends">
          <TaskTrendAnalysis tasks={filteredTasks} dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="time">
          <TimeTrackingAnalytics tasks={filteredTasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
