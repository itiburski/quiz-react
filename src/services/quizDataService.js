import http from '../http-common';

class QuizDataService {
    getAll() {
        return http.get('/quizzes');
    }

    update(quizUid, body) {
        return http.put(`/quizzes/${quizUid}`, body);
    }

}

export default new QuizDataService();