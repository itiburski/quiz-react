import React from 'react';
import QuestionDataService from '../../services/questionDataService';
import QuestionList from '../questions/QuestionList';
import QuestionForm from '../questions/QuestionForm';
import handleChange from '../../util/handleChange';

const emptyQuestion = {
    description: '',
    questionUid: ''
};

class QuestionContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            templateUid: props.templateUid,
            questions: [],
            questionDescription: '',
            questionUid: '',
            isAdding: false,
            errorMessage: ''
        }
    }

    setQuestionToState(question){
        this.setState({
            questionDescription: question.description,
            questionUid: question.questionUid,
            isAdding: !question.questionUid || 0 === question.questionUid.length,
        })
    }

    getAllQuestions = () => {
        QuestionDataService.getAll(this.state.templateUid)
            .then(response => {
                this.setState({
                    questions: response.data.questions,
                });
                this.clearQuestion();
            })
            .catch(error => {
                console.error(error);
            });
    }

    clearQuestion = (e) => {
        this.setQuestionToState(emptyQuestion);
        this.setErrorMessage('');
    }

    setEditQuestion = (editQuestion) => {
        this.setErrorMessage('');
        this.setQuestionToState(editQuestion);
    }

    componentDidMount = () => {
        this.getAllQuestions();
    }

    setErrorMessage = (message) => {
        this.setState({ errorMessage: message });
    }

    deleteQuestion = (questionToDelete) => {
        let confirmDelete = window.confirm('Delete question?');

        if (confirmDelete) {
            QuestionDataService.delete(this.state.templateUid, questionToDelete.questionUid)
                .then(response => {
                    this.getAllQuestions();
                })
                .catch(error => {
                    this.handleDataServiceError(error);
                });
        }
    }

    saveQuestion = () => {
        const {templateUid, questionDescription, questionUid} = this.state;
        let action = this.state.isAdding 
            ? QuestionDataService.create(templateUid, questionDescription) 
            : QuestionDataService.update(templateUid, questionUid, questionDescription);

        action
            .then(response => {
                this.getAllQuestions();
            })
            .catch(error => {
                this.handleDataServiceError(error);
            });
    }

    handleDataServiceError(error) {
        if (error.response) {
            // Request made and server responded
            this.setErrorMessage(error.response.data.message);
        }
        else if (error.request) {
            console.log("error.request");
            // The request was made but no response was received
            console.log(error.request);
        }
        else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    }

    render() {
        return(
            <div>
                <h2 className="subtitle">Questions</h2>

                { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }

                <QuestionForm questionUid={this.state.questionUid} questionDescription={this.state.questionDescription} 
                    handleChange={handleChange.bind(this)}
                    saveCallback={this.saveQuestion} cancelCallback={this.clearQuestion} />

                <QuestionList questions={this.state.questions} editCallback={this.setEditQuestion} 
                    deleteCallback={this.deleteQuestion} />
            </div>
        );
    }

}

export default QuestionContainer;