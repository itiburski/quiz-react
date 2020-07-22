import http from '../http-common';

class QuizDataService {
    getAll() {
        return http.get('/quizzes');
    }

    update(quizUid, body) {
        return http.put(`/quizzes/${quizUid}`, body);
    }

    delete(quizUid) {
        return http.delete(`/quizzes/${quizUid}`);
    }

    start(quizUid) {
        return http.post(`/quizzes/${quizUid}/start`,);
    }

    end(quizUid) {
        return http.post(`/quizzes/${quizUid}/end`,);
    }

    summary(quizUid) {
        return http.get(`/quizzes/${quizUid}/summary`,);
    }

}

export default new QuizDataService();