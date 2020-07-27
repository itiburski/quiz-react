import http from '../http-common';

class AnswerDataService {

    submit(quizUid, body) {
        return http.post(`/quizzes/${quizUid}/answers`, body);
    }

}

export default new AnswerDataService();