
import { Department } from '@/types';

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
      default:
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  // Determine progress color
  let progressColor = 'bg-rootina-green';
  const progressPercent = (completed / total) * 100;
  
  if (progressPercent < 33) {
    progressColor = 'bg-rootina-red';
  } else if (progressPercent < 66) {
    progressColor = 'bg-rootina-yellow';
  }
  
  return (
    <div 
      className={`
        bg-white rounded-lg p-4 shadow hover:shadow-md transition-all
        ${isSelected ? 'border-2 border-rootina-teal' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        {icon}
        <div className="text-center">
          <h3 className="font-medium">{formatDepartmentName(department)}</h3>
          <p className="text-sm text-gray-600">{completed} / {total}</p>
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full mt-1">
          <div 
            className={`h-1 rounded-full ${progressColor}`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
