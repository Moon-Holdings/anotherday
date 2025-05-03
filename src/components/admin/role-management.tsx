
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Plus, Edit, Trash2, Shield } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface RolePermission {
  role: string;
  permissions: Record<string, boolean>;
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

const RoleManagement = () => {
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(defaultPermissions);
  const [roles, setRoles] = useState<string[]>(['manager', 'chef', 'waiter', 'cook', 'bartender', 'kitchen-staff']);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [newRoleName, setNewRoleName] = useState<string>('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

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
    
    toast({
      title: 'Role deleted',
      description: `Role "${roleToDelete}" has been deleted.`
    });
    
    setRoleToDelete(null);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>
              Manage roles and their permissions
            </CardDescription>
          </div>
          <Button onClick={() => {
            setEditingRole(null);
            setNewRoleName('');
            setDialogOpen(true);
          }} className="bg-rootina-teal hover:bg-rootina-lightTeal">
            <Plus className="mr-2 h-4 w-4" /> Add Role
          </Button>
        </CardHeader>
        <CardContent>
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
              Save Changes
            </Button>
          </div>
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
    </>
  );
};

export default RoleManagement;
