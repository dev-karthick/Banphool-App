import { apiClient } from './apiClient';

/**
 * In React, instead of an @Injectable() class like in Angular,
 * we typically export an object or individual functions to act as a "Service".
 */
export const VolunteerService = {
  /**
   * Fetches all volunteers
   */
  getVolunteers: async () => {
    // We just pass the relative endpoint to our apiClient, it handles the BASE_URL and Token
    const response = await apiClient('/web/volunteer', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  },

  /**
   * Creates a new volunteer
   */
  createVolunteer: async (data: any) => {
    const response = await apiClient('/web/volunteer', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create volunteer');
    }

    return await response.json();
  },

  /**
   * Fetches a single volunteer by ID
   */
  getVolunteerById: async (id: string) => {
    const response = await apiClient(`/web/volunteer/${id}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch volunteer details');
    }

    return await response.json();
  },

  /**
   * 
   * createVolunteer: async (data: any) => {
   *   // POST request...
   * },
   * 
   * updateVolunteer: async (id: string, data: any) => {
   *   // PUT request...
   * }
   */
};
