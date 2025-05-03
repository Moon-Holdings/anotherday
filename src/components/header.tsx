
import { useState } from 'react';
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
  userRole?: 'manager' | 'waiter' | 'chef' | 'cook' | 'bartender';
}

const Header = ({
  userName = 'Brandon',
  userRole = 'manager' // Default role is manager
}: HeaderProps) => {
  return (
    <>
      <header className="bg-rootina-blue text-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Logo className="h-8" />
          </div>
          
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-rootina-blue/80 p-2">
                  <UserRound className="h-6 w-6" />
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
                    <div className="h-10 w-10 rounded-full bg-rootina-blue flex items-center justify-center text-white">
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
                      <Button variant="ghost" className="w-full justify-start">Profile</Button>
                      <Button variant="ghost" className="w-full justify-start">Preferences</Button>
                    </div>
                    
                    <div className="border-b pb-2">
                      <h3 className="font-medium mb-2">Help & Support</h3>
                      <Button variant="ghost" className="w-full justify-start">Documentation</Button>
                      <Button variant="ghost" className="w-full justify-start">Support</Button>
                    </div>
                    
                    <Button variant="ghost" className="w-full justify-start text-destructive">
                      Sign out
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
