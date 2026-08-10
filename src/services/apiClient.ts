const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * This acts like an HttpInterceptor in Angular.
 * It intercepts all outgoing requests and automatically attaches the JWT token
 * from localStorage to the headers.
 */
export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // Get token from localStorage
  const token = localStorage.getItem('accessToken');

  // Setup headers using the Headers API for easier manipulation
  const headers = new Headers(options.headers);

  // If token exists, add it to Authorization header
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Only default to application/json if we are NOT sending FormData
  // and a Content-Type wasn't explicitly provided.
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Handle global 401 Unauthorized errors here (e.g., redirect to login)
    if (response.status === 401) {
      console.warn('Unauthorized! Token might be expired.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || response.statusText || 'API request failed');
    }

    return await response.json().catch(() => null);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
