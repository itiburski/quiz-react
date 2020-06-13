import http from '../http-common';

class QuizDataService {
    getAll() {
        return http.get('/quizzes');
    }
}

export default new QuizDataService();