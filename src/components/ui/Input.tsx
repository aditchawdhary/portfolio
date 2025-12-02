import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  const inputStyles = `
    w-full px-4 py-3 rounded-button border-2 
    ${error ? 'border-red-500' : 'border-border'} 
    focus:outline-none focus:border-accent 
    transition-colors duration-200
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        className={`${inputStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
