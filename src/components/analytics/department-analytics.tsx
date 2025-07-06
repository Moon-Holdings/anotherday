
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Task, Department } from '@/types';

interface DepartmentAnalyticsProps {
  tasks: Task[];
}

const DepartmentAnalytics = ({ tasks }: DepartmentAnalyticsProps) => {
  // Calculate department statistics
  const departmentStats = tasks.reduce((acc, task) => {
    const dept = task.department || 'unassigned';
    if (!acc[dept]) {
      acc[dept] = { total: 0, completed: 0, overdue: 0, highPriority: 0 };
    }
    acc[dept].total++;
    if (task.isCompleted) acc[dept].completed++;
    if (task.deadline && new Date(task.deadline) < new Date() && !task.isCompleted) {
      acc[dept].overdue++;
    }
    if (task.priority === 'high' || task.priority === 'urgent') {
      acc[dept].highPriority++;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number; overdue: number; highPriority: number }>);

  // Prepare data for bar chart
  const barChartData = Object.entries(departmentStats).map(([dept, stats]) => ({
    department: dept.charAt(0).toUpperCase() + dept.slice(1),
    completed: stats.completed,
    pending: stats.total - stats.completed,
    completionRate: stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : '0'
  }));

  // Prepare data for pie chart
  const pieChartData = Object.entries(departmentStats).map(([dept, stats]) => ({
    name: dept.charAt(0).toUpperCase() + dept.slice(1),
    value: stats.total,
    completed: stats.completed
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "#22c55e",
    },
    pending: {
      label: "Pending",
      color: "#f59e0b",
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion by Department */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={barChartData}>
                <XAxis dataKey="department" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="completed" fill="var(--color-completed)" />
                <Bar dataKey="pending" fill="var(--color-pending)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Task Distribution by Department */}
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Department</th>
                  <th className="text-right p-2 font-medium">Total Tasks</th>
                  <th className="text-right p-2 font-medium">Completed</th>
                  <th className="text-right p-2 font-medium">Completion Rate</th>
                  <th className="text-right p-2 font-medium">Overdue</th>
                  <th className="text-right p-2 font-medium">High Priority</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(departmentStats).map(([dept, stats]) => {
                  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
                  return (
                    <tr key={dept} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium capitalize">{dept}</td>
                      <td className="p-2 text-right">{stats.total}</td>
                      <td className="p-2 text-right text-green-600">{stats.completed}</td>
                      <td className="p-2 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          completionRate >= 80 ? 'bg-green-100 text-green-800' :
                          completionRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {completionRate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-2 text-right text-red-600">{stats.overdue}</td>
                      <td className="p-2 text-right text-orange-600">{stats.highPriority}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentAnalytics;
