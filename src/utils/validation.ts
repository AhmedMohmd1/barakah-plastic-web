// Validation utilities for forms

export interface ValidationError {
  [key: string]: string;
}

// Egyptian phone number validation
export const validateEgyptianPhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return 'يرجى إدخال رقم الهاتف';
  }

  // Remove any spaces, dashes, or other characters to get only digits
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's exactly 11 digits and starts with valid Egyptian prefixes
  const validPrefixes = ['011', '012', '015', '010'];
  const phonePrefix = cleanPhone.substring(0, 3);
  
  if (cleanPhone.length !== 11) {
    return 'يجب أن يكون رقم الهاتف 11 رقم';
  } else if (!validPrefixes.includes(phonePrefix)) {
    return 'يجب أن يبدأ رقم الهاتف بـ 011 أو 012 أو 015 أو 010';
  }

  return null;
};

// Email validation
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return null; // Email is optional
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'يرجى إدخال بريد إلكتروني صحيح';
  }

  return null;
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) {
    return `يرجى إدخال ${fieldName}`;
  }
  return null;
};

// Number validation
export const validateNumber = (value: string): string | null => {
  if (!value.trim()) {
    return null; // Number is optional
  }

  if (!/^\d+$/.test(value)) {
    return 'يرجى إدخال رقم صحيح';
  }

  return null;
};

// Generic validation function
export const validateField = (
  value: string, 
  fieldType: 'required' | 'phone' | 'email' | 'number' | 'optional',
  fieldName?: string
): string | null => {
  switch (fieldType) {
    case 'required':
      return validateRequired(value, fieldName || 'هذا الحقل');
    case 'phone':
      return validateEgyptianPhone(value);
    case 'email':
      return validateEmail(value);
    case 'number':
      return validateNumber(value);
    case 'optional':
      return null;
    default:
      return null;
  }
}; 