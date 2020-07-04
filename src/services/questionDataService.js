import http from '../http-common';

class QuestionDataService {
    getAll(templateUid) {
        return http.get(`/templates/${templateUid}/questions`);
    }

    create(templateUid, description) {
        return http.post(`/templates/${templateUid}/questions`, {description});
    }

    update(templateUid, questionUid, description) {
        return http.put(`/templates/${templateUid}/questions/${questionUid}`, {description});
    }

    delete(templateUid, questionUid){
        return http.delete(`/templates/${templateUid}/questions/${questionUid}`);
    }
}

export default new QuestionDataService();
