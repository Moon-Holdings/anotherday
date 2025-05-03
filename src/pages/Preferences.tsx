
import Header from '@/components/header';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const Preferences = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="container px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Preferences</h1>
        
        <div className="bg-white rounded-lg shadow divide-y">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="font-medium">Enable Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications about tasks and events</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-alerts" className="font-medium">Email Alerts</Label>
                  <p className="text-sm text-gray-500">Receive important alerts via email</p>
                </div>
                <Switch
                  id="email-alerts"
                  checked={emailAlerts}
                  onCheckedChange={setEmailAlerts}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="task-reminders" className="font-medium">Task Reminders</Label>
                  <p className="text-sm text-gray-500">Get reminders for upcoming and overdue tasks</p>
                </div>
                <Switch
                  id="task-reminders"
                  checked={taskReminders}
                  onCheckedChange={setTaskReminders}
                />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Display</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Use dark color theme</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-view" className="font-medium">Compact View</Label>
                  <p className="text-sm text-gray-500">Display more content with reduced spacing</p>
                </div>
                <Switch
                  id="compact-view"
                  checked={compactView}
                  onCheckedChange={setCompactView}
                />
              </div>
            </div>
          </div>
          
          <div className="p-6 flex justify-end">
            <button className="px-4 py-2 bg-rootina-blue text-white rounded-md hover:bg-blue-600 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
