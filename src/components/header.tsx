
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeaderProps {
  userName?: string;
  date?: string;
  currentShift?: string;
  shiftAction?: string;
  onShiftChange?: (shift: string, action: string) => void;
}

const Header = ({
  userName = 'Brandon',
  date = '24.07.22',
  currentShift = 'Afternoon Shift',
  shiftAction = 'Opening',
  onShiftChange
}: HeaderProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <header className="bg-rootina-blue text-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm">{date}</p>
          <p className="text-sm">|</p>
          <p className="text-sm">Good afternoon, {userName}</p>
        </div>
        <Logo className="h-8" />
        
        <Select defaultValue={`${currentShift} | ${shiftAction}`}>
          <SelectTrigger className="bg-white text-gray-800 min-w-[200px] border-0">
            <SelectValue placeholder="Select Shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Morning Shift | Opening">Morning Shift | Opening</SelectItem>
            <SelectItem value="Afternoon Shift | Opening">Afternoon Shift | Opening</SelectItem>
            <SelectItem value="Evening Shift | Opening">Evening Shift | Opening</SelectItem>
            <SelectItem value="Morning Shift | Closing">Morning Shift | Closing</SelectItem>
            <SelectItem value="Afternoon Shift | Closing">Afternoon Shift | Closing</SelectItem>
            <SelectItem value="Evening Shift | Closing">Evening Shift | Closing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex border-t border-opacity-20 border-white">
        <Button 
          variant="ghost" 
          className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${activeTab === 'schedule' ? 'border-b-2 border-rootina-teal' : ''}`}
          onClick={() => handleTabChange('schedule')}
        >
          Daily Schedule
        </Button>
        <Button 
          variant="ghost" 
          className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${activeTab === 'tasks' ? 'border-b-2 border-rootina-teal' : ''}`}
          onClick={() => handleTabChange('tasks')}
        >
          Tasks
        </Button>
        <Button 
          variant="ghost" 
          className={`flex-1 py-3 rounded-none text-white hover:bg-rootina-blue hover:bg-opacity-80 ${activeTab === 'dashboard' ? 'border-b-2 border-rootina-teal' : ''}`}
          onClick={() => handleTabChange('dashboard')}
        >
          Dashboard
        </Button>
      </div>
    </header>
  );
};

export default Header;
