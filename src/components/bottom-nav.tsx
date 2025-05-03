
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, ListTodo, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface BottomNavProps {
  userRole?: 'manager' | 'waiter' | 'chef' | 'cook' | 'bartender';
}

const BottomNav = ({ userRole = 'manager' }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (path === '') {
      setActiveTab('dashboard');
    } else if (path === 'restricted-tasks') {
      setActiveTab('tasks');
    } else if (path.length > 0) {
      setActiveTab(path);
    } else {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);

  // Define which tabs are accessible based on user role
  const canAccessDashboard = ['manager', 'bartender'].includes(userRole);
  const canAccessSchedule = ['manager', 'bartender'].includes(userRole);
  const canAccessAdmin = userRole === 'manager';

  const handleTabChange = (tab: string) => {
    // If user role is chef or cook, they can only access tasks
    if (['chef', 'cook'].includes(userRole) && tab !== 'tasks') {
      setActiveTab('tasks');
      navigate('/restricted-tasks');
      return;
    }
    
    setActiveTab(tab);
    
    // Navigate to appropriate route based on role
    if (tab === 'tasks' && ['chef', 'cook'].includes(userRole)) {
      navigate('/restricted-tasks');
    } else {
      navigate(`/${tab}`);
    }
  };

  return (
    <div className="fixed bottom-16 left-4 right-4 bg-white rounded-lg border border-gray-200 shadow-md z-50">
      <div className="flex justify-around items-center">
        {canAccessSchedule && (
          <button 
            onClick={() => handleTabChange('schedule')} 
            className={cn(
              "flex flex-col items-center justify-center py-2 px-4 w-1/4",
              activeTab === 'schedule' ? 'text-rootina-teal' : 'text-gray-500'
            )}
          >
            <CalendarDays size={24} />
            <span className="text-xs mt-1">Schedule</span>
          </button>
        )}
        
        <button 
          onClick={() => handleTabChange('tasks')} 
          className={cn(
            "flex flex-col items-center justify-center py-2 px-4 w-1/4",
            activeTab === 'tasks' ? 'text-rootina-teal' : 'text-gray-500'
          )}
        >
          <ListTodo size={24} />
          <span className="text-xs mt-1">Tasks</span>
        </button>
        
        {canAccessDashboard && (
          <button 
            onClick={() => handleTabChange('dashboard')} 
            className={cn(
              "flex flex-col items-center justify-center py-2 px-4 w-1/4",
              activeTab === 'dashboard' ? 'text-rootina-teal' : 'text-gray-500'
            )}
          >
            <LayoutDashboard size={24} />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
        )}
        
        {canAccessAdmin && (
          <button 
            onClick={() => handleTabChange('admin')} 
            className={cn(
              "flex flex-col items-center justify-center py-2 px-4 w-1/4",
              activeTab === 'admin' ? 'text-rootina-teal' : 'text-gray-500'
            )}
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Admin</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
