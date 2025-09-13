import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  className = '',
  required = false,
}) => {
  const baseClasses = 'w-full px-4 py-3 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-gray-500';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed bg-gray-800' : 'bg-gray-800/50 hover:bg-gray-800/70';

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`${baseClasses} ${disabledClasses} text-light placeholder-gray-400 ${className}`}
    />
  );
};