
import { Button } from '@/components/ui/button';

interface QuantityControlProps {
  quantity: number;
  required?: number;
  onIncrease: () => void;
  onDecrease: () => void;
  isHorizontal?: boolean;
}

const QuantityControl = ({ 
  quantity, 
  required, 
  onIncrease, 
  onDecrease, 
  isHorizontal = false 
}: QuantityControlProps) => {
  return (
    <div className={`flex items-center ${isHorizontal ? 'mt-2 space-x-1' : 'mt-2 space-x-2'}`}>
      <span className={`${isHorizontal ? 'text-xs' : 'text-sm'} text-gray-500`}>
        {isHorizontal ? 'Stock:' : 'On stock:'}
      </span>
      <div className="flex items-center space-x-1 bg-gray-100 rounded-md">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`${isHorizontal ? 'h-5 w-5' : 'h-6 w-6'} rounded-full text-gray-500`}
          onClick={onDecrease}
        >
          -
        </Button>
        <span className={`${isHorizontal ? 'w-6' : 'w-8'} text-center ${isHorizontal ? 'text-xs' : ''}`}>
          {quantity}
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`${isHorizontal ? 'h-5 w-5' : 'h-6 w-6'} rounded-full text-gray-500`}
          onClick={onIncrease}
        >
          +
        </Button>
      </div>
      {required && (
        <div className={isHorizontal ? "text-xs" : "text-sm"}>
          <span className="text-gray-500">{isHorizontal ? 'Need: ' : 'Needed: '}</span>
          <span className={required > quantity ? "text-red-500" : "text-green-500"}>
            {required}
          </span>
        </div>
      )}
    </div>
  );
};

export default QuantityControl;
