import React, { Component } from 'react';
import QuizDataService from '../../services/quizDataService';
import TemplateDataService from '../../services/templateDataService'
import QuizList from './QuizList';
import QuizForm from './QuizForm';
import { ModeEnum } from '../../enums/ModeEnum';
import handleChange from '../../util/handleChange';

const emptyQuiz = {
    description: '',
    status: '',
    quizUid: '',
    begin: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 23, 59, 59)
};

class QuizzContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            templateUid: '',
            quizUid: '',
            quizDescription: '',
            quizStatus: '',
            quizBegin: new Date(),
            quizEnd: new Date(),
            isAdding: false,
            mode: ModeEnum.LISTING,
            title: 'Quiz list',
            errorMessage: '',
            activeTemplates: []
        };
    }

    componentDidMount() {
        this.getAllQuizzes();
        this.getAllActiveTemplates();
    }

    getAllQuizzes(){
        this.setListMode();
        QuizDataService.getAll()
            .then(response => {
                const mapQuizzes = response.data.map(quiz => {
                    return {
                        quizUid: quiz.quizUid,
                        description: quiz.description,
                        status: quiz.status,
                        begin: new Date(quiz.begin),
                        end: new Date(quiz.end)
                    }
                });
                this.setState({quizzes: mapQuizzes});
            })
            .catch(error => {
                this.handleDataServiceError(error);
            });
    }

    getAllActiveTemplates() {
        TemplateDataService.getActives()
            .then(response => {
                this.setState({activeTemplates: response.data});
            })
            .catch(error => {
                this.handleDataServiceError(error);
            });
    }

    changeMode(quiz, mode, title) {
        this.setState({
            templateUid: quiz.templateUid,
            quizUid: quiz.quizUid,
            quizDescription: quiz.description,
            quizStatus: quiz.status,
            quizBegin: quiz.begin,
            quizEnd: quiz.end,
            isAdding: !quiz.quizUid || 0 === quiz.quizUid.length,
            mode: mode,
            title: title,
            errorMessage: ''
        });
    }

    setListMode = () => {
        this.changeMode(emptyQuiz, ModeEnum.LISTING, 'Quiz list');
    }

    setAddMode = () => {
        this.changeMode(emptyQuiz, ModeEnum.ADDING, 'New quiz');
    }

    setEditMode = (editTemplate) => {
        this.changeMode(editTemplate, ModeEnum.EDITING, 'Edit quiz');
    }

    setDetailMode = (detailTemplate) => {
        this.changeMode(detailTemplate, ModeEnum.DETAILING, 'Quiz detail');
    }

    isEmpty = (str) => {
        return (!str || 0 === str.length);
    }

    saveQuiz = () => {
        const {templateUid, quizUid, quizDescription, quizBegin, quizEnd} = this.state;

        if (this.state.isAdding && this.isEmpty(templateUid)){
            this.setErrorMessage("Template is mandatory");
            return;
        }

        if (this.isEmpty(quizDescription)){
            this.setErrorMessage("Description is mandatory");
            return;
        }

        const body= {
            begin: quizBegin,
            description: quizDescription,
            end: quizEnd
        };

        let action = ModeEnum.ADDING === this.state.mode ? TemplateDataService.createQuiz(templateUid, body) : QuizDataService.update(quizUid, body);

        action
            .then(response => {
                this.getAllQuizzes();
            })
            .catch(error => {
                this.handleDataServiceError(error);
            });
    }

    deleteQuiz = (quizToDelete) => {
        let confirmDelete = window.confirm('Delete quiz?');

        if (confirmDelete) {
            QuizDataService.delete(quizToDelete.quizUid)
                .then(response => {
                    this.getAllQuizzes();
                })
                .catch(error => {
                    this.handleDataServiceError(error);
                });
        }
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

    setTitle = (newTitle) => {
        this.setState({title: newTitle});
    }

    setErrorMessage = (message) => {
        this.setState({ errorMessage: message });
    }

    handleNewdButton = (event) => {
        this.setAddMode();
    }

    handleQuizBeginChange = (date) => {
        this.setState({
          quizBegin: date
        })
      }

      handleQuizEndChange = (date) => {
        this.setState({
          quizEnd: date
        })
      }

    render() {
        let content;

        if (this.state.mode === ModeEnum.LISTING) {
            content =
                <div>
                    { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }
                    <p>{this.state.quizzes.length} quizzes found</p>
                    <QuizList quizzes = {this.state.quizzes} editFn={this.setEditMode}
                        deleteFn={this.deleteQuiz} />
                    <button className="action" onClick={this.handleNewdButton}>New</button>
                </div>
        }

        if (this.state.mode === ModeEnum.ADDING || this.state.mode === ModeEnum.EDITING){
            content =
                <div>
                    { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }
                    <QuizForm templateUid={this.state.templateUid} quizDescription={this.state.quizDescription}
                        quizBegin={this.state.quizBegin} quizEnd={this.state.quizEnd}
                        templates={this.state.activeTemplates} isAdding={ModeEnum.ADDING === this.state.mode}
                        handleChange={handleChange.bind(this)} saveQuizFn={this.saveQuiz} cancelFn={this.setListMode} 
                        handleQuizBeginChangeFn={this.handleQuizBeginChange}
                        handleQuizEndChangeFn={this.handleQuizEndChange} />
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

export default QuizzContainer;