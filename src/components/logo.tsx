
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <img 
        src="/lovable-uploads/56ec61c2-0110-4ac7-9b5d-2ed86c43ec5b.png" 
        alt="Another Day Logo"
        className="h-16 md:h-18" // Reduced size to make header thinner
      />
    </div>
  );
};

export default Logo;
