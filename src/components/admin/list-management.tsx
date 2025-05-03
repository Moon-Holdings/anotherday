
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Department {
  id: string;
  name: string;
  description?: string;
}

interface Role {
  id: string;
  name: string;
  description?: string;
}

interface TaskList {
  id: string;
  name: string;
  description?: string;
  department: string;
  shift: string;
  taskCount: number;
}

// Mock data for lists management
const mockTaskLists: TaskList[] = [
  { id: '1', name: 'Morning Opening', description: 'Tasks for morning opening', department: 'floor', shift: 'morning', taskCount: 5 },
  { id: '2', name: 'Afternoon Opening', description: 'Tasks for afternoon opening', department: 'floor', shift: 'afternoon', taskCount: 7 },
  { id: '3', name: 'Kitchen Prep', description: 'Kitchen preparation tasks', department: 'kitchen', shift: 'morning', taskCount: 10 },
  { id: '4', name: 'Bar Setup', description: 'Bar setup tasks', department: 'bar', shift: 'evening', taskCount: 6 },
];

// Mock data for departments management
const mockDepartments: Department[] = [
  { id: '1', name: 'floor', description: 'Main restaurant floor' },
  { id: '2', name: 'bar', description: 'Bar and drinks service' },
  { id: '3', name: 'kitchen', description: 'Main kitchen operations' },
  { id: '4', name: 'takeaway', description: 'Takeaway and delivery operations' },
  { id: '5', name: 'management', description: 'Management and administration' },
];

// Mock data for additional roles management (beyond what's in role-management.tsx)
const mockRoles: Role[] = [
  { id: '1', name: 'host', description: 'Greets and seats customers' },
  { id: '2', name: 'dishwasher', description: 'Handles washing dishes' },
  { id: '3', name: 'busser', description: 'Clears and cleans tables' },
];

