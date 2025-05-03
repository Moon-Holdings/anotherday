
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <img 
        src="/lovable-uploads/6c674d22-38fd-43df-b966-602348b2ef58.png" 
        alt="Another Day Logo"
        className="h-8"
      />
    </div>
  );
};

export default Logo;
