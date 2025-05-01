
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

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

const roles = ['manager', 'chef', 'waiter', 'cook', 'bartender', 'kitchen-staff'];

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Permissions</CardTitle>
        <CardDescription>
          Configure which features each role can access
        </CardDescription>
      </CardHeader>
      <CardContent>
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
  );
};

export default RoleManagement;
