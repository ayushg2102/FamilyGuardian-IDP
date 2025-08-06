import { useState, useEffect } from 'react';

interface PaymentChoice {
  value: string;
  label: string;
}

interface PaymentRequestChoices {
  payment_modes: PaymentChoice[];
  payment_types: PaymentChoice[];
  vat_statuses: PaymentChoice[];
  currencies: PaymentChoice[];
}

interface ApiResponse {
  code: number;
  message: string;
  data: PaymentRequestChoices;
  errors: null;
}

export const usePaymentRequestChoices = () => {
  const [choices, setChoices] = useState<PaymentRequestChoices | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get auth token
        const token = sessionStorage.getItem('accessToken');
        
        const response = await fetch('http://172.172.233.44:9000/api/payment-requests/payment_request_choices/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        if (result.code === 200) {
          setChoices(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch payment request choices');
        }
      } catch (err: any) {
        console.error('Error fetching payment request choices:', err);
        setError(err.message || 'Failed to fetch payment request choices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChoices();
  }, []);

  return {
    choices,
    isLoading,
    error,
  };
};

export default usePaymentRequestChoices;
