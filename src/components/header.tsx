
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
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
            className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${activeTab === 'schedule' ? 'border-b-2 border-rootina-teal' : ''}`}
            onClick={() => handleTabChange('schedule')}
          >
            Daily Schedule
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${activeTab === 'tasks' ? 'border-b-2 border-rootina-teal' : ''}`}
          onClick={() => handleTabChange('tasks')}
        >
          Tasks
        </Button>
        
        {canAccessDashboard && (
          <Button 
            variant="ghost" 
            className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${activeTab === 'dashboard' ? 'border-b-2 border-rootina-teal' : ''}`}
            onClick={() => handleTabChange('dashboard')}
          >
            Dashboard
          </Button>
        )}
        
        {canAccessAdmin && (
          <Button 
            variant="ghost" 
            className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${activeTab === 'admin' ? 'border-b-2 border-rootina-teal' : ''}`}
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
