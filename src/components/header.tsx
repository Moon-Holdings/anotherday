
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface HeaderProps {
  userName?: string;
  currentShift?: string;
  shiftAction?: string;
  onShiftChange?: (shift: string, action: string) => void;
  userRole?: 'manager' | 'waiter' | 'chef' | 'cook' | 'bartender';
}

const Header = ({
  userName = 'Brandon',
  currentShift = 'Afternoon Shift',
  shiftAction = 'Opening',
  onShiftChange,
  userRole = 'manager' // Default role is manager
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Set active tab based on current route when component mounts or route changes
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
    
    // If user is restricted to tasks, set active tab to tasks
    if (['chef', 'cook'].includes(userRole)) {
      setActiveTab('tasks');
      // Redirect to restricted tasks if they're on a different page
      if (location.pathname !== '/restricted-tasks') {
        navigate('/restricted-tasks');
      }
    }
  }, [location.pathname, userRole, navigate]);

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

  // Define which tabs are accessible based on user role
  const canAccessDashboard = ['manager', 'bartender'].includes(userRole);
  const canAccessSchedule = ['manager', 'bartender'].includes(userRole);
  const canAccessAdmin = userRole === 'manager';

  // Format current date and time
  const formattedDate = format(currentDateTime, 'dd.MM.yy');
  const formattedTime = format(currentDateTime, 'HH:mm:ss');

  return (
    <header className="bg-rootina-blue text-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2 w-1/3">
          <p className="text-sm">{formattedDate}</p>
          <p className="text-sm">|</p>
          <p className="text-sm">{formattedTime}</p>
          <p className="text-sm">|</p>
          <p className="text-sm">Good afternoon, {userName}</p>
        </div>
        
        <div className="flex justify-center w-1/3">
          <Logo className="h-8" />
        </div>
        
        <div className="flex justify-end w-1/3">
          {/* Shift selector dropdown removed */}
        </div>
      </div>
      
      <div className="flex border-t border-opacity-20 border-white">
        {canAccessSchedule && (
          <Button 
            variant="ghost" 
            className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${
              activeTab === 'schedule' 
                ? 'border-b-2 border-rootina-teal text-rootina-teal' 
                : ''
            }`}
            onClick={() => handleTabChange('schedule')}
          >
            Daily Schedule
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${
            activeTab === 'tasks' 
              ? 'border-b-2 border-rootina-teal text-rootina-teal' 
              : ''
          }`}
          onClick={() => handleTabChange('tasks')}
        >
          Tasks
        </Button>
        
        {canAccessDashboard && (
          <Button 
            variant="ghost" 
            className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${
              activeTab === 'dashboard' 
                ? 'border-b-2 border-rootina-teal text-rootina-teal' 
                : ''
            }`}
            onClick={() => handleTabChange('dashboard')}
          >
            Dashboard
          </Button>
        )}
        
        {canAccessAdmin && (
          <Button 
            variant="ghost" 
            className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${
              activeTab === 'admin' 
                ? 'border-b-2 border-rootina-teal text-rootina-teal' 
                : ''
            }`}
            onClick={() => handleTabChange('admin')}
          >
            Admin
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
