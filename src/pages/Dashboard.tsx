import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header';
import DepartmentCard from '@/components/department-card';
import TaskListComponent from '@/components/task-list';
import AddButton from '@/components/add-button';
import AddTaskModal from '@/components/add-task-modal';
import { mockDepartmentProgress, mockOpeningTasks, mockPersonalTasks, mockTeamTasks } from '@/data/mock-data';
import { Task } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // Selected department state - map to department names correctly
  const [selectedDepartment, setSelectedDepartment] = useState(mockDepartmentProgress[0].department);

  // Selected shift and day state
  const [selectedShift, setSelectedShift] = useState('Afternoon Shift | Opening');

  // Maps the department cards to their corresponding filter values
  const departmentToFilterMap: Record<string, string> = {
    floor: 'Waiters',
    bar: 'Bar',
    kitchen: 'Kitchen',
    takeaway: 'Waiters',
    management: 'Managers'
  };

  // Icons for departments
  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'floor':
        return <div className="text-rootina-teal text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 5H5v14h14V5z"></path>
              <path d="M21 8h-2"></path>
              <path d="M21 12h-2"></path>
              <path d="M21 16h-2"></path>
              <path d="M5 8H3"></path>
              <path d="M5 12H3"></path>
              <path d="M5 16H3"></path>
              <path d="M12 3v2"></path>
              <path d="M12 19v2"></path>
            </svg>
          </div>;
      case 'bar':
        return <div className="text-rootina-teal text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 22h8"></path>
              <path d="M12 11v11"></path>
              <path d="M18 2H6v6l6 3 6-3V2z"></path>
            </svg>
          </div>;
      case 'kitchen':
        return <div className="text-rootina-teal text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
              <line x1="6" x2="18" y1="17" y2="17"></line>
            </svg>
          </div>;
      default:
        return <div className="text-rootina-teal text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
              <line x1="12" y1="6" x2="12" y2="18"></line>
            </svg>
          </div>;
    }
  };
  
  const handleAddTask = (newTask: Task) => {
    console.log('Adding new task:', newTask);
    // In a real app, we would add the task to our state or database
  };
  
  return <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container px-4 py-6">
        {/* Afternoon Opening title and dropdown moved next to each other */}
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium mr-4">Departments Tasks</h2>
          <Select value={selectedShift} onValueChange={setSelectedShift}>
            <SelectTrigger className="w-64 h-8 text-sm">
              <SelectValue placeholder="Select shift" />
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {mockDepartmentProgress.map(dept => <DepartmentCard key={dept.department} department={dept.department} icon={getDepartmentIcon(dept.department)} completed={dept.completed} total={dept.total} isSelected={dept.department === selectedDepartment} onClick={() => setSelectedDepartment(dept.department)} />)}
        </div>
        
        <div className="space-y-6">
          {/* Horizontal tasks section that is influenced by the department selection */}
          <div className="mb-2">
            <div className="flex justify-end">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Show completed tasks</span>
                <div className="h-4 w-8 bg-gray-200 rounded-full relative">
                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>
          
          <TaskListComponent 
            title="Afternoon Opening" 
            tasks={mockOpeningTasks} 
            selectedDepartment={departmentToFilterMap[selectedDepartment] || 'Waiters'} 
            hideTitle={true} 
            displayForcedHorizontal={true}
          />

          <TaskListComponent 
            title="Team Tasks" 
            tasks={mockTeamTasks} 
            filter={true} 
            selectedDepartment={departmentToFilterMap[selectedDepartment] || 'Waiters'} 
          />
          
          <TaskListComponent 
            title="Personal Tasks" 
            tasks={mockPersonalTasks} 
            onAddTask={() => setIsAddTaskModalOpen(true)} 
          />
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6">
        <AddButton onClick={() => setIsAddTaskModalOpen(true)} />
      </div>

      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAddTask={handleAddTask} />
    </div>;
};
export default Dashboard;
