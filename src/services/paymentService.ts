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
  data: PaymentRequestData,
  files?: { [key: string]: File }
): Promise<PaymentRequestResponse> => {
  try {
    const token = localStorage.getItem('accessToken');
    
    // Create FormData for multipart/form-data submission
    const formData = new FormData();
    
    // Add vendors as JSON string
    formData.append('Vendors', JSON.stringify(data.Vendors));
    
    // Add other form fields
    formData.append('PaymentMode', data.PaymentMode);
    formData.append('PaymentType', data.PaymentType);
    formData.append('Entity', data.Entity.toString());
    formData.append('AccountHolderName', data.AccountHolderName);
    formData.append('PayeeBankAccountNumber', data.PayeeBankAccountNumber);
    formData.append('BankName', data.BankName);
    formData.append('BankLocation', data.BankLocation);
    formData.append('Transit', data.Transit);
    formData.append('Remarks', data.Remarks);
    formData.append('LastRemarks', data.LastRemarks);
    formData.append('LastRejectionReason', data.LastRejectionReason);
    formData.append('CreatedBy', data.CreatedBy.toString());
    formData.append('UpdatedBy', data.UpdatedBy.toString());
    formData.append('DepartmentHead', data.DepartmentHead.toString());
    formData.append('Department', data.Department.toString());
    
    // Add files if provided
    if (files) {
      Object.entries(files).forEach(([key, file]) => {
        formData.append(key, file);
      });
    }
    
    const response = await api.post<PaymentRequestResponse>(
      '/payment-requests/',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
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
