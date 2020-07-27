import React from 'react';
import QuizDataService from './../../services/quizDataService';
import AnswerDataService from '../../services/answerDataService';
import AnswerList from './AnswerList';
import { ModeEnum } from '../../enums/ModeEnum';
import AnswerForm from './AnswerForm';

class AnswerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeQuizzes: [],
            quizUid: '',
            quizDescription: '',
            choices: [],
            answerChoices: [],
            mode: ModeEnum.LISTING,
            title: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        this.getAllActiveQuizzes();
        this.setListMode();
    }

    getAllActiveQuizzes() {
        QuizDataService.getActives()
            .then(response => {
                this.setState({activeQuizzes: response.data});
            })
            .catch(error => {
                this.handleDataServiceError(error);
            });
    }

    getQuizComplete(quizUid) {
        QuizDataService.getComplete(quizUid)
            .then(response => {
                const answerChoices = response.data.questions.map(elem => {
                    return { questionUid: elem.questionUid, description: elem.description, choice: '' };
                });
                this.setState({
                    quizUid: response.data.quizUid,
                    quizDescription: response.data.description,
                    answerChoices,
                    choices: response.data.choices
                })
            })
            .catch(error => {
                this.handleDataServiceError(error);
            });
    }

    changeMode(mode, title) {
        this.setState({
            mode: mode,
            title: title,
            errorMessage: ''
        });
    }

    setListMode = () => {
        this.changeMode(ModeEnum.LISTING, 'Quizzes ready to get answer');
    }

    setAddMode = (quiz) => {
        this.changeMode(ModeEnum.ADDING, 'New answer to Quiz');
        this.getQuizComplete(quiz.quizUid)
    }

    setErrorMessage = (message) => {
        this.setState({ errorMessage: message });
    }

    handleDataServiceError(error) {
        if (error.response) {
            // Request made and server responded
            this.setErrorMessage(error.response.data.message);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('error.message', error.message);
            this.setErrorMessage(error.message);
        }
    }

    arrayHandleChange = (event) => {
        const {name, value} = event.target;
        const attributeName = name.replace(/[0-9]/g, '');
        const index = event.target.getAttribute('data-index'); //custom attribute value
        const updatedObj = Object.assign({}, this.state.answerChoices[index],{[attributeName]: value});

        this.setState({
            answerChoices: [
            ...this.state.answerChoices.slice(0, index),
            updatedObj,
            ...this.state.answerChoices.slice(index + 1)
            ]
        });
    }

    isEmpty = (str) => {
        return (!str || 0 === str.length);
    }

    saveAnswer = () => {
        this.setErrorMessage('');
        const {quizUid, answerChoices} = this.state;

        const unanswered = answerChoices.filter(elem => this.isEmpty(elem.choice));
        if (unanswered.length > 0){
            this.setErrorMessage('There are unanswered questions');
            return;
        }

        AnswerDataService.submit(quizUid, { answerChoices })
            .then(response => {
                this.setListMode();
            })
            .catch(error => {
                this.handleDataServiceError(error);
            });
    }

    render() {
        let content;

        if (this.state.mode === ModeEnum.LISTING) {
            content = <div>
                { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }
                <AnswerList quizzes = {this.state.activeQuizzes} answerFn={this.setAddMode} />
            </div>
        }

        if (this.state.mode === ModeEnum.ADDING) {
            content = <div>
                { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }
                <AnswerForm quizDescription={this.state.quizDescription} answerChoices={this.state.answerChoices} 
                    choices={this.state.choices} handleChange={this.arrayHandleChange}
                    saveQuizFn={this.saveAnswer} cancelFn={this.setListMode} />
            </div>
        }

        return (
            <div>
                <h2 className="subtitle">{this.state.title}</h2>
                {content}
            </div>
        )
    }
}

export default AnswerContainer;