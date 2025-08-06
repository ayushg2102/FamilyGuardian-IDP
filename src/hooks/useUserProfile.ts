import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../config/api';

export interface UserProfileData {
  UserId: number;
  UserName: string;
  CountryCode: {
    id: number;
    Name: string;
    Iso2: string;
    DialCode: string;
  };
  Department: number;
  Mobile: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  Gender: number;
  UserStatus: number;
  UserImage: string | null;
  is_active: boolean;
  is_staff: boolean;
  CreatedOn: string;
  UpdatedOn: string;
  roles: string[];
}

export interface UserProfileResponse {
  code: number;
  message: string;
  data: UserProfileData;
  errors: null | any;
}

export const useUserProfile = (userId?: number) => {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      
      const response = await axios.get<UserProfileResponse>(
        `${ENDPOINTS.USERS.GET_USER_BY_ID}${id}/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.code === 200) {
        setProfileData(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch user profile');
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to fetch user profile');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId]);

  const refetch = (id?: number) => {
    const targetId = id || userId;
    if (targetId) {
      fetchUserProfile(targetId);
    }
  };

  return {
    profileData,
    isLoading,
    error,
    refetch,
  };
};
