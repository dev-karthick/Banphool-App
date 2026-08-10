import { apiClient } from './apiClient';

/**
 * In React, instead of an @Injectable() class like in Angular,
 * we typically export an object or individual functions to act as a "Service".
 */
export const VolunteerService = {
  getVolunteers: () => apiClient('/web/volunteer'),

  getVolunteerById: (id: string) => apiClient(`/web/volunteer/${id}`),

  createVolunteer: (data: any) => apiClient('/web/volunteer', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  updateVolunteer: (id: string, data: any) => apiClient(`/web/volunteer/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  deleteVolunteer: (id: string) => apiClient(`/web/volunteer/${id}`, {
    method: 'DELETE',
  }),
};
