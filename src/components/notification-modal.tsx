
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  time: string;
  description?: string;
}

const NotificationModal = ({ 
  isOpen, 
  onClose, 
  title, 
  time, 
  description 
}: NotificationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] text-center">
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className="text-rootina-teal">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.2"/>
              <line x1="9" y1="3" x2="15" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M17 7L19 5M19 5L21 3M19 5L17 3M19 5L21 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="text-2xl font-bold">{time}</div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
          </div>

          <div className="flex space-x-4 w-full">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={onClose}
            >
              Snooze
            </Button>
            <Button 
              className="flex-1 bg-rootina-teal hover:bg-rootina-lightTeal" 
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
