import { notify } from '../components/common/notification';

export async function apiRequest<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<T | null> {
  // Get the auth token from localStorage
  const token = sessionStorage.getItem('accessToken');
  
  // Add Authorization header if token exists
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    if (!response.ok) {
      const errorText = await response.text();
      notify('error', 'API Error', errorText || response.statusText);
      return null;
    }
    // Try to parse JSON, fallback to text
    try {
      return (await response.json()) as T;
    } catch {
      return (await response.text()) as unknown as T;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      notify('error', 'Network Error', error.message);
    } else {
      notify('error', 'Network Error', 'An unexpected error occurred.');
    }
    return null;
  }
}
