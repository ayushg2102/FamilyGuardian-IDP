import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import { ENDPOINTS } from '../config/api';

// API Response Types for Request Detail
export interface GLEntry {
  id: number;
  GLAccount: number;
  GLDescription: string;
  Amount: string;
  Attachments: Array<{
    id: number;
    File: string;
  }>;
}

export interface Vendor {
  id: number;
  PayeeName: string;
  AccountHolderName: string;
  BankAccount: number;
  VatStatus: string;
  TinNumber: string;
  InvoiceDate: string;
  InvoiceNumber: string;
  Currency: string;
  GLEntries: GLEntry[];
}

export interface Approval {
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

export interface PaymentTypeRules {
  allows_multiple_vendors: boolean;
  allows_multiple_transactions: boolean;
  description: string;
  vendor_rule: string;
  gl_rule: string;
}

export interface RequestDetailData {
  RequestId: number;
  Initiator: string;
  Entity: number;
  PaymentMode: string;
  PaymentType: string;
  Department: number;
  DepartmentHead: number;
  Approvals: Approval[];
  Vendors: Vendor[];
  vendor_count: number;
  gl_account_count: number;
  attachment_count: number;
  total_amount: number;
  current_stage: string;
  allows_multiple_vendors: boolean;
  allows_multiple_transactions: boolean;
  payment_type_rules: PaymentTypeRules;
  CreatedOn: string;
  UpdatedOn: string;
  Date: string;
  AccountHolderName: string;
  PayeeBankAccountNumber: string;
  BankName: string;
  BankLocation: string;
  Transit: string;
  Status: string;
  Remarks: string;
  LastRemarks: string;
  LastRejectionReason: string;
  CreatedBy: number;
  UpdatedBy: number;
  Division: number | null;
}

export const useRequestById = (requestId: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [requestData, setRequestData] = useState<RequestDetailData | null>(null);

  useEffect(() => {
    if (!requestId) return;

    const fetchRequestDetail = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiRequest<RequestDetailData>(
          `${ENDPOINTS.PAYMENTS.PAYMENT_REQUESTS}${requestId}/`
        );

        if (response && response.RequestId) {
          setRequestData(response);
        } else {
          setError('Invalid response format');
        }
      } catch (err: any) {
        console.error('Error fetching request detail:', err);
        setError(err.message || 'Failed to fetch request details');
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetail();
  }, [requestId]);

  // Helper function to format currency
  const formatCurrency = (amount: number | string, currency: string = 'USD'): string => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(numAmount);
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper function to get status color
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'green';
      case 'pending':
        return 'orange';
      case 'rejected':
        return 'red';
      case 'draft':
        return 'blue';
      default:
        return 'default';
    }
  };

  return {
    loading,
    error,
    requestData,
    formatCurrency,
    formatDate,
    getStatusColor,
  };
};
