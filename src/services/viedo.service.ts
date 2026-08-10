import { apiClient } from './apiClient';

/**
 * PhotoService
 * 
 * [ANGULAR CONCEPT]: In Angular, you would create an @Injectable() class and inject it into your components via the constructor.
 * In React, we typically just export a plain JavaScript object with async methods. Any component can just import this object directly.
 * Think of this file like a standalone injectable service.
 */
export const ViedoService = {
  getViedo: () => apiClient('/web/videos'),

  getViedoById: (id: string) => apiClient(`/web/videos/${id}`),

  uploadViedo: (payload: { header: string; description: string; document: File }) => {
    const formData = new FormData();
    formData.append('header', payload.header);
    formData.append('description', payload.description);
    formData.append('document', payload.document);

    return apiClient('/web/videos', {
      method: 'POST',
      body: formData,
    });
  }
};
