import React from 'react';
import QuestionDataService from '../../services/questionDataService';
import QuestionList from '../questions/QuestionList';
import QuestionForm from '../questions/QuestionForm';

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
                this.setQuestionToState(emptyQuestion);
                this.setErrorMessage('');
            })
            .catch(error => {
                console.error(error);
            });
    }

    setEditQuestion = (editQuestion) => {
        this.setErrorMessage('');
        this.setQuestionToState(editQuestion);
    }

    componentDidMount = () => {
        this.getAllQuestions();
    }

    handleChange = (event) => {
        const {name, value, type, checked} = event.target;
        type === "checkbox" ? 
            this.setState({
                [name]: checked
            })
        :
        this.setState({
            [name]: value
        }) 
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
                .catch(e => {
                    console.error(e);
                });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {templateUid, questionDescription, questionUid} = this.state;
        let action = this.state.isAdding 
            ? QuestionDataService.create(templateUid, questionDescription) 
            : QuestionDataService.update(templateUid, questionUid, questionDescription);

        action
            .then(response => {
                this.getAllQuestions();
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    this.setErrorMessage(error.response.data.message);
                  } else if (error.request) {
                      console.log("error.request");
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
            });
    }

    render() {
        return(
            <div>
                <h2 className="subtitle">Questions</h2>

                { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }

                <QuestionForm questionDescription={this.state.questionDescription} handleChange={this.handleChange}
                    submitCallback={this.handleSubmit} />

                <QuestionList questions={this.state.questions} editCallback={this.setEditQuestion} 
                    deleteCallback={this.deleteQuestion} />
            </div>
        );
    }

}

export default QuestionContainer;