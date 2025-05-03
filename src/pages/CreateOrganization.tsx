
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/logo";
import { toast } from 'sonner';

// Types for our organization setup
interface Department {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface TaskList {
  id: string;
  name: string;
  department: string;
  type: "opening" | "closing";
}

const CreateOrganization = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("organization");
  
  const [orgName, setOrgName] = useState('');
  const [departments, setDepartments] = useState<Department[]>([
    { id: "1", name: "Waiters" },
    { id: "2", name: "Bar" },
    { id: "3", name: "Kitchen" }
  ]);
  const [newDepartment, setNewDepartment] = useState('');
  
  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Manager", permissions: ["manage_tasks", "manage_users", "manage_roles", "manage_departments"] },
    { id: "2", name: "Waiter", permissions: ["view_tasks", "complete_tasks"] },
    { id: "3", name: "Bartender", permissions: ["view_tasks", "complete_tasks"] }
  ]);
  const [newRole, setNewRole] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  const [taskLists, setTaskLists] = useState<TaskList[]>([
    { id: "1", name: "Morning Opening", department: "Waiters", type: "opening" },
    { id: "2", name: "Evening Closing", department: "Bar", type: "closing" }
  ]);
  const [newListName, setNewListName] = useState('');
  const [newListDepartment, setNewListDepartment] = useState('');
  const [newListType, setNewListType] = useState<"opening" | "closing">("opening");
  
  // Available permissions
  const availablePermissions = [
    { id: "manage_tasks", name: "Manage Tasks" },
    { id: "manage_users", name: "Manage Users" },
    { id: "manage_roles", name: "Manage Roles" },
    { id: "manage_departments", name: "Manage Departments" },
    { id: "view_tasks", name: "View Tasks" },
    { id: "complete_tasks", name: "Complete Tasks" },
  ];
  
  const handleAddDepartment = () => {
    if (!newDepartment) {
      toast.error("Department name cannot be empty");
      return;
    }
    
    setDepartments([...departments, { 
      id: (departments.length + 1).toString(), 
      name: newDepartment 
    }]);
    setNewDepartment('');
    toast.success("Department added successfully");
  };
  
  const handleAddRole = () => {
    if (!newRole) {
      toast.error("Role name cannot be empty");
      return;
    }
    
    if (selectedPermissions.length === 0) {
      toast.error("Please select at least one permission");
      return;
    }
    
    setRoles([...roles, { 
      id: (roles.length + 1).toString(), 
      name: newRole,
      permissions: selectedPermissions 
    }]);
    setNewRole('');
    setSelectedPermissions([]);
    toast.success("Role added successfully");
  };
  
  const handleTogglePermission = (permissionId: string) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };
  
  const handleAddList = () => {
    if (!newListName) {
      toast.error("List name cannot be empty");
      return;
    }
    
    if (!newListDepartment) {
      toast.error("Please select a department");
      return;
    }
    
    setTaskLists([...taskLists, { 
      id: (taskLists.length + 1).toString(), 
      name: newListName,
      department: newListDepartment,
      type: newListType
    }]);
    setNewListName('');
    toast.success("Task list added successfully");
  };
  
  const handleRemoveDepartment = (id: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast.success("Department removed successfully");
  };
  
  const handleRemoveRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
    toast.success("Role removed successfully");
  };
  
  const handleRemoveList = (id: string) => {
    setTaskLists(taskLists.filter(list => list.id !== id));
    toast.success("List removed successfully");
  };
  
  const handleFinish = () => {
    if (!orgName) {
      toast.error("Organization name is required");
      return;
    }
    
    if (departments.length === 0) {
      toast.error("Please add at least one department");
      return;
    }
    
    if (roles.length === 0) {
      toast.error("Please add at least one role");
      return;
    }
    
    // In a real app, we would create the organization and save all data
    toast.success("Organization created successfully");
    navigate('/dashboard');
  };
  
  const handleNextTab = () => {
    if (activeTab === "organization") {
      if (!orgName) {
        toast.error("Organization name is required");
        return;
      }
      setActiveTab("departments");
    } else if (activeTab === "departments") {
      if (departments.length === 0) {
        toast.error("Please add at least one department");
        return;
      }
      setActiveTab("roles");
    } else if (activeTab === "roles") {
      if (roles.length === 0) {
        toast.error("Please add at least one role");
        return;
      }
      setActiveTab("lists");
    }
  };
  
  const handlePreviousTab = () => {
    if (activeTab === "departments") {
      setActiveTab("organization");
    } else if (activeTab === "roles") {
      setActiveTab("departments");
    } else if (activeTab === "lists") {
      setActiveTab("roles");
    }
  };
  
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <div className="flex justify-center p-6 pt-10">
        <Logo className="w-48" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 pb-20">
        <Card className="w-full max-w-3xl shadow-lg bg-white">
          <div className="text-center p-6 border-b">
            <h2 className="text-2xl font-semibold">Set Up Your Organization</h2>
            <p className="text-gray-500 mt-1">
              Configure your organization, departments, roles and task lists
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="organization">Organization</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="lists">Task Lists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="organization" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Organization Details</h3>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Organization Name</label>
                  <Input
                    placeholder="Enter organization name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="py-6"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  This will be the name of your business on Rootina Shift Flow
                </p>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  className="bg-rootina-teal hover:bg-rootina-lightTeal"
                  onClick={handleNextTab}
                >
                  Next: Departments
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="departments" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Define Departments</h3>
                <p className="text-sm text-gray-500">
                  Add all the departments in your organization
                </p>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Department name"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="py-6 flex-1"
                  />
                  <Button 
                    className="bg-rootina-teal hover:bg-rootina-lightTeal"
                    onClick={handleAddDepartment}
                  >
                    Add
                  </Button>
                </div>
                
                <ScrollArea className="h-64 border rounded-md">
                  <div className="p-4 space-y-2">
                    {departments.length === 0 ? (
                      <p className="text-gray-500 text-center p-4">No departments added yet</p>
                    ) : (
                      departments.map(dept => (
                        <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <span>{dept.name}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveDepartment(dept.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6L6 18"></path>
                              <path d="M6 6l12 12"></path>
                            </svg>
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handlePreviousTab}
                >
                  Back
                </Button>
                <Button 
                  className="bg-rootina-teal hover:bg-rootina-lightTeal"
                  onClick={handleNextTab}
                >
                  Next: Roles
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="roles" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Define Roles</h3>
                <p className="text-sm text-gray-500">
                  Create roles and assign permissions
                </p>
                
                <div className="grid grid-cols-1 gap-2">
                  <Input
                    placeholder="Role name"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="py-6"
                  />
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Permissions:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {availablePermissions.map(permission => (
                        <div key={permission.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={permission.id}
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => handleTogglePermission(permission.id)}
                            className="mr-2 h-4 w-4 rounded border-gray-300 text-rootina-teal focus:ring-rootina-teal"
                          />
                          <label htmlFor={permission.id} className="text-sm">
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-rootina-teal hover:bg-rootina-lightTeal"
                    onClick={handleAddRole}
                  >
                    Add Role
                  </Button>
                </div>
                
                <ScrollArea className="h-64 border rounded-md">
                  <div className="p-4 space-y-3">
                    {roles.length === 0 ? (
                      <p className="text-gray-500 text-center p-4">No roles added yet</p>
                    ) : (
                      roles.map(role => (
                        <div key={role.id} className="bg-gray-50 p-4 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{role.name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveRole(role.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6l12 12"></path>
                              </svg>
                            </Button>
                          </div>
                          <div className="text-xs text-gray-500">
                            <p>Permissions:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {role.permissions.map(perm => (
                                <span key={perm} className="bg-gray-200 px-2 py-1 rounded text-xs">
                                  {availablePermissions.find(p => p.id === perm)?.name || perm}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handlePreviousTab}
                >
                  Back
                </Button>
                <Button 
                  className="bg-rootina-teal hover:bg-rootina-lightTeal"
                  onClick={handleNextTab}
                >
                  Next: Task Lists
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="lists" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Create Task Lists</h3>
                <p className="text-sm text-gray-500">
                  Define opening and closing task lists for each department
                </p>
                
                <div className="space-y-3">
                  <Input
                    placeholder="List name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="py-6"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Department</label>
                      <select
                        value={newListDepartment}
                        onChange={(e) => setNewListDepartment(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select department</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">List Type</label>
                      <select
                        value={newListType}
                        onChange={(e) => setNewListType(e.target.value as "opening" | "closing")}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="opening">Opening</option>
                        <option value="closing">Closing</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-rootina-teal hover:bg-rootina-lightTeal w-full"
                    onClick={handleAddList}
                  >
                    Add List
                  </Button>
                </div>
                
                <ScrollArea className="h-64 border rounded-md">
                  <div className="p-4 space-y-3">
                    {taskLists.length === 0 ? (
                      <p className="text-gray-500 text-center p-4">No task lists added yet</p>
                    ) : (
                      taskLists.map(list => (
                        <div key={list.id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                          <div>
                            <p className="font-medium">{list.name}</p>
                            <div className="flex gap-2 text-xs text-gray-500 mt-1">
                              <span className="bg-gray-200 px-2 py-1 rounded">
                                {list.department}
                              </span>
                              <span className={`px-2 py-1 rounded ${
                                list.type === "opening" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-orange-100 text-orange-700"
                              }`}>
                                {list.type === "opening" ? "Opening" : "Closing"}
                              </span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveList(list.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6L6 18"></path>
                              <path d="M6 6l12 12"></path>
                            </svg>
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handlePreviousTab}
                >
                  Back
                </Button>
                <Button 
                  className="bg-rootina-teal hover:bg-rootina-lightTeal"
                  onClick={handleFinish}
                >
                  Finish & Go to Dashboard
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default CreateOrganization;
