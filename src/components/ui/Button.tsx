import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-6 py-3 rounded-button font-semibold transition-all duration-200 ease-in-out';
  
  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent/90 active:scale-95',
    secondary: 'bg-secondary text-white hover:bg-secondary-light active:scale-95',
    outline: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white active:scale-95',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
