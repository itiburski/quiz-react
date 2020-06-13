import http from '../http-common';

class TemplateDataService {
    getAll() {
        return http.get('/templates');
    }
}

export default new TemplateDataService();