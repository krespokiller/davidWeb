import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  className = '',
}) => {
  const baseClasses = 'font-light text-light tracking-tight';

  const levelClasses = {
    1: 'text-4xl md:text-5xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg',
  };

  switch (level) {
    case 1:
      return <h1 className={`${baseClasses} ${levelClasses[1]} ${className}`}>{children}</h1>;
    case 2:
      return <h2 className={`${baseClasses} ${levelClasses[2]} ${className}`}>{children}</h2>;
    case 3:
      return <h3 className={`${baseClasses} ${levelClasses[3]} ${className}`}>{children}</h3>;
    case 4:
      return <h4 className={`${baseClasses} ${levelClasses[4]} ${className}`}>{children}</h4>;
    case 5:
      return <h5 className={`${baseClasses} ${levelClasses[5]} ${className}`}>{children}</h5>;
    case 6:
      return <h6 className={`${baseClasses} ${levelClasses[6]} ${className}`}>{children}</h6>;
    default:
      return <h1 className={`${baseClasses} ${levelClasses[1]} ${className}`}>{children}</h1>;
  }
};