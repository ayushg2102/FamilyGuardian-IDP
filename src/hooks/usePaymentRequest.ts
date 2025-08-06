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
      
      // Collect all files from form values
      const files: { [key: string]: File } = {};
      let fileCounter = 1;
      
      // Process vendors and their GL entries to extract files and format data
      const processedVendors = vendors.map((vendor: any, vendorIndex: number) => {
        const glEntries = vendor.glDetails || [];
        
        const processedGLEntries = glEntries.map((glEntry: any, glIndex: number) => {
          const attachments: Array<{ File: string }> = [];
          
          // Handle file attachments for this GL entry
          if (glEntry.attachment && Array.isArray(glEntry.attachment)) {
            glEntry.attachment.forEach((file: any) => {
              if (file.originFileObj) {
                const fileKey = `file${fileCounter}`;
                files[fileKey] = file.originFileObj;
                attachments.push({ File: fileKey });
                fileCounter++;
              }
            });
          }
          
          // Map GL account string values to database IDs
          const glAccountMap: { [key: string]: number } = {
            '1000': 1, // Cash
            '2000': 2, // Receivables  
            '3000': 3, // Payables
            '4000': 4, // Revenue
            '5000': 5  // Expenses
          };
          
          return {
            GLAccount: glAccountMap[glEntry.account] || 1,
            GLDescription: glEntry.description || `GL Entry ${glIndex + 1}`,
            Amount: parseFloat(glEntry.amount) || 0,
            Attachments: attachments
          };
        });
        
        // Map VAT status values to API expected format
        const vatStatusMap: { [key: string]: string } = {
          'Vatable': 'vatable',
          'Non-Vatable': 'non_vatable',
          'vatable': 'vatable',
          'non_vatable': 'non_vatable'
        };
        
        const rawVatStatus = vendor.vatStatus || formValues.creditCardVatStatus || 'Vatable';
        const mappedVatStatus = vatStatusMap[rawVatStatus] || 'vatable';
        
        return {
          PayeeName: vendor.payeeName || `Vendor ${vendorIndex + 1}`,
          AccountHolderName: vendor.accountHolderName || '',
          BankAccount: 1, // This should be mapped from vendor.payeeBankAccount
          VatStatus: mappedVatStatus,
          TinNumber: vendor.tinNumber || formValues.creditCardTinNumber || '',
          InvoiceDate: vendor.invoiceDate ? 
            dayjs(vendor.invoiceDate).format('YYYY-MM-DD') : 
            (formValues.creditCardInvoiceDate ? 
              dayjs(formValues.creditCardInvoiceDate).format('YYYY-MM-DD') : 
              new Date().toISOString().split('T')[0]),
          InvoiceNumber: vendor.invoiceNumber || formValues.creditCardInvoiceNumber || `INV-${Date.now()}-${vendorIndex}`,
          Currency: vendor.currency || formValues.creditCardCurrency || 'BSD',
          GLEntries: processedGLEntries
        };
      });
      
      // Extract bank details from the first vendor if available
      const firstVendor = vendors[0] || {};
      const bankAccount = firstVendor.payeeBankAccount || '';
      const bankParts = bankAccount.split(' - ');
      const bankName = bankParts[0] || '';
      const accountNumber = firstVendor.payeeBankAccountNumber || '';
      
      // Format the data according to the API spec
      const requestData: PaymentRequestData = {
        Entity: 1, // This should be mapped from formValues.entity
        PaymentMode: formValues.paymentMode || 'Wire',
        PaymentType: formValues.paymentType ? 
          String(formValues.paymentType).toLowerCase().replace(/\s+/g, '_') : 
          'corporate_payments',
        Department: 1, // This should be mapped from formValues.department
        DepartmentHead: 1, // This should be mapped from formValues.departmentHead
        Vendors: processedVendors,
        AccountHolderName: firstVendor.accountHolderName || '',
        PayeeBankAccountNumber: accountNumber,
        BankName: bankName,
        BankLocation: firstVendor.bankLocation || '',
        Transit: firstVendor.transitNumber || '',
        Status: 'draft',
        Remarks: formValues.remarks || '',
        LastRemarks: '',
        LastRejectionReason: '',
        CreatedBy: 1, // Should be set to current user's ID
        UpdatedBy: 1 // Should be set to current user's ID
      };

      console.log('Submitting payment request:', requestData);
      console.log('Files to upload:', Object.keys(files));
      
      // Call the payment service with files
      const response = await createPaymentRequest(requestData, files);
      
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
