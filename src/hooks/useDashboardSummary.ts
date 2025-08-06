import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import { ENDPOINTS } from '../config/api';

export interface SummaryData {
  count: number;
  amount: number;
}

export interface DashboardSummaryResponse {
  code: number;
  message: string;
  data: {
    total: SummaryData;
    draft: SummaryData;
    pending: SummaryData;
    my_pending_returned: SummaryData;
    approved: SummaryData;
  };
  errors: null | any;
}

export interface FormattedStatsData {
  title: string;
  value: number;
  amount: string;
  icon?: string;
}

export const useDashboardSummary = () => {
  const [summaryData, setSummaryData] = useState<DashboardSummaryResponse['data'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummaryData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiRequest<DashboardSummaryResponse>(
        ENDPOINTS.PAYMENTS.DASHBOARD_STATS,
        {
          method: 'GET',
        }
      );

      if (response && response.code === 200) {
        setSummaryData(response.data);
      } else {
        setError('Failed to fetch dashboard summary data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  // Format data for dashboard cards
  const getFormattedStatsData = (icons?: { [key: string]: string }): FormattedStatsData[] => {
    if (!summaryData) return [];

    return [
      {
        title: 'Total Request',
        value: summaryData.total.count,
        amount: `USD ${summaryData.total.amount.toLocaleString()}`,
        icon: icons?.total || icons?.document,
      },
      {
        title: 'Draft',
        value: summaryData.draft.count,
        amount: `USD ${summaryData.draft.amount.toLocaleString()}`,
        icon: icons?.draft,
      },
      {
        title: 'Pending',
        value: summaryData.pending.count,
        amount: `USD ${summaryData.pending.amount.toLocaleString()}`,
        icon: icons?.pending,
      },
      {
        title: 'Pending & Returned',
        value: summaryData.my_pending_returned.count,
        amount: `USD ${summaryData.my_pending_returned.amount.toLocaleString()}`,
        icon: icons?.pendingAndReturned,
      },
      {
        title: 'Approved',
        value: summaryData.approved.count,
        amount: `USD ${summaryData.approved.amount.toLocaleString()}`,
        icon: icons?.approved,
      },
    ];
  };

  return {
    summaryData,
    loading,
    error,
    refetch: fetchSummaryData,
    getFormattedStatsData,
  };
};
