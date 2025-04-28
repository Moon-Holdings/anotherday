
import { useState } from 'react';
import Header from '@/components/header';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import ScheduleItemComponent from '@/components/schedule-item';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import NotificationModal from '@/components/notification-modal';
import { mockScheduleItems } from '@/data/mock-data';
import { ScheduleItem } from '@/types';

const Schedule = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Sunday');
  const [selectedDepartment, setSelectedDepartment] = useState('Managers');
  const [showPassed, setShowPassed] = useState(true);

  // For demonstration, show notification after 2 seconds
  useState(() => {
    const timer = setTimeout(() => {
      setIsNotificationModalOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  });

  // Filter schedule items based on current time
  const currentTime = new Date();
  const scheduleItems = mockScheduleItems.filter(item => {
    const itemTime = new Date(item.time);
    return showPassed || itemTime > currentTime;
  });

  return (
    <div className="min-h-screen bg-rootina-lightBlue">
      <Header />
      
      <div className="container px-4 py-6">
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
              <SelectContent>
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
              <SelectContent>
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
            <span>משימה</span>
            <span>שעה</span>
          </div>
          
          {scheduleItems.map((item) => (
            <ScheduleItemComponent 
              key={item.id} 
              item={item} 
            />
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6">
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
    </div>
  );
};

export default Schedule;
