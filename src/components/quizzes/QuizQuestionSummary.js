import React from 'react';
import QuizDataService from '../../services/quizDataService';

class QuizQuestionSummary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            quizUid: props.quizUid,
            summary: [],
            errorMessage: ''
        }
    }

    componentDidMount = () => {
        this.getQuizSummary();
    }

    getQuizSummary(){
        QuizDataService.summary(this.state.quizUid)
            .then(response => {
                const summary = response.data.questionsSummary.map(qs => {
                    const obj = {}
                    obj.questionUid = qs.questionUid;
                    obj.description = qs.description;
                    qs.choicesSummary.map(cs => {
                        return obj[cs.choice] = cs.quantity;
                    })
                    return obj;
                });

                this.setState({summary});
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
        const templateBody = 
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Excellent</th>
                        <th>Good</th>
                        <th>Poor</th>
                        <th>Terrible</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.summary.map(item => (
                        <tr key={item.questionUid}>
                            <td>{item.description}</td>
                            <td className="center">{item.EXCELLENT}</td>
                            <td className="center">{item.GOOD}</td>
                            <td className="center">{item.POOR}</td>
                            <td className="center">{item.TERRIBLE}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        return(
            <div className="small">
                <h2 className="subtitle">Answer summary</h2>

                { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }

                {templateBody}
            </div>
        )
    }
}

export default QuizQuestionSummary;