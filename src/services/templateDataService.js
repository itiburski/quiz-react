import http from '../http-common';

class TemplateDataService {
    getAll() {
        return http.get('/templates');
    }

    getActives() {
        return http.get('/templates/active');
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

    activate(templateUid) {
        return http.post(`/templates/${templateUid}/activate`,);
    }

    inactivate(templateUid) {
        return http.post(`/templates/${templateUid}/inactivate`,);
    }

    createQuiz(templateUid, body) {
        return http.post(`/templates/${templateUid}/quizzes`, body);
    }

}

export default new TemplateDataService();