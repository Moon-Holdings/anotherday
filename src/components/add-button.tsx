
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
  className?: string;
}

const AddButton = ({ onClick, className = "" }: AddButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`h-14 w-14 rounded-full p-0 bg-rootina-teal hover:bg-rootina-lightTeal shadow-lg ${className}`}
    >
      <Plus size={24} />
    </Button>
  );
};

export default AddButton;
