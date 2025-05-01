
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { User, Role, Department } from '@/types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: User) => void;
  editingUser: User | null;
}

const AddUserModal = ({
  isOpen,
  onClose,
  onAddUser,
  editingUser
}: AddUserModalProps) => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<User>({
    defaultValues: {
      id: '',
      name: '',
      employeeNumber: '',
      role: 'waiter',
      department: 'floor'
    }
  });

  useEffect(() => {
    if (editingUser) {
      reset(editingUser);
    } else {
      reset({
        id: '',
        name: '',
        employeeNumber: '',
        role: 'waiter',
        department: 'floor'
      });
    }
  }, [editingUser, reset, isOpen]);

  const onSubmit = (data: User) => {
    onAddUser({ 
      ...data, 
      id: editingUser?.id || '' 
    });
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeNumber">Employee Number</Label>
            <Input 
              id="employeeNumber" 
              placeholder="001"
              {...register("employeeNumber", { required: "Employee number is required" })}
            />
            {errors.employeeNumber && <p className="text-sm text-red-500">{errors.employeeNumber.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              defaultValue={editingUser?.role || "waiter"}
              onValueChange={(value: Role) => setValue("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="chef">Chef</SelectItem>
                <SelectItem value="waiter">Waiter</SelectItem>
                <SelectItem value="bartender">Bartender</SelectItem>
                <SelectItem value="kitchen-staff">Kitchen Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select 
              defaultValue={editingUser?.department || "floor"}
              onValueChange={(value: Department) => setValue("department", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="floor">Floor</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="service-kitchen">Service Kitchen</SelectItem>
                <SelectItem value="prep-kitchen">Prep Kitchen</SelectItem>
                <SelectItem value="bakery">Bakery</SelectItem>
                <SelectItem value="takeaway">Takeaway</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-rootina-teal hover:bg-rootina-lightTeal"
            >
              {editingUser ? 'Update' : 'Add'} User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
