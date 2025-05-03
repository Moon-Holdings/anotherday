
import Header from '@/components/header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="container px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Documentation</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="search" 
              placeholder="Search documentation..." 
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-rootina-blue focus:border-transparent"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="overview">
                  <AccordionTrigger>System Overview</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 mb-4">
                      Welcome to the Rootina Restaurant Management System. This platform helps you manage your restaurant operations including scheduling, task management, inventory, and more.
                    </p>
                    <p className="text-gray-700">
                      Each role in the system has specific access and functionality designed to streamline your daily operations and improve productivity.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="navigation">
                  <AccordionTrigger>Navigation Basics</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 mb-2">
                      The bottom navigation bar provides quick access to the main sections of the application:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Dashboard:</strong> Overview of important metrics and information</li>
                      <li><strong>Tasks:</strong> View and manage daily and scheduled tasks</li>
                      <li><strong>Schedule:</strong> View and manage employee schedules</li>
                      <li><strong>Admin:</strong> Access administrative functions (managers only)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="first-login">
                  <AccordionTrigger>First Time Login</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 mb-4">
                      When you first log into the system, you'll need to:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                      <li>Enter your provided username and temporary password</li>
                      <li>Create a new secure password</li>
                      <li>Complete your profile information</li>
                      <li>Review your role permissions and accessible features</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Features & Functionality</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="task-management">
                  <AccordionTrigger>Task Management</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 mb-2">
                      The task management system allows you to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>View all assigned tasks</li>
                      <li>Create new tasks and assign them to team members</li>
                      <li>Set priorities and deadlines</li>
                      <li>Track completion status</li>
                      <li>Attach photos or notes to tasks</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="scheduling">
                  <AccordionTrigger>Scheduling</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 mb-4">
                      The scheduling feature helps manage employee shifts and availability:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>View daily, weekly, and monthly schedules</li>
                      <li>Create and assign shifts</li>
                      <li>Manage time-off requests</li>
                      <li>Handle shift swaps and coverage</li>
                      <li>Set recurring schedules</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="dashboard">
                  <AccordionTrigger>Dashboard Analytics</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700 mb-2">
                      The dashboard provides key insights into your restaurant operations:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Task completion rates</li>
                      <li>Staff performance metrics</li>
                      <li>Inventory status</li>
                      <li>Daily and weekly reports</li>
                      <li>Custom alerts for critical issues</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
