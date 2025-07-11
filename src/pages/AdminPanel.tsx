
import Header from '@/components/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from '@/components/admin/user-management';
import RoleManagement from '@/components/admin/role-management';
import ListManagement from '@/components/admin/list-management';
import TaskTemplateManagement from '@/components/admin/task-template-management';
import AnalyticsDashboard from '@/components/analytics/analytics-dashboard';
import BottomNav from '@/components/bottom-nav';
import { mockOpeningTasks, mockPersonalTasks, mockTeamTasks, mockManagerTasks } from '@/data/mock-data';

const AdminPanel = () => {
  // Combine all tasks for analytics
  const allTasks = [
    ...mockOpeningTasks,
    ...mockPersonalTasks, 
    ...mockTeamTasks,
    ...mockManagerTasks
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="container px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="lists">Lists & Departments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics">
            <AnalyticsDashboard tasks={allTasks} />
          </TabsContent>
          
          <TabsContent value="automation">
            <TaskTemplateManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="roles">
            <RoleManagement />
          </TabsContent>
          
          <TabsContent value="lists">
            <ListManagement />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav userRole="owner" />
    </div>
  );
};

export default AdminPanel;
