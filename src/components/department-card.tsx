
import { Department } from '@/types';
import { Progress } from "@/components/ui/progress";

interface DepartmentCardProps {
  department: Department;
  icon?: React.ReactNode;
  completed: number;
  total: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const DepartmentCard = ({ 
  department, 
  icon, 
  completed, 
  total, 
  isSelected = false,
  onClick 
}: DepartmentCardProps) => {
  // Format department name for display
  const formatDepartmentName = (name: Department): string => {
    switch (name) {
      case 'service-kitchen':
        return 'Service Kitchen';
      case 'prep-kitchen':
        return 'Prep Kitchen';
      case 'floor':
        return 'Waiters';
      default:
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  // Calculate progress percentage
  const progressPercent = (completed / total) * 100;
  
  // Determine progress color based on percentage
  let progressColor = 'bg-rootina-green';
  
  if (progressPercent < 33) {
    progressColor = 'bg-rootina-red';
  } else if (progressPercent < 66) {
    progressColor = 'bg-rootina-yellow';
  }
  
  // Format the completed count with color
  const getCompletedCountWithColor = () => {
    if (progressPercent < 33) {
      return <span className="text-rootina-red font-semibold">{completed}</span>;
    } else if (progressPercent < 66) {
      return <span className="text-rootina-yellow font-semibold">{completed}</span>;
    } else {
      return <span className="text-rootina-green font-semibold">{completed}</span>;
    }
  };

  return (
    <div 
      className={`
        bg-white rounded-lg p-3 shadow-sm transition-all aspect-[1.5/1] w-full
        ${isSelected ? 'border-2 border-rootina-teal bg-[#F2FCE2]' : 'border border-gray-100'}
      `}
      onClick={onClick}
    >
      <div className="flex items-center h-full">
        <div className="text-gray-800 mr-3">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">
            {formatDepartmentName(department)}
          </h3>
          <div className="flex items-baseline gap-1 text-xs mt-1">
            {getCompletedCountWithColor()}
            <span className="text-gray-500">/ {total}</span>
          </div>
          <div className="w-full mt-1">
            <div className="h-1.5 bg-gray-200 rounded-full w-full">
              <div 
                className={`h-1.5 rounded-full ${progressColor}`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
