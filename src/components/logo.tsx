
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <img 
        src="/lovable-uploads/06fdb487-9c9d-406e-9541-799f1b4833b9.png" 
        alt="Rootina Logo"
        className="h-8"
      />
    </div>
  );
};

export default Logo;
