import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useLoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
    remember: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.UserName.trim()) {
      errors.UserName = 'UserName is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.UserName)) {
      errors.UserName = 'UserName is invalid';
    }
    
    if (!formData.Password) {
      errors.Password = 'Password is required';
    } else if (formData.Password.length < 6) {
      errors.Password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const { UserName, Password, remember } = formData;
      await login(UserName, Password, remember);
    } catch (err) {
      // Errors from the API are already handled in the auth context
      console.error('Login error:', err);
    }
  };

  return {
    formData,
    formErrors,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
};
