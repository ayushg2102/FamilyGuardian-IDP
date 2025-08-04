import axios from 'axios';
import { ENDPOINTS } from '../config/api';

// Reuse the existing axios instance with interceptors from authService
const api = axios.create({
  baseURL: 'http://172.172.233.44:9000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
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
    const response = await api.post<PaymentRequestResponse>(
      ENDPOINTS.PAYMENTS.PAYMENT_REQUESTS,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'Failed to create payment request'
      );
    }
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
