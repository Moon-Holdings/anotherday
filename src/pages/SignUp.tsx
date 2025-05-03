
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Logo from "@/components/logo";
import { toast } from 'sonner';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const navigate = useNavigate();
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !employeeNumber || !code) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (code !== confirmCode) {
      toast.error("Codes do not match");
      return;
    }
    
    // In a real app, we would register the user
    toast.success("Account created successfully");
    navigate('/create-organization');
  };

  return (
    <div className="w-full min-h-screen flex flex-col rootina-pattern-bg">
      <div className="flex justify-center p-6 pt-10">
        <Logo className="w-48" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
            <p className="text-gray-500">Join Rootina and start managing your tasks efficiently</p>
          </div>
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pr-10 py-6"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rootina-teal">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Employee Number"
                  value={employeeNumber}
                  onChange={(e) => setEmployeeNumber(e.target.value)}
                  className="pr-10 py-6"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rootina-teal">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M7 15h0"></path>
                    <path d="M12 15h0"></path>
                    <path d="M17 15h0"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="4-digits Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="pr-10 py-6"
                  maxLength={4}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rootina-teal">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Confirm 4-digits Code"
                  value={confirmCode}
                  onChange={(e) => setConfirmCode(e.target.value)}
                  className="pr-10 py-6"
                  maxLength={4}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rootina-teal">
                    <path d="m9 12 2 2 4-4"></path>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 bg-rootina-teal hover:bg-rootina-lightTeal text-white"
            >
              Sign Up
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 text-rootina-teal"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
