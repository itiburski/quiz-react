import React from 'react';
import QuizDataService from '../../services/quizDataService';

class QuizQuestionSummary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            quizUid: props.quizUid,
            summary: {},
            errorMessage: ''
        }
    }

    componentDidMount = () => {
        this.getQuizSummary();
    }

    getQuizSummary(){
        QuizDataService.summary(this.state.quizUid)
            .then(response => {
                this.setState({summary: response.data});
            })
            .catch(error => {
                this.handleDataServiceError(error);
            })
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

    setErrorMessage = (message) => {
        this.setState({ errorMessage: message });
    }

    render() {
        let templateBody;

        if (this.state.summary.questionsSummary) {
            templateBody = this.state.summary.questionsSummary.map(qs => (
                <div key={qs.questionUid}>
                    <div className="row">
                        <label className="strong">Description: </label> <label>{qs.description}</label><br/>
                        <ul>
                            {qs.choicesSummary.map(choice => (
                                <li key={qs.questionUid + choice.choice}>
                                    {choice.choice}: {choice.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ));
        }

        return(
            <div className="small">
                <h2 className="subtitle">Questions</h2>

                { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }

                {templateBody}
            </div>
        )
    }
}

export default QuizQuestionSummary;