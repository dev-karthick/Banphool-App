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

    // Optional: Handle global 401 Unauthorized errors here (e.g., redirect to login)
    if (response.status === 401) {
      console.warn('Unauthorized! Token might be expired.');
      // You could clear localStorage and redirect to login here:
      // localStorage.clear();
      // window.location.href = '/login';
    }

    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
