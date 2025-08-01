import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { ENDPOINTS } from '../config/api';

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token: accessToken } = useAuth();

  const changePassword = async (data: {
    old_password: string;
    new_password: string;
    confirm_password: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!accessToken) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        ENDPOINTS.AUTH.CHANGE_PASSWORD,
        {
          old_password: data.old_password,
          new_password: data.new_password,
          confirm_password: data.confirm_password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      message.success('Password changed successfully');
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || 'Failed to change password';
        setError(errorMessage);
        message.error(errorMessage);
      } else if (err instanceof Error) {
        const errorMessage = err.message || 'Failed to change password';
        setError(errorMessage);
        message.error(errorMessage);
      } else {
        const errorMessage = 'An unknown error occurred';
        setError(errorMessage);
        message.error(errorMessage);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error };
};
