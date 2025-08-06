import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import { ENDPOINTS } from '../config/api';

// API Response Types
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

export interface PaymentRequest {
  RequestId: number;
  Initiator: string | null;
  Entity: number;
  PaymentMode: string;
  PaymentType: string;
  Department: number | null;
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
  payment_type_rules: {
    allows_multiple_vendors: boolean;
    allows_multiple_transactions: boolean;
    description: string;
    vendor_rule: string;
    gl_rule: string;
  };
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

export interface PaymentRequestsResponse {
  code: number;
  message: string;
  data: {
    count: number;
    results: PaymentRequest[];
  };
  errors: null | any;
}

// Formatted data types for UI components
export interface DashboardRequest {
  id: string;
  date: string;
  status: string;
  paymentType: string;
  entity: string;
  amount: string;
  action: string;
  initiator: string;
  note?: string;
}

export interface RequestListItem {
  key: string;
  requestNo: string;
  amount: string;
  entity: string;
  paymentType: string;
  status: string;
  dateSubmitted: string;
  stage: string;
  noOfDocs: number;
  poc: string;
}

interface UsePaymentRequestsListProps {
  userId?: number;
}

export const usePaymentRequestsList = (props?: UsePaymentRequestsListProps) => {
  const { userId } = props || {};
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build the URL with userId parameter if provided
      let apiUrl = ENDPOINTS.PAYMENTS.PAYMENT_REQUESTS;
      if (userId) {
        apiUrl += `?CreatedBy=${userId}`;
      }
      
      const response = await apiRequest<PaymentRequestsResponse>(
        apiUrl,
        {
          method: 'GET',
        }
      );

      if (response && response.code === 200) {
        setPaymentRequests(response.data.results);
      } else {
        setError('Failed to fetch payment requests data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentRequests();
  }, []);

  // Format data for Dashboard myRequests section
  const getDashboardRequests = (): DashboardRequest[] => {
    return paymentRequests.map((request) => {
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
          month: '2-digit', 
          day: '2-digit', 
          year: 'numeric' 
        });
      };

      const getEntityName = (entityId: number) => {
        // Map entity IDs to names - you may need to adjust this based on your entity mapping
        const entityMap: { [key: number]: string } = {
          1: 'FGI',
          2: 'FGC',
          3: 'FGG',
        };
        return entityMap[entityId] || `Entity ${entityId}`;
      };

      const formatPaymentType = (paymentType: string) => {
        // Format payment type for display
        return paymentType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      };

      return {
        id: `REQ-${String(request.RequestId).padStart(6, '0')}`,
        date: formatDate(request.Date),
        status: request.Status,
        paymentType: formatPaymentType(request.PaymentType),
        entity: getEntityName(request.Entity),
        amount: `USD ${request.total_amount.toLocaleString()}`,
        action: request.Status === 'Draft' ? 'Edit' : 'View',
        initiator: request.Initiator || 'Unknown',
        note: request.LastRejectionReason || undefined,
      };
    });
  };

  // Format data for RequestsList component
  const getRequestListItems = (): RequestListItem[] => {
    return paymentRequests.map((request, index) => {
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
          month: '2-digit', 
          day: '2-digit', 
          year: 'numeric' 
        });
      };

      const getEntityName = (entityId: number) => {
        const entityMap: { [key: number]: string } = {
          1: 'FGI',
          2: 'FGC',
          3: 'FGG',
        };
        return entityMap[entityId] || `Entity ${entityId}`;
      };

      const formatPaymentType = (paymentType: string) => {
        const formatted = paymentType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        // Truncate if too long for table display
        return formatted.length > 15 ? formatted.substring(0, 12) + '...' : formatted;
      };

      const getPOC = () => {
        // Get the current stage performer or return '--'
        const currentApproval = request.Approvals.find(approval => 
          approval.Action === 'Pending' && approval.Stage === request.current_stage
        );
        return currentApproval?.PerformedByUserName || '--';
      };

      return {
        key: String(index + 1),
        requestNo: `REQ-${String(request.RequestId).padStart(6, '0')}`,
        amount: `USD ${request.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        entity: getEntityName(request.Entity),
        paymentType: formatPaymentType(request.PaymentType),
        status: request.Status,
        dateSubmitted: formatDate(request.Date),
        stage: request.current_stage || '--',
        noOfDocs: request.attachment_count,
        poc: getPOC(),
      };
    });
  };

  return {
    paymentRequests,
    loading,
    error,
    refetch: fetchPaymentRequests,
    getDashboardRequests,
    getRequestListItems,
  };
};
