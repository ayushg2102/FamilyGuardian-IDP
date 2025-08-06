import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../config/api';

export interface DashboardNotification {
  id: number;
  PaymentRequest: number;
  Stage: string;
  Action: string;
  PerformedBy: number;
  PerformedByUserName: string;
  PerformedAt: string;
  Remarks: string;
  RejectionReason: string | null;
}

interface UseDashboardNotificationsReturn {
  notifications: DashboardNotification[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseDashboardNotificationsProps {
  userId?: number;
}

export const useDashboardNotifications = (props?: UseDashboardNotificationsProps): UseDashboardNotificationsReturn => {
  const { userId } = props || {};
  const [notifications, setNotifications] = useState<DashboardNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build the URL with userId parameter if provided
      let apiUrl = ENDPOINTS.PAYMENTS.DASHBOARD_NOTIFICATIONS;
      if (userId) {
        apiUrl += `?CreatedBy=${userId}`;
      }
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
      console.error('Error fetching dashboard notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const refetch = () => {
    fetchNotifications();
  };

  return {
    notifications,
    loading,
    error,
    refetch,
  };
};
