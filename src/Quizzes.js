import React, { Component } from 'react';
import QuizDataService from './services/quizDataService'

function ListQuizzes(props) {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>State</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {props.quizzes.map(quiz => (
                    <tr key={quiz.quizUid}>
                        <td>{quiz.description}</td>
                        <td>{quiz.status}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

class Quizzes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        };
    }

    componentDidMount() {
        QuizDataService.getAll()
            .then(response => {
                this.setState({quizzes: response.data});
            })
            .catch(e =>{
                console.error(e)
            })
    }

    render() {
        return (
            <div>
                <h2 className="subtitle">Manage Quizzes</h2>

                <div>
                    <ListQuizzes quizzes = {this.state.quizzes} />
                </div>
            </div>
        )
    }
}

export default Quizzes;