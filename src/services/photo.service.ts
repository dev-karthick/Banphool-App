import { apiClient } from './apiClient';

/**
 * PhotoService
 * 
 * [ANGULAR CONCEPT]: In Angular, you would create an @Injectable() class and inject it into your components via the constructor.
 * In React, we typically just export a plain JavaScript object with async methods. Any component can just import this object directly.
 * Think of this file like a standalone injectable service.
 */
export const PhotoService = {

  getPhotos: async () => {
    // We just pass the relative endpoint to our apiClient, it handles the BASE_URL and Token
    const response = await apiClient('/web/photos', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  },

  /**
   * Upload a photo file to the server.
   * 
   * @param payload Object containing header, description, and the document file
   * @returns The JSON response from the server
   */
  uploadPhoto: async (payload: { header: string; description: string; document: File }) => {
    // [ANGULAR CONCEPT]: This is similar to using the Angular HttpClient. 
    // We are using the native browser 'fetch' API (wrapped in our apiClient) which returns a Promise instead of an Observable.

    // Create a FormData object to send the file via multipart/form-data
    const formData = new FormData();
    formData.append('header', payload.header);
    formData.append('description', payload.description);
    formData.append('document', payload.document);

    // Assuming the backend has a /web/photo/upload endpoint
    const response = await apiClient('/web/photos', {
      method: 'POST',
      // Notice we DON'T set 'Content-Type': 'application/json' here.
      // The browser will automatically set 'Content-Type': 'multipart/form-data' with the correct boundary when passing FormData.
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload photo');
    }

    return await response.json();
  }
};