const ListManagement = () => {
  const [activeTab, setActiveTab] = useState<string>('lists');
  const [taskLists, setTaskLists] = useState<TaskList[]>(mockTaskLists);
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  
  const [isAddingTaskList, setIsAddingTaskList] = useState(false);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [isAddingRole, setIsAddingRole] = useState(false);
  
  const [newTaskList, setNewTaskList] = useState<Partial<TaskList>>({});
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({});
  const [newRole, setNewRole] = useState<Partial<Role>>({});
  
  const [editingTaskList, setEditingTaskList] = useState<TaskList | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  
  const { toast } = useToast();

  // Task List Management Functions
  const handleAddTaskList = () => {
    if (!newTaskList.name || !newTaskList.department || !newTaskList.shift) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const taskListWithId = { 
      ...newTaskList, 
      id: String(Date.now()),
      taskCount: 0
    } as TaskList;
    
    setTaskLists([...taskLists, taskListWithId]);
    setNewTaskList({});
    setIsAddingTaskList(false);
    toast({
      title: "Task List added",
      description: `"${newTaskList.name}" has been added successfully.`
    });
  };

  const handleUpdateTaskList = () => {
    if (!editingTaskList) return;
    
    setTaskLists(taskLists.map(list => 
      list.id === editingTaskList.id ? editingTaskList : list
    ));
    setEditingTaskList(null);
    toast({
      title: "Task List updated",
      description: `"${editingTaskList.name}" has been updated successfully.`
    });
  };

  const handleDeleteTaskList = (id: string) => {
    setTaskLists(taskLists.filter(list => list.id !== id));
    toast({
      title: "Task List deleted",
      description: "Task list has been deleted successfully.",
      variant: "destructive"
    });
  };

  // Department Management Functions
  const handleAddDepartment = () => {
    if (!newDepartment.name) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const departmentWithId = { 
      ...newDepartment, 
      id: String(Date.now())
    } as Department;
    
    setDepartments([...departments, departmentWithId]);
    setNewDepartment({});
    setIsAddingDepartment(false);
    toast({
      title: "Department added",
      description: `"${newDepartment.name}" has been added successfully.`
    });
  };

  const handleUpdateDepartment = () => {
    if (!editingDepartment) return;
    
    setDepartments(departments.map(dept => 
      dept.id === editingDepartment.id ? editingDepartment : dept
    ));
    setEditingDepartment(null);
    toast({
      title: "Department updated",
      description: `"${editingDepartment.name}" has been updated successfully.`
    });
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast({
      title: "Department deleted",
      description: "Department has been deleted successfully.",
      variant: "destructive"
    });
  };

  // Role Management Functions
  const handleAddRole = () => {
    if (!newRole.name) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const roleWithId = { 
      ...newRole, 
      id: String(Date.now())
    } as Role;
    
    setRoles([...roles, roleWithId]);
    setNewRole({});
    setIsAddingRole(false);
    toast({
      title: "Role added",
      description: `"${newRole.name}" has been added successfully.`
    });
  };

  const handleUpdateRole = () => {
    if (!editingRole) return;
    
    setRoles(roles.map(role => 
      role.id === editingRole.id ? editingRole : role
    ));
    setEditingRole(null);
    toast({
      title: "Role updated",
      description: `"${editingRole.name}" has been updated successfully.`
    });
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
    toast({
      title: "Role deleted",
      description: "Role has been deleted successfully.",
      variant: "destructive"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lists & Department Management</CardTitle>
        <CardDescription>
          Manage task lists, departments, and additional roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lists" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 grid grid-cols-3 w-[400px]">
            <TabsTrigger value="lists">Task Lists</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="additionalRoles">Additional Roles</TabsTrigger>
          </TabsList>
          
          {/* Task Lists Tab */}
          <TabsContent value="lists">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Task Lists</h3>
              <Button 
                onClick={() => {
                  setEditingTaskList(null);
                  setIsAddingTaskList(true);
                }}
                className="bg-rootina-teal hover:bg-rootina-lightTeal"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Task List
              </Button>
            </div>
            
            {isAddingTaskList && (
              <Card className="mb-4 bg-gray-50">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="list-name">Name</Label>
                      <Input 
                        id="list-name" 
                        value={newTaskList.name || ''} 
                        onChange={(e) => setNewTaskList({...newTaskList, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="list-description">Description</Label>
                      <Input 
                        id="list-description" 
                        value={newTaskList.description || ''} 
                        onChange={(e) => setNewTaskList({...newTaskList, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="list-department">Department</Label>
                      <Select 
                        value={newTaskList.department || ''} 
                        onValueChange={(value) => setNewTaskList({...newTaskList, department: value})}
                      >
                        <SelectTrigger id="list-department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="list-shift">Shift</Label>
                      <Select 
                        value={newTaskList.shift || ''} 
                        onValueChange={(value) => setNewTaskList({...newTaskList, shift: value})}
                      >
                        <SelectTrigger id="list-shift">
                          <SelectValue placeholder="Select shift" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsAddingTaskList(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTaskList} className="bg-rootina-teal hover:bg-rootina-lightTeal">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {editingTaskList && (
              <Card className="mb-4 bg-gray-50">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-list-name">Name</Label>
                      <Input 
                        id="edit-list-name" 
                        value={editingTaskList.name} 
                        onChange={(e) => setEditingTaskList({...editingTaskList, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-list-description">Description</Label>
                      <Input 
                        id="edit-list-description" 
                        value={editingTaskList.description || ''} 
                        onChange={(e) => setEditingTaskList({...editingTaskList, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-list-department">Department</Label>
                      <Select 
                        value={editingTaskList.department} 
                        onValueChange={(value) => setEditingTaskList({...editingTaskList, department: value})}
                      >
                        <SelectTrigger id="edit-list-department">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-list-shift">Shift</Label>
                      <Select 
                        value={editingTaskList.shift} 
                        onValueChange={(value) => setEditingTaskList({...editingTaskList, shift: value})}
                      >
                        <SelectTrigger id="edit-list-shift">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setEditingTaskList(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateTaskList} className="bg-rootina-teal hover:bg-rootina-lightTeal">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taskLists.map((list) => (
                  <TableRow key={list.id}>
                    <TableCell className="font-medium">{list.name}</TableCell>
                    <TableCell className="capitalize">{list.department}</TableCell>
                    <TableCell className="capitalize">{list.shift}</TableCell>
                    <TableCell>{list.taskCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingTaskList(list)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDeleteTaskList(list.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Departments Tab */}
          <TabsContent value="departments">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Departments</h3>
              <Button 
                onClick={() => {
                  setEditingDepartment(null);
                  setIsAddingDepartment(true);
                }}
                className="bg-rootina-teal hover:bg-rootina-lightTeal"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </div>
            
            {isAddingDepartment && (
              <Card className="mb-4 bg-gray-50">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dept-name">Name</Label>
                      <Input 
                        id="dept-name" 
                        value={newDepartment.name || ''} 
                        onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dept-description">Description</Label>
                      <Input 
                        id="dept-description" 
                        value={newDepartment.description || ''} 
                        onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsAddingDepartment(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddDepartment} className="bg-rootina-teal hover:bg-rootina-lightTeal">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {editingDepartment && (
              <Card className="mb-4 bg-gray-50">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-dept-name">Name</Label>
                      <Input 
                        id="edit-dept-name" 
                        value={editingDepartment.name} 
                        onChange={(e) => setEditingDepartment({...editingDepartment, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-dept-description">Description</Label>
                      <Input 
                        id="edit-dept-description" 
                        value={editingDepartment.description || ''} 
                        onChange={(e) => setEditingDepartment({...editingDepartment, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setEditingDepartment(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateDepartment} className="bg-rootina-teal hover:bg-rootina-lightTeal">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium capitalize">{dept.name}</TableCell>
                    <TableCell>{dept.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingDepartment(dept)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDeleteDepartment(dept.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Additional Roles Tab */}
          <TabsContent value="additionalRoles">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Additional Roles</h3>
              <Button 
                onClick={() => {
                  setEditingRole(null);
                  setIsAddingRole(true);
                }}
                className="bg-rootina-teal hover:bg-rootina-lightTeal"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Role
              </Button>
            </div>
            
            {isAddingRole && (
              <Card className="mb-4 bg-gray-50">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-name">Name</Label>
                      <Input 
                        id="role-name" 
                        value={newRole.name || ''} 
                        onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role-description">Description</Label>
                      <Input 
                        id="role-description" 
                        value={newRole.description || ''} 
                        onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsAddingRole(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddRole} className="bg-rootina-teal hover:bg-rootina-lightTeal">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {editingRole && (
              <Card className="mb-4 bg-gray-50">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-role-name">Name</Label>
                      <Input 
                        id="edit-role-name" 
                        value={editingRole.name} 
                        onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-role-description">Description</Label>
                      <Input 
                        id="edit-role-description" 
                        value={editingRole.description || ''} 
                        onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setEditingRole(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateRole} className="bg-rootina-teal hover:bg-rootina-lightTeal">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium capitalize">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingRole(role)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ListManagement;
