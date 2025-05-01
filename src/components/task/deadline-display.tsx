
interface DeadlineDisplayProps {
  deadline: string;
  isHorizontal?: boolean;
}

const DeadlineDisplay = ({ deadline, isHorizontal = false }: DeadlineDisplayProps) => {
  const formattedTime = new Date(deadline).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`${isHorizontal ? 'mt-2 text-xs px-2 py-1 bg-red-100 text-red-700 rounded inline-block' : 'text-xs px-2 py-1 bg-red-100 text-red-700 rounded'}`}>
      Till {formattedTime}
    </div>
  );
};

export default DeadlineDisplay;
