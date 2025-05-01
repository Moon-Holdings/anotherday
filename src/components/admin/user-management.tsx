
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AddUserModal from './add-user-modal';
import { useToast } from '@/components/ui/use-toast';
import { Role, User } from '@/types';

// Mock data for user management
const mockUsers: User[] = [
  { id: '1', name: 'John Doe', employeeNumber: '001', role: 'manager', department: 'floor' },
  { id: '2', name: 'Jane Smith', employeeNumber: '002', role: 'waiter', department: 'floor' },
  { id: '3', name: 'Mike Johnson', employeeNumber: '003', role: 'chef', department: 'kitchen' },
  { id: '4', name: 'Sarah Williams', employeeNumber: '004', role: 'bartender', department: 'bar' },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleAddUser = (newUser: User) => {
    // In a real app, this would be an API call
    const userWithId = { ...newUser, id: String(Date.now()) };
    setUsers([...users, userWithId]);
    setIsAddUserModalOpen(false);
    toast({
      title: 'User added',
      description: `${newUser.name} has been added successfully.`,
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsAddUserModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    // In a real app, this would be an API call
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsAddUserModalOpen(false);
    setEditingUser(null);
    toast({
      title: 'User updated',
      description: `${updatedUser.name} has been updated successfully.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would be an API call
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: 'User deleted',
      description: `User has been deleted successfully.`,
      variant: 'destructive',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        <Button onClick={() => {
          setEditingUser(null);
          setIsAddUserModalOpen(true);
        }} className="bg-rootina-teal hover:bg-rootina-lightTeal">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Employee Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.employeeNumber}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell className="capitalize">{user.department}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditUser(user)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <AddUserModal 
        isOpen={isAddUserModalOpen}
        onClose={() => {
          setIsAddUserModalOpen(false);
          setEditingUser(null);
        }}
        onAddUser={editingUser ? handleUpdateUser : handleAddUser}
        editingUser={editingUser}
      />
    </Card>
  );
};

export default UserManagement;
