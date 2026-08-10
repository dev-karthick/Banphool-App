import { apiClient } from './apiClient';

/**
 * PhotoService
 * 
 * [ANGULAR CONCEPT]: In Angular, you would create an @Injectable() class and inject it into your components via the constructor.
 * In React, we typically just export a plain JavaScript object with async methods. Any component can just import this object directly.
 * Think of this file like a standalone injectable service.
 */
export const EventService = {
  getEvents: () => apiClient('/web/events'),

  getEventById: (id: string) => apiClient(`/web/events/${id}`),

  uploadEvent: (payload: { header: string; description: string; document: File }) => {
    const formData = new FormData();
    formData.append('header', payload.header);
    formData.append('description', payload.description);
    formData.append('document', payload.document);

    return apiClient('/web/events', {
      method: 'POST',
      body: formData,
    });
  }
};
