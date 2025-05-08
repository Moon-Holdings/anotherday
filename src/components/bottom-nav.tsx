
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarDays, ListTodo, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface BottomNavProps {
  userRole?: 'owner' | 'manager' | 'waiter' | 'chef' | 'cook' | 'bartender';
}

const BottomNav = ({ userRole = 'manager' }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (path === '') {
      setActiveTab('dashboard');
    } else if (path === 'dashboard' || path === 'user-dashboard') {
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
  const canAccessDashboard = ['owner', 'manager', 'bartender'].includes(userRole);
  const canAccessSchedule = ['owner', 'manager', 'bartender'].includes(userRole);
  const canAccessAdmin = userRole === 'owner' || userRole === 'manager';
  const shouldUseOwnerDashboard = userRole === 'owner';

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
    } else if (tab === 'dashboard') {
      // Send users to the appropriate dashboard based on role
      if (shouldUseOwnerDashboard) {
        navigate('/dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      navigate(`/${tab}`);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center">
        {canAccessSchedule && (
          <button 
            onClick={() => handleTabChange('schedule')} 
            className={cn(
              "flex flex-col items-center justify-center py-3 px-4 w-1/4 relative",
              activeTab === 'schedule' ? 'text-teal-500' : 'text-gray-500'
            )}
          >
            <CalendarDays size={24} />
            <span className="text-xs mt-1">Schedule</span>
            {activeTab === 'schedule' && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-teal-500 rounded-full"></div>
            )}
          </button>
        )}
        
        <button 
          onClick={() => handleTabChange('tasks')} 
          className={cn(
            "flex flex-col items-center justify-center py-3 px-4 w-1/4 relative",
            activeTab === 'tasks' ? 'text-teal-500' : 'text-gray-500'
          )}
        >
          <ListTodo size={24} />
          <span className="text-xs mt-1">Tasks</span>
          {activeTab === 'tasks' && (
            <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-teal-500 rounded-full"></div>
          )}
        </button>
        
        {canAccessDashboard && (
          <button 
            onClick={() => handleTabChange('dashboard')} 
            className={cn(
              "flex flex-col items-center justify-center py-3 px-4 w-1/4 relative",
              activeTab === 'dashboard' ? 'text-teal-500' : 'text-gray-500'
            )}
          >
            <LayoutDashboard size={24} />
            <span className="text-xs mt-1">Dashboard</span>
            {activeTab === 'dashboard' && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-teal-500 rounded-full"></div>
            )}
          </button>
        )}
        
        {canAccessAdmin && (
          <button 
            onClick={() => handleTabChange('admin')} 
            className={cn(
              "flex flex-col items-center justify-center py-3 px-4 w-1/4 relative",
              activeTab === 'admin' ? 'text-teal-500' : 'text-gray-500'
            )}
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Admin</span>
            {activeTab === 'admin' && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-teal-500 rounded-full"></div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
