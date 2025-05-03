
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
        bg-white rounded-lg p-6 shadow hover:shadow-md transition-all h-full
        ${isSelected ? 'border-2 border-rootina-teal' : 'border border-gray-100'}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center gap-3 h-full">
        <div className="text-rootina-teal text-3xl">
          {icon}
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{formatDepartmentName(department)}</h3>
          <p className="text-gray-600 text-xl mt-1 font-medium">{completed} / {total}</p>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            className={`h-2 rounded-full ${progressColor}`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
