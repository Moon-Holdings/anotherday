
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Shield, Users } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface RolePermission {
  role: string;
  permissions: Record<string, boolean>;
}

interface Department {
  id: string;
  name: string;
  managedBy: string[];
}

const permissions: Permission[] = [
  { 
    id: 'view_dashboard', 
    name: 'View Dashboard', 
    description: 'Access to the main dashboard'
  },
  { 
    id: 'view_schedule', 
    name: 'View Schedule', 
    description: 'Access to the daily schedule'
  },
  { 
    id: 'view_tasks', 
    name: 'View Tasks', 
    description: 'Access to tasks page'
  },
  { 
    id: 'manage_users', 
    name: 'Manage Users', 
    description: 'Create, edit and delete users'
  },
  { 
    id: 'manage_permissions', 
    name: 'Manage Permissions', 
    description: 'Edit role permissions'
  },
];

const defaultPermissions: RolePermission[] = [
  { 
    role: 'manager', 
    permissions: { 
      view_dashboard: true, 
      view_schedule: true, 
      view_tasks: true, 
      manage_users: true, 
      manage_permissions: true 
    } 
  },
  { 
    role: 'chef', 
    permissions: { 
      view_dashboard: false, 
      view_schedule: false, 
      view_tasks: true, 
      manage_users: false, 
      manage_permissions: false 
    } 
  },
  { 
    role: 'waiter', 
    permissions: { 
      view_dashboard: false, 
      view_schedule: false, 
      view_tasks: true, 
      manage_users: false, 
      manage_permissions: false 
    } 
  },
  { 
    role: 'cook', 
    permissions: { 
      view_dashboard: false, 
      view_schedule: false, 
      view_tasks: true, 
      manage_users: false, 
      manage_permissions: false 
    } 
  },
  { 
    role: 'bartender', 
    permissions: { 
      view_dashboard: true, 
      view_schedule: true, 
      view_tasks: true, 
      manage_users: false, 
      manage_permissions: false 
    } 
  },
  { 
    role: 'kitchen-staff', 
    permissions: { 
      view_dashboard: false, 
      view_schedule: false, 
      view_tasks: true, 
      manage_users: false, 
      manage_permissions: false 
    } 
  },
];

// Mock departments data - in a real app this would come from an API/context
const defaultDepartments: Department[] = [
  { id: '1', name: 'Waiters', managedBy: ['manager'] },
  { id: '2', name: 'Bar', managedBy: ['manager', 'bartender'] },
  { id: '3', name: 'Kitchen', managedBy: ['chef'] },
  { id: '4', name: 'Managers', managedBy: ['admin'] }
];

