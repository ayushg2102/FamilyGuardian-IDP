import axios from 'axios';
import { ENDPOINTS } from '../config/api';

// Create axios instance with base URL from config
const api = axios.create({
  baseURL: 'http://172.172.233.44:9000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    console.log('Request headers: INSIDE');
    const token = sessionStorage.getItem('accessToken');
    console.log('Token found: ' + token);
    if (token) {
      console.log('Token found: ' + token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface PaymentRequestData {
  Entity: number;
  PaymentMode: string;
  PaymentType: string;
  Department: number;
  DepartmentHead: number;
  Vendors: Array<{
    PayeeName: string;
    AccountHolderName: string;
    BankAccount: number;
    VatStatus: string;
    TinNumber: string;
    InvoiceDate: string;
    InvoiceNumber: string;
    Currency: string;
    GLEntries: Array<{
      GLAccount: number;
      GLDescription: string;
      Amount: string;
      Attachments: Array<{
        File: string;
      }>;
    }>;
  }>;
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
}

export interface PaymentRequestResponse {
  id: number;
  status: string;
  message?: string;
  // Add other fields that might be returned by your API
}

export const createPaymentRequest = async (
  data: PaymentRequestData
): Promise<PaymentRequestResponse> => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await api.post<PaymentRequestResponse>(
      '/payment-requests/',
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Payment request error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Failed to create payment request'
      );
    }
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

export const getPaymentRequest = async (id: number): Promise<PaymentRequestResponse> => {
  try {
    const response = await api.get<PaymentRequestResponse>(
      `${ENDPOINTS.PAYMENTS.PAYMENT_REQUESTS}${id}/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Failed to fetch payment request'
      );
    }
    throw new Error('An unexpected error occurred');
  }
};

// Add more payment-related API calls as needed
