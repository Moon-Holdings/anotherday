
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './logo';
import { format } from 'date-fns';
import BottomNav from './bottom-nav';

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

  // Get greeting based on current time
  const getGreeting = () => {
    const hours = currentDateTime.getHours();
    if (hours < 12) {
      return 'Good morning';
    } else if (hours < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  // Format current date and time
  const formattedDate = format(currentDateTime, 'dd.MM.yy');
  const formattedTime = format(currentDateTime, 'HH:mm:ss');

  return (
    <>
      <header className="bg-rootina-blue text-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2 w-1/3 justify-start">
            <p className="text-sm">{getGreeting()}, {userName}</p>
          </div>
          
          <div className="flex justify-center w-1/3">
            <Logo className="h-8" />
          </div>
          
          <div className="flex justify-end w-1/3 items-center space-x-2">
            <p className="text-sm">{formattedDate}</p>
            <p className="text-sm">|</p>
            <p className="text-sm">{formattedTime}</p>
          </div>
        </div>
      </header>
      
      {/* Bottom Navigation */}
      <BottomNav userRole={userRole} />
    </>
  );
};

export default Header;