const RoleManagement = () => {
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(defaultPermissions);
  const [roles, setRoles] = useState<string[]>(['manager', 'chef', 'waiter', 'cook', 'bartender', 'kitchen-staff']);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [newRoleName, setNewRoleName] = useState<string>('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  
  // Department management state
  const [departments, setDepartments] = useState<Department[]>(defaultDepartments);
  const [deptDialogOpen, setDeptDialogOpen] = useState<boolean>(false);
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);
  const [newDeptName, setNewDeptName] = useState<string>('');
  const [deptRoleAssignments, setDeptRoleAssignments] = useState<Record<string, boolean>>({});
  const [deptToDelete, setDeptToDelete] = useState<string | null>(null);
  const [deptDeleteDialogOpen, setDeptDeleteDialogOpen] = useState<boolean>(false);

  // Department-Role management tab selection
  const [activeTab, setActiveTab] = useState<string>("roles");

  const { toast } = useToast();

  const handlePermissionChange = (role: string, permissionId: string, value: boolean) => {
    const updatedPermissions = rolePermissions.map(rp => {
      if (rp.role === role) {
        return {
          ...rp,
          permissions: {
            ...rp.permissions,
            [permissionId]: value
          }
        };
      }
      return rp;
    });
    
    setRolePermissions(updatedPermissions);
  };

  const savePermissions = () => {
    // In a real app, this would be an API call to save permissions
    toast({
      title: 'Permissions updated',
      description: 'Role permissions have been updated successfully.'
    });
  };

  const handleAddRole = () => {
    if (newRoleName.trim() === '') {
      toast({
        title: 'Error',
        description: 'Role name cannot be empty.',
        variant: 'destructive'
      });
      return;
    }

    if (roles.includes(newRoleName.toLowerCase().trim())) {
      toast({
        title: 'Error',
        description: 'Role with this name already exists.',
        variant: 'destructive'
      });
      return;
    }

    if (editingRole) {
      // Update existing role
      const oldRoleName = editingRole;
      const updatedRoles = roles.map(r => r === oldRoleName ? newRoleName.toLowerCase().trim() : r);
      setRoles(updatedRoles);
      
      const updatedPermissions = rolePermissions.map(rp => {
        if (rp.role === oldRoleName) {
          return {
            ...rp,
            role: newRoleName.toLowerCase().trim()
          };
        }
        return rp;
      });
      
      setRolePermissions(updatedPermissions);
      
      // Update department-role associations
      const updatedDepartments = departments.map(dept => {
        if (dept.managedBy.includes(oldRoleName)) {
          return {
            ...dept,
            managedBy: dept.managedBy.map(r => r === oldRoleName ? newRoleName.toLowerCase().trim() : r)
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      
      toast({
        title: 'Role updated',
        description: `Role "${oldRoleName}" has been updated to "${newRoleName}".`
      });
    } else {
      // Add new role
      const newRole = newRoleName.toLowerCase().trim();
      setRoles(prev => [...prev, newRole]);
      
      // Initialize with default permissions (all false)
      const defaultPerms: Record<string, boolean> = {};
      permissions.forEach(p => {
        defaultPerms[p.id] = false;
      });
      
      setRolePermissions(prev => [...prev, { role: newRole, permissions: defaultPerms }]);
      
      toast({
        title: 'Role added',
        description: `New role "${newRole}" has been added.`
      });
    }
    
    // Reset form
    setNewRoleName('');
    setEditingRole(null);
    setDialogOpen(false);
  };

  const openEditDialog = (role: string) => {
    setEditingRole(role);
    setNewRoleName(role);
    setDialogOpen(true);
  };

  const openDeleteDialog = (role: string) => {
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const handleDeleteRole = () => {
    if (!roleToDelete) return;

    // Remove role from roles array
    const updatedRoles = roles.filter(r => r !== roleToDelete);
    setRoles(updatedRoles);
    
    // Remove role permissions
    const updatedPermissions = rolePermissions.filter(rp => rp.role !== roleToDelete);
    setRolePermissions(updatedPermissions);
    
    // Remove role from departments
    const updatedDepartments = departments.map(dept => ({
      ...dept,
      managedBy: dept.managedBy.filter(r => r !== roleToDelete)
    }));
    setDepartments(updatedDepartments);
    
    toast({
      title: 'Role deleted',
      description: `Role "${roleToDelete}" has been deleted.`
    });
    
    setRoleToDelete(null);
    setDeleteDialogOpen(false);
  };

  // Department management functions
  const openDeptDialog = (department?: Department) => {
    if (department) {
      setEditingDeptId(department.id);
      setNewDeptName(department.name);
      
      // Set role assignments
      const initialAssignments: Record<string, boolean> = {};
      roles.forEach(role => {
        initialAssignments[role] = department.managedBy.includes(role);
      });
      setDeptRoleAssignments(initialAssignments);
    } else {
      setEditingDeptId(null);
      setNewDeptName('');
      
      // Reset role assignments
      const initialAssignments: Record<string, boolean> = {};
      roles.forEach(role => {
        initialAssignments[role] = false;
      });
      setDeptRoleAssignments(initialAssignments);
    }
    
    setDeptDialogOpen(true);
  };

  const handleAddDepartment = () => {
    if (newDeptName.trim() === '') {
      toast({
        title: 'Error',
        description: 'Department name cannot be empty.',
        variant: 'destructive'
      });
      return;
    }

    // Get roles that manage this department
    const managingRoles = Object.entries(deptRoleAssignments)
      .filter(([_, isAssigned]) => isAssigned)
      .map(([role]) => role);
    
    if (editingDeptId) {
      // Update existing department
      const updatedDepartments = departments.map(dept => 
        dept.id === editingDeptId 
          ? { ...dept, name: newDeptName, managedBy: managingRoles }
          : dept
      );
      
      setDepartments(updatedDepartments);
      
      toast({
        title: 'Department updated',
        description: `Department "${newDeptName}" has been updated.`
      });
    } else {
      // Add new department
      const newDepartment: Department = {
        id: Date.now().toString(),
        name: newDeptName,
        managedBy: managingRoles
      };
      
      setDepartments([...departments, newDepartment]);
      
      toast({
        title: 'Department added',
        description: `New department "${newDeptName}" has been added.`
      });
    }
    
    // Reset form
    setNewDeptName('');
    setEditingDeptId(null);
    setDeptRoleAssignments({});
    setDeptDialogOpen(false);
  };

  const openDeptDeleteDialog = (deptId: string) => {
    setDeptToDelete(deptId);
    setDeptDeleteDialogOpen(true);
  };

  const handleDeleteDepartment = () => {
    if (!deptToDelete) return;
    
    // Remove department
    const updatedDepartments = departments.filter(dept => dept.id !== deptToDelete);
    setDepartments(updatedDepartments);
    
    const deptName = departments.find(dept => dept.id === deptToDelete)?.name || '';
    
    toast({
      title: 'Department deleted',
      description: `Department "${deptName}" has been deleted.`
    });
    
    setDeptToDelete(null);
    setDeptDeleteDialogOpen(false);
  };

  const handleRoleDeptChange = (role: string, checked: boolean) => {
    setDeptRoleAssignments(prev => ({
      ...prev,
      [role]: checked
    }));
  };

  const saveDepartmentRoleAssignments = () => {
    toast({
      title: 'Department-Role assignments updated',
      description: 'Department management roles have been updated successfully.'
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Role and Department Management</CardTitle>
            <CardDescription>
              Manage roles, their permissions, and department assignments
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => {
                  setEditingRole(null);
                  setNewRoleName('');
                  setDialogOpen(true);
                }} className="bg-rootina-teal hover:bg-rootina-lightTeal">
                  <Plus className="mr-2 h-4 w-4" /> Add Role
                </Button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Available Roles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roles.map(role => (
                    <Card key={role} className="bg-muted/50">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          <span className="capitalize">{role}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditDialog(role)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openDeleteDialog(role)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-medium mb-2">Role Permissions</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Permission</TableHead>
                    <TableHead>Description</TableHead>
                    {roles.map(role => (
                      <TableHead key={role} className="text-center capitalize">
                        {role}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map(permission => (
                    <TableRow key={permission.id}>
                      <TableCell className="font-medium">{permission.name}</TableCell>
                      <TableCell>{permission.description}</TableCell>
                      {roles.map(role => {
                        const rolePermission = rolePermissions.find(rp => rp.role === role);
                        const isChecked = rolePermission?.permissions[permission.id] || false;
                        
                        return (
                          <TableCell key={`${role}-${permission.id}`} className="text-center">
                            <Checkbox 
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                handlePermissionChange(role, permission.id, checked === true);
                              }}
                              aria-label={`${role} ${permission.name} permission`}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={savePermissions}
                  className="bg-rootina-teal hover:bg-rootina-lightTeal"
                >
                  Save Permission Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="departments" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => openDeptDialog()} className="bg-rootina-teal hover:bg-rootina-lightTeal">
                  <Plus className="mr-2 h-4 w-4" /> Add Department
                </Button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Departments and Role Access</h3>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department Name</TableHead>
                      <TableHead>Managed By Roles</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departments.map(dept => (
                      <TableRow key={dept.id}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {dept.managedBy.length > 0 ? dept.managedBy.map(role => (
                              <span key={`${dept.id}-${role}`} className="bg-slate-200 px-2 py-0.5 rounded-md text-xs capitalize">
                                {role}
                              </span>
                            )) : (
                              <span className="text-muted-foreground">No roles assigned</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => openDeptDialog(dept)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => openDeptDeleteDialog(dept.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add/Edit Role Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
            <DialogDescription>
              {editingRole 
                ? 'Update the name for this role.' 
                : 'Enter a name for the new role. You can set permissions after creating it.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                id="role-name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Enter role name"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRole}>
              {editingRole ? 'Update' : 'Add'} Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the role "{roleToDelete}"? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteRole}>
              Delete Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Department Dialog */}
      <Dialog open={deptDialogOpen} onOpenChange={setDeptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDeptId ? 'Edit Department' : 'Add New Department'}</DialogTitle>
            <DialogDescription>
              {editingDeptId
                ? 'Update the department and assign roles that can manage it.'
                : 'Create a new department and assign roles that can manage it.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="dept-name">Department Name</Label>
              <Input
                id="dept-name"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                placeholder="Enter department name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Managed by Roles</Label>
              <div className="border rounded-md p-4 space-y-2">
                {roles.map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`role-${role}`}
                      checked={deptRoleAssignments[role] || false}
                      onCheckedChange={(checked) => handleRoleDeptChange(role, checked === true)}
                    />
                    <label 
                      htmlFor={`role-${role}`}
                      className="text-sm capitalize cursor-pointer"
                    >
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeptDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddDepartment}>
              {editingDeptId ? 'Update' : 'Add'} Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Department Confirmation Dialog */}
      <Dialog open={deptDeleteDialogOpen} onOpenChange={setDeptDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this department?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeptDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteDepartment}>
              Delete Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoleManagement;
