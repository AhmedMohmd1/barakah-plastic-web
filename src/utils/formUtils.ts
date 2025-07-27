import { ValidationError } from './validation';

// Form data interface
export interface FormData {
  [key: string]: string;
}

// Form submission response
export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Form submission options
export interface FormSubmissionOptions {
  endpoint: string;
  data: Record<string, any>;
  successMessage?: string;
  errorMessage?: string;
}

// Generic form submission function
export const submitForm = async (options: FormSubmissionOptions): Promise<FormSubmissionResponse> => {
  try {
    const response = await fetch(options.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options.data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Form submitted successfully:', result);

    return {
      success: true,
      message: options.successMessage || 'تم إرسال البيانات بنجاح',
      data: result
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      message: options.errorMessage || 'حدث خطأ أثناء إرسال البيانات'
    };
  }
};

// Clear form errors when user starts typing
export const clearFieldError = (
  fieldName: string,
  errors: ValidationError,
  setErrors: React.Dispatch<React.SetStateAction<ValidationError>>
) => {
  if (errors[fieldName]) {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }
};

// Reset form data
export const resetForm = (
  initialData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setErrors: React.Dispatch<React.SetStateAction<ValidationError>>
) => {
  setFormData(initialData);
  setErrors({});
};

// Form field change handler
export const handleFormChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  errors: ValidationError,
  setErrors: React.Dispatch<React.SetStateAction<ValidationError>>
) => {
  const { name, value } = e.target;
  
  // Clear error when user starts typing
  clearFieldError(name, errors, setErrors);
  
  setFormData(prev => ({ ...prev, [name]: value }));
};

// Select field change handler
export const handleSelectChange = (
  value: string,
  fieldName: string,
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  errors: ValidationError,
  setErrors: React.Dispatch<React.SetStateAction<ValidationError>>
) => {
  // Clear error when user starts typing
  clearFieldError(fieldName, errors, setErrors);
  
  setFormData(prev => ({ ...prev, [fieldName]: value }));
}; 