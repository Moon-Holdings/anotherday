
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Department } from '@/types';

interface AddListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddList: (listData: any) => void;
}

const AddListModal = ({ isOpen, onClose, onAddList }: AddListModalProps) => {
  const [listName, setListName] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState<Department | ''>('');

  const resetForm = () => {
    setListName('');
    setDescription('');
    setDepartment('');
  };

  const handleSubmit = () => {
    // Simple validation
    if (!listName || !department) return;
    
    const newList = {
      id: Math.random().toString(36).substr(2, 9),
      name: listName,
      description,
      department,
      tasks: [],
      progress: 0,
      isCompleted: false,
    };
    
    onAddList(newList);
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New List</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <Input
            placeholder="List Name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-24"
          />

          <Select value={department} onValueChange={setDepartment as any}>
            <SelectTrigger>
              <SelectValue placeholder="Choose department" />
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

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Days of the week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="everyday">Every day</SelectItem>
              <SelectItem value="weekdays">Weekdays (Sun-Thu)</SelectItem>
              <SelectItem value="weekend">Weekend (Fri-Sat)</SelectItem>
              <SelectItem value="custom">Custom...</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-end">
            <Button 
              type="button"
              onClick={handleSubmit}
              className="bg-rootina-teal hover:bg-rootina-lightTeal"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddListModal;
