
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </Button>
  );
};

export default AddButton;
