
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
        className="h-20 md:h-24" // Further increased size to fit the header better
      />
    </div>
  );
};

export default Logo;
