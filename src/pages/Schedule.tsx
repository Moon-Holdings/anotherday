
import { useState } from 'react';
import Header from '@/components/header';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import ScheduleItemComponent from '@/components/schedule-item';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import NotificationModal from '@/components/notification-modal';
import SearchInput from '@/components/search-input';
import LoadingSpinner from '@/components/loading-spinner';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { mockScheduleItems } from '@/data/mock-data';
import { ScheduleItem } from '@/types';
import useKeyboardShortcuts from '@/hooks/use-keyboard-shortcuts';
import BottomNav from '@/components/bottom-nav';

const Schedule = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Sunday');
  const [selectedDepartment, setSelectedDepartment] = useState('Managers');
  const [showPassed, setShowPassed] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    shortcuts: [
      {
        key: 'n',
        ctrlKey: true,
        action: () => setIsAddTaskModalOpen(true),
        description: 'Create new schedule item'
      },
      {
        key: 'f',
        ctrlKey: true,
        action: () => document.getElementById('schedule-search')?.focus(),
        description: 'Focus search'
      }
    ]
  });

  // For demonstration, show notification after 2 seconds
  useState(() => {
    const timer = setTimeout(() => {
      setIsNotificationModalOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  });

  // Filter schedule items based on current time and search
  const currentTime = new Date();
  const filteredScheduleItems = mockScheduleItems.filter(item => {
    const itemTime = new Date(item.time);
    const matchesTime = showPassed || itemTime > currentTime;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTime && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-anotherday-gray pb-20">
      <Header />
      
      <div className="container px-4 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Schedule</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search */}
        <div className="mb-4">
          <SearchInput
            id="schedule-search"
            placeholder="Search schedule items..."
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            className="max-w-md"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Switch 
              checked={showPassed} 
              onCheckedChange={setShowPassed}
            />
            <span className="text-sm text-gray-500">Show Events Passed</span>
          </div>
          
          <div className="flex space-x-2">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                <SelectItem value="Managers">Managers</SelectItem>
                <SelectItem value="Waiters">Waiters</SelectItem>
                <SelectItem value="Bar">Bar</SelectItem>
                <SelectItem value="Kitchen">Kitchen</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                <SelectItem value="Sunday">Sunday</SelectItem>
                <SelectItem value="Monday">Monday</SelectItem>
                <SelectItem value="Tuesday">Tuesday</SelectItem>
                <SelectItem value="Wednesday">Wednesday</SelectItem>
                <SelectItem value="Thursday">Thursday</SelectItem>
                <SelectItem value="Friday">Friday</SelectItem>
                <SelectItem value="Saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col space-y-1 mb-6">
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span>Task</span>
            <span>Time</span>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredScheduleItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No schedule items match your search.' : 'No schedule items available.'}
            </div>
          ) : (
            filteredScheduleItems.map((item) => (
              <div key={item.id} className="hover:bg-white/50 transition-colors rounded-lg">
                <ScheduleItemComponent 
                  item={item} 
                />
              </div>
            ))
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="text-xs text-gray-500">
          <p>Keyboard shortcuts: Ctrl+N (New item), Ctrl+F (Search)</p>
        </div>
      </div>
      
      <div className="fixed bottom-20 right-6">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal 
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={() => {}}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        title="Turn on music"
        time="12:00"
        description='"Calm Afternoon" Playlist'
      />
      
      <BottomNav userRole="manager" />
    </div>
  );
};

export default Schedule;
