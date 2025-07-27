import { useState } from 'react';
import { toast } from 'sonner';
import { ValidationError, validateField } from '@/utils/validation';
import { FormData, submitForm, FormSubmissionOptions } from '@/utils/formUtils';

interface UseFormOptions {
  initialData: FormData;
  validationSchema?: Record<string, 'required' | 'phone' | 'email' | 'number' | 'optional'>;
  endpoint?: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export const useForm = (options: UseFormOptions) => {
  const {
    initialData,
    validationSchema = {},
    endpoint,
    successMessage = 'تم إرسال البيانات بنجاح',
    errorMessage = 'حدث خطأ أثناء إرسال البيانات',
    onSuccess,
    onError
  } = options;

  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<ValidationError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form based on schema
  const validateForm = (): boolean => {
    const newErrors: ValidationError = {};

    Object.entries(validationSchema).forEach(([fieldName, fieldType]) => {
      const value = formData[fieldName] || '';
      const error = validateField(value, fieldType, fieldName);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select field changes
  const handleSelectChange = (value: string, fieldName: string) => {
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
    
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent, customData?: Record<string, any>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('يرجى تصحيح الأخطاء في النموذج');
      return;
    }

    if (!endpoint) {
      console.warn('No endpoint provided for form submission');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = customData || formData;
      
      const response = await submitForm({
        endpoint,
        data: submissionData,
        successMessage,
        errorMessage
      });

      if (response.success) {
        toast.success(response.message);
        setFormData(initialData);
        setErrors({});
        onSuccess?.();
      } else {
        toast.error(response.message);
        onError?.();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(errorMessage);
      onError?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
  };

  // Update form data
  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit,
    resetForm,
    updateFormData,
    setFormData,
    setErrors
  };
}; 