import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  const textareaStyles = `
    w-full px-4 py-3 rounded-button border-2 
    ${error ? 'border-red-500' : 'border-border'} 
    focus:outline-none focus:border-accent 
    transition-colors duration-200
    resize-vertical
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-secondary mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`${textareaStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
