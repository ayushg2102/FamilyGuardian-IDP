import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface SetPasswordParams {
  userId: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export const useSetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ userId, token, password, confirmPassword }: SetPasswordParams) => {
      const response = await axios.post('/auth/reset_password/', {
        userId,
        token,
        password,
        confirmPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      setIsSuccess(true);
      setError(null);
    },
    onError: (error: any) => {
      setError(
        error.response?.data?.message || 'Failed to set password. Please try again.'
      );
      setIsSuccess(false);
    },
  });

  return {
    setPassword: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess,
    error,
  };
};

export default useSetPassword;
