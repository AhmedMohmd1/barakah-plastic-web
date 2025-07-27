import React from 'react';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { ValidationError } from '@/utils/validation';

interface FormFieldProps {
  type: 'text' | 'email' | 'tel' | 'textarea';
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  errors?: ValidationError;
  className?: string;
  rows?: number;
  dir?: 'rtl' | 'ltr';
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  errors,
  className = '',
  rows = 3,
  dir = 'rtl',
  disabled = false,
}) => {
  const hasError = errors && errors[name];
  const errorMessage = hasError ? errors[name] : '';

  const baseClassName = `modern-input ${hasError ? 'border-red-500' : ''} ${className}`;

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="block font-medium">
        {label} {required && '*'}
      </Label>
      
      {type === 'textarea' ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`${baseClassName} resize-none`}
          dir={dir}
          disabled={disabled}
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClassName}
          dir={dir}
          disabled={disabled}
          required={required}
        />
      )}
      
      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}; 