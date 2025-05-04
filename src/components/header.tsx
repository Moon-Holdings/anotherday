
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';
import BottomNav from './bottom-nav';
import { UserRound } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from './ui/sheet';
import { Button } from './ui/button';

interface HeaderProps {
  userName?: string;
  currentShift?: string;
  shiftAction?: string;
  onShiftChange?: (shift: string, action: string) => void;
  userRole?: 'owner' | 'manager' | 'waiter' | 'chef' | 'cook' | 'bartender';
}

const Header = ({
  userName = 'Brandon',
  userRole = 'manager' // Default role is manager
}: HeaderProps) => {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-1 md:py-0.5">
          <div className="flex items-center">
            <Logo className="h-16 md:h-18" />
          </div>
          
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-anotherday-dark hover:bg-gray-100 p-1">
                  <UserRound className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>
                    Manage your account and preferences
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-10 w-10 rounded-full bg-anotherday-mint flex items-center justify-center text-anotherday-dark">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{userName}</p>
                      <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div className="border-b pb-2">
                      <h3 className="font-medium mb-2">Account</h3>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/profile">Profile</Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/preferences">Preferences</Link>
                      </Button>
                    </div>
                    
                    <div className="border-b pb-2">
                      <h3 className="font-medium mb-2">Help & Support</h3>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/documentation">Documentation</Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/support">Support</Link>
                      </Button>
                    </div>
                    
                    <Button variant="ghost" className="w-full justify-start text-destructive" asChild>
                      <Link to="/login">Sign out</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Bottom Navigation */}
      <BottomNav userRole={userRole} />
    </>
  );
};

export default Header;
