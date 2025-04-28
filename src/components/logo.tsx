
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`font-bold text-2xl ${className}`}>
      <span className="text-white">R</span>
      <span className="text-rootina-teal">∞</span>
      <span className="text-white">tina</span>
    </div>
  );
};

export default Logo;
