import { apiClient } from './apiClient';


export const NewsService = {
    getNews: () => apiClient('/web/news'),

    getNewsById: (id: string) => apiClient(`/web/news/${id}`),

    uploadNews: (payload: { header: string; description: string; document: File }) => {
        const formData = new FormData();
        formData.append('header', payload.header);
        formData.append('description', payload.description);
        formData.append('document', payload.document);

        return apiClient('/web/news', {
            method: 'POST',
            body: formData,
        });
    }
};
