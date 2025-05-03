
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate credentials
    // For demo purposes, just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <Card className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Employee Number"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              className="pr-10 py-6"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rootina-teal">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rootina-teal">
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
          Login
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
