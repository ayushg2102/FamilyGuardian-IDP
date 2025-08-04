import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { createPaymentRequest, PaymentRequestData } from '../services/paymentService';

export const usePaymentRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submitPaymentRequest = async (formValues: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Raw form values:', formValues);

      // Handle vendors from form values
      const vendors = formValues.vendors || [];
      
      // Format the data according to the API spec
      const requestData: PaymentRequestData = {
        Entity: 1, // Default to 1 for now, should be mapped from formValues.entity
        PaymentMode: formValues.paymentMode || 'Wire', // Default to 'Wire' if not provided
        PaymentType: formValues.paymentType ? 
          String(formValues.paymentType).toLowerCase().replace(/\s+/g, '_') : 
          'unknown',
        Department: 1, // Default to 1 for now, should be mapped from formValues.department
        DepartmentHead: 1, // Default to 1 for now, should be mapped from formValues.departmentHead
        Vendors: vendors.map((vendor: any, index: number) => ({
          PayeeName: vendor.payeeName || `Vendor ${index + 1}`,
          AccountHolderName: vendor.accountHolderName || '',
          BankAccount: 1, // Default to 1 for now, should be mapped from vendor.payeeBankAccount
          VatStatus: formValues.creditCardVatStatus ? 
            String(formValues.creditCardVatStatus).toLowerCase() : 
            'vatable',
          TinNumber: formValues.creditCardTinNumber || '',
          InvoiceDate: formValues.creditCardInvoiceDate ? 
            dayjs(formValues.creditCardInvoiceDate).format('YYYY-MM-DD') : 
            new Date().toISOString().split('T')[0],
          InvoiceNumber: formValues.creditCardInvoiceNumber || `INV-${Date.now()}-${index}`,
          Currency: formValues.creditCardCurrency || 'BSD',
          GLEntries: [
            {
              GLAccount: 1, // Default to 1 for now, should be mapped from vendor.glAccount
              GLDescription: vendor.glDescription || `Payment for ${vendor.payeeName || 'vendor'}`,
              Amount: vendor.amount ? String(vendor.amount) : '0',
              Attachments: [] // Handle file uploads if needed
            }
          ]
        })),
        AccountHolderName: vendors[0]?.accountHolderName || '',
        PayeeBankAccountNumber: '', // Should be set based on payment mode
        BankName: '', // Should be extracted from bank account info
        BankLocation: '', // Should be set if available
        Transit: '', // Should be set if available
        Status: 'draft',
        Remarks: formValues.remarks || '',
        LastRemarks: '',
        LastRejectionReason: '',
        CreatedBy: 1, // Should be set to current user's ID
        UpdatedBy: 1 // Should be set to current user's ID
      };

      console.log('Submitting payment request:', requestData);
      
      // Call the payment service
      const response = await createPaymentRequest(requestData);
      
      console.log('Payment request created:', response);
      message.success('Payment request submitted successfully!');
      navigate('/requests');
      
      return response;
    } catch (error) {
      console.error('Error submitting payment request:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit payment request';
      setError(errorMessage);
      message.error(errorMessage);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitPaymentRequest,
    isSubmitting,
    error
  };
};
