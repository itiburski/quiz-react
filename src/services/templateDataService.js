import http from '../http-common';

class TemplateDataService {
    getAll() {
        return http.get('/templates');
    }

    create(description) {
        return http.post('/templates', {description});
    }

    update(templateUid, description) {
        return http.put(`/templates/${templateUid}`, {description});
    }

    delete(templateUid) {
        return http.delete(`/templates/${templateUid}`);
    }
}

export default new TemplateDataService();