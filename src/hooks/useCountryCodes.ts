import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../config/api';

export interface CountryCode {
  id: number;
  Name: string;
  Iso2: string;
  DialCode: string;
}

interface CountryCodesResponse {
  code: number;
  message: string;
  data: {
    count: number;
    results: CountryCode[];
  };
  errors: null;
}

export const useCountryCodes = () => {
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(ENDPOINTS.COUNTRY_CODES.GET_ALL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: CountryCodesResponse = await response.json();
        
        if (data.code === 200 && data.data?.results) {
          setCountryCodes(data.data.results);
        } else {
          throw new Error(data.message || 'Failed to fetch country codes');
        }
      } catch (err) {
        console.error('Error fetching country codes:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch country codes');
        
        // Fallback to default country codes if API fails
        setCountryCodes([
          { id: 1, Name: 'Afghanistan', Iso2: 'AF', DialCode: '+93' },
          { id: 49, Name: 'India', Iso2: 'IN', DialCode: '+91' },
          { id: 100, Name: 'United States', Iso2: 'US', DialCode: '+1' },
          { id: 99, Name: 'United Kingdom', Iso2: 'GB', DialCode: '+44' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  return { countryCodes, isLoading, error };
};
